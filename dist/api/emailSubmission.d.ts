import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";
export default class EmailSubmissionAPI extends ExampleAPI {
    get(args: JMAP.GetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.EmailSubmission[]>>>;
    changes(args: JMAP.ChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
    query(args: JMAPMail.EmailSubmissionQueryRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
    queryChanges(args: JMAPMail.EmailSubmissionQueryChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryChangesResponse>>;
    set(args: JMAPMail.EmailSubmissionSetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
}
//# sourceMappingURL=emailSubmission.d.ts.map