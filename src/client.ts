import type { Credentials } from "./types/client";
import { version } from "../package.json";
import * as JMAP from "./types/jmap";
import CoreAPI from "./api/core";
import MailBoxAPI from "./api/mailbox";
import ThreadAPI from "./api/thread";
import EmailAPI from "./api/email";
import SearchSnippetAPI from "./api/searchSnippet";
import IdentityAPI from "./api/identity";
import VacationResponseAPI from "./api/VacationResponse";
import EmailSubmissionAPI from "./api/emailSubmission";
import BlobAPI from "./api/blob";

type RequestOpts = {
  using: JMAP.Using[];
  invocation: JMAP.Invocation;
};

export default class JMAPClient {
  static userAgent: string = `jmap-yacl/${version}`;

  readonly authToken: string;
  session: JMAP.Session | undefined;

  core!: CoreAPI;
  mailbox!: MailBoxAPI;
  thread!: ThreadAPI;
  email!: EmailAPI;
  searchSnippet!: SearchSnippetAPI;
  identity!: IdentityAPI;
  emailSubmission!: EmailSubmissionAPI;
  vacationResponse!: VacationResponseAPI;
  blob!: BlobAPI;

  private getAuthToken(credentials: Credentials): string {
    const token = btoa(`${credentials.username}:${credentials.password}`);
    return `Basic ${token}`;
  }

  constructor(credentials: Credentials) {
    this.authToken = this.getAuthToken(credentials);

    this.updateAPI();
  }

  updateAPI() {
    this.core = new CoreAPI(this);
    this.mailbox = new MailBoxAPI(this);
    this.thread = new ThreadAPI(this);
    this.email = new EmailAPI(this);
    this.searchSnippet = new SearchSnippetAPI(this);
    this.identity = new IdentityAPI(this);
    this.emailSubmission = new EmailSubmissionAPI(this);
    this.vacationResponse = new VacationResponseAPI(this);
    this.blob = new BlobAPI(this);
  }

  async request<T = unknown>(
    url: string,
    opts: RequestOpts | undefined = undefined,
  ) {
    const isAbsolute =
      url.startsWith("http") || typeof this.session === "undefined";
    const reqURL = new URL(
      isAbsolute ? url : (this.session as JMAP.Session).apiUrl + url,
    );
    reqURL.protocol = "https:"; // RFC 8620 (1.7) - https://datatracker.ietf.org/doc/html/rfc8620#section-1.7

    const response = await fetch(reqURL.href, {
      method: isAbsolute ? "GET" : "POST",
      ...(isAbsolute && !opts
        ? {}
        : {
            body: JSON.stringify({
              methodCalls: [(opts as RequestOpts).invocation],
              using: (opts as RequestOpts).using,
            }),
          }),
      headers: {
        Authorization: this.authToken,
        "Content-Type": "application/json",
        "User-Agent": JMAPClient.userAgent,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
    return (await response.json()) as JMAP.Response<JMAP.ProblemDetails | T>;
  }

  async connect(url: string) {
    try {
      const result = (await this.request(url, undefined)) as unknown as
        | JMAP.ProblemDetails
        | JMAP.Session;
      if (Object.hasOwn(result, "type")) {
        throw new Error(
          `The server returned an error "${
            (result as JMAP.ProblemDetails)?.title
          }" instead of the session. Details: ${
            (result as JMAP.ProblemDetails)?.detail
          }`,
        );
      }

      this.session = result as JMAP.Session;
    } catch (err) {
      this.session = undefined;
      console.error("Failed get session from url:", err);
    }

    this.updateAPI();
    return this;
  }

  /**
   * @deprecated Migrate to client.blob.download. This method will be removed in a future update.
   */
  async downloadBlob(accountId: JMAP.Id, blobId: JMAP.Id, contentType: string) {
    return await this.blob.download(accountId, blobId, contentType);
  }
}
