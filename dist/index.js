var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
// package.json
var version = "1.0.0";

// src/types/jmap.ts
var exports_jmap = {};
__export(exports_jmap, {
  Using: () => {
    {
      return Using;
    }
  },
  RequestErrorType: () => {
    {
      return RequestErrorType;
    }
  },
  MethodErrorType: () => {
    {
      return MethodErrorType;
    }
  }
});
var RequestErrorType;
(function(RequestErrorType2) {
  RequestErrorType2["unknownCapatibility"] = "urn:ietf:params:jmap:error:unknownCapability";
  RequestErrorType2["notJSON"] = "urn:ietf:params:jmap:error:notJSON";
  RequestErrorType2["notRequest"] = "urn:ietf:params:jmap:error:notRequest";
  RequestErrorType2["limit"] = "urn:ietf:params:jmap:error:limit";
})(RequestErrorType || (RequestErrorType = {}));
var MethodErrorType;
(function(MethodErrorType2) {
  MethodErrorType2["serverUnavailable"] = "serverUnavailable";
  MethodErrorType2["serverFail"] = "serverFail";
  MethodErrorType2["serverPartialFail"] = "serverPartialFail";
  MethodErrorType2["unknownMethod"] = "unknownMethod";
  MethodErrorType2["invalidArguments"] = "invalidArguments";
  MethodErrorType2["invalidResultReference"] = "invalidResultReference";
  MethodErrorType2["forbidden"] = "forbidden";
  MethodErrorType2["accountNotFound"] = "accountNotFound";
  MethodErrorType2["accountNotSupportedByMethod"] = "accountNotSupportedByMethod";
  MethodErrorType2["accountReadOnly"] = "accountReadOnly";
})(MethodErrorType || (MethodErrorType = {}));
var Using;
(function(Using2) {
  Using2["core"] = "urn:ietf:params:jmap:core";
  Using2["mail"] = "urn:ietf:params:jmap:mail";
  Using2["submission"] = "urn:ietf:params:jmap:submission";
  Using2["vacationresponse"] = "urn:ietf:params:jmap:vacationresponse";
})(Using || (Using = {}));

// src/api/base.ts
class ExampleAPI {
  client;
  constructor(client) {
    this.client = client;
  }
}

// src/api/core.ts
class CoreAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async echo(args) {
    return this.client.request("/jmap", {
      using: [Using.core],
      invocation: ["Core/echo", args, "single.Core/echo"]
    });
  }
}

// src/api/mailbox.ts
class MailAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async get(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Mailbox/get", args, "single.Mailbox/get"]
    });
  }
  async changes(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Mailbox/changes", args, "single.Mailbox/changes"]
    });
  }
  async query(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Mailbox/query", args, "single.Mailbox/query"]
    });
  }
  async queryChanges(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Mailbox/queryChanges", args, "single.Mailbox/queryChanges"]
    });
  }
  async set(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Mailbox/set", args, "single.Mailbox/set"]
    });
  }
}

// src/api/thread.ts
class ThreadAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async get(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Thread/get", args, "single.Thread/get"]
    });
  }
  async changes(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Thread/changes", args, "single.Thread/changes"]
    });
  }
}

// src/api/email.ts
class EmailAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async get(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/get", args, "single.Email/get"]
    });
  }
  async changes(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/changes", args, "single.Email/changes"]
    });
  }
  async query(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/query", args, "single.Email/query"]
    });
  }
  async queryChanges(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/queryChanges", args, "single.Email/queryChanges"]
    });
  }
  async set(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/set", args, "single.Email/set"]
    });
  }
  async copy(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/copy", args, "single.Email/copy"]
    });
  }
  async import(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/import", args, "single.Email/import"]
    });
  }
  async parse(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Email/parse", args, "single.Email/parse"]
    });
  }
}

// src/api/searchSnippet.ts
class SearchSnippetAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async get(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["SearchSnippet/get", args, "single.SearchSnippet/get"]
    });
  }
}

