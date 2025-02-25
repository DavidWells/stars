---
repo: dharmax/am-i-allowed
url: 'https://github.com/dharmax/am-i-allowed'
homepage: null
starredAt: '2021-12-01T05:05:36Z'
createdAt: '2020-11-23T14:07:33Z'
updatedAt: '2021-12-01T07:16:18Z'
language: TypeScript
license: NA
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:33.121Z'
description: 'A sweet, zero-dependencies, agnostic, powerful permission/authorization module'
tags: []
---

# Am I Allowed
Agnostic, zero-dependencies, powerful, flexible and very easy to use permission/authorization 
library. 

## Background
Throughout the last 20 years or so, I worked with different implementations of permission systems and I also had
to implement such things myself three different times (and used each one in more than one application) in
various languages.
 
I learned that a good permission system can benefit and enrich a product quite a bit, feature wise, with little effort,
so it was always one of the first thing i implemented in new applications.  

This is the 4th time i write such a library, and i managed to make it totally agnostic to
anything but the JavaScript language. 

It is a rather well documented, small TypeScript code, so for now most of the documentation
would be in the source.  

## Features
* Role-based
* Permission groups
* Hooks up to any storage for its own data with nearly zero effort
* Hooks up to any entity model you already have with nearly zero effort
* Built in rich, expandable Operations taxonomy that makes life easier.
* Smart default system to minimize coding and configuration of roles etc.   
* Sophisticated built-in logic which is easily expandable/replaced.
* The above feature set provides a practical support for either RBAC, ABAC, DAC and MAC.
* It is easy to write a fontend for it, for role assignment and definition, etc., as well as to wrap it as a micro
service and externalize its elegant API. 
 
 ### Advantages over existing solutions
 There are other (very good) libraries that do similar things. This one, however, is tighter and smaller yet very powerful 
 thanks to the utilization of Javascript specific features, and a design approach that says: keep it simple, even if the requirements
 are real-world sophisticated. For example:
 1. A simple application can easily use the group mechanism instead of using even a single role.
 1. The same mechanism can be used for simple DAC, too. 
 1. A complex application may easily override the default logic and add fine-grained, context sensitive logic
 only in the specific cases and entities it is needed (ABAC style).
 1. You can easily define permission inheritance.         

## Install
`npm i am-i-allowed`

## Terminology 
* **Actor** - a user (or an entity) that may act on entities, and you wish to have access-control over it.
* **A privilege-managed Entity** - an entity on which actions can be performed that you wish you manage the access to these actions
* **Group** a logical group to which actors and entities may belong to. both entities and actors may belong to multiple groups.
* **Group member** - a user whose groups intersect with the entity's group. One common group is enough.
* **Operation** - a named logical operation that must appears in the operation's taxonomy.
* **Operation taxonomy** - a tree structures where the operations are the nodes. It eases definition of privileges and rules.
For example, if you give a WriteAnything permission, it is implicitly permits all the operations underneath
it, such as ReadAnything, WriteCommon, and more. 
* **Levels of operations** - that's what the taxonomy represents.  
* **User** - an actor that has an id. Normally, but not exclusively - it is a user which is logged in. Such
users may have default permissions on entity types, or roles on entities (that is, without regard to who is the 
user specifically).
* **Visitor** - an actor with no id. Normally, it denotes a user which is not logged in. As it is with User,
you can have default permissions and specific roles for that kind of actors.
* **Group Specific Permissions** - are permissions defined on an entity per specific actor groups
     

## How to use
*kindly note that the documentation is a work in still a work in progress*


### Preparations
In order to use am-i-allowed, you need
1. Your actors (users, normally, but not necessarily exclusively) to adhere to IActor interface,
which means, they must have a string-able `id` member and, if you want to use groups, a `groups` member (names/ids of groups)
1. The entities you want to be access-managed, should adhere to the IPrivilegeManaged interface, which must also include a string-able `id`
and *may* include a few other members, for less than basic features. 
1. You need to have a persistent storage for the privilege manager, which must answer the IPermissionStore interface. A reference implementation
is provided in the `MemoryPermissionStore` class.

### Usage flow
1. You need to instantiate the `PrivilegeManager`
1. Now you're ready to define Rules (`privilegeManager.addRole`) and groups (just have them listed in entities and actors respective members)
Of course - your storage will store the definitions, so basically, you need to do that just for the cold-start.
1. You can assign and un-assign roles now (`privilegeManager.assignRole`, etc) and see the roles for a user on an entity and so on.  
1. Managing the permission groups are your responsibility - these are simply fields in the actor and entities. You
may even provide functions that return them (sync or async)
1. Group specific permissions can also be specified in the entity's meta data 
   

### Advanced Options
1. The most important extra member of `IPrivilegeManaged` is `permissionsMetaData` (static member - 
   either an async method or static data). If one is not provided, it is automatically created with just the default configuration.
1. It is common to define default permissions to _Visitors_ and _Users_ in some of your entity types.
1. You can also add default permissions to _Group members_ and define groups for your entities and users
and sometimes it is enough to have a nice access-control mechanism. 
1. You can also change the `permissionsMetaData.groupMembershipMandatory` and combine specific roles
with group membership to easily add DAC like behavior.
1. You can bestow entity's access control responsibility to another entity instead of defining per the entity
using `IPrivilegeManaged.permissionSuper`; if the access is denied by the entity itself (which is the pure default, if 
no roles, groups, etc are set in the entity) then it will seek permission at that "super" entity.
1. You can override the normal permission-checking logic using `IPrivilegeManaged.customPermissionChecker`. You
can easily add exclusions and inclusions there (you can access the `standardPermissionChecker` method from it)
and, for example, use the specialContext in your new or additional logic (ABAC style).
1. Even static, arbitrary objects may be managed, not only model entities. Such objects could be used to 
represent virtual functional entities, such as "System Administration" and so on. If it is such an object,
you can use ids such as "System", and make sure to add `__name` member to it (can also be "System").
1. You can define specific roles for specific group members over an entity type. Simply add a role that
have the name `MemberOfMyGroup` where `MyGroup` is the name/id of the group.


