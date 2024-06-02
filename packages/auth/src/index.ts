import { z } from 'zod';
import { createMongoAbility, CreateAbility, MongoAbility, AbilityBuilder } from '@casl/ability';

import { User } from './models/user';
import { permissions } from './permissions';
import { userSubject } from './subjects/user';
import { projectSubject } from './subjects/project';
import { organizationSubject } from './subjects/organization';
import { billingSubject } from './subjects/billing';
import { inviteSubject } from './subjects/invite';

/**
 * 1 -> Actions
 * The "manage" action, is like the current Role can do whatever he wants to do like CRUD (internal control)
 * 
 * 2 -> Subjects
 * The "all" subject, represents the idea of an entity could handle all the roles/managements/permissions (internal control)
 */
// const actions = ['manage', 'create', 'invite', 'delete'] as const;
// const subjects = ['User', 'Project', 'all'] as const;  //Be like entities (database entities)

const appAbilitiesSchema = z.union([
    userSubject,
    projectSubject,
    organizationSubject,
    billingSubject,
    inviteSubject,
    z.tuple([
        z.literal('manage'),
        z.literal('all')
    ])
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
    const builder = new AbilityBuilder(createAppAbility)

    //For security reasons, just check if the user's role was defined
    if (typeof permissions[user.role] !== 'function')
        throw new Error(`Permissions for role: ${user.role} not found`)

    permissions[user.role](user, builder)

    const ability = builder.build()

    return ability
}
