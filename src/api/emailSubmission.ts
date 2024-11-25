import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class EmailSubmissionAPI extends BaseAPI {
  /**
   * RFC 8621 (7.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.1
   */
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.EmailSubmission[]>>(
      "/jmap",
      {
        using: [JMAP.Using.mail, JMAP.Using.submission],
        invocation: ["EmailSubmission/get", args, "single.EmailSubmission/get"],
      },
    );
  }

  /**
   * RFC 8621 (7.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.2
   */
  async changes(args: JMAP.ChangesRequest) {
    return this.client.request<JMAP.ChangesResponse>("/jmap", {
      using: [JMAP.Using.mail, JMAP.Using.submission],
      invocation: [
        "EmailSubmission/changes",
        args,
        "single.EmailSubmission/changes",
      ],
    });
  }

  /**
   * RFC 8621 (7.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.3
   */
  async query(args: JMAPMail.EmailSubmissionQueryRequest) {
    return this.client.request<JMAP.QueryResponse>("/jmap", {
      using: [JMAP.Using.mail, JMAP.Using.submission],
      invocation: [
        "EmailSubmission/query",
        args,
        "single.EmailSubmission/query",
      ],
    });
  }

  /**
   * RFC 8621 (7.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.4
   */
  async queryChanges(args: JMAPMail.EmailSubmissionQueryChangesRequest) {
    return this.client.request<JMAP.QueryChangesResponse>("/jmap", {
      using: [JMAP.Using.mail, JMAP.Using.submission],
      invocation: [
        "EmailSubmission/queryChanges",
        args,
        "single.EmailSubmission/queryChanges",
      ],
    });
  }

  /**
   * RFC 8621 (7.5) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.5
   */
  async set(args: JMAPMail.EmailSubmissionSetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail, JMAP.Using.submission],
      invocation: ["EmailSubmission/set", args, "single.EmailSubmission/set"],
    });
  }
}
