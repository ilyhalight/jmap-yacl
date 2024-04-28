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
export type MailboxRole = null | "all" | "archive" | "drafts" | "flagged" | "important" | "inbox" | "junk" | "sent" | "subcribed" | "trash";
export type Mailbox = {
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
export interface MailChangesResponse extends JMAP.ChangesResponse {
    updatedProperties: string[] | null;
}
export type MailFilterCondition = {
    parentId: JMAP.Id | null;
    name: string;
    role: MailboxRole;
    hasAnyRole: boolean;
    isSubscribed: boolean;
};
export interface MailQueryRequest extends JMAP.QueryRequest {
    sortAsTree?: boolean;
    filterAsTree?: boolean;
    filter?: JMAP.FilterOperator | MailFilterCondition;
}
export interface MailSetResponse extends JMAP.SetResponse {
    onDestroyRemoveEmails: boolean;
}
export type Thread = {
    id: JMAP.Id;
    emailIds: JMAP.Id[];
};
export type ForbiddenKeywordChars = "(" | ")" | "{" | "]" | "%" | "*" | '"' | "\\";
export type EmailMetadataFields = {
    id: JMAP.Id;
    blobId: JMAP.Id;
    threadId: JMAP.Id;
    mailboxIds: Record<JMAP.Id, boolean>;
    keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>;
    size: number;
    receivedAt: JMAP.UTCDate;
};
export type EmailAddress = {
    name: string | null;
    email: string;
};
export type EmailAddressGroup = {
    name: string | null;
    addresses: EmailAddress[];
};
export type HeaderParsedForms = {
    Raw: string;
    Text: string;
    Addresses: EmailAddress[];
    GroupedAddresses: EmailAddressGroup[];
    MessageIds: string[] | null;
    Date: Date | null;
    URLs: string[] | null;
};
export type EmailHeader = {
    name: string;
    value: string;
};
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
export type EmailBodyValue = {
    value: string;
    isEncodingProblem: boolean;
    isTruncated: boolean;
};
export type EmailBodyPartFields = {
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
export type EmailBodyPart = {
    bodyStructure?: EmailBodyPartFields;
    bodyValues: Record<string, EmailBodyValue>;
    textBody: EmailBodyPartFields[];
    htmlBody: EmailBodyPartFields[];
    attachments: EmailBodyPartFields[];
    hasAttachment: boolean;
    preview: string;
};
export type Email = EmailMetadataFields & EmailHeaderFields & EmailBodyPart;
export interface EmailGetRequest extends JMAP.GetRequest {
    bodyProperties?: (keyof EmailBodyPartFields)[];
    fetchTextBodyValues?: boolean;
    fetchHTMLBodyValues?: boolean;
    fetchAllBodyValues?: boolean;
    maxBodyValueBytes?: number;
    properties?: (keyof Email)[] | null;
}
export type EmailFilterCondition = {
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
export interface EmailQueryRequest extends JMAP.QueryRequest {
    collapseThreads?: boolean;
    filter?: JMAP.FilterOperator | EmailFilterCondition | null;
}
export interface EmailQueryChangesRequest extends JMAP.QueryChangesRequest {
    collapseThreads?: boolean;
}
export interface EmailSetRequest extends JMAP.SetRequest {
    mailboxIds: Record<JMAP.Id, boolean>;
    keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>;
    receivedAt: JMAP.UTCDate;
}
export type EmailImport = {
    blobId: JMAP.Id;
    mailboxIds: Record<JMAP.Id, boolean>;
    keywords: Record<Exclude<string, ForbiddenKeywordChars>, true>;
    receivedAt: JMAP.UTCDate;
};
export type EmailImportRequest = {
    accountId: JMAP.Id;
    ifInState?: string | null;
    emails: Record<JMAP.Id, EmailImport>;
};
export type EmailImportResponse = {
    accountId: JMAP.Id;
    oldState: string | null;
    newState: string;
    created: Record<JMAP.Id, EmailImport> | null;
    notCreated: Record<JMAP.Id, JMAP.SetError> | null;
};
export type EmailParseRequest = {
    accountId: JMAP.Id;
    blobIds: JMAP.Id[];
    properties?: (keyof Email)[] | null;
    bodyProperties?: string[] | null;
    fetchTextBodyValues?: boolean;
    fetchHTMLBodyValues?: boolean;
    fetchAllBodyValues?: boolean;
    maxBodyValueBytes?: number;
};
export type EmailParseResponse = {
    accountId: JMAP.Id;
    parsed: Record<JMAP.Id, Email> | null;
    notParsable: JMAP.Id[] | null;
    notFound: JMAP.Id[] | null;
};
export type SearchSnippet = {
    emailId: JMAP.Id;
    subject: string | null;
    preview: string | null;
};
export type SearchSnippetGetRequest = {
    accountId: JMAP.Id;
    filter: JMAP.FilterOperator | EmailFilterCondition | null;
    emailIds: JMAP.Id[];
};
export type SearchSnippetGetResponse = {
    accountId: JMAP.Id;
    list: SearchSnippet[];
    notFound: JMAP.Id[] | null;
};
export type Identity = {
    id: JMAP.Id;
    name: string;
    email: string;
    replyTo: EmailAddress[] | null;
    bcc: EmailAddress[] | null;
    textSignature: string | null;
    htmlSignature: string | null;
    mayDelete: boolean;
};
export type Address = {
    email: string;
    parameters: Record<string, unknown> | null;
};
export type Envelope = {
    mailFrom: Address;
    rcptTo: Address[];
};
export type UndoStatus = "pending" | "final" | "canceled";
export type DeliveryStatus = {
    smtpReply: string;
    delivered: "queued" | "yes" | "no" | "unknown";
    displayed: "unknown" | "yes";
};
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
export type EmailSubmissionFilterCondition = {
    identityIds: JMAP.Id[];
    emailIds: JMAP.Id[];
    threadIds: JMAP.Id[];
    undoStatus: UndoStatus;
    before: JMAP.UTCDate;
    after: JMAP.UTCDate;
};
export interface EmailSubmissionQueryRequest extends JMAP.QueryRequest {
    filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}
export interface EmailSubmissionQueryChangesRequest extends JMAP.QueryChangesRequest {
    filter?: JMAP.FilterOperator | EmailSubmissionFilterCondition | null;
}
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
//# sourceMappingURL=mail.d.ts.map