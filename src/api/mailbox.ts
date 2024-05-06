import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class MailAPI extends BaseAPI {
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Mailbox[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/get", args, "single.Mailbox/get"],
    });
  }

  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAPMail.MailChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/changes", args, "single.Mailbox/changes"],
    });
  }

  async query(args: JMAPMail.MailQueryRequest) {
    return this.client.request<JMAP.QueryResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/query", args, "single.Mailbox/query"],
    });
  }

  async queryChanges(args: JMAP.QueryChangesRequest) {
    return this.client.request<JMAP.QueryChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/queryChanges", args, "single.Mailbox/queryChanges"],
    });
  }

  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAPMail.MailSetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/set", args, "single.Mailbox/set"],
    });
  }
}
