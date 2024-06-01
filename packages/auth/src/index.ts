import { createMongoAbility, ForcedSubject, CreateAbility, MongoAbility, AbilityBuilder } from '@casl/ability';

/**
 * 1 -> Actions
 * The "manage" action, is like the current Role can do whatever he wants to do like CRUD (internal control)
 * 
 * 2 -> Subjects
 * The "all" subject, represents the idea of an entity could handle all the roles/managements/permissions (internal control)
 */
const actions = ['manage', 'invite', 'delete'] as const;
const subjects = ['User', 'all'] as const;  //Be like entities (database entities)

type AppAbilities = [
    typeof actions[number],
    typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], 'all'>>
];

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

const { build, can, cannot } = new AbilityBuilder(createAppAbility)

can('invite', 'User')
//CASL handle by default if some certain action was not declared, the current role cannot handle it
//The following statement isn't necessary
cannot('delete', 'User')

export const ability = build()
