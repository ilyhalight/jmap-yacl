import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";
export default class SearchSnippetAPI extends BaseAPI {
    get(args: JMAPMail.SearchSnippetGetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.SearchSnippetGetResponse>>;
}
//# sourceMappingURL=searchSnippet.d.ts.map