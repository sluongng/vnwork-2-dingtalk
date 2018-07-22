import {URL} from "url";
import {DingtalkRobotClient} from "./client";
import {MarkdownMessageBuilder} from "./message";

const client = new DingtalkRobotClient(
    // tslint:disable-next-line:max-line-length
    new URL("https://oapi.dingtalk.com/robot/send?access_token=86134fe83a80ab52bab435a9a26e8d59becc5893a71b52e072c476e16602f73f"),
    new MarkdownMessageBuilder()
        .setTitle("Robot Message")
        .setText("\n\nHello World!")
        .setAtMobiles([])
        .setIsAtAll(false)
        .build(),
);

client.send();
