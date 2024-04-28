import * as JMAP from "./jmap";

import { Type, Static } from '@sinclair/typebox'


export type MailboxRights = Static<typeof MailboxRights>
export const MailboxRights = Type.Object({
mayReadItems: Type.Boolean(),
mayAddItems: Type.Boolean(),
maySetSeen: Type.Boolean(),
maySetKeywords: Type.Boolean(),
mayCreateChild: Type.Boolean(),
mayRename: Type.Boolean(),
mayDelete: Type.Boolean(),
maySubmit: Type.Boolean()
})

export type MailboxRole = Static<typeof MailboxRole>
export const MailboxRole = Type.Union([
Type.Null(),
Type.Literal("all"),
Type.Literal("archive"),
Type.Literal("drafts"),
Type.Literal("flagged"),
Type.Literal("important"),
Type.Literal("inbox"),
Type.Literal("junk"),
Type.Literal("sent"),
Type.Literal("subcribed"),
Type.Literal("trash")
])

export type Mailbox = Static<typeof Mailbox>
export const Mailbox = Type.Object({
id: JMAP.Id,
name: Type.String(),
parentId: Type.Union([
JMAP.Id,
Type.Null()
]),
role: MailboxRole,
sortOrder: Type.Optional(Type.Number()),
totalEmails: Type.Number(),
unreadEmails: Type.Number(),
totalThreads: Type.Number(),
unreadThreads: Type.Number(),
myRights: MailboxRights,
isSubscribed: Type.Boolean()
})

export type MailChangesResponse = Static<typeof MailChangesResponse>
export const MailChangesResponse = Type.Composite([JMAP.ChangesResponse, Type.Object({
updatedProperties: Type.Union([
Type.Array(Type.String()),
Type.Null()
])
})])

export type MailFilterCondition = Static<typeof MailFilterCondition>
export const MailFilterCondition = Type.Object({
parentId: Type.Union([
JMAP.Id,
Type.Null()
]),
name: Type.String(),
role: MailboxRole,
hasAnyRole: Type.Boolean(),
isSubscribed: Type.Boolean()
})

export type MailQueryRequest = Static<typeof MailQueryRequest>
export const MailQueryRequest = Type.Composite([JMAP.QueryRequest, Type.Object({
sortAsTree: Type.Optional(Type.Boolean()),
filterAsTree: Type.Optional(Type.Boolean()),
filter: Type.Optional(Type.Union([
JMAP.FilterOperator,
MailFilterCondition
]))
})])

export type MailSetResponse = Static<typeof MailSetResponse>
export const MailSetResponse = Type.Composite([JMAP.SetResponse, Type.Object({
onDestroyRemoveEmails: Type.Boolean()
})])

export type Thread = Static<typeof Thread>
export const Thread = Type.Object({
id: JMAP.Id,
emailIds: Type.Array(JMAP.Id)
})

export type ForbiddenKeywordChars = Static<typeof ForbiddenKeywordChars>
export const ForbiddenKeywordChars = Type.Union([
Type.Literal("("),
Type.Literal(")"),
Type.Literal("{"),
Type.Literal("]"),
Type.Literal("%"),
Type.Literal("*"),
Type.Literal('"'),
Type.Literal("\\")
])

export type EmailMetadataFields = Static<typeof EmailMetadataFields>
export const EmailMetadataFields = Type.Object({
id: JMAP.Id,
blobId: JMAP.Id,
threadId: JMAP.Id,
mailboxIds: Type.Record(JMAP.Id, Type.Boolean()),
keywords: Type.Record(Type.Exclude(Type.String(), ForbiddenKeywordChars), Type.Literal(true)),
size: Type.Number(),
receivedAt: JMAP.UTCDate
})

export type EmailAddress = Static<typeof EmailAddress>
export const EmailAddress = Type.Object({
name: Type.Union([
Type.String(),
Type.Null()
]),
email: Type.String()
})

export type EmailAddressGroup = Static<typeof EmailAddressGroup>
export const EmailAddressGroup = Type.Object({
name: Type.Union([
Type.String(),
Type.Null()
]),
addresses: Type.Array(EmailAddress)
})

