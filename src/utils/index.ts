export const isType = (data: any, type: string) => {
    return Object.prototype.toString.call(data) === `[object ${type}]`;
}

export const isArray = (data: any) => {
    return Array.isArray(data);
}

export const isString = (data: any) => {
    return typeof data === 'string';
}

export const isFunction = (data: any) => {
    return typeof data === 'function';
}

export const isObject = (data: any) => {
    return isType(data, 'Object');
}

export const isStringArray = (data: any) => {
    return isArray(data) && data.every((item: any) => isString(item));
}

export const isSchema = (data: { key: any, schema: any }) => {
    return isObject(data) && (isString(data.key) || isObject(data.key) || isStringArray(data.key)) && (isObject(data.schema) || isFunction(data.schema));
}

export const domain = (key: string, data: object): any => {
    if (!data) return;
    const index = key.indexOf('.');
    return index < 0
        ? data[key]
        : domain(key.slice(index + 1), data[key.slice(0, index)]);
}

export const eachObj = (data: object, cb: (key: string, value: any, data: object) => any) => {
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (cb(key, data[key], data)) {
                return;
            }
        }
    }
}

export const eachArray = (data: any[], cb: (value: any, index: number, data: object) => any) => {
    let i = 0;
    const len = data.length;
    while (i < len) {
        if (cb(data[i], i, data)) {
            return;
        }
        i++;
    }
}

