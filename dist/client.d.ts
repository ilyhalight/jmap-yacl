import type { Credentials } from "./types/client";
import * as JMAP from "./types/jmap";
import CoreAPI from "./api/core";
import MailBoxAPI from "./api/mailbox";
import ThreadAPI from "./api/thread";
import EmailAPI from "./api/email";
import SearchSnippetAPI from "./api/searchSnippet";
import IdentityAPI from "./api/identity";
import VacationResponseAPI from "./api/VacationResponse";
import EmailSubmissionAPI from "./api/emailSubmission";
type RequestOpts = {
    using: JMAP.Using[];
    invocation: JMAP.Invocation;
};
export default class JMAPClient {
    static userAgent: string;
    private authToken;
    session: JMAP.Session | undefined;
    core: CoreAPI;
    mailbox: MailBoxAPI;
    thread: ThreadAPI;
    email: EmailAPI;
    searchSnippet: SearchSnippetAPI;
    identity: IdentityAPI;
    emailSubmission: EmailSubmissionAPI;
    vacationResponse: VacationResponseAPI;
    private getAuthToken;
    constructor(credentials: Credentials);
    request<T = unknown>(url: string, opts?: RequestOpts | undefined): Promise<JMAP.Response<JMAP.ProblemDetails | T>>;
    connect(url: string): Promise<this>;
    downloadBlob(accountId: JMAP.Id, blobId: JMAP.Id, contentType: string): Promise<string | JMAP.ProblemDetails>;
}
export {};
//# sourceMappingURL=client.d.ts.map