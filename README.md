## Schema To Json

This is a function that converts schema into json. It converts json into json. The type of schema can be function or object.

## Installation

```
npm i convert-schema-json
```

## Usage

```js
import { convert } from 'convert-schema-json';

// Ordinary use
const data = [
    {
        id: 1,
        name: 'Jack'
    },
    {
        id: 2,
        name: 'Tony'
    }
];
const schema = {Id: 'id', Name: 'name'};
const res = convert(data, schema);
// res = [ 
//     { Id: 1, Name: 'Jack' }, 
//     { Id: 2, Name: 'Tony' } 
// ]

// Support schema is a function

const data = [
    {
        id: 1,
        name: 'Jack',
        profession: 'programmer'
    },
    {
        id: 2,
        name: 'Tony',
        profession: 'barber'
    }
]
const schema = {
    Id: 'id',
    NameWithProfession: {
        key: ['name', 'profession'],
        schema: function(name, profession) {
            return `${name}-${profession}`
        }
    }
}
const res = convert(data, schema);
// res = [
//       { Id: 1, NameWithProfession: 'Jack-programmer' },
//       { Id: 2, NameWithProfession: 'Tony-barber' }
// ]

// Nested objects

const data = {
    id: 1,
    name: 'Jack',
    profession: 'programmer',
    son: {
        id: 2,
        name: 'Tony',
        profession: 'barber'
    }
}
const schema = {
    son_name: 'son.name',
    son_profession: 'son.profession'
}
const res = convert(data, schema);
// res = { son_name: 'Tony', son_profession: 'barber' }

// Nested objects with shcema is a function
const data = {
    id: 1,
    name: 'Jack',
    profession: 'programmer',
    son: {
        id: 2,
        name: 'Tony',
        profession: 'barber'
    }
}
const schema = {
    Id: 'id',
    fatherAndSonName: {
        key: ['name', 'son.name'],
        schema: (args) => {
            return args.join('-');
        }
    }
}
const res = convert(data, schema);
// res = { Id: 1, fatherAndSonName: 'Jack-Tony' }
```