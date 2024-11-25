import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class SearchSnippetAPI extends BaseAPI {
  /**
   * RFC 8621 (5.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-5.1
   */
  async get(args: JMAPMail.SearchSnippetGetRequest) {
    return this.client.request<JMAPMail.SearchSnippetGetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["SearchSnippet/get", args, "single.SearchSnippet/get"],
    });
  }
}
