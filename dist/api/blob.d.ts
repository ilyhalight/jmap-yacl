import * as JMAP from "../types/jmap";
import ExampleAPI from "./base";
export default class BlobAPI extends ExampleAPI {
    download(accountId: JMAP.Id, blobId: JMAP.Id, blobType: string): Promise<JMAP.Response<unknown> | {
        type: string;
        description: string;
    }>;
}
//# sourceMappingURL=blob.d.ts.map