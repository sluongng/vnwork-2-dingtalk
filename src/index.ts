import axios, { AxiosResponse } from "axios";
import * as qs from "qs";
import { sprintf } from "sprintf-js";
import { URL } from "url";
import { AlgoliaSearchParamsBuilder, AlgoliaSearchResultList } from "./algolia/model";
import { FuncCompContext, FuncCompEventTimeTrigger, IFuncCompCallBack } from "./alicloud/functionCompute";
import { DingtalkRobotClient } from "./dingtalk/client";
import { MarkdownMessageBuilder } from "./dingtalk/message";

const NO_LOGO_IMG_URL = "https://i.imgur.com/VYlBoW0.png";
const JOB_TEMPLATE = `

[%s](https://www.vietnamworks.com/%d-jv/)

**Job Level**: %s

**Company**: %s

![](%s)

**Salary**: %d

*Min - Max*: %d - %d

*Roles*: %s

*Skills*: %s

---`;

const DING_WEBHOOK = new URL(
    process.env.DING_WEBHOOK_ACCESS_TOKEN || "86134fe83a80ab52bab435a9a26e8d59becc5893a71b52e072c476e16602f73f",
    "https://oapi.dingtalk.com/robot/send?access_token=",
);

function handleSearchResult(response: AxiosResponse<AlgoliaSearchResultList>) {
    const markdownText = response.data.results[0].hits
        .map((post) => {
            return sprintf(
                JOB_TEMPLATE,
                post.jobTitle,
                post.objectID,
                post.jobLevel,
                post.company,
                post.companyLogo ? post.companyLogo : NO_LOGO_IMG_URL,
                post.jobSalary,
                post.salaryMin,
                post.salaryMax,
                post.classifiedRoles.length > 0 ? post.classifiedRoles.join(", ") : "None",
                post.classifiedSkills.length > 0 ? post.classifiedSkills.join(", ") : "None",
            );
        })
        .reduce((acc: string, value: string) => acc.concat(value), "");

    const markdownMessage = new MarkdownMessageBuilder()
        .setTitle("Hot Job Notice!")
        .setText(markdownText)
        .build();

    const client = new DingtalkRobotClient(DING_WEBHOOK, markdownMessage);

    client.send();
}

export function handler(event: FuncCompEventTimeTrigger, context: FuncCompContext, callback: IFuncCompCallBack): void {

    // VietnamWorks public id and key for Algolia Search Service
    const ALGOLIA_APP_ID = "JF8Q26WWUD";
    const ALGOLIA_API_KEY = "ZDQwODA4MThkYTVmODEyYWQxYmYyMmUwYzVkOWIxYzI1YzhmNDQ3ODk4OTM2NjU4OWUw"
        + "YmFmODU1Y2NlZTUxZXRhZ0ZpbHRlcnM9JnVzZXJUb2tlbj1mODhjZjk3YTk0MTFmMmVkNWRmOTFkNDA5MmU5YzZhYw==";
    const ALGOLIA_HOST = "https://jf8q26wwud-dsn.algolia.net";
    const VNW_INDEX_NAME = "vnw_job_v2_35";

    const searchUrl = new URL("/1/indexes/*/queries", ALGOLIA_HOST);
    searchUrl.searchParams.append("x-algolia-api-key", ALGOLIA_API_KEY);
    searchUrl.searchParams.append("x-algolia-application-id", ALGOLIA_APP_ID);

    const searchParams = new AlgoliaSearchParamsBuilder()
        .setQuery("")
        .setHitsPerPage(20)
        .setMaxValuesPerFacet(20)
        .setPage(0)
        .setFacets(["categoryIds", "locationIds", "categories", "locations", "skills", "jobLevel", "company"])
        .setTagFilters("")
        .setFacetFilters(["locationIds:29", "categoryIds:35", ["jobLevelId:5", "jobLevelId:6", "jobLevelId:7"]])
        .setFilters("")
        .build();

    const searchBody = {
        requests: [{
            indexName: VNW_INDEX_NAME,
            params: qs.stringify(searchParams),
        }],
    };

    axios.post(searchUrl.toString(), searchBody)
        .then(handleSearchResult)
        .then(() => callback(null, "success"))
        .catch((error) => {
            console.error(error);
            callback(error);
        });
}
