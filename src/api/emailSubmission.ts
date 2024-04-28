import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import ExampleAPI from "./base";

export default class EmailSubmissionAPI extends ExampleAPI {
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.EmailSubmission[]>>(
      "/jmap",
      {
        using: [JMAP.Using.mail, JMAP.Using.submission],
        invocation: ["EmailSubmission/get", args, "single.EmailSubmission/get"],
      },
    );
  }

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

  async set(args: JMAPMail.EmailSubmissionSetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail, JMAP.Using.submission],
      invocation: ["EmailSubmission/set", args, "single.EmailSubmission/set"],
    });
  }
}
