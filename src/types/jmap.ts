// RFC 8620 (1.2) - https://datatracker.ietf.org/doc/html/rfc8620#section-1.2
// allowed characters are the ASCII alphanumeric characters ("A-Za-z0-9"), hyphen ("-"), and underscore ("_").
export type Id = string;

// RFC 8620 (1.4) - https://datatracker.ietf.org/doc/html/rfc8620#section-1.4
export type Date = string;

// RFC 8620 (1.4) - https://datatracker.ietf.org/doc/html/rfc8620#section-1.4
export type UTCDate = string;

// RFC 8620 (2) - https://datatracker.ietf.org/doc/html/rfc8620#section-2
export type Account<Capatibility extends string = string> = {
  name: string;
  isPersonal: boolean;
  isReadOnly: boolean;
  accountCapabilities: Record<Capatibility, unknown>;
};

// RFC 8620 (2) - https://datatracker.ietf.org/doc/html/rfc8620#section-2
export type Session<Capatibility extends string = string> = {
  capatibilities: Record<Capatibility, unknown>;
  // "urn:ietf:params:jmap:core": {
  //   maxSizeUpload: int; // uint
  //   maxConcurrentUpload: int; // uint
  //   maxSizeRequest: int; // uint
  //   maxConcurrentRequests: int; // uint
  //   maxCallsInRequest: int; // uint
  //   maxObjectsInGet: int; // uint
  //   maxObjectsInSet: int; // uint
  //   collationAlgorithms: string[];
  // };
  accounts: Id[];
  primaryAccounts: Record<Capatibility, Id>;
  username: string;
  apiUrl: string;
  downloadUrl: string;
  uploadUrl: string;
  eventSourceUrl: string;
  state: string;
};

// RFC 8620 (3.2) - https://datatracker.ietf.org/doc/html/rfc8620#section-3.2
export type Invocation<T = unknown> = [
  name: string,
  arguments: T,
  methodCallId: string,
];

// RFC 8620 (3.3) - https://datatracker.ietf.org/doc/html/rfc8620#section-3.3
export type Request<T = unknown> = {
  using: string[];
  methodCalls: Invocation<T>[];
  createdIds?: Record<Id, Id>;
};

// RFC 8620 (3.4) - https://datatracker.ietf.org/doc/html/rfc8620#section-3.4
export type Response<T = unknown> = {
  methodResponses: Invocation<T>[];
  createdIds?: Record<Id, Id>;
  sessionState: string;
};

// RFC 7807 (3.1) - https://datatracker.ietf.org/doc/html/rfc7807/#section-3.1
export type ProblemDetails = {
  type: string; // about:blank or relative URIs
  status?: number;
  title?: string;
  detail?: string;
  instance?: string;
};

// RFC 8620 (3.6.1) - https://datatracker.ietf.org/doc/html/rfc8620#section-3.6.1
export enum RequestErrorType {
  unknownCapatibility = "urn:ietf:params:jmap:error:unknownCapability",
  notJSON = "urn:ietf:params:jmap:error:notJSON",
  notRequest = "urn:ietf:params:jmap:error:notRequest",
  limit = "urn:ietf:params:jmap:error:limit",
}

// RFC 8620 (3.6.2) - https://datatracker.ietf.org/doc/html/rfc8620#section-3.6.2
export enum MethodErrorType {
  serverUnavailable = "serverUnavailable",
  serverFail = "serverFail",
  serverPartialFail = "serverPartialFail",
  unknownMethod = "unknownMethod",
  invalidArguments = "invalidArguments",
  invalidResultReference = "invalidResultReference",
  forbidden = "forbidden",
  accountNotFound = "accountNotFound",
  accountNotSupportedByMethod = "accountNotSupportedByMethod",
  accountReadOnly = "accountReadOnly",
}

// RFC 8620 (3.7) - https://datatracker.ietf.org/doc/html/rfc8620#section-3.7
export type ResultReference = {
  resultOf: string;
  name: string;
  path: string;
};

// захотелось так
export enum Using {
  core = "urn:ietf:params:jmap:core",
  mail = "urn:ietf:params:jmap:mail",
  submission = "urn:ietf:params:jmap:submission",
  vacationresponse = "urn:ietf:params:jmap:vacationresponse",
}

// RFC 8620 (5.1) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.1
export type GetRequest = {
  accountId: Id;
  ids?: Id[] | null; // If null, then *all* records of the data type are returned, if this is supported for that data type and the number of records does not exceed the "maxObjectsInGet" limit.
  properties?: string[] | null; // If null, return all props
};

// RFC 8620 (5.1) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.1
// can return error requestTooLarge
export type GetResponse<T = unknown> = {
  accountId: Id;
  state: string;
  list: T[];
  notFound: Id[];
};

// RFC 8620 (5.2) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.2
export type ChangesRequest = {
  accountId: Id;
  sinceState: string; // state from /get response
  maxChanges: number; // uint, > 0
};