// src/api/identity.ts
class IdentityAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async get(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Identity/get", args, "single.Identity/get"]
    });
  }
  async changes(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Identity/changes", args, "single.Identity/changes"]
    });
  }
  async set(args) {
    return this.client.request("/jmap", {
      using: [Using.mail],
      invocation: ["Identity/set", args, "single.Identity/set"]
    });
  }
}

// src/api/VacationResponse.ts
class VacationResponseAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async get(args) {
    return this.client.request("/jmap", {
      using: [Using.mail, Using.vacationresponse],
      invocation: [
        "VacationResponse/get",
        args,
        "single.VacationResponse/get"
      ]
    });
  }
  async set(args) {
    return this.client.request("/jmap", {
      using: [Using.mail, Using.vacationresponse],
      invocation: ["VacationResponse/set", args, "single.VacationResponse/set"]
    });
  }
}

// src/api/emailSubmission.ts
class EmailSubmissionAPI extends ExampleAPI {
  constructor() {
    super(...arguments);
  }
  async get(args) {
    return this.client.request("/jmap", {
      using: [Using.mail, Using.submission],
      invocation: ["EmailSubmission/get", args, "single.EmailSubmission/get"]
    });
  }
  async changes(args) {
    return this.client.request("/jmap", {
      using: [Using.mail, Using.submission],
      invocation: [
        "EmailSubmission/changes",
        args,
        "single.EmailSubmission/changes"
      ]
    });
  }
  async query(args) {
    return this.client.request("/jmap", {
      using: [Using.mail, Using.submission],
      invocation: [
        "EmailSubmission/query",
        args,
        "single.EmailSubmission/query"
      ]
    });
  }
  async queryChanges(args) {
    return this.client.request("/jmap", {
      using: [Using.mail, Using.submission],
      invocation: [
        "EmailSubmission/queryChanges",
        args,
        "single.EmailSubmission/queryChanges"
      ]
    });
  }
  async set(args) {
    return this.client.request("/jmap", {
      using: [Using.mail, Using.submission],
      invocation: ["EmailSubmission/set", args, "single.EmailSubmission/set"]
    });
  }
}

// src/client.ts
class JMAPClient {
  static userAgent = `jmap-yacl/${version}`;
  authToken;
  session;
  core;
  mailbox;
  thread;
  email;
  searchSnippet;
  identity;
  emailSubmission;
  vacationResponse;
  getAuthToken(credentials) {
    const token = btoa(`${credentials.username}:${credentials.password}`);
    return `Basic ${token}`;
  }
  constructor(credentials) {
    this.authToken = this.getAuthToken(credentials);
    this.core = new CoreAPI(this);
    this.mailbox = new MailAPI(this);
    this.thread = new ThreadAPI(this);
    this.email = new EmailAPI(this);
    this.searchSnippet = new SearchSnippetAPI(this);
    this.identity = new IdentityAPI(this);
    this.emailSubmission = new EmailSubmissionAPI(this);
    this.vacationResponse = new VacationResponseAPI(this);
  }
  async request(url, opts = undefined) {
    const isAbsolute = url.startsWith("http") || typeof this.session === "undefined";
    const reqURL = new URL(isAbsolute ? url : this.session.apiUrl + url);
    reqURL.protocol = "https:";
    const response = await fetch(reqURL.href, {
      method: isAbsolute ? "GET" : "POST",
      ...isAbsolute && !opts ? {} : {
        body: JSON.stringify({
          methodCalls: [opts.invocation],
          using: opts.using
        })
      },
      headers: {
        Authorization: this.authToken,
        "Content-Type": "application/json",
        "User-Agent": JMAPClient.userAgent,
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
    return await response.json();
  }
  async connect(url) {
    try {
      const result = await this.request(url);
      if (Object.hasOwn(result, "type")) {
        throw new Error(`The server returned an error "${result?.title}" instead of the session. Details: ${result?.detail}`);
      }
      this.session = result;
    } catch (err) {
      console.error("Failed get session from url:", err);
    }
    return this;
  }
}
// src/types/mail.ts
var exports_mail = {};
export {
  JMAPClient as default,
  exports_mail as JMAPMail,
  exports_jmap as JMAP
};
