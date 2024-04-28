declare type Account<Capatibility extends string = string> = {
  name: string;
  isPersonal: boolean;
  isReadOnly: boolean;
  accountCapabilities: Record<Capatibility, unknown>;
};

declare type AddedItem = {
  id: Id;
  index: number;
};

declare type Address = {
  email: string;
  parameters: Record<string, unknown> | null;
};

declare type ChangesRequest = {
  accountId: Id;
  sinceState: string;
  maxChanges: number;
};

declare type ChangesResponse = {
  accountId: Id;
  oldState: string;
  newState: string;
  hasMoreChanges: boolean;
  created: Id[];
  updated: Id[];
  destroyed: Id[];
};

declare type Comparator = {
  property: string;
  isAscending?: boolean;
  collation?: string;
};

declare type CopyBlobRequest = {
  fromAccountId: Id;
  accountId: Id;
  blobIds: Id[];
};

declare type CopyBlobResponse = {
  fromAccountId: Id;
  accountId: Id;
  copied: Record<Id, Id> | null;
  notCopied: Record<Id, SetError> | null;
};

declare type CopyRequest = {
  fromAccountId: Id;
  ifFromInState?: string | null;
  accountId: Id;
  ifInState?: string | null;
  create?: Record<Id, any> | null;
  onSuccessDestroyOriginal?: boolean;
  destroyFromIfInState?: string | null;
};

declare type CopyResponse = {
  fromAccountId: Id;
  accountId: Id;
  oldState: string | null;
  newState: string;
  created: Record<Id, any> | null;
  notCreated: Record<Id, SetError> | null;
};

declare class CoreAPI extends ExampleAPI {
  echo(args: object): Promise<JMAP.Response<unknown>>;
}

declare type Credentials = {
  username: string;
  password: string;
};

declare type Date_2 = string;

declare type DeliveryStatus = {
  smtpReply: string;
  delivered: "queued" | "yes" | "no" | "unknown";
  displayed: "unknown" | "yes";
};

declare type DownloadingBlobResponse = {
  accountId: Id;
  blobId: Id;
  type: string;
  name: string;
};

declare type Email = EmailMetadataFields & EmailHeaderFields & EmailBodyPart;

declare type EmailAddress = {
  name: string | null;
  email: string;
};

declare type EmailAddressGroup = {
  name: string | null;
  addresses: EmailAddress[];
};

