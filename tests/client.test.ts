import { expect, test } from "bun:test";
import JMAPClient from "../src/client";
import * as JMAP from "../src/types/jmap";
import * as JMAPMail from "../src/types/mail";

const fakeCreds = {
  username: "username",
  password: "password",
};

const isFake =
  fakeCreds.username === "username" && fakeCreds.password === "password";

const jmapUrl = "https://YOURDOMAIN/.well-known/jmap";

test("Check token algo", async () => {
  const client = new JMAPClient({
    username: "username",
    password: "password",
  });

  expect((client as any).authToken).toBe("Basic dXNlcm5hbWU6cGFzc3dvcmQ=");
});

test.if(!isFake)("Check connect", async () => {
  const client = new JMAPClient(fakeCreds);

  await client.connect(jmapUrl);

  const req = {
    test: "hello from jmap-yacl",
  };

  const res = await client.core.echo(req);

  expect((res as JMAP.Response).methodResponses).toEqual([
    ["Core/echo", { payload: req }, "single.Core/echo"],
  ]);
});

test.if(!isFake)("Get identify", async () => {
  const client = new JMAPClient(fakeCreds);

  await client.connect(jmapUrl);

  const req = {
    accountId: (client.session as JMAP.Session).primaryAccounts[
      JMAP.Using.core
    ],
  };

  const res = await client.identity.get(req);

  const data = res.methodResponses[0][1];

  expect(
    ((data as JMAP.GetResponse).list[0] as JMAPMail.Identity).name,
  ).toEqual("Toil");
});
