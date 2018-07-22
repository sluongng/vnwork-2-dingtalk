import axios, { AxiosError, AxiosResponse } from "axios";
import { URL } from "url";
import { DingtalkMessage } from "./message";

export class DingTalkRobotResponse {
    public errmsg: string;
    public errcode: number;
}

export class DingtalkRobotClient<T extends DingtalkMessage> {
    public message: T;
    public webhookUrl: URL;

    constructor(webhookUrl: URL, message: T) {
        this.webhookUrl = webhookUrl;
        this.message = message;
    }

    public send() {
        return axios.post(this.webhookUrl.toString(), this.message)
            .then((resp: AxiosResponse<DingTalkRobotResponse>) => {
                console.log(
                    "Sent to dingtalk succeed with http status: %d, errcode: %d, errmsg: %s",
                    resp.status,
                    resp.data.errcode,
                    resp.data.errmsg,
                );
                return resp.data;
            })
            .catch((err: AxiosError) => {
                console.error("Sent to dingtalk failed: " + err);
                return err;
            });
    }
}