// RFC 8620 (5.2) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.2
// can return error cannotCalculateChanges
export type ChangesResponse = {
  accountId: Id;
  oldState: string;
  newState: string;
  hasMoreChanges: boolean; // if false is the current server state else client may call /changes again with newState
  created: Id[];
  updated: Id[];
  destroyed: Id[];
};

// RFC 8620 (5.3) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.3
export type SetRequest = {
  accountId: Id;
  ifInState?: string | null; // state from /get response. If null use current state
  create: Record<Id, any> | null;
  update: Record<Id, any> | null;
  destroy: Id[] | null;
};

// RFC 8620 (5.3) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.3
export type SetError = {
  type: string;
  description: string | null;
  properties: string[] | null;
};

// RFC 8620 (5.3) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.3
// can return error requestTooLarge, stateMismatch
export type SetResponse = {
  accountId: Id;
  oldState: string;
  newState: string;
  created?: Record<Id, any>;
  updated?: Record<Id, any>;
  destroyed?: Id[];
  notCreated?: Record<Id, SetError>;
  notUpdated?: Record<Id, SetError>;
  notDestroyed?: Record<Id, SetError>;
};

// RFC 8620 (5.4) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.4
export type CopyRequest = {
  fromAccountId: Id;
  ifFromInState?: string | null; // state from /get response. If null use current state
  accountId: Id;
  ifInState?: string | null; // state from /get response. If null use current state
  create?: Record<Id, any> | null;
  onSuccessDestroyOriginal?: boolean; // default: false
  destroyFromIfInState?: string | null;
};

// RFC 8620 (5.4) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.4
// can return error alreadyExists, fromAccountNotFound, fromAccountNotSupportedByMethod, stateMismatch
export type CopyResponse = {
  fromAccountId: Id;
  accountId: Id;
  oldState: string | null;
  newState: string;
  created: Record<Id, any> | null;
  notCreated: Record<Id, SetError> | null;
};

// RFC 8620 (5.5) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.5
export type FilterCondition = {};

// RFC 8620 (5.5) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.5
export type FilterOperator = {
  operator: "AND" | "OR" | "NOT";
  conditions: (FilterOperator | FilterCondition)[];
};

// RFC 8620 (5.5) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.5
export type Comparator = {
  property: string;
  isAscending?: boolean; // default: true
  collation?: string;
};

// RFC 8620 (5.5) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.5
export type QueryRequest = {
  accountId: Id;
  filter?: FilterOperator | FilterCondition | null;
  sort?: Comparator[] | null;
  position?: number; // default: 0. Like index in array. Negative values supported
  anchor?: Id | null;
  anchorOffset?: number; // default: 0. Negative values supported
  limit?: number | null; // uint
  calculateTotal?: boolean; // default: false
};

// RFC 8620 (5.5) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.5
// can return error anchorNotFound, unsupportedSort, unsupportedFilter
export type QueryResponse = {
  accountId: Id;
  queryState: string;
  canCalculateChanges: boolean;
  position: number; // uint
  ids: Id[];
  total?: number; // uint
  limit?: number; // uint
};

// RFC 8620 (5.6) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.6
export type QueryChangesRequest = {
  accountId: Id;
  filter?: FilterOperator | FilterCondition | null;
  sort?: Comparator[] | null;
  sinceQueryState: string;
  maxChanges?: number | null; // uint
  upToId?: Id | null;
  calculateTotal?: boolean; // default: false
};

// RFC 8620 (5.6) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.6
export type AddedItem = {
  id: Id;
  index: number; // uint
};

// RFC 8620 (5.6) - https://datatracker.ietf.org/doc/html/rfc8620#section-5.6
// can return error tooManyChanges, cannotCalculateChanges
export type QueryChangesResponse = {
  accountId: Id;
  oldQueryState: string;
  newQueryState: string;
  total?: number; // uint
  removed: Id[];
  added: AddedItem[];
};

// RFC 8620 (6.1) - https://datatracker.ietf.org/doc/html/rfc8620#section-6.1
export type UploadingBlobResponse = {
  accountId: Id;
  blobId: Id;
  type: string;
  size: number; // uint
};

// RFC 8620 (6.2) - https://datatracker.ietf.org/doc/html/rfc8620#section-6.2
export type DownloadingBlobResponse = {
  accountId: Id;
  blobId: Id;
  type: string;
  name: string;
};

// RFC 8620 (6.3) - https://datatracker.ietf.org/doc/html/rfc8620#section-6.3
export type CopyBlobRequest = {
  fromAccountId: Id;
  accountId: Id;
  blobIds: Id[];
};

// RFC 8620 (6.3) - https://datatracker.ietf.org/doc/html/rfc8620#section-6.3
// can return error fromAccountNotFound
export type CopyBlobResponse = {
  fromAccountId: Id;
  accountId: Id;
  copied: Record<Id, Id> | null;
  notCopied: Record<Id, SetError> | null;
};
