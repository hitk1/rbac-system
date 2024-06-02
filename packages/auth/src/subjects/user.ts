/**
 * Safer permissions properties
 * the following statement creates a constraint when we try to define the permissions for current Role
 * The meaning is that the available 'actions' for role 'User' is all the values stored in the array first position
 */

import { z } from "zod"

export const userSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('get'),
        z.literal('update'),
        z.literal('delete'),
    ]),
    z.literal('User')
])
export type UserSubject = z.infer<typeof userSubject>