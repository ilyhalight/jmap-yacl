import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class IdentityAPI extends BaseAPI {
  /**
   * RFC 8621 (6.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-6.1
   */
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Identity[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Identity/get", args, "single.Identity/get"],
    });
  }

  /**
   * RFC 8621 (6.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-6.2
   */
  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAP.ChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Identity/changes", args, "single.Identity/changes"],
    });
  }

  /**
   * RFC 8621 (6.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-6.3
   */
  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Identity/set", args, "single.Identity/set"],
    });
  }
}
