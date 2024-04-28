import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";
export default class SearchSnippetAPI extends ExampleAPI {
    get(args: JMAPMail.SearchSnippetGetRequest): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.SearchSnippetGetResponse>>;
}
//# sourceMappingURL=searchSnippet.d.ts.map