import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";

export default class ThreadAPI extends ExampleAPI {
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Thread[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Thread/get", args, "single.Thread/get"],
    });
  }

  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAP.ChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Thread/changes", args, "single.Thread/changes"],
    });
  }
}
