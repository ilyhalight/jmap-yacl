import JMAPClient from "../client";
import * as JMAP from "../types/jmap";
import BaseAPI from "./base";

export default class BlobAPI extends BaseAPI {
  protected session: JMAP.Session | undefined;
  constructor(protected client: JMAPClient) {
    super(client);
    this.session = client.session;
  }

  /**
   * RFC 8620 (6.2) - https://datatracker.ietf.org/doc/html/rfc8620#section-6.2
   */
  async download(accountId: JMAP.Id, blobId: JMAP.Id, contentType: string) {
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
          Authorization: this.client.authToken,
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

    return res.arrayBuffer();
  }

  /**
   * RFC 8620 (6.1) - https://datatracker.ietf.org/doc/html/rfc8620#section-6.1
   */
  async upload(accountId: JMAP.Id, content: Blob) {
    if (!this.session?.uploadUrl) {
      return {
        type: "Unauthorized",
        description:
          "The link to upload the blob isn't available because you are unauthorized",
      } as JMAP.ProblemDetails;
    }

    const res = await fetch(
      this.session?.uploadUrl
        .replace("http://", "https://")
        .replace("{accountId}", accountId),
      {
        method: "POST",
        body: content,
        headers: {
          Authorization: this.client.authToken,
          "User-Agent": JMAPClient.userAgent,
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    );

    return (await res.json()) as
      | JMAP.ProblemDetails
      | JMAP.UploadingBlobResponse;
  }

  /**
   * RFC 8620 (6.3) - https://datatracker.ietf.org/doc/html/rfc8620#section-6.3
   */
  async copy(args: JMAP.CopyBlobRequest) {
    return this.client.request<JMAP.CopyBlobResponse>("/jmap", {
      using: [JMAP.Using.mail],
      invocation: ["Blob/copy", args, "single.Blob/copy"],
    });
  }
}