export type HeaderParsedForms = Static<typeof HeaderParsedForms>
export const HeaderParsedForms = Type.Object({
Raw: Type.String(),
Text: Type.String(),
Addresses: Type.Array(EmailAddress),
GroupedAddresses: Type.Array(EmailAddressGroup),
MessageIds: Type.Union([
Type.Array(Type.String()),
Type.Null()
]),
Date: Type.Union([
Type.Date(),
Type.Null()
]),
URLs: Type.Union([
Type.Array(Type.String()),
Type.Null()
])
})

export type EmailHeader = Static<typeof EmailHeader>
export const EmailHeader = Type.Object({
name: Type.String(),
value: Type.String()
})

export type EmailHeaderFields = Static<typeof EmailHeaderFields>
export const EmailHeaderFields = Type.Object({
headers: Type.Optional(Type.Array(EmailHeader)),
messageId: Type.Union([
Type.Array(Type.String()),
Type.Null()
]),
inReplyTo: Type.Union([
Type.Array(Type.String()),
Type.Null()
]),
references: Type.Union([
Type.Array(Type.String()),
Type.Null()
]),
sender: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
from: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
to: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
cc: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
bcc: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
replyTo: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
subject: Type.Union([
Type.String(),
Type.Null()
]),
sentAt: Type.Union([
JMAP.Date,
Type.Null()
])
})

export type EmailBodyValue = Static<typeof EmailBodyValue>
export const EmailBodyValue = Type.Object({
value: Type.String(),
isEncodingProblem: Type.Boolean(),
isTruncated: Type.Boolean()
})

export type EmailBodyPartFields = Static<typeof EmailBodyPartFields>
export const EmailBodyPartFields = Type.Recursive(This => Type.Object({
partId: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
blobId: Type.Optional(Type.Union([
JMAP.Id,
Type.Null()
])),
size: Type.Optional(Type.Number()),
headers: Type.Optional(Type.Array(EmailHeader)),
name: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
type: Type.Optional(Type.String()),
charset: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
disposition: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
cid: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
language: Type.Optional(Type.Union([
Type.Array(Type.String()),
Type.Null()
])),
location: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
subParts: Type.Optional(Type.Union([
Type.Array(This),
Type.Null()
]))
}))

export type EmailBodyPart = Static<typeof EmailBodyPart>
export const EmailBodyPart = Type.Object({
bodyStructure: Type.Optional(EmailBodyPartFields),
bodyValues: Type.Record(Type.String(), EmailBodyValue),
textBody: Type.Array(EmailBodyPartFields),
htmlBody: Type.Array(EmailBodyPartFields),
attachments: Type.Array(EmailBodyPartFields),
hasAttachment: Type.Boolean(),
preview: Type.String()
})

export type Email = Static<typeof Email>
export const Email = Type.Intersect([
EmailMetadataFields,
EmailHeaderFields,
EmailBodyPart
])

export type EmailGetRequest = Static<typeof EmailGetRequest>
export const EmailGetRequest = Type.Composite([JMAP.GetRequest, Type.Object({
bodyProperties: Type.Optional(Type.Array(Type.KeyOf(EmailBodyPartFields))),
fetchTextBodyValues: Type.Optional(Type.Boolean()),
fetchHTMLBodyValues: Type.Optional(Type.Boolean()),
fetchAllBodyValues: Type.Optional(Type.Boolean()),
maxBodyValueBytes: Type.Optional(Type.Number()),
properties: Type.Optional(Type.Union([
Type.Array(Type.KeyOf(Email)),
Type.Null()
]))
})])

export type EmailFilterCondition = Static<typeof EmailFilterCondition>
export const EmailFilterCondition = Type.Object({
inMailBox: Type.Optional(JMAP.Id),
inMailboxOtherThan: Type.Optional(Type.Array(JMAP.Id)),
before: Type.Optional(JMAP.UTCDate),
after: Type.Optional(JMAP.UTCDate),
minSize: Type.Optional(Type.Number()),
maxSize: Type.Optional(Type.Number()),
allInThreadHaveKeyword: Type.Optional(Type.String()),
someInThreadHaveKeyword: Type.Optional(Type.String()),
noneInThreadHaveKeyword: Type.Optional(Type.String()),
hasKeyword: Type.Optional(Type.String()),
notKeyword: Type.Optional(Type.String()),
hasAttachment: Type.Optional(Type.Boolean()),
text: Type.Optional(Type.String()),
from: Type.Optional(Type.String()),
to: Type.Optional(Type.String()),
cc: Type.Optional(Type.String()),
bcc: Type.Optional(Type.String()),
subject: Type.Optional(Type.String()),
body: Type.Optional(Type.String()),
header: Type.Optional(Type.Array(Type.String()))
})

