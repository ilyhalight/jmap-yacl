import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";
export default class VacationResponseAPI extends BaseAPI {
    get(args: JMAP.GetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.VacationResponse>>>;
    set(args: JMAP.SetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
}
//# sourceMappingURL=VacationResponse.d.ts.map