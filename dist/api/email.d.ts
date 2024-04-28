import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";
export default class EmailAPI extends ExampleAPI {
    get(args: JMAPMail.EmailGetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Email[]>>>;
    changes(args: JMAP.ChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
    query(args: JMAPMail.EmailQueryRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
    queryChanges(args: JMAPMail.EmailQueryChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
    set(args: JMAP.SetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
    copy(args: JMAP.CopyRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.CopyResponse>>;
    import(args: JMAP.CopyRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.CopyResponse>>;
    parse(args: JMAPMail.EmailParseRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.EmailParseResponse>>;
}
//# sourceMappingURL=email.d.ts.map