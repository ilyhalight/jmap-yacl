import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class EmailAPI extends BaseAPI {
  async get(args: JMAPMail.EmailGetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.Email[]>>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/get", args, "single.Email/get"],
    });
  }

  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAP.ChangesResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/changes", args, "single.Email/changes"],
    });
  }

  async query(args: JMAPMail.EmailQueryRequest) {
    return this.client.request<JMAP.QueryResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/query", args, "single.Email/query"],
    });
  }

  async queryChanges(args: JMAPMail.EmailQueryChangesRequest) {
    return this.client.request<JMAP.QueryResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/queryChanges", args, "single.Email/queryChanges"],
    });
  }

  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/set", args, "single.Email/set"],
    });
  }

  async copy(args: JMAP.CopyRequest) {
    return this.client.request<JMAP.CopyResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/copy", args, "single.Email/copy"],
    });
  }

  async import(args: JMAP.CopyRequest) {
    return this.client.request<JMAP.CopyResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/import", args, "single.Email/import"],
    });
  }

  async parse(args: JMAPMail.EmailParseRequest) {
    return this.client.request<JMAPMail.EmailParseResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Email/parse", args, "single.Email/parse"],
    });
  }
}
