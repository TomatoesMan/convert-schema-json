import { domain, eachArray, eachObj, isArray, isFunction, isObject, isSchema, isString } from './utils';

const convert: any = (data: any, schema: any, index?: number) => {
    if (isString(schema)) {
        return domain(schema, data);
    } else if (isFunction(schema)) {
        return schema(data, index);
    } else if (isSchema(schema)) {
        let target;
        if (isArray(schema.key)) {
            target = [];
            eachArray(schema.key, (value: any) => {
                target.push(domain(value, data));
            })
        } else if (isObject(schema.key)) {
            target = {};
            target = convert(data, schema.key);
        } else {
            target = domain(schema.key, data);
        }
        return convert(target, schema.schema, index);
    } else if (isObject(schema)) {
        if (isObject(data)) {
            let target = {};
            eachObj(schema, (key: string, value: any) => {
                target[key] = convert(data, value);
            })
            return target;
        } else if (isArray(data)) {
            let target: any[] = [];
            eachArray(data, (value: any, index: number) => {
                target.push(convert(value, schema, index));
            })
            return target;
        }
    } else {
        return null;
    }
}

export default convert;