import { Type, Static, TSchema } from '@sinclair/typebox'


export type Id = Static<typeof Id>
export const Id = Type.String()

export type Date = Static<typeof Date>
export const Date = Type.String()

export type UTCDate = Static<typeof UTCDate>
export const UTCDate = Type.String()

export type Account<Capatibility extends TSchema> = Static<ReturnType<typeof Account<Capatibility>>>
export const Account = <Capatibility extends TSchema>(Capatibility: Capatibility) => Type.Object({
name: Type.String(),
isPersonal: Type.Boolean(),
isReadOnly: Type.Boolean(),
accountCapabilities: Type.Record(Capatibility, Type.Unknown())
})

export type Session<Capatibility extends TSchema> = Static<ReturnType<typeof Session<Capatibility>>>
export const Session = <Capatibility extends TSchema>(Capatibility: Capatibility) => Type.Object({
capatibilities: Type.Record(Capatibility, Type.Unknown()),
accounts: Type.Array(Id),
primaryAccounts: Type.Record(Capatibility, Id),
username: Type.String(),
apiUrl: Type.String(),
downloadUrl: Type.String(),
uploadUrl: Type.String(),
eventSourceUrl: Type.String(),
state: Type.String()
})

export type Invocation<T extends TSchema> = Static<ReturnType<typeof Invocation<T>>>
export const Invocation = <T extends TSchema>(T: T) => Type.Tuple([
Type.String(),
T,
Type.String()
])

export type Request<T extends TSchema> = Static<ReturnType<typeof Request<T>>>
export const Request = <T extends TSchema>(T: T) => Type.Object({
using: Type.Array(Type.String()),
methodCalls: Type.Array(Invocation(T)),
createdIds: Type.Optional(Type.Record(Id, Id))
})

export type Response<T extends TSchema> = Static<ReturnType<typeof Response<T>>>
export const Response = <T extends TSchema>(T: T) => Type.Object({
methodResponses: Type.Array(Invocation(T)),
createdIds: Type.Optional(Type.Record(Id, Id)),
sessionState: Type.String()
})

export type ProblemDetails = Static<typeof ProblemDetails>
export const ProblemDetails = Type.Object({
type: Type.String(),
status: Type.Optional(Type.Number()),
title: Type.Optional(Type.String()),
detail: Type.Optional(Type.String()),
instance: Type.Optional(Type.String())
})

export enum EnumRequestErrorType { unknownCapatibility = "urn:ietf:params:jmap:error:unknownCapability", notJSON = "urn:ietf:params:jmap:error:notJSON", notRequest = "urn:ietf:params:jmap:error:notRequest", limit = "urn:ietf:params:jmap:error:limit" }

export type RequestErrorType = Static<typeof RequestErrorType>
export const RequestErrorType = Type.Enum(EnumRequestErrorType)

export enum EnumMethodErrorType { serverUnavailable = "serverUnavailable", serverFail = "serverFail", serverPartialFail = "serverPartialFail", unknownMethod = "unknownMethod", invalidArguments = "invalidArguments", invalidResultReference = "invalidResultReference", forbidden = "forbidden", accountNotFound = "accountNotFound", accountNotSupportedByMethod = "accountNotSupportedByMethod", accountReadOnly = "accountReadOnly" }

export type MethodErrorType = Static<typeof MethodErrorType>
export const MethodErrorType = Type.Enum(EnumMethodErrorType)

export type ResultReference = Static<typeof ResultReference>
export const ResultReference = Type.Object({
resultOf: Type.String(),
name: Type.String(),
path: Type.String()
})

export enum EnumUsing { core = "urn:ietf:params:jmap:core", mail = "urn:ietf:params:jmap:mail", submission = "urn:ietf:params:jmap:submission", vacationresponse = "urn:ietf:params:jmap:vacationresponse" }

export type Using = Static<typeof Using>
export const Using = Type.Enum(EnumUsing)

export type GetRequest = Static<typeof GetRequest>
export const GetRequest = Type.Object({
accountId: Id,
ids: Type.Optional(Type.Union([
Type.Array(Id),
Type.Null()
])),
properties: Type.Optional(Type.Union([
Type.Array(Type.String()),
Type.Null()
]))
})

export type GetResponse<T extends TSchema> = Static<ReturnType<typeof GetResponse<T>>>
export const GetResponse = <T extends TSchema>(T: T) => Type.Object({
accountId: Id,
state: Type.String(),
list: Type.Array(T),
notFound: Type.Array(Id)
})

export type ChangesRequest = Static<typeof ChangesRequest>
export const ChangesRequest = Type.Object({
accountId: Id,
sinceState: Type.String(),
maxChanges: Type.Number()
})

export type ChangesResponse = Static<typeof ChangesResponse>
export const ChangesResponse = Type.Object({
accountId: Id,
oldState: Type.String(),
newState: Type.String(),
hasMoreChanges: Type.Boolean(),
created: Type.Array(Id),
updated: Type.Array(Id),
destroyed: Type.Array(Id)
})

export type SetRequest = Static<typeof SetRequest>
export const SetRequest = Type.Object({
accountId: Id,
ifInState: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
create: Type.Union([
Type.Record(Id, Type.Any()),
Type.Null()
]),
update: Type.Union([
Type.Record(Id, Type.Any()),
Type.Null()
]),
destroy: Type.Union([
Type.Array(Id),
Type.Null()
])
})