declare class EmailAPI extends ExampleAPI {
  get(
    args: JMAPMail.EmailGetRequest,
  ): Promise<
    JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Email[]>>
  >;
  changes(
    args: JMAP.ChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
  query(
    args: JMAPMail.EmailQueryRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
  queryChanges(
    args: JMAPMail.EmailQueryChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
  set(
    args: JMAP.SetRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
  copy(
    args: JMAP.CopyRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.CopyResponse>>;
  import(
    args: JMAP.CopyRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.CopyResponse>>;
  parse(
    args: JMAPMail.EmailParseRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.EmailParseResponse>>;
}

declare type EmailBodyPart = {
  bodyStructure?: EmailBodyPartFields;
  bodyValues: Record<string, EmailBodyValue>;
  textBody: EmailBodyPartFields[];
  htmlBody: EmailBodyPartFields[];
  attachments: EmailBodyPartFields[];
  hasAttachment: boolean;
  preview: string;
};

declare type EmailBodyPartFields = {
  partId?: string | null;
  blobId?: JMAP.Id | null;
  size?: number;
  headers?: EmailHeader[];
  name?: string | null;
  type?: string;
  charset?: string | null;
  disposition?: string | null;
  cid?: string | null;
  language?: string[] | null;
  location?: string | null;
  subParts?: EmailBodyPartFields[] | null;
};

declare type EmailBodyValue = {
  value: string;
  isEncodingProblem: boolean;
  isTruncated: boolean;
};

declare type EmailFilterCondition = {
  inMailBox?: JMAP.Id;
  inMailboxOtherThan?: JMAP.Id[];
  before?: JMAP.UTCDate;
  after?: JMAP.UTCDate;
  minSize?: number;
  maxSize?: number;
  allInThreadHaveKeyword?: string;
  someInThreadHaveKeyword?: string;
  noneInThreadHaveKeyword?: string;
  hasKeyword?: string;
  notKeyword?: string;
  hasAttachment?: boolean;
  text?: string;
  from?: string;
  to?: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  body?: string;
  header?: string[];
};

declare interface EmailGetRequest extends JMAP.GetRequest {
  bodyProperties?: (keyof EmailBodyPartFields)[];
  fetchTextBodyValues?: boolean;
  fetchHTMLBodyValues?: boolean;
  fetchAllBodyValues?: boolean;
  maxBodyValueBytes?: number;
  properties?: (keyof Email)[] | null;
}

declare type EmailHeader = {
  name: string;
  value: string;
};

declare type EmailHeaderFields = {
  headers?: EmailHeader[];
  messageId: string[] | null;
  inReplyTo: string[] | null;
  references: string[] | null;
  sender: EmailAddress[] | null;
  from: EmailAddress[] | null;
  to: EmailAddress[] | null;
  cc: EmailAddress[] | null;
  bcc: EmailAddress[] | null;
  replyTo: EmailAddress[] | null;
  subject: string | null;
  sentAt: JMAP.Date | null;
};

declare type EmailImport = {
  blobId: JMAP.Id;
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>;
  receivedAt: JMAP.UTCDate;
};

declare type EmailImportRequest = {
  accountId: JMAP.Id;
  ifInState?: string | null;
  emails: Record<JMAP.Id, EmailImport>;
};

declare type EmailImportResponse = {
  accountId: JMAP.Id;
  oldState: string | null;
  newState: string;
  created: Record<JMAP.Id, EmailImport> | null;
  notCreated: Record<JMAP.Id, JMAP.SetError> | null;
};

declare type EmailMetadataFields = {
  id: JMAP.Id;
  blobId: JMAP.Id;
  threadId: JMAP.Id;
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>;
  size: number;
  receivedAt: JMAP.UTCDate;
};

declare type EmailParseRequest = {
  accountId: JMAP.Id;
  blobIds: JMAP.Id[];
  properties?: (keyof Email)[] | null;
  bodyProperties?: string[] | null;
  fetchTextBodyValues?: boolean;
  fetchHTMLBodyValues?: boolean;
  fetchAllBodyValues?: boolean;
  maxBodyValueBytes?: number;
};

declare type EmailParseResponse = {
  accountId: JMAP.Id;
  parsed: Record<JMAP.Id, Email> | null;
  notParsable: JMAP.Id[] | null;
  notFound: JMAP.Id[] | null;
};

declare interface EmailQueryChangesRequest extends JMAP.QueryChangesRequest {
  collapseThreads?: boolean;
}

declare interface EmailQueryRequest extends JMAP.QueryRequest {
  collapseThreads?: boolean;
  filter?: JMAP.FilterOperator | EmailFilterCondition | null;
}

declare interface EmailSetRequest extends JMAP.SetRequest {
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>;
  receivedAt: JMAP.UTCDate;
}

declare type EmailSubmission = {
  id: JMAP.Id;
  identityId: JMAP.Id;
  emailId: JMAP.Id;
  threadId: JMAP.Id;
  envelope: Envelope | null;
  sendAt: JMAP.UTCDate;
  undoStatus: UndoStatus;
  deliveryStatus: Record<string, DeliveryStatus> | null;
  dsnBlobIds: JMAP.Id[];
  mdnBlobIds: JMAP.Id[];
};

declare class EmailSubmissionAPI extends ExampleAPI {
  get(
    args: JMAP.GetRequest,
  ): Promise<
    JMAP.Response<
      JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.EmailSubmission[]>
    >
  >;
  changes(
    args: JMAP.ChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
  query(
    args: JMAPMail.EmailSubmissionQueryRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
  queryChanges(
    args: JMAPMail.EmailSubmissionQueryChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryChangesResponse>>;
  set(
    args: JMAPMail.EmailSubmissionSetRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
}

declare type EmailSubmissionFilterCondition = {
  identityIds: JMAP.Id[];
  emailIds: JMAP.Id[];
  threadIds: JMAP.Id[];
  undoStatus: UndoStatus;
  before: JMAP.UTCDate;
  after: JMAP.UTCDate;
};

declare interface EmailSubmissionQueryChangesRequest
  extends JMAP.QueryChangesRequest {
  filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}

declare interface EmailSubmissionQueryRequest extends JMAP.QueryRequest {
  filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}

declare interface EmailSubmissionSetRequest extends JMAP.SetRequest {
  onSuccessUpdateEmail?: Record<JMAP.Id, unknown> | null;
  onSuccessDestroyEmail?: JMAP.Id | null;
}

declare type Envelope = {
  mailFrom: Address;
  rcptTo: Address[];
};

declare class ExampleAPI {
  protected client: JMAPClient;
  constructor(client: JMAPClient);
}

declare type FilterCondition = {};

declare type FilterOperator = {
  operator: "AND" | "OR" | "NOT";
  conditions: (FilterOperator | FilterCondition)[];
};

declare type ForbiddenKeywordChars =
  | "("
  | ")"
  | "{"
  | "]"
  | "%"
  | "*"
  | '"'
  | "\\";

declare type GetRequest = {
  accountId: Id;
  ids?: Id[] | null;
  properties?: string[] | null;
};

declare type GetResponse<T = unknown> = {
  accountId: Id;
  state: string;
  list: T[];
  notFound: Id[];
};

declare type HeaderParsedForms = {
  Raw: string;
  Text: string;
  Addresses: EmailAddress[];
  GroupedAddresses: EmailAddressGroup[];
  MessageIds: string[] | null;
  Date: Date | null;
  URLs: string[] | null;
};

declare type Id = string;

declare type Identity = {
  id: JMAP.Id;
  name: string;
  email: string;
  replyTo: EmailAddress[] | null;
  bcc: EmailAddress[] | null;
  textSignature: string | null;
  htmlSignature: string | null;
  mayDelete: boolean;
};

declare class IdentityAPI extends ExampleAPI {
  get(
    args: JMAP.GetRequest,
  ): Promise<
    JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Identity[]>>
  >;
  changes(
    args: JMAP.ChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
  set(
    args: JMAP.SetRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
}

declare type Invocation<T = unknown> = [
  name: string,
  arguments: T,
  methodCallId: string,
];

declare namespace JMAP {
  export {
    Id,
    Date_2 as Date,
    UTCDate,
    Account,
    Session,
    Invocation,
    Request_2 as Request,
    Response_2 as Response,
    ProblemDetails,
    RequestErrorType,
    MethodErrorType,
    ResultReference,
    Using,
    GetRequest,
    GetResponse,
    ChangesRequest,
    ChangesResponse,
    SetRequest,
    SetError,
    SetResponse,
    CopyRequest,
    CopyResponse,
    FilterCondition,
    FilterOperator,
    Comparator,
    QueryRequest,
    QueryResponse,
    QueryChangesRequest,
    AddedItem,
    QueryChangesResponse,
    UploadingBlobResponse,
    DownloadingBlobResponse,
    CopyBlobRequest,
    CopyBlobResponse,
  };
}

declare class JMAPClient {
  static userAgent: string;
  private authToken;
  session: JMAP.Session | undefined;
  core: CoreAPI;
  mailbox: MailAPI;
  thread: ThreadAPI;
  email: EmailAPI;
  searchSnippet: SearchSnippetAPI;
  identity: IdentityAPI;
  emailSubmission: EmailSubmissionAPI;
  vacationResponse: VacationResponseAPI;
  private getAuthToken;
  constructor(credentials: Credentials);
  request<T = unknown>(
    url: string,
    opts?: RequestOpts | undefined,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | T>>;
  connect(url: string): Promise<this>;
}
export default JMAPClient;

declare namespace JMAPMail {
  export {
    MailboxRights,
    MailboxRole,
    Mailbox,
    MailChangesResponse,
    MailFilterCondition,
    MailQueryRequest,
    MailSetResponse,
    Thread,
    ForbiddenKeywordChars,
    EmailMetadataFields,
    EmailAddress,
    EmailAddressGroup,
    HeaderParsedForms,
    EmailHeader,
    EmailHeaderFields,
    EmailBodyValue,
    EmailBodyPartFields,
    EmailBodyPart,
    Email,
    EmailGetRequest,
    EmailFilterCondition,
    EmailQueryRequest,
    EmailQueryChangesRequest,
    EmailSetRequest,
    EmailImport,
    EmailImportRequest,
    EmailImportResponse,
    EmailParseRequest,
    EmailParseResponse,
    SearchSnippet,
    SearchSnippetGetRequest,
    SearchSnippetGetResponse,
    Identity,
    Address,
    Envelope,
    UndoStatus,
    DeliveryStatus,
    EmailSubmission,
    EmailSubmissionFilterCondition,
    EmailSubmissionQueryRequest,
    EmailSubmissionQueryChangesRequest,
    EmailSubmissionSetRequest,
    VacationResponse,
  };
}

declare class MailAPI extends ExampleAPI {
  get(
    args: JMAP.GetRequest,
  ): Promise<
    JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Mailbox[]>>
  >;
  changes(
    args: JMAP.ChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.MailChangesResponse>>;
  query(
    args: JMAPMail.MailQueryRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryResponse>>;
  queryChanges(
    args: JMAP.QueryChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.QueryChangesResponse>>;
  set(
    args: JMAP.SetRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAPMail.MailSetResponse>>;
}

declare type Mailbox = {
  id: JMAP.Id;
  name: string;
  parentId: JMAP.Id | null;
  role: MailboxRole;
  sortOrder?: number;
  totalEmails: number;
  unreadEmails: number;
  totalThreads: number;
  unreadThreads: number;
  myRights: MailboxRights;
  isSubscribed: boolean;
};

declare type MailboxRights = {
  mayReadItems: boolean;
  mayAddItems: boolean;
  maySetSeen: boolean;
  maySetKeywords: boolean;
  mayCreateChild: boolean;
  mayRename: boolean;
  mayDelete: boolean;
  maySubmit: boolean;
};

declare type MailboxRole =
  | null
  | "all"
  | "archive"
  | "drafts"
  | "flagged"
  | "important"
  | "inbox"
  | "junk"
  | "sent"
  | "subcribed"
  | "trash";

declare interface MailChangesResponse extends JMAP.ChangesResponse {
  updatedProperties: string[] | null;
}

declare type MailFilterCondition = {
  parentId: JMAP.Id | null;
  name: string;
  role: MailboxRole;
  hasAnyRole: boolean;
  isSubscribed: boolean;
};

declare interface MailQueryRequest extends JMAP.QueryRequest {
  sortAsTree?: boolean;
  filterAsTree?: boolean;
  filter?: JMAP.FilterOperator | MailFilterCondition;
}

declare interface MailSetResponse extends JMAP.SetResponse {
  onDestroyRemoveEmails: boolean;
}

declare enum MethodErrorType {
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

declare type ProblemDetails = {
  type: string;
  status?: number;
  title?: string;
  detail?: string;
  instance?: string;
};

declare type QueryChangesRequest = {
  accountId: Id;
  filter?: FilterOperator | FilterCondition | null;
  sort?: Comparator[] | null;
  sinceQueryState: string;
  maxChanges?: number | null;
  upToId?: Id | null;
  calculateTotal?: boolean;
};

declare type QueryChangesResponse = {
  accountId: Id;
  oldQueryState: string;
  newQueryState: string;
  total?: number;
  removed: Id[];
  added: AddedItem[];
};

declare type QueryRequest = {
  accountId: Id;
  filter?: FilterOperator | FilterCondition | null;
  sort?: Comparator[] | null;
  position?: number;
  anchor?: Id | null;
  anchorOffset?: number;
  limit?: number | null;
  calculateTotal?: boolean;
};

declare type QueryResponse = {
  accountId: Id;
  queryState: string;
  canCalculateChanges: boolean;
  position: number;
  ids: Id[];
  total?: number;
  limit?: number;
};

declare type Request_2<T = unknown> = {
  using: string[];
  methodCalls: Invocation<T>[];
  createdIds?: Record<Id, Id>;
};

declare enum RequestErrorType {
  unknownCapatibility = "urn:ietf:params:jmap:error:unknownCapability",
  notJSON = "urn:ietf:params:jmap:error:notJSON",
  notRequest = "urn:ietf:params:jmap:error:notRequest",
  limit = "urn:ietf:params:jmap:error:limit",
}

declare type RequestOpts = {
  using: JMAP.Using[];
  invocation: JMAP.Invocation;
};

declare type Response_2<T = unknown> = {
  methodResponses: Invocation<T>[];
  createdIds?: Record<Id, Id>;
  sessionState: string;
};

declare type ResultReference = {
  resultOf: string;
  name: string;
  path: string;
};

declare type SearchSnippet = {
  emailId: JMAP.Id;
  subject: string | null;
  preview: string | null;
};

declare class SearchSnippetAPI extends ExampleAPI {
  get(
    args: JMAPMail.SearchSnippetGetRequest,
  ): Promise<
    JMAP.Response<JMAP.ProblemDetails | JMAPMail.SearchSnippetGetResponse>
  >;
}

declare type SearchSnippetGetRequest = {
  accountId: JMAP.Id;
  filter: JMAP.FilterOperator | EmailFilterCondition | null;
  emailIds: JMAP.Id[];
};

declare type SearchSnippetGetResponse = {
  accountId: JMAP.Id;
  list: SearchSnippet[];
  notFound: JMAP.Id[] | null;
};

declare type Session<Capatibility extends string = string> = {
  capatibilities: Record<Capatibility, unknown>;
  accounts: Id[];
  primaryAccounts: Record<Capatibility, Id>;
  username: string;
  apiUrl: string;
  downloadUrl: string;
  uploadUrl: string;
  eventSourceUrl: string;
  state: string;
};

declare type SetError = {
  type: string;
  description: string | null;
  properties: string[] | null;
};

declare type SetRequest = {
  accountId: Id;
  ifInState?: string | null;
  create: Record<Id, any> | null;
  update: Record<Id, any> | null;
  destroy: Id[] | null;
};

declare type SetResponse = {
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

declare type Thread = {
  id: JMAP.Id;
  emailIds: JMAP.Id[];
};

declare class ThreadAPI extends ExampleAPI {
  get(
    args: JMAP.GetRequest,
  ): Promise<
    JMAP.Response<JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.Thread[]>>
  >;
  changes(
    args: JMAP.ChangesRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.ChangesResponse>>;
}

declare type UndoStatus = "pending" | "final" | "canceled";

declare type UploadingBlobResponse = {
  accountId: Id;
  blobId: Id;
  type: string;
  size: number;
};

declare enum Using {
  core = "urn:ietf:params:jmap:core",
  mail = "urn:ietf:params:jmap:mail",
  submission = "urn:ietf:params:jmap:submission",
  vacationresponse = "urn:ietf:params:jmap:vacationresponse",
}

declare type UTCDate = string;

declare type VacationResponse = {
  id: JMAP.Id;
  isEnabled: boolean;
  fromDate: JMAP.UTCDate | null;
  toDate: JMAP.UTCDate | null;
  subject: string | null;
  textBody: string | null;
  htmlBody: string | null;
};

declare class VacationResponseAPI extends ExampleAPI {
  get(
    args: JMAP.GetRequest,
  ): Promise<
    JMAP.Response<
      JMAP.ProblemDetails | JMAP.GetResponse<JMAPMail.VacationResponse>
    >
  >;
  set(
    args: JMAP.SetRequest,
  ): Promise<JMAP.Response<JMAP.ProblemDetails | JMAP.SetResponse>>;
}

export {};
