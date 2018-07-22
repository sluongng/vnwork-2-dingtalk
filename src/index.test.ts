import { handler } from "./index";

// Overloading a fake callback
function mockCallBack(input: Error, msg?: any): void {
    if (msg === undefined) {
        console.error(input.message);
    } else {
        console.log(msg);
    }
}

handler(null, null, mockCallBack);
