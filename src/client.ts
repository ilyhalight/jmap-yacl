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

type RequestOpts = {
  using: JMAP.Using[];
  invocation: JMAP.Invocation;
};

export default class JMAPClient {
  static userAgent: string = `jmap-yacl/${version}`;

  private authToken: string;
  session: JMAP.Session | undefined;

  core: CoreAPI;
  mailbox: MailBoxAPI;
  thread: ThreadAPI;
  email: EmailAPI;
  searchSnippet: SearchSnippetAPI;
  identity: IdentityAPI;
  emailSubmission: EmailSubmissionAPI;
  vacationResponse: VacationResponseAPI;

  private getAuthToken(credentials: Credentials): string {
    const token = btoa(`${credentials.username}:${credentials.password}`);
    return `Basic ${token}`;
  }

  constructor(credentials: Credentials) {
    this.authToken = this.getAuthToken(credentials);

    this.core = new CoreAPI(this);
    this.mailbox = new MailBoxAPI(this);
    this.thread = new ThreadAPI(this);
    this.email = new EmailAPI(this);
    this.searchSnippet = new SearchSnippetAPI(this);
    this.identity = new IdentityAPI(this);
    this.emailSubmission = new EmailSubmissionAPI(this);
    this.vacationResponse = new VacationResponseAPI(this);
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
        "Cache-Control": "no-cache, no-store, must-revalidate", // todo: add if blob download Cache-Control: private, immutable, max-age=31536000
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
      console.error("Failed get session from url:", err);
    }

    return this;
  }

  // it was not done through this.blog.x because it requires unnecessary logic changes
  async downloadBlob(accountId: JMAP.Id, blobId: JMAP.Id, contentType: string) {
    if (!this.session?.downloadUrl) {
      return {
        type: "Unauthorized",
        description:
          "The link to download the blob isn't available because you are unauthorized",
      } as JMAP.ProblemDetails;
    }

    const res = await fetch(
      this.session?.downloadUrl
        .replace("http://", "https://")
        .replace("{accountId}", accountId)
        .replace("{blobId}", blobId)
        .replace("{name}", "blob")
        .replace("{type}", contentType),
      {
        method: "GET",
        headers: {
          Authorization: this.authToken,
          "User-Agent": JMAPClient.userAgent,
          "Cache-Control": "private, immutable, max-age=31536000",
        },
      },
    );

    const resContentType = res.headers.get("content-type") ?? "";
    if (
      ["application/problem+json", "application/json"].includes(resContentType)
    ) {
      return (await res.json()) as JMAP.ProblemDetails;
    }

    return res.text();
  }
}
