import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class IdentityAPI extends BaseAPI {
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Identity[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Identity/get", args, "single.Identity/get"],
    });
  }

  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAP.ChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Identity/changes", args, "single.Identity/changes"],
    });
  }

  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Identity/set", args, "single.Identity/set"],
    });
  }
}
