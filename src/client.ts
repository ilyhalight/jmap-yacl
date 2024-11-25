import type { Credentials } from "./types/client";
import { version } from "../package.json";
import * as JMAP from "./types/jmap";
import CoreAPI from "./api/core";
import MailBoxAPI from "./api/mailbox";
import ThreadAPI from "./api/thread";
import EmailAPI from "./api/email";
import SearchSnippetAPI from "./api/searchSnippet";
import IdentityAPI from "./api/identity";
import VacationResponseAPI from "./api/vacationResponse";
import EmailSubmissionAPI from "./api/emailSubmission";
import BlobAPI from "./api/blob";

type RequestOpts = {
  using: JMAP.Using[];
  invocation: JMAP.Invocation;
};

export default class JMAPClient {
  static userAgent = `jmap-yacl/${version}`;

  readonly authToken: string;
  session!: JMAP.Session;

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
    const isAbsolute = url.startsWith("http");
    const reqURL = new URL(isAbsolute ? url : this.session.apiUrl + url);
    // RFC 8620 (1.7) - https://datatracker.ietf.org/doc/html/rfc8620#section-1.7
    reqURL.protocol = "https:";

    const response = await fetch(reqURL.href, {
      method: isAbsolute ? "GET" : "POST",
      ...(isAbsolute || opts === undefined
        ? {}
        : {
            body: JSON.stringify({
              methodCalls: [opts.invocation],
              using: opts.using,
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
      throw new Error(
        `Failed to get session from url, because: ${(err as Error).message}`,
      );
    }

    this.updateAPI();
    return this;
  }
}
