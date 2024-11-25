export { default } from "./client";

export * as JMAP from "./types/jmap";
export * as JMAPMail from "./types/mail";
export type { Credentials } from "./types/client";

export { default as BaseAPI } from "./api/base";
export { default as BlobAPI } from "./api/blob";
export { default as CoreAPI } from "./api/core";
export { default as EmailAPI } from "./api/email";
export { default as EmailSubmissionAPI } from "./api/emailSubmission";
export { default as IdentityAPI } from "./api/identity";
export { default as MailAPI } from "./api/mailbox";
export { default as SearchSnippetAPI } from "./api/searchSnippet";
export { default as ThreadAPI } from "./api/thread";
export { default as VacationResponseAPI } from "./api/vacationResponse";
