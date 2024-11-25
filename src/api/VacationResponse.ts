import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class VacationResponseAPI extends BaseAPI {
  /**
   * RFC 8621 (8.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-8.1
   */
  async get(args: JMAP.GetRequest) {
    return this.client.request<JMAP.GetResponse<JMAPMail.VacationResponse>>(
      "/jmap",
      {
        using: [JMAP.Using.mail, JMAP.Using.vacationresponse],
        invocation: [
          "VacationResponse/get",
          args,
          "single.VacationResponse/get",
        ],
      },
    );
  }

  /**
   * RFC 8621 (8.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-8.2
   */
  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail, JMAP.Using.vacationresponse],
      invocation: ["VacationResponse/set", args, "single.VacationResponse/set"],
    });
  }
}