export type EmailQueryRequest = Static<typeof EmailQueryRequest>
export const EmailQueryRequest = Type.Composite([JMAP.QueryRequest, Type.Object({
collapseThreads: Type.Optional(Type.Boolean()),
filter: Type.Optional(Type.Union([
JMAP.FilterOperator,
EmailFilterCondition,
Type.Null()
]))
})])

export type EmailQueryChangesRequest = Static<typeof EmailQueryChangesRequest>
export const EmailQueryChangesRequest = Type.Composite([JMAP.QueryChangesRequest, Type.Object({
collapseThreads: Type.Optional(Type.Boolean())
})])

export type EmailSetRequest = Static<typeof EmailSetRequest>
export const EmailSetRequest = Type.Composite([JMAP.SetRequest, Type.Object({
mailboxIds: Type.Record(JMAP.Id, Type.Boolean()),
keywords: Type.Record(Type.Exclude(Type.String(), ForbiddenKeywordChars), Type.Literal(true)),
receivedAt: JMAP.UTCDate
})])

export type EmailImport = Static<typeof EmailImport>
export const EmailImport = Type.Object({
blobId: JMAP.Id,
mailboxIds: Type.Record(JMAP.Id, Type.Boolean()),
keywords: Type.Record(Type.Exclude(Type.String(), ForbiddenKeywordChars), Type.Literal(true)),
receivedAt: JMAP.UTCDate
})

export type EmailImportRequest = Static<typeof EmailImportRequest>
export const EmailImportRequest = Type.Object({
accountId: JMAP.Id,
ifInState: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
emails: Type.Record(JMAP.Id, EmailImport)
})

export type EmailImportResponse = Static<typeof EmailImportResponse>
export const EmailImportResponse = Type.Object({
accountId: JMAP.Id,
oldState: Type.Union([
Type.String(),
Type.Null()
]),
newState: Type.String(),
created: Type.Union([
Type.Record(JMAP.Id, EmailImport),
Type.Null()
]),
notCreated: Type.Union([
Type.Record(JMAP.Id, JMAP.SetError),
Type.Null()
])
})

export type EmailParseRequest = Static<typeof EmailParseRequest>
export const EmailParseRequest = Type.Object({
accountId: JMAP.Id,
blobIds: Type.Array(JMAP.Id),
properties: Type.Optional(Type.Union([
Type.Array(Type.KeyOf(Email)),
Type.Null()
])),
bodyProperties: Type.Optional(Type.Union([
Type.Array(Type.String()),
Type.Null()
])),
fetchTextBodyValues: Type.Optional(Type.Boolean()),
fetchHTMLBodyValues: Type.Optional(Type.Boolean()),
fetchAllBodyValues: Type.Optional(Type.Boolean()),
maxBodyValueBytes: Type.Optional(Type.Number())
})

export type EmailParseResponse = Static<typeof EmailParseResponse>
export const EmailParseResponse = Type.Object({
accountId: JMAP.Id,
parsed: Type.Union([
Type.Record(JMAP.Id, Email),
Type.Null()
]),
notParsable: Type.Union([
Type.Array(JMAP.Id),
Type.Null()
]),
notFound: Type.Union([
Type.Array(JMAP.Id),
Type.Null()
])
})

export type SearchSnippet = Static<typeof SearchSnippet>
export const SearchSnippet = Type.Object({
emailId: JMAP.Id,
subject: Type.Union([
Type.String(),
Type.Null()
]),
preview: Type.Union([
Type.String(),
Type.Null()
])
})

export type SearchSnippetGetRequest = Static<typeof SearchSnippetGetRequest>
export const SearchSnippetGetRequest = Type.Object({
accountId: JMAP.Id,
filter: Type.Union([
JMAP.FilterOperator,
EmailFilterCondition,
Type.Null()
]),
emailIds: Type.Array(JMAP.Id)
})

export type SearchSnippetGetResponse = Static<typeof SearchSnippetGetResponse>
export const SearchSnippetGetResponse = Type.Object({
accountId: JMAP.Id,
list: Type.Array(SearchSnippet),
notFound: Type.Union([
Type.Array(JMAP.Id),
Type.Null()
])
})

