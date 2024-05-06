import * as JMAP from "../types/jmap";
import * as JMAPMail from "../types/mail";
import BaseAPI from "./base";

export default class VacationResponseAPI extends BaseAPI {
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

  async set(args: JMAP.SetRequest) {
    return this.client.request<JMAP.SetResponse>("/jmap", {
      using: [JMAP.Using.mail, JMAP.Using.vacationresponse],
      invocation: ["VacationResponse/set", args, "single.VacationResponse/set"],
    });
  }
}
