import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class MailAPI extends BaseAPI {
  /**
   * RFC 8621 (2.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.1
   */
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Mailbox[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/get", args, "single.Mailbox/get"],
    });
  }

  /**
   * RFC 8621 (2.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.2
   */
  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAPMail.MailChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/changes", args, "single.Mailbox/changes"],
    });
  }

  /**
   * RFC 8621 (2.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.3
   */
  async query(args: JMAPMail.MailQueryRequest) {
    return this.client.request<JMAP.QueryResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/query", args, "single.Mailbox/query"],
    });
  }

  /**
   * RFC 8621 (2.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.4
   */
  async queryChanges(args: JMAP.QueryChangesRequest) {
    return this.client.request<JMAP.QueryChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/queryChanges", args, "single.Mailbox/queryChanges"],
    });
  }

  /**
   * RFC 8621 (2.5) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.5
   */
  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAPMail.MailSetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Mailbox/set", args, "single.Mailbox/set"],
    });
  }
}
