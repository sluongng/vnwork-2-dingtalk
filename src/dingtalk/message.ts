import { URL } from "url";

export abstract class DingtalkMessage {
    public msgtype: string;

    constructor(msgtype: string) {
        this.msgtype = msgtype;
    }
}

export abstract class DingtalkAtMessage extends DingtalkMessage {

    public at: {
        atMobiles: string[];
        isAtAll: boolean;
    };

    constructor(msgtype: string, atMobiles: string[], isAtAll: boolean) {
        super(msgtype);

        this.at = {
            atMobiles,
            isAtAll,
        };
    }
}

abstract class DingtalkAtMessageBuilder {

    public msgtype: string;
    public atMobiles: string[];
    public isAtAll: boolean;

    constructor(msgType: string) {
        this.msgtype = msgType;
        this.atMobiles = [];
        this.isAtAll = false;
    }

    public setMsgType(msgType: string) {
        this.msgtype = msgType;
        return this;
    }

    public addMobileNumber(mobileNumber: string) {
        this.atMobiles.push(mobileNumber);
        return this;
    }

    public setIsAtAll(isAtAll: boolean) {
        this.isAtAll = isAtAll;
        return this;
    }
}

export class TextMessage extends DingtalkAtMessage {

    public text: {
        content: string;
    };

    constructor(content: string, atMobiles: string[], isAtAll: boolean) {
        super("text", atMobiles, isAtAll);
        this.text.content = content;
    }
}

export class TextMessageBuilder extends DingtalkAtMessageBuilder {

    public content: string;
    constructor() {
        super("text");
        return this;
    }

    public setContent(content: string) {
        this.content = content;
        return this;
    }

    public build(): TextMessage {
        return new TextMessage(
            this.content,
            this.atMobiles,
            this.isAtAll,
        );
    }
}

export class MarkdownMessage extends DingtalkAtMessage {

    public markdown: {
        text: string;
        title: string;
    };

    constructor(title: string, text: string, atMobiles: string[], isAtAll: boolean) {
        super("markdown", atMobiles, isAtAll);
        this.markdown = {
            text,
            title,
        };
    }
}

export class MarkdownMessageBuilder extends DingtalkAtMessageBuilder {

    public title: string;
    public text: string;

    constructor() {
        super("markdown");
    }

    public setTitle(title: string) {
        this.title = title;
        return this;
    }

    public setText(text: string) {
        this.text = text;
        return this;
    }

    public build(): MarkdownMessage {
        return new MarkdownMessage(
            this.title,
            this.text,
            this.atMobiles,
            this.isAtAll,
        );
    }
}

export class LinkMessage extends DingtalkMessage {

    public link: {
        title: string;
        text: string;
        picUrl: URL;
        messageUrl: URL;
    };

    constructor(
        text: string,
        title: string,
        picUrl: URL,
        messageUrl: URL,
    ) {
        super("link");

        this.link = {
            title,
            picUrl,
            text,
            messageUrl,
        };
    }
}

abstract class ActionCardMessage extends DingtalkMessage {

    public title: string;
    public text: string;
    public hideAvatar: string;
    public btnOrientation: string;

    constructor(title: string, text: string, hideAvatar: string, btnOrientation: string) {
        super("actionCard");

        this.title = title;
        this.text = text;
        this.hideAvatar = hideAvatar;
        this.btnOrientation = btnOrientation;
    }
}

abstract class ActionCardMessageBuilder {

    public title: string;
    public text: string;
    public hideAvatar: string;
    public btnOrientation: string;

    constructor(title: string) {
        this.title = title;
    }

    public setText(text: string) {
        this.text = text;
        return this;
    }

    public setHideAvatar(hideAvatar: boolean) {
        this.hideAvatar = String(Number(hideAvatar));
        return this;
    }

    public setButtonOrientation(isHorizontal: boolean) {
        this.btnOrientation = String(Number(isHorizontal));
        return this;
    }
}

export class SingleActionCardMessage extends ActionCardMessage {
    public singleTitle: string;
    public singleURL: URL;

    constructor(
        title: string,
        text: string,
        hideAvatar: string,
        btnOrientation: string,
        buttonTitle: string,
        buttonUrl: URL,
    ) {
        super(title, text, hideAvatar, btnOrientation);

        this.singleTitle = buttonTitle;
        this.singleURL = buttonUrl;
    }
}

export class SingleActionCardMessageBuilder extends ActionCardMessageBuilder {

    public buttonTitle: string;
    public buttonUrl: URL;
    constructor(title: string) {
        super(title);
    }

    public setButtonTitle(buttonTitle: string) {
        this.buttonTitle = buttonTitle;
        return this;
    }

    public setButtonUrl(buttonUrl: URL) {
        this.buttonUrl = buttonUrl;
        return this;
    }

    public build(): SingleActionCardMessage {
        return new SingleActionCardMessage(
            this.title,
            this.text,
            this.hideAvatar,
            this.btnOrientation,
            this.buttonTitle,
            this.buttonUrl,
        );
    }
}

export class Button {

    public title: string;
    public actionURL: URL;

    constructor(title: string, actionUrl: URL) {
        this.title = title;
        this.actionURL = actionUrl;
    }
}

export class MultiActionCardMessage extends ActionCardMessage {

    public btns: Button[];

    constructor(title: string, text: string, hideAvatar: string, btnOrientation: string, buttons: Button[]) {
        super(title, text, hideAvatar, btnOrientation);

        this.btns = buttons;
    }
}

export class MultiActionCardMessageBuilder extends ActionCardMessageBuilder {

    public btns: Button[];

    constructor(title) {
        super(title);

        this.btns = [];
    }

    public addButton(button: Button) {
        this.btns.push(button);
        return this;
    }

    public build(): MultiActionCardMessage {
        return new MultiActionCardMessage(
            this.title,
            this.text,
            this.hideAvatar,
            this.btnOrientation,
            this.btns,
        );
    }
}

export class FeedCardMessage extends DingtalkMessage {

    public feedCard: {
        links: FeedCardLink[];
    };

    constructor(links: FeedCardLink[]) {
        super("feedCard");
        this.feedCard = { links };
    }
}

export class FeedCardLink {

    public title: string;
    public messageUrl: URL;
    public picUrl: URL;

    constructor(title: string, messageUrl: URL, picUrl: URL) {
        this.title = title;
        this.messageUrl = messageUrl;
        this.picUrl = picUrl;
    }
}

export class FeedCardMessageBuilder {

    public links: FeedCardLink[];

    constructor() {
        this.links = [];
    }

    public addLink(link: FeedCardLink) {
        this.links.push(link);
        return this;
    }

    public build() {
        return new FeedCardMessage(this.links);
    }
}
