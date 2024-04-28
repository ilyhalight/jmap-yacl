export type Id = string;
export type Date = string;
export type UTCDate = string;
export type Account<Capatibility extends string = string> = {
    name: string;
    isPersonal: boolean;
    isReadOnly: boolean;
    accountCapabilities: Record<Capatibility, unknown>;
};
export type Session<Capatibility extends string = string> = {
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
export type Invocation<T = unknown> = [
    name: string,
    arguments: T,
    methodCallId: string
];
export type Request<T = unknown> = {
    using: string[];
    methodCalls: Invocation<T>[];
    createdIds?: Record<Id, Id>;
};
export type Response<T = unknown> = {
    methodResponses: Invocation<T>[];
    createdIds?: Record<Id, Id>;
    sessionState: string;
};
export type ProblemDetails = {
    type: string;
    status?: number;
    title?: string;
    detail?: string;
    instance?: string;
};
export declare enum RequestErrorType {
    unknownCapatibility = "urn:ietf:params:jmap:error:unknownCapability",
    notJSON = "urn:ietf:params:jmap:error:notJSON",
    notRequest = "urn:ietf:params:jmap:error:notRequest",
    limit = "urn:ietf:params:jmap:error:limit"
}
export declare enum MethodErrorType {
    serverUnavailable = "serverUnavailable",
    serverFail = "serverFail",
    serverPartialFail = "serverPartialFail",
    unknownMethod = "unknownMethod",
    invalidArguments = "invalidArguments",
    invalidResultReference = "invalidResultReference",
    forbidden = "forbidden",
    accountNotFound = "accountNotFound",
    accountNotSupportedByMethod = "accountNotSupportedByMethod",
    accountReadOnly = "accountReadOnly"
}
export type ResultReference = {
    resultOf: string;
    name: string;
    path: string;
};
export declare enum Using {
    core = "urn:ietf:params:jmap:core",
    mail = "urn:ietf:params:jmap:mail",
    submission = "urn:ietf:params:jmap:submission",
    vacationresponse = "urn:ietf:params:jmap:vacationresponse"
}
export type GetRequest = {
    accountId: Id;
    ids?: Id[] | null;
    properties?: string[] | null;
};
export type GetResponse<T = unknown> = {
    accountId: Id;
    state: string;
    list: T[];
    notFound: Id[];
};
export type ChangesRequest = {
    accountId: Id;
    sinceState: string;
    maxChanges: number;
};
export type ChangesResponse = {
    accountId: Id;
    oldState: string;
    newState: string;
    hasMoreChanges: boolean;
    created: Id[];
    updated: Id[];
    destroyed: Id[];
};
export type SetRequest = {
    accountId: Id;
    ifInState?: string | null;
    create: Record<Id, any> | null;
    update: Record<Id, any> | null;
    destroy: Id[] | null;
};
export type SetError = {
    type: string;
    description: string | null;
    properties: string[] | null;
};
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
export type CopyRequest = {
    fromAccountId: Id;
    ifFromInState?: string | null;
    accountId: Id;
    ifInState?: string | null;
    create?: Record<Id, any> | null;
    onSuccessDestroyOriginal?: boolean;
    destroyFromIfInState?: string | null;
};
export type CopyResponse = {
    fromAccountId: Id;
    accountId: Id;
    oldState: string | null;
    newState: string;
    created: Record<Id, any> | null;
    notCreated: Record<Id, SetError> | null;
};
export type FilterCondition = {};
export type FilterOperator = {
    operator: "AND" | "OR" | "NOT";
    conditions: (FilterOperator | FilterCondition)[];
};
export type Comparator = {
    property: string;
    isAscending?: boolean;
    collation?: string;
};
export type QueryRequest = {
    accountId: Id;
    filter?: FilterOperator | FilterCondition | null;
    sort?: Comparator[] | null;
    position?: number;
    anchor?: Id | null;
    anchorOffset?: number;
    limit?: number | null;
    calculateTotal?: boolean;
};
export type QueryResponse = {
    accountId: Id;
    queryState: string;
    canCalculateChanges: boolean;
    position: number;
    ids: Id[];
    total?: number;
    limit?: number;
};
export type QueryChangesRequest = {
    accountId: Id;
    filter?: FilterOperator | FilterCondition | null;
    sort?: Comparator[] | null;
    sinceQueryState: string;
    maxChanges?: number | null;
    upToId?: Id | null;
    calculateTotal?: boolean;
};
export type AddedItem = {
    id: Id;
    index: number;
};
export type QueryChangesResponse = {
    accountId: Id;
    oldQueryState: string;
    newQueryState: string;
    total?: number;
    removed: Id[];
    added: AddedItem[];
};
export type UploadingBlobResponse = {
    accountId: Id;
    blobId: Id;
    type: string;
    size: number;
};
export type DownloadingBlobResponse = {
    accountId: Id;
    blobId: Id;
    type: string;
    name: string;
};
export type CopyBlobRequest = {
    fromAccountId: Id;
    accountId: Id;
    blobIds: Id[];
};
export type CopyBlobResponse = {
    fromAccountId: Id;
    accountId: Id;
    copied: Record<Id, Id> | null;
    notCopied: Record<Id, SetError> | null;
};
//# sourceMappingURL=jmap.d.ts.map