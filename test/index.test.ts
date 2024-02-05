import { convert } from "../src";

describe('work', () => {
    it('coverJson', () => {
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
                schema: (args: string[]) => {
                    return args.join('-');
                }
            }
        }
        const res = convert(data, schema);
        console.log(res);
    })
})