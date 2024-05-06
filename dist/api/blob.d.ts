import JMAPClient from "../client";
import * as JMAP from "../types/jmap";
import BaseAPI from "./base";
export default class BlobAPI extends BaseAPI {
    protected client: JMAPClient;
    protected session: JMAP.Session | undefined;
    constructor(client: JMAPClient);
    download(accountId: JMAP.Id, blobId: JMAP.Id, contentType: string): Promise<string | JMAP.ProblemDetails>;
    upload(accountId: JMAP.Id, content: any): Promise<JMAP.ProblemDetails | JMAP.UploadingBlobResponse>;
    copy(args: JMAP.CopyBlobRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.CopyBlobResponse>>;
}
//# sourceMappingURL=blob.d.ts.map