import * as JMAP from "./jmap";

export type MailboxRights = {
  mayReadItems: boolean;
  mayAddItems: boolean;
  maySetSeen: boolean;
  maySetKeywords: boolean;
  mayCreateChild: boolean;
  mayRename: boolean;
  mayDelete: boolean;
  maySubmit: boolean;
};

/**
 * https://www.iana.org/assignments/imap-mailbox-name-attributes/imap-mailbox-name-attributes.xhtml
 */
export type MailboxRole =
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

export type Mailbox = {
  id: JMAP.Id;
  /**
   * e.g. Inbox
   */
  name: string;
  parentId: JMAP.Id | null;
  /**
   * e.g. inbox, regardless of the "name" property
   */
  role: MailboxRole;
  /**
   * uint. default 0
   */
  sortOrder?: number;
  /**
   * (server-set)
   */
  totalEmails: number;
  /**
   * uint (server-set)
   */
  unreadEmails: number;
  /**
   * uint (server-set)
   */
  totalThreads: number;
  /**
   * uint (server-set)
   */
  unreadThreads: number;
  /**
   * (server-set)
   */
  myRights: MailboxRights;
  isSubscribed: boolean;
};

/**
 * RFC 8621 (2.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.2
 */
export interface MailChangesResponse extends JMAP.ChangesResponse {
  updatedProperties: string[] | null;
}

/**
 * RFC 8621 (2.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.3
 */
export type MailFilterCondition = {
  parentId: JMAP.Id | null;
  name: string;
  role: MailboxRole;
  hasAnyRole: boolean;
  isSubscribed: boolean;
};

/**
 * RFC 8621 (2.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.3
 */
export interface MailQueryRequest extends JMAP.QueryRequest {
  /**
   * default: false
   */
  sortAsTree?: boolean;
  /**
   * default: false
   */
  filterAsTree?: boolean;
  filter?: JMAP.FilterOperator | MailFilterCondition;
}

/**
 * RFC 8621 (2.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.4
 * extra SetError types for "destroy":
 * - mailboxHasChild
 * - mailboxHasEmail
 */
export interface MailSetResponse extends JMAP.SetResponse {
  /**
   * default: false
   */
  onDestroyRemoveEmails: boolean;
}

/**
 * RFC 8621 (3) - https://datatracker.ietf.org/doc/html/rfc8621#section-3
 */
export type Thread = {
  /**
   * (server-set)
   */
  id: JMAP.Id;
  /**
   * sorted by the "receivedAt" date of the Email, oldest first (server-set)
   */
  emailIds: JMAP.Id[];
};

/**
 * RFC 8621 (4.1.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.1
 */
export type ForbiddenKeywordChars =
  | "("
  | ")"
  | "{"
  | "]"
  | "%"
  | "*"
  | '"'
  | "\\";

/**
 * RFC 8621 (4.1.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.1
 * Possible default keys (user can create your own): $draft, $seen, $flagged, $answered, $forwarded, $phishing, $junk, $notjunk. Value always equal true if key exists
 */
export type Keywords = Record<Exclude<string, ForbiddenKeywordChars>, true>;

/**
 * RFC 8621 (4.1.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.1
 */
export type EmailMetadataFields = {
  /**
   * (server-set)
   */
  id: JMAP.Id;
  /**
   * (server-set)
   */
  blobId: JMAP.Id;
  /**
   * (server-set)
   */
  threadId: JMAP.Id;
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Keywords;
  /**
   * (server-set)
   */
  size: number;
  /**
   * default: time of creation on server
   */
  receivedAt: JMAP.UTCDate;
};

/**
 * RFC 8621 (4.1.2.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.2.3
 */
export type EmailAddress = {
  name: string | null;
  email: string;
};

/**
 * RFC 8621 (4.1.2.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.2.4
 */
export type EmailAddressGroup = {
  name: string | null;
  addresses: EmailAddress[];
};

/**
 * RFC 8621 (4.1.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.2
 */
export type HeaderParsedForms = {
  Raw: string;
  Text: string;
  Addresses: EmailAddress[];
  GroupedAddresses: EmailAddressGroup[];
  MessageIds: string[] | null;
  Date: Date | null;
  URLs: string[] | null;
};

/**
 * RFC 8621 (4.1.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.3
 */
export type EmailHeader = {
  name: string;
  value: string;
};

/**
 * RFC 8621 (4.1.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.3
 */
export type EmailHeaderFields = {
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

/**
 * RFC 8621 (4.1.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.4
 */
export type EmailBodyValue = {
  value: string;
  isEncodingProblem: boolean; // default: false
  isTruncated: boolean; // default: false
};

/**
 * RFC 8621 (4.1.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.4
 */
export type EmailBodyPartFields = {
  partId?: string | null;
  blobId?: JMAP.Id | null;
  /**
   * uint
   */
  size?: number;
  headers?: EmailHeader[];
  name?: string | null;
  /**
   * The value of the Content-Type header field of the part, if present; otherwise, the implicit type as per the MIME standard ("text/plain" or "message/rfc822" if inside a "multipart/digest")
   */
  type?: string;
  /**
   * The value of the charset parameter of the Content-Type header field, if present, or null if the header field is present but not of type "text/*"
   */
  charset?: string | null;
  /**
   * The value of the Content-Disposition header field of the part, if present; otherwise, it's null
   */
  disposition?: string | null;
  /**
   * The value of the Content-Id header field of the part, if present; otherwise, it's null
   */
  cid?: string | null;
  /**
   * The list of language tags in the Content-Language header field of the part, if present
   */
  language?: string[] | null;
  /**
   * The URI in the Content-Location header field of the part, if present
   */
  location?: string | null;
  subParts?: EmailBodyPartFields[] | null;
};

/**
 * RFC 8621 (4.1.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.4
 */
export type EmailBodyPart = {
  bodyStructure?: EmailBodyPartFields;
  bodyValues: Record<string, EmailBodyValue>;
  textBody: EmailBodyPartFields[];
  htmlBody: EmailBodyPartFields[];
  attachments: EmailBodyPartFields[];
  /**
   * (server-set)
   */
  hasAttachment: boolean;
  /**
   * <= 256 chars
   */
  preview: string;
};

/**
 * RFC 8621 (4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4
 */
export type Email = EmailMetadataFields & EmailHeaderFields & EmailBodyPart;

/**
 * RFC 8621 (4.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.2
 */
export interface EmailGetRequest extends JMAP.GetRequest {
  /**
   * Props in textBody and etc. default: [ "partId", "blobId", "size", "name", "type", "charset", "disposition", "cid", "language", "location" ]
   */
  bodyProperties?: (keyof EmailBodyPartFields)[];
  /**
   * default: false
   */
  fetchTextBodyValues?: boolean;
  /**
   * default: false
   */
  fetchHTMLBodyValues?: boolean;
  /**
   * default: false
   */
  fetchAllBodyValues?: boolean;
  /**
   * uint default: 0
   */
  maxBodyValueBytes?: number;
  /**
   * [ "id", "blobId", "threadId", "mailboxIds", "keywords", "size", "receivedAt", "messageId", "inReplyTo", "references", "sender", "from", "to", "cc", "bcc", "replyTo", "subject", "sentAt", "hasAttachment", "preview", "bodyValues", "textBody", "htmlBody", "attachments" ]
   */
  properties?: (keyof Email)[] | null;
}

/**
 * RFC 8621 (4.4.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.4.1
 */
export type EmailFilterCondition = {
  inMailBox?: JMAP.Id;
  inMailboxOtherThan?: JMAP.Id[];
  before?: JMAP.UTCDate;
  after?: JMAP.UTCDate;
  /**
   * uint
   */
  minSize?: number;
  /**
   * uint
   */
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

/**
 * RFC 8621 (4.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.4
 */
export interface EmailQueryRequest extends JMAP.QueryRequest {
  /**
   * default: false
   */
  collapseThreads?: boolean;
  filter?: JMAP.FilterOperator | EmailFilterCondition | null;
}

/**
 * RFC 8621 (4.5) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.5
 */
export interface EmailQueryChangesRequest extends JMAP.QueryChangesRequest {
  /**
   * default: false
   */
  collapseThreads?: boolean;
}

/**
 * RFC 8621 (4.7) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.7
 */
export interface EmailSetRequest extends JMAP.SetRequest {
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Keywords;
  /**
   * default: time of creation on server
   */
  receivedAt: JMAP.UTCDate;
}

/**
 * RFC 8621 (4.8) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.8
 */
export type EmailImport = {
  blobId: JMAP.Id;
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Keywords;
  /**
   * default: time of creation on server
   */
  receivedAt: JMAP.UTCDate;
};

/**
 * RFC 8621 (4.8) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.8
 */
export type EmailImportRequest = {
  accountId: JMAP.Id;
  ifInState?: string | null;
  emails: Record<JMAP.Id, EmailImport>;
};

/**
 * RFC 8621 (4.8) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.8
 */
export type EmailImportResponse = {
  accountId: JMAP.Id;
  oldState: string | null;
  newState: string;
  created: Record<JMAP.Id, EmailImport> | null;
  notCreated: Record<JMAP.Id, JMAP.SetError> | null;
};

/**
 * RFC 8621 (4.9) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.9
 */
export type EmailParseRequest = {
  accountId: JMAP.Id;
  blobIds: JMAP.Id[];
  properties?: (keyof Email)[] | null;
  bodyProperties?: string[] | null;
  /**
   * default: false
   */
  fetchTextBodyValues?: boolean;
  /**
   * default: false
   */
  fetchHTMLBodyValues?: boolean;
  /**
   * default: false
   */
  fetchAllBodyValues?: boolean;
  /**
   * uint default: 0
   */
  maxBodyValueBytes?: number;
};

/**
 * RFC 8621 (4.9) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.9
 */
export type EmailParseResponse = {
  accountId: JMAP.Id;
  parsed: Record<JMAP.Id, Email> | null;
  notParsable: JMAP.Id[] | null;
  notFound: JMAP.Id[] | null;
};

/**
 * RFC 8621 (5) - https://datatracker.ietf.org/doc/html/rfc8621#section-5
 */
export type SearchSnippet = {
  emailId: JMAP.Id;
  subject: string | null;
  preview: string | null;
};

/**
 * RFC 8621 (5.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-5.1
 */
export type SearchSnippetGetRequest = {
  accountId: JMAP.Id;
  filter: JMAP.FilterOperator | EmailFilterCondition | null;
  emailIds: JMAP.Id[];
};

/**
 * RFC 8621 (5.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-5.1
 */
export type SearchSnippetGetResponse = {
  accountId: JMAP.Id;
  list: SearchSnippet[];
  notFound: JMAP.Id[] | null;
};

/**
 * RFC 8621 (6) - https://datatracker.ietf.org/doc/html/rfc8621#section-6
 */
export type Identity = {
  id: JMAP.Id;
  /**
   * default: ""
   */
  name: string;
  email: string;
  /**
   * default: null
   */
  replyTo: EmailAddress[] | null;
  /**
   * default: null
   */
  bcc: EmailAddress[] | null;
  /**
   * default: ""
   */
  textSignature: string | null;
  /**
   * default: ""
   */
  htmlSignature: string | null;
  mayDelete: boolean;
};

/**
 * RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
 */
export type Address = {
  email: string;
  parameters: Record<string, unknown> | null;
};

/**
 * RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
 */
export type Envelope = {
  mailFrom: Address;
  rcptTo: Address[];
};

/**
 * RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
 */
export type UndoStatus = "pending" | "final" | "canceled";

/**
 * RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
 */
export type DeiliveredStatus = "queued" | "yes" | "no" | "unknown";

/**
 * RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
 */
export type DisplayedStatus = "unknown" | "yes";

/**
 * RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
 */
export type DeliveryStatus = {
  smtpReply: string;
  delivered: DeiliveredStatus;
  displayed: DisplayedStatus;
};

/**
 * RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
 */
export type EmailSubmission = {
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

/**
 * RFC 8621 (7.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.2
 */
export type EmailSubmissionFilterCondition = {
  identityIds: JMAP.Id[];
  emailIds: JMAP.Id[];
  threadIds: JMAP.Id[];
  undoStatus: UndoStatus;
  before: JMAP.UTCDate;
  after: JMAP.UTCDate;
};

/**
 * RFC 8621 (7.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.2
 */
export interface EmailSubmissionQueryRequest extends JMAP.QueryRequest {
  filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}

/**
 * RFC 8621 (7.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.3
 */
export interface EmailSubmissionQueryChangesRequest
  extends JMAP.QueryChangesRequest {
  filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}

/**
 * RFC 8621 (7.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.2
 */
export interface EmailSubmissionSetRequest extends JMAP.SetRequest {
  onSuccessUpdateEmail?: Record<JMAP.Id, unknown> | null;
  onSuccessDestroyEmail?: JMAP.Id | null;
}

export type VacationResponse = {
  id: JMAP.Id;
  isEnabled: boolean;
  fromDate: JMAP.UTCDate | null;
  toDate: JMAP.UTCDate | null;
  subject: string | null;
  textBody: string | null;
  htmlBody: string | null;
};
