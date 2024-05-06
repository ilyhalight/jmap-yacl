import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class SearchSnippetAPI extends BaseAPI {
  async get(args: JMAPMail.SearchSnippetGetRequest) {
    return this.client.request<JMAPMail.SearchSnippetGetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["SearchSnippet/get", args, "single.SearchSnippet/get"],
    });
  }
}
