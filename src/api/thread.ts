import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class ThreadAPI extends BaseAPI {
  /**
   * RFC 8621 (3.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-3.1
   */
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Thread[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Thread/get", args, "single.Thread/get"],
    });
  }

  /**
   * RFC 8621 (3.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-3.2
   */
  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAP.ChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Thread/changes", args, "single.Thread/changes"],
    });
  }
}