export type Identity = Static<typeof Identity>
export const Identity = Type.Object({
id: JMAP.Id,
name: Type.String(),
email: Type.String(),
replyTo: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
bcc: Type.Union([
Type.Array(EmailAddress),
Type.Null()
]),
textSignature: Type.Union([
Type.String(),
Type.Null()
]),
htmlSignature: Type.Union([
Type.String(),
Type.Null()
]),
mayDelete: Type.Boolean()
})

export type Address = Static<typeof Address>
export const Address = Type.Object({
email: Type.String(),
parameters: Type.Union([
Type.Record(Type.String(), Type.Unknown()),
Type.Null()
])
})

export type Envelope = Static<typeof Envelope>
export const Envelope = Type.Object({
mailFrom: Address,
rcptTo: Type.Array(Address)
})

export type UndoStatus = Static<typeof UndoStatus>
export const UndoStatus = Type.Union([
Type.Literal("pending"),
Type.Literal("final"),
Type.Literal("canceled")
])

export type DeliveryStatus = Static<typeof DeliveryStatus>
export const DeliveryStatus = Type.Object({
smtpReply: Type.String(),
delivered: Type.Union([
Type.Literal("queued"),
Type.Literal("yes"),
Type.Literal("no"),
Type.Literal("unknown")
]),
displayed: Type.Union([
Type.Literal("unknown"),
Type.Literal("yes")
])
})

export type EmailSubmission = Static<typeof EmailSubmission>
export const EmailSubmission = Type.Object({
id: JMAP.Id,
identityId: JMAP.Id,
emailId: JMAP.Id,
threadId: JMAP.Id,
envelope: Type.Union([
Envelope,
Type.Null()
]),
sendAt: JMAP.UTCDate,
undoStatus: UndoStatus,
deliveryStatus: Type.Union([
Type.Record(Type.String(), DeliveryStatus),
Type.Null()
]),
dsnBlobIds: Type.Array(JMAP.Id),
mdnBlobIds: Type.Array(JMAP.Id)
})

export type EmailSubmissionFilterCondition = Static<typeof EmailSubmissionFilterCondition>
export const EmailSubmissionFilterCondition = Type.Object({
identityIds: Type.Array(JMAP.Id),
emailIds: Type.Array(JMAP.Id),
threadIds: Type.Array(JMAP.Id),
undoStatus: UndoStatus,
before: JMAP.UTCDate,
after: JMAP.UTCDate
})

export type EmailSubmissionQueryRequest = Static<typeof EmailSubmissionQueryRequest>
export const EmailSubmissionQueryRequest = Type.Composite([JMAP.QueryRequest, Type.Object({
filter: Type.Optional(Type.Union([
JMAP.FilterOperator,
EmailSubmissionFilterCondition,
Type.Null()
]))
})])

export type EmailSubmissionQueryChangesRequest = Static<typeof EmailSubmissionQueryChangesRequest>
export const EmailSubmissionQueryChangesRequest = Type.Composite([JMAP.QueryChangesRequest, Type.Object({
filter: Type.Optional(Type.Union([
JMAP.FilterOperator,
EmailSubmissionFilterCondition,
Type.Null()
]))
})])

export type EmailSubmissionSetRequest = Static<typeof EmailSubmissionSetRequest>
export const EmailSubmissionSetRequest = Type.Composite([JMAP.SetRequest, Type.Object({
onSuccessUpdateEmail: Type.Optional(Type.Union([
Type.Record(JMAP.Id, Type.Unknown()),
Type.Null()
])),
onSuccessDestroyEmail: Type.Optional(Type.Union([
JMAP.Id,
Type.Null()
]))
})])

export type VacationResponse = Static<typeof VacationResponse>
export const VacationResponse = Type.Object({
id: JMAP.Id,
isEnabled: Type.Boolean(),
fromDate: Type.Union([
JMAP.UTCDate,
Type.Null()
]),
toDate: Type.Union([
JMAP.UTCDate,
Type.Null()
]),
subject: Type.Union([
Type.String(),
Type.Null()
]),
textBody: Type.Union([
Type.String(),
Type.Null()
]),
htmlBody: Type.Union([
Type.String(),
Type.Null()
])
})