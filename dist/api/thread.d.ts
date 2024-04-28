import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";
export default class ThreadAPI extends ExampleAPI {
    get(args: JMAP.GetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Thread[]>>>;
    changes(args: JMAP.ChangesRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
}
//# sourceMappingURL=thread.d.ts.map