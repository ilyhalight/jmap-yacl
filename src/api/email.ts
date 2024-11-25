import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class EmailAPI extends BaseAPI {
  /**
   * RFC 8621 (4.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.2
   */
  async get(args: JMAPMail.EmailGetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Email[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/get", args, "single.Email/get"],
    });
  }

  /**
   * RFC 8621 (4.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.3
   */
  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAP.ChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/changes", args, "single.Email/changes"],
    });
  }

  /**
   * RFC 8621 (4.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.4
   */
  async query(args: JMAPMail.EmailQueryRequest) {
    return this.client.request<JMAP.QueryResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/query", args, "single.Email/query"],
    });
  }

  /**
   * RFC 8621 (4.5) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.5
   */
  async queryChanges(args: JMAPMail.EmailQueryChangesRequest) {
    return this.client.request<JMAP.QueryResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/queryChanges", args, "single.Email/queryChanges"],
    });
  }

  /**
   * RFC 8621 (4.6) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.6
   */
  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/set", args, "single.Email/set"],
    });
  }

  /**
   * RFC 8621 (4.7) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.7
   */
  async copy(args: JMAP.CopyRequest) {
    return this.client.request<JMAP.CopyResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/copy", args, "single.Email/copy"],
    });
  }

  /**
   * RFC 8621 (4.8) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.8
   */
  async import(args: JMAP.CopyRequest) {
    return this.client.request<JMAP.CopyResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/import", args, "single.Email/import"],
    });
  }

  /**
   * RFC 8621 (4.9) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.9
   */
  async parse(args: JMAPMail.EmailParseRequest) {
    return this.client.request<JMAPMail.EmailParseResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/parse", args, "single.Email/parse"],
    });
  }
}
