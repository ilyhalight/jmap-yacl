import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";
export default class MailAPI extends ExampleAPI {
    get(args: JMAP.GetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Mailbox[]>>>;
    changes(args: JMAP.ChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.MailChangesResponse>>;
    query(args: JMAPMail.MailQueryRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
    queryChanges(args: JMAP.QueryChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryChangesResponse>>;
    set(args: JMAP.SetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.MailSetResponse>>;
}
//# sourceMappingURL=mailbox.d.ts.map