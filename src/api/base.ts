import type JMAPClient from "../client";

export default class BaseAPI {
  constructor(protected client: JMAPClient) {}
}
