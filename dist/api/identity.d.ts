import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";
export default class IdentityAPI extends ExampleAPI {
    get(args: JMAP.GetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Identity[]>>>;
    changes(args: JMAP.ChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
    set(args: JMAP.SetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
}
//# sourceMappingURL=identity.d.ts.map