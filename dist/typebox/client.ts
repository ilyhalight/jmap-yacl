import { Type, Static } from '@sinclair/typebox'


export type Credentials = Static<typeof Credentials>
export const Credentials = Type.Object({
username: Type.String(),
password: Type.String()
})