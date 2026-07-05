---
repo: asantibanez/practical
url: 'https://github.com/asantibanez/practical'
homepage: null
starredAt: '2017-01-25T01:28:23Z'
createdAt: '2017-01-20T20:08:30Z'
updatedAt: '2022-03-18T19:33:08Z'
language: JavaScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:48.312Z'
description: Practical ActiveRecord for DynamoDB
tags: []
---


Practical
=========

A practical DynamoDB Active Record library.

Practical was built to simplify interactions with Amazon's DynamoDB. This NoSQL 
database is really powerful but the documentation is not easily read or understood. 
Practical takes away the burden allowing an accessing DynamoDB records in an Active 
Record fashion. 

Practical is heavily influenced by Laravel's Eloquent ORM (https://laravel.com/docs/5.3/eloquent) because 
of its fluent and expressive syntax when working with databases. Practical tries to 
emulate some of its features by allowing direct mapping to DynamoDB tables by configuring 
a Javascript class with your model's definition.

Practical uses Promises to return values when accessing the database. `Bluebird` 
library (http://bluebirdjs.com) implementation is used for this matter. 

**Note**

This is a WIP. Feel free to give any feedback on the library. Everyone welcomed!

## Installation

```
npm install practical
```


## Usage

To use `practical`, first start by creating a new Javascript class file that will represent 
a record of any of your database tables. In this class file, require `practical` package and 
extend your class with `practical`'s Model base class.

```
'use strict';

const Model = require('practical');

class Customer extends Model {

}

module.exports = Customer;
```

Afterwards, define a `config()` method that will provide `practical` the configuration of
database table. In this method you can define the following parameters:
- **tableName**: Name of your database table
- **hashKey**: Name of your table's hash key
- **rangeKey**: Name of your table's range key if any (Optional)
- **attributes**: Array with all attributes you want to use in your table. 
- **hasOne, hasMany, belongsTo**: defines relationships with other tables.

Below is an example of our `Customer`'s class with a sample configuration.

```
'use strict';

const Model = require('practical');

class Customer extends Model {
    this.config() {
        this.tableName = 'Customers';
        this.hashKey = 'customerId';
        this.attributes = [
            'customerId',
            'firstName',
            'lastName',
            'email'
        ];
    }
}

module.exports = Customer;
```

With the class and configuration in place, you can interact with your table and record
with the following methods. For each of the methods, you will require to pass along a 
`Dynamo.DocumentClient` object 
(http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)
already setup with your credentials. You can setup a Dynamo.DocumentClient in the 
following matter:

```
const AWS = require('aws-sdk');

AWS.config.credentials = new AWS.SharedIniFileCredentials({
    profile: 'your-aws-profile-id' // Located in ~./aws/credentials file
});
AWS.config.update({ region: 'your-aws-region' });

const dynamoDocClient = new AWS.DynamoDB.DocumentClient();
```

### Get all Records from Table

```
const Customer = require('path/to/your/class');
Customer.all(dynamoDocClient)
    .then(customers => {
        //Work with returned records of Customers table
    });
```

You can limit the records you want returned with the `withLimit` method. When chaining
other methods, you issue the fetch request with the `get` method.

```
const Customer = require('path/to/your/class');
Customer.withLimit(10).get(dynamoDocClient)
    .then(tenCustomers => {
        //Work with returned records of Customers table
    });
```

Custom Indexes are also supported. You can define use them with the `usingIndex` method and 
providing the `indexName, hashKey and rangeKey`

```
const Customer = require('path/to/your/class');
Customer.usingIndex('Email-Index', email).withLimit(10).get(dynamoDocClient)
    .then(tenCustomersOrderedByEmail => {
        //Work with returned records of Customers table
    });
```

### Find a specific record from Table

```
const Customer = require('path/to/your/class');
const customerId = 'your-customer-id';
Customer.find(dynamoDocClient, customerId)
    .then(customers => {
        //Work with returned records of Customers table
    });
```
This method also works with range keys if your table makes use of it.

### Creating records

To create a record in your table, you can use the `create` method passing along the data
you need as an object
```
const Customer = require('path/to/your/class');
const data = {
    customerId: 'your-id', 
    firstName: 'Andres', 
    lastName: 'Santibanez', 
    email: 'email@email.com'
};
Customer.create(dynamoDocClient, data)
    .then(customer => {
        //Work with saved customer record
    });
```

You can also create an instance of your table's class and assign the required values. 
Afterwards, use the `save` method to save the data in your table.

```
const Customer = require('path/to/your/class');

const customer = new Customer(dynamoDocClient);
customer.customerId = 'your-id'; 
customer.firstName = 'Andres'; 
customer.lastName = 'Santibanez'; 
customer.email = 'email@email.com';

customer.save()
    .then(customer => {
        //Work with saved customer record
    });
```

### Updating records

You can update records in the same fashion you create items in your database table. In order 
to update an item, have it retrieved from the database, modify the required attributes/data 
and then use the `save` method.

```
const Customer = require('path/to/your/class');

Customer.find(dynamoDocClient, 'your-id')
    .then(customer => {
        customer.email = 'new-email-value';
        return customer.save();
    })
    .then(updatedCustomer => {
        //Work with updated customer
    });
```

### Deleting records

To delete a record in your table, use the `destroy` method passing along the hash key 
and range key values of your item.

```
const Customer = require('path/to/your/class');

Customer.destroy(dynamoDocClient, 'your-customer-id')
    .then(() => {
        //Customer deleted successfully
    });
```

You can also make this on an instance object using the `trash` method

```
const Customer = require('path/to/your/class');

Customer.find(dynamoDocClient, 'your-customer-id')
    .then(customer => {
        return customer.trash();
    })
    .then(() => {
        //Customer deleted successfully
    });
```

## Relationships

With `practical` you can define relationships in your table classes in order to access 
related data easily. You can define the following relationships:
- BelongsTo
- HasOne
- HasMany

For example, lets assume we have a Customers and a Phones table. Every Customer may have 
one or multiple Phones. With this in place, we can assume the following relationships 
in our table classes

For `Customer` class, we can define the `hasMany` relationship providing a name for 
the relationship, the class constructor of the related model and an Index, Hash Key and 
Range Key if necessary.

```
const Customer = require('path/to/your/class');

class Customer extends Model {
    this.config() {
        this.tableName = 'Customers';
        this.hashKey = 'customerId';
        this.attributes = [
            'customerId',
            'firstName',
            'lastName',
            'email'
        ];
        
        const Phone = require('path/to/your/class');
        this.hasMany('phones', Phone, null, 'customerId');
    }
}

module.exports = Customer;
```

The inverse of this relationship will be defined in the `Phone` class.

```
const Phone = require('path/to/your/class');

class Phone extends Model {
    this.config() {
        this.tableName = 'Phones';
        this.hashKey = 'customerId';
        this.rangeKey = 'phoneId';
        this.attributes = [
            'customerId',
            'phoneId',
            'number',
            'notes'
        ];
        
        const Customer = require('path/to/your/class');
        this.belongsTo('customer', Customer, null, 'customerId');
    }
}

module.exports = Phone;
```

With this definition in place, we can make use of some "magic" methods `practical` setups 
when configuring your classes. These magic methods come with the name provided for the 
relationship in our class definition. 

For example, if we have a `Phone` instance and want to get the `Customer` record it
belongs to, we can use the method `customer` that `practical` defined behind the scenes.

```
const Phone = require('path/to/your/class');

Phone.first(dynamoDocClient)
    .then(phone => {
        return phone.customer();
    })
    .then(customer => {
        //Work with customer record 
    });
}
```

The same can be done for fetching all `Phone`s that a `Customer` has registered.

```
const Customer = require('path/to/your/class');

Customer.first(dynamoDocClient)
    .then(customer => {
        return customer.phones();
    })
    .then(phonesArray => {
        //Work with customer phones
    });
}
```

The **HasOne** relationship can be used for modeling 1 to 1 relationships. For example: 
A Customer has one Account.

```
const Customer = require('path/to/your/class');

class Customer extends Model {
    this.config() {
        this.tableName = 'Customers';
        this.hashKey = 'customerId';
        this.attributes = [
            'customerId',
            'firstName',
            'lastName',
            'email'
        ];
        
        const Phone = require('path/to/your/class');
        this.hasMany('phones', Phone, null, 'customerId');
        
        const Account = require('path/to/your/class');    
        this.hasOne('account', Account, null, 'customerId');
    }
}

module.exports = Customer;
```

As you can see in the previous example, you can add as many relationships as you need
providing a unique name for each one. Then you can access them by using the 
`relationshipName` method.

## TODO
* Support Dynamo Batch requests


## Licence

(The MIT License)

Copyright (c) 2017 Andrés Santibáñez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
