export class FuncCompCredentials {
    public accessKeyId: string;
    public accessKeySecret: string;
    public securityToken: string;
}

export class FuncCompFunction {
    public name: string;
    public handler: string;
    public memory: number;
    public timeout: number;
}

export class FuncCompService {
    public name: string;
    public logProject: string;
    public logStore: string;
}

export class FuncCompContext {
    public requestId: string;
    public region: string;
    public accountId: string;

    public credentials: FuncCompCredentials;
    public function: FuncCompFunction;
    public service: FuncCompService;
}

export type IFuncCompCallBack = (error: Error, result?: any) => void;

// Documentation: https://www.alibabacloud.com/help/doc-detail/70140.htm#Timer
export class FuncCompEventTimeTrigger {
    public triggerName: string;
    public triggerTime: string;
    public payload: string;
}
