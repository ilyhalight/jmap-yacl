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
  | "trash"; // (https://www.iana.org/assignments/imap-mailbox-name-attributes/imap-mailbox-name-attributes.xhtml)

export type Mailbox = {
  id: JMAP.Id;
  name: string; // e.g. Inbox
  parentId: JMAP.Id | null;
  role: MailboxRole; // e.g. inbox, regardless of the "name" property
  sortOrder?: number; // uint. default 0
  totalEmails: number; // (server-set)
  unreadEmails: number; // uint (server-set)
  totalThreads: number; // uint (server-set)
  unreadThreads: number; // uint (server-set)
  myRights: MailboxRights; // server-set
  isSubscribed: boolean;
};

// RFC 8621 (2.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.2
export interface MailChangesResponse extends JMAP.ChangesResponse {
  updatedProperties: string[] | null;
}

// RFC 8621 (2.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.3
export type MailFilterCondition = {
  parentId: JMAP.Id | null;
  name: string;
  role: MailboxRole;
  hasAnyRole: boolean;
  isSubscribed: boolean;
};

// RFC 8621 (2.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.3
export interface MailQueryRequest extends JMAP.QueryRequest {
  sortAsTree?: boolean; // default: false
  filterAsTree?: boolean; // default: false
  filter?: JMAP.FilterOperator | MailFilterCondition;
}

// RFC 8621 (2.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-2.4
// extra SetError types for "destroy":
// - mailboxHasChild
// - mailboxHasEmail
export interface MailSetResponse extends JMAP.SetResponse {
  onDestroyRemoveEmails: boolean; // default: false
}

// RFC 8621 (3) - https://datatracker.ietf.org/doc/html/rfc8621#section-3
export type Thread = {
  id: JMAP.Id; // (server-set)
  emailIds: JMAP.Id[]; // sorted by the "receivedAt" date of the Email, oldest first (server-set)
};

// RFC 8621 (4.1.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.1
export type ForbiddenKeywordChars =
  | "("
  | ")"
  | "{"
  | "]"
  | "%"
  | "*"
  | '"'
  | "\\";

// RFC 8621 (4.1.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.1
export type EmailMetadataFields = {
  id: JMAP.Id; // (server-set)
  blobId: JMAP.Id; // (server-set)
  threadId: JMAP.Id; // (server-set)
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>; // $draft, $seen, $flagged, $answered, $forwarded, $phishing, $junk, $notjunk
  size: number; // (server-set)
  receivedAt: JMAP.UTCDate; // default: time of creation on server
};

// RFC 8621 (4.1.2.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.2.3
export type EmailAddress = {
  name: string | null;
  email: string;
};

// RFC 8621 (4.1.2.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.2.4
export type EmailAddressGroup = {
  name: string | null;
  addresses: EmailAddress[];
};

// RFC 8621 (4.1.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.2
export type HeaderParsedForms = {
  Raw: string;
  Text: string;
  Addresses: EmailAddress[];
  GroupedAddresses: EmailAddressGroup[];
  MessageIds: string[] | null;
  Date: Date | null;
  URLs: string[] | null;
};

// RFC 8621 (4.1.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.3
export type EmailHeader = {
  name: string;
  value: string;
};

// RFC 8621 (4.1.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.3
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

// RFC 8621 (4.1.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.4
export type EmailBodyValue = {
  value: string;
  isEncodingProblem: boolean; // default: false
  isTruncated: boolean; // default: false
};

// RFC 8621 (4.1.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.4
export type EmailBodyPartFields = {
  partId?: string | null;
  blobId?: JMAP.Id | null;
  size?: number; // uint
  headers?: EmailHeader[];
  name?: string | null;
  type?: string; // The value of the Content-Type header field of the part, if present; otherwise, the implicit type as per the MIME standard ("text/plain" or "message/rfc822" if inside a "multipart/digest")
  charset?: string | null; // The value of the charset parameter of the Content-Type header field, if present, or null if the header field is present but not of type "text/*"
  disposition?: string | null; // The value of the Content-Disposition header field of the part, if present; otherwise, it's null
  cid?: string | null; // The value of the Content-Id header field of the part, if present; otherwise, it's null
  language?: string[] | null; // The list of language tags in the Content-Language header field of the part, if present
  location?: string | null; // The URI in the Content-Location header field of the part, if present
  subParts?: EmailBodyPartFields[] | null;
};

// RFC 8621 (4.1.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.1.4
export type EmailBodyPart = {
  bodyStructure?: EmailBodyPartFields;
  bodyValues: Record<string, EmailBodyValue>;
  textBody: EmailBodyPartFields[];
  htmlBody: EmailBodyPartFields[];
  attachments: EmailBodyPartFields[];
  hasAttachment: boolean; // (server-set)
  preview: string; // <= 256 chars
};

// RFC 8621 (4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4
export type Email = EmailMetadataFields & EmailHeaderFields & EmailBodyPart;

// RFC 8621 (4.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.2
export interface EmailGetRequest extends JMAP.GetRequest {
  bodyProperties?: (keyof EmailBodyPartFields)[]; // Props in textBody and etc. default: [ "partId", "blobId", "size", "name", "type", "charset", "disposition", "cid", "language", "location" ]
  fetchTextBodyValues?: boolean; // default: false
  fetchHTMLBodyValues?: boolean; // default: false
  fetchAllBodyValues?: boolean; // default: false
  maxBodyValueBytes?: number; // uint default: 0
  properties?: (keyof Email)[] | null; // [ "id", "blobId", "threadId", "mailboxIds", "keywords", "size", "receivedAt", "messageId", "inReplyTo", "references", "sender", "from", "to", "cc", "bcc", "replyTo", "subject", "sentAt", "hasAttachment", "preview", "bodyValues", "textBody", "htmlBody", "attachments" ]
}

