import axios from "axios";
import {URL} from "url";
import {DingtalkMessage} from "./message";

export class DingtalkRobotClient<T extends DingtalkMessage> {
    public message: T;
    public webhookUrl: URL;

    constructor(webhookUrl: URL, message: T) {
        this.webhookUrl = webhookUrl;
        this.message = message;
    }

    public async send() {
        return axios.post(this.webhookUrl.toString(), this.message)
            .then((resp) => {
                console.log("Sent to dingtalk succeed with status: " + resp.status);
            })
            .catch((err) => {
                console.error("Sent to dingtalk failed: " + err);
                return err;
            });
    }
}
