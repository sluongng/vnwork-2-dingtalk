import axios from "axios";

class FuncCompCredentials {
    public accessKeyId: string;
    public accessKeySecret: string;
    public securityToken: string;
}

class FuncCompFunction {
    public name: string;
    public handler: string;
    public memory: number;
    public timeout: number;
}

class FuncCompService {
    public name: string;
    public logProject: string;
    public logStore: string;
}

class FuncCompContext {
    public requestId: string;
    public region: string;
    public accountId: string;

    public credentials: FuncCompCredentials;
    public function: FuncCompFunction;
    public service: FuncCompService;
}

type IFuncCompCallBack = (error: Error, result?: any) => void;

// Documentation: https://www.alibabacloud.com/help/doc-detail/70140.htm#Timer
class FuncCompEventTimeTrigger {
    public triggerName: string;
    public triggerTime: string;
    public payload: string;
}

export function handler(event: FuncCompEventTimeTrigger, context: FuncCompContext, callback: IFuncCompCallBack): void {

    axios.get("https://www.google.com")
        .then((response) => {
            callback(null, response.status);
        })
        .catch((error) => {
            console.error(error);
            callback(error);
        });
}