// RFC 8621 (4.4.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.4.1
export type EmailFilterCondition = {
  inMailBox?: JMAP.Id;
  inMailboxOtherThan?: JMAP.Id[];
  before?: JMAP.UTCDate;
  after?: JMAP.UTCDate;
  minSize?: number; // uint
  maxSize?: number; // uint
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

// RFC 8621 (4.4) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.4
export interface EmailQueryRequest extends JMAP.QueryRequest {
  collapseThreads?: boolean; // default: false
  filter?: JMAP.FilterOperator | EmailFilterCondition | null;
}

// RFC 8621 (4.5) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.5
export interface EmailQueryChangesRequest extends JMAP.QueryChangesRequest {
  collapseThreads?: boolean; // default: false
}

// RFC 8621 (4.7) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.7
export interface EmailSetRequest extends JMAP.SetRequest {
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>; // $draft, $seen, $flagged, $answered, $forwarded, $phishing, $junk, $notjunk
  receivedAt: JMAP.UTCDate; // default: time of creation on server
}

// RFC 8621 (4.8) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.8
export type EmailImport = {
  blobId: JMAP.Id;
  mailboxIds: Record<JMAP.Id, boolean>;
  keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>; // $draft, $seen, $flagged, $answered, $forwarded, $phishing, $junk, $notjunk. Default: true
  receivedAt: JMAP.UTCDate; // default: time of creation on server
};

// RFC 8621 (4.8) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.8
export type EmailImportRequest = {
  accountId: JMAP.Id;
  ifInState?: string | null;
  emails: Record<JMAP.Id, EmailImport>;
};

// RFC 8621 (4.8) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.8
export type EmailImportResponse = {
  accountId: JMAP.Id;
  oldState: string | null;
  newState: string;
  created: Record<JMAP.Id, EmailImport> | null;
  notCreated: Record<JMAP.Id, JMAP.SetError> | null;
};

// RFC 8621 (4.9) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.9
export type EmailParseRequest = {
  accountId: JMAP.Id;
  blobIds: JMAP.Id[];
  properties?: (keyof Email)[] | null;
  bodyProperties?: string[] | null;
  fetchTextBodyValues?: boolean; // default: false
  fetchHTMLBodyValues?: boolean; // default: false
  fetchAllBodyValues?: boolean; // default: false
  maxBodyValueBytes?: number; // uint default: 0
};

// RFC 8621 (4.9) - https://datatracker.ietf.org/doc/html/rfc8621#section-4.9
export type EmailParseResponse = {
  accountId: JMAP.Id;
  parsed: Record<JMAP.Id, Email> | null;
  notParsable: JMAP.Id[] | null;
  notFound: JMAP.Id[] | null;
};

// RFC 8621 (5) - https://datatracker.ietf.org/doc/html/rfc8621#section-5
export type SearchSnippet = {
  emailId: JMAP.Id;
  subject: string | null;
  preview: string | null;
};

// RFC 8621 (5.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-5.1
export type SearchSnippetGetRequest = {
  accountId: JMAP.Id;
  filter: JMAP.FilterOperator | EmailFilterCondition | null;
  emailIds: JMAP.Id[];
};

// RFC 8621 (5.1) - https://datatracker.ietf.org/doc/html/rfc8621#section-5.1
export type SearchSnippetGetResponse = {
  accountId: JMAP.Id;
  list: SearchSnippet[];
  notFound: JMAP.Id[] | null;
};

// RFC 8621 (6) - https://datatracker.ietf.org/doc/html/rfc8621#section-6
export type Identity = {
  id: JMAP.Id;
  name: string; // default: ""
  email: string;
  replyTo: EmailAddress[] | null; // default: null
  bcc: EmailAddress[] | null; // default: null
  textSignature: string | null; // default: ""
  htmlSignature: string | null; // default: ""
  mayDelete: boolean;
};

// RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
export type Address = {
  email: string;
  parameters: Record<string, unknown> | null;
};

// RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
export type Envelope = {
  mailFrom: Address;
  rcptTo: Address[];
};

// RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
export type UndoStatus = "pending" | "final" | "canceled";

// RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
export type DeliveryStatus = {
  smtpReply: string;
  delivered: "queued" | "yes" | "no" | "unknown";
  displayed: "unknown" | "yes";
};

// RFC 8621 (7) - https://datatracker.ietf.org/doc/html/rfc8621#section-7
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

// RFC 8621 (7.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.2
export type EmailSubmissionFilterCondition = {
  identityIds: JMAP.Id[];
  emailIds: JMAP.Id[];
  threadIds: JMAP.Id[];
  undoStatus: UndoStatus;
  before: JMAP.UTCDate;
  after: JMAP.UTCDate;
};

// RFC 8621 (7.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.2
export interface EmailSubmissionQueryRequest extends JMAP.QueryRequest {
  filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}

// RFC 8621 (7.3) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.3
export interface EmailSubmissionQueryChangesRequest
  extends JMAP.QueryChangesRequest {
  filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}

// RFC 8621 (7.2) - https://datatracker.ietf.org/doc/html/rfc8621#section-7.2
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
