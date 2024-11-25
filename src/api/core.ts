import * as JMAP from "../types/jmap";
import BaseAPI from "./base";

export default class CoreAPI extends BaseAPI {
  /**
   * RFC 8621 (4) - https://datatracker.ietf.org/doc/html/rfc8620#section-4
   */
  async echo(args: Record<string, unknown>) {
    return this.client.request("/jmap", {
      using: [JMAP.Using.core],
      invocation: ["Core/echo", args, "single.Core/echo"],
    });
  }
}
