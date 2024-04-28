import * as JMAP from "../types/jmap";
import ExampleAPI from "./base";

export default class CoreAPI extends ExampleAPI {
  async echo(args: object) {
    return this.client.request("/jmap", {
      using: [JMAP.Using.core],
      invocation: ["Core/echo", args, "single.Core/echo"],
    });
  }
}
