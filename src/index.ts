import axios, { AxiosResponse } from "axios";
import * as qs from "qs";
import { sprintf } from "sprintf-js";
import { URL } from "url";

import { AlgoliaSearchParams, AlgoliaSearchResultList } from "./algolia/model";

import { DingtalkRobotClient } from "./dingtalk/client";
import { FeedCardLink, FeedCardMessageBuilder } from "./dingtalk/message";

import { FuncCompContext, FuncCompEventTimeTrigger, IFuncCompCallBack } from "./alicloud/functionCompute";

const JOB_URL_TEMPLATE = "https://www.vietnamworks.com/%d-jv/";

const DING_WEBHOOK = new URL(
    "/robot/send?access_token=86134fe83a80ab52bab435a9a26e8d59becc5893a71b52e072c476e16602f73f",
    "https://oapi.dingtalk.com",
);

function handleSearchResult(response: AxiosResponse<AlgoliaSearchResultList>) {
    const feedMessage = response.data.results[0].hits.map((post) => {
        return new FeedCardLink(
            post.jobTitle,
            new URL(sprintf(JOB_URL_TEMPLATE, post.objectID)),
            post.companyLogo,
        );
    }).reduce(
        (builder: FeedCardMessageBuilder, link: FeedCardLink) => builder.addLink(link),
        new FeedCardMessageBuilder(),
    ).build();

    const client = new DingtalkRobotClient(DING_WEBHOOK, feedMessage);

    client.send();
}

export function handler(event: FuncCompEventTimeTrigger, context: FuncCompContext, callback: IFuncCompCallBack): void {

    const searchHost = new URL("https://jf8q26wwud-dsn.algolia.net/1/indexes/*/queries");

    // tslint:disable-next-line:max-line-length
    searchHost.searchParams.append("x-algolia-api-key", "ZDQwODA4MThkYTVmODEyYWQxYmYyMmUwYzVkOWIxYzI1YzhmNDQ3ODk4OTM2NjU4OWUwYmFmODU1Y2NlZTUxZXRhZ0ZpbHRlcnM9JnVzZXJUb2tlbj1mODhjZjk3YTk0MTFmMmVkNWRmOTFkNDA5MmU5YzZhYw==");
    searchHost.searchParams.append("x-algolia-application-id", "JF8Q26WWUD");

    const searchParams = new AlgoliaSearchParams(
        "",
        20,
        20,
        0,
        ["categoryIds", "locationIds", "categories", "locations", "skills", "jobLevel", "company"],
        "",
        ["locationIds:29", "categoryIds:35", ["jobLevelId:5", "jobLevelId:6", "jobLevelId:7"]],
        "jobSalary>=3000",
    );

    axios.post(searchHost.toString(), {
        requests: [{
            indexName: "vnw_job_v2_35",
            params: qs.stringify(searchParams),
        }],
    }).then(handleSearchResult)
        .then(() => callback(null, "success"))
        .catch((error) => {
            console.error(error);
            callback(error);
        });
}