export type SetError = Static<typeof SetError>
export const SetError = Type.Object({
type: Type.String(),
description: Type.Union([
Type.String(),
Type.Null()
]),
properties: Type.Union([
Type.Array(Type.String()),
Type.Null()
])
})

export type SetResponse = Static<typeof SetResponse>
export const SetResponse = Type.Object({
accountId: Id,
oldState: Type.String(),
newState: Type.String(),
created: Type.Optional(Type.Record(Id, Type.Any())),
updated: Type.Optional(Type.Record(Id, Type.Any())),
destroyed: Type.Optional(Type.Array(Id)),
notCreated: Type.Optional(Type.Record(Id, SetError)),
notUpdated: Type.Optional(Type.Record(Id, SetError)),
notDestroyed: Type.Optional(Type.Record(Id, SetError))
})

export type CopyRequest = Static<typeof CopyRequest>
export const CopyRequest = Type.Object({
fromAccountId: Id,
ifFromInState: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
accountId: Id,
ifInState: Type.Optional(Type.Union([
Type.String(),
Type.Null()
])),
create: Type.Optional(Type.Union([
Type.Record(Id, Type.Any()),
Type.Null()
])),
onSuccessDestroyOriginal: Type.Optional(Type.Boolean()),
destroyFromIfInState: Type.Optional(Type.Union([
Type.String(),
Type.Null()
]))
})

export type CopyResponse = Static<typeof CopyResponse>
export const CopyResponse = Type.Object({
fromAccountId: Id,
accountId: Id,
oldState: Type.Union([
Type.String(),
Type.Null()
]),
newState: Type.String(),
created: Type.Union([
Type.Record(Id, Type.Any()),
Type.Null()
]),
notCreated: Type.Union([
Type.Record(Id, SetError),
Type.Null()
])
})

export type FilterCondition = Static<typeof FilterCondition>
export const FilterCondition = Type.Object({

})

export type FilterOperator = Static<typeof FilterOperator>
export const FilterOperator = Type.Recursive(This => Type.Object({
operator: Type.Union([
Type.Literal("AND"),
Type.Literal("OR"),
Type.Literal("NOT")
]),
conditions: Type.Array(Type.Union([
This,
FilterCondition
]))
}))

export type Comparator = Static<typeof Comparator>
export const Comparator = Type.Object({
property: Type.String(),
isAscending: Type.Optional(Type.Boolean()),
collation: Type.Optional(Type.String())
})

export type QueryRequest = Static<typeof QueryRequest>
export const QueryRequest = Type.Object({
accountId: Id,
filter: Type.Optional(Type.Union([
FilterOperator,
FilterCondition,
Type.Null()
])),
sort: Type.Optional(Type.Union([
Type.Array(Comparator),
Type.Null()
])),
position: Type.Optional(Type.Number()),
anchor: Type.Optional(Type.Union([
Id,
Type.Null()
])),
anchorOffset: Type.Optional(Type.Number()),
limit: Type.Optional(Type.Union([
Type.Number(),
Type.Null()
])),
calculateTotal: Type.Optional(Type.Boolean())
})

export type QueryResponse = Static<typeof QueryResponse>
export const QueryResponse = Type.Object({
accountId: Id,
queryState: Type.String(),
canCalculateChanges: Type.Boolean(),
position: Type.Number(),
ids: Type.Array(Id),
total: Type.Optional(Type.Number()),
limit: Type.Optional(Type.Number())
})

export type QueryChangesRequest = Static<typeof QueryChangesRequest>
export const QueryChangesRequest = Type.Object({
accountId: Id,
filter: Type.Optional(Type.Union([
FilterOperator,
FilterCondition,
Type.Null()
])),
sort: Type.Optional(Type.Union([
Type.Array(Comparator),
Type.Null()
])),
sinceQueryState: Type.String(),
maxChanges: Type.Optional(Type.Union([
Type.Number(),
Type.Null()
])),
upToId: Type.Optional(Type.Union([
Id,
Type.Null()
])),
calculateTotal: Type.Optional(Type.Boolean())
})

export type AddedItem = Static<typeof AddedItem>
export const AddedItem = Type.Object({
id: Id,
index: Type.Number()
})

export type QueryChangesResponse = Static<typeof QueryChangesResponse>
export const QueryChangesResponse = Type.Object({
accountId: Id,
oldQueryState: Type.String(),
newQueryState: Type.String(),
total: Type.Optional(Type.Number()),
removed: Type.Array(Id),
added: Type.Array(AddedItem)
})

export type UploadingBlobResponse = Static<typeof UploadingBlobResponse>
export const UploadingBlobResponse = Type.Object({
accountId: Id,
blobId: Id,
type: Type.String(),
size: Type.Number()
})

export type DownloadingBlobResponse = Static<typeof DownloadingBlobResponse>
export const DownloadingBlobResponse = Type.Object({
accountId: Id,
blobId: Id,
type: Type.String(),
name: Type.String()
})

export type CopyBlobRequest = Static<typeof CopyBlobRequest>
export const CopyBlobRequest = Type.Object({
fromAccountId: Id,
accountId: Id,
blobIds: Type.Array(Id)
})

export type CopyBlobResponse = Static<typeof CopyBlobResponse>
export const CopyBlobResponse = Type.Object({
fromAccountId: Id,
accountId: Id,
copied: Type.Union([
Type.Record(Id, Id),
Type.Null()
]),
notCopied: Type.Union([
Type.Record(Id, SetError),
Type.Null()
])
})