# Simple Example 
```ts
import {
    IActor,
    IPrivilegeManaged,
    MemoryPermissionStore,
    Operation,
    PermissionsMetaData,
    PrivilegeManager,
    standardPermissionChecker
} from "../src";
import {expect} from 'chai'


// lets define a class for Workshop and define access control policy....
class Workshop implements IPrivilegeManaged {

    constructor(readonly id: string) {
    }

    // this is the access-control policy:
    static permissionsMetaData = new PermissionsMetaData('Workshop', {
        // everyone may buy or order stuff...
        defaultUserPermissions: ['Buy', 'Order'],
        // and let's not hide anything from the IRS people....
        groupPermissions: {IRS: 'ReadDeep'}
    })

}

// now, this special workshop, works only on certain hours....
class SpecialWorkshop extends Workshop {

    constructor(id: string, public orderHour: 'Morning' | 'Afternoon' | 'All day') {
        super(id);
    }

    // let's define a costume permission checker that checks the time of day in the process
    static customPermissionChecker = async (privilegeManager: PrivilegeManager, actor: IActor, operation: Operation, entity: IPrivilegeManaged, specialContext?: any): Promise<boolean> => {

        const workshop = entity as SpecialWorkshop // just for better type checking...

        if (workshop.orderHour !== 'All day') {
            if (isMorning() !== (workshop.orderHour === 'Morning'))
                return false // no point to check further if the workshop is closed
        }

        // otherwise, check permissions normally....
        return standardPermissionChecker(privilegeManager, actor, operation, entity, specialContext)

    }
}

describe('Testing am-i-allowed ', () => {

    // let's emulate a simple user database....
    const myUsers: { [name: string]: IActor } = {
        Jeff: {id: '1', groups: 'workers'},
        Shay: {id: '2', groups: 'admin'},
        customer1: {id: '3', groups: ['customers']} // yes, you can provide an array and even an async function
    }

    // lets emulate a workshops database....
    const myEntities: { [name: string]: IPrivilegeManaged } = {
        Workshop: new Workshop('12'),
        MorningWorkshop: new SpecialWorkshop('13', 'Morning'),
    }

    // lets represent our system administration aspect here....
    const sysAdmin = {
        ___name: 'System', // an optional display name
        id: 'System',  // an ID
        permissionGroupIds: 'admin', // we'll set it as part of the admin group
        permissionsMetaData: new PermissionsMetaData('System', {
            // let's give all users that belong to the admin, Admin privileges
            defaultGroupMemberPermissions: new Set<Operation>(['Admin'])
        })
    }

    // this would be our access control manager, set to work with the simplistic memory backend
    const pm = new PrivilegeManager(new MemoryPermissionStore())

    // now, let's add a Seller role....
    const RoleSalesPerson = pm.addRole('Seller', ['ReadDeep', 'Sell'], Workshop)

    // now let's test it!
    it('should be able to assign roles, groups, check privileges', async () => {

        // those are our workshops...
        const workShop1 = myEntities['Workshop'];
        const morningWorkshop = myEntities['MorningWorkshop'];

        // and those are the actors....
        const jeff = myUsers['Jeff'];
        const shai = myUsers['Shay']
        const customer = myUsers['customer1']
        const IRSMan = {id: 'irs1', groups: 'IRS'}

        // let's assign a specific role to Jeff, our sales person
        await pm.assignRole(workShop1, jeff, RoleSalesPerson)

        expect(await pm.isAllowed(jeff, 'ReadDeep', workShop1)).to.be.true;
        expect(await pm.isAllowed(jeff, 'ReadCommon', workShop1)).to.be.true;
        expect(await pm.isAllowed(jeff, 'WriteAnything', workShop1)).to.be.false;
        expect(await pm.isAllowed(shai, 'EditAnything', sysAdmin)).to.be.true;
        expect(await pm.isAllowed(jeff, 'EditAnything', sysAdmin)).to.be.false;

        expect(await pm.isAllowed(jeff, 'Buy', workShop1)).to.be.true;
        expect(await pm.isAllowed(customer, 'Order', workShop1)).to.be.true;

        // lets check our custom permission logic
        expect(await pm.isAllowed(customer, 'Order', morningWorkshop)).to.be.equal(isMorning());

        // let's see: a customer shouldn't be able to deep-read, but IRS representative should...
        expect(await pm.isAllowed(customer, 'ReadDeep', workShop1)).to.be.false
        expect(await pm.isAllowed(IRSMan, 'ReadDeep', workShop1)).to.be.true

        // extracting roles
        expect(await pm.getRolesForActor(jeff, workShop1)).to.be.lengthOf(1)
        console.log(await pm.getRolesForActor(jeff, workShop1))

    })
})

function isMorning(time?: Date) {
    const hour = (time || new Date()).getHours()
    return hour < 12 && hour > 6
}
```

 

## License
 
[ISC](https://opensource.org/licenses/ISC) 

