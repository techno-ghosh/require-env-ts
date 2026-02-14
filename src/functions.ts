import { 
    EnvPrimitive, 
    EnvSchema, 
    EnvSchemaWithDefaults, 
    InferEnv, 
    InferEnvWithDefaults, 
    InferOptionalEnv
} from "./types";

function parseValue(key: string, rawValue: string, expectedType: EnvPrimitive) {

    switch(expectedType) {
            case 'string' : return rawValue;
                            
            case 'number' : const num = Number(rawValue);
                            if(Number.isNaN(num)) {
                                throw new Error(`Environment variable ${key} must be a number`);
                            }
                            return num;
                            
            case 'boolean' : 
                            if(rawValue === "true") return true;
                            else if (rawValue === "false") return false;
                            else {
                                throw new Error(`Environment variable ${key} must be either true or false`);
                            }
                            
        }

}




export function requireEnv<T extends EnvSchema>(schema: T): InferEnv<T> {

    const result: Partial<Record<keyof T, any>> = {};
    const missing: string[] = [];

    const keys = Object.keys(schema) as Array<keyof T>;

    for (const key of keys) {
        const envKey = String(key); // process.env needs a string key
        const rawValue = process.env[envKey];

        if (rawValue === undefined) {
        missing.push(envKey);
        continue;
        }

        result[key] = parseValue(envKey, rawValue, schema[key]); 
    }
    
    if(missing.length > 0) {
        throw new Error(`Missing environment variables: ${missing.join(", ")} `);
    }

    return result as InferEnv<T>;
}


export function OptionalEnv<T extends EnvSchema>(schema: T): InferOptionalEnv<T> {

    const result: Partial<Record<keyof T, unknown>> = {};
    const keys = Object.keys(schema) as Array<keyof T>;


    for(const key of keys) {

        const envKey = String(key);
        const raw = process.env[envKey];
        if(raw === undefined) continue;

        result[key] = parseValue(envKey, raw, schema[key]);
    }
    
    return result as InferOptionalEnv<T>;
}

export function requireEnvWithDefaults<T extends EnvSchemaWithDefaults>(schema: T): InferEnvWithDefaults<T>{

    const result: Partial<Record<keyof T, unknown>> = {};
    const keys = Object.keys(schema) as Array<keyof T>;

    for(const key of keys) {
        const envKey = String(key);
        const [expectedType, defaultValue] = schema[key];
        const raw = process.env[envKey];

        if(raw === undefined) {
            result[key] = defaultValue;
            continue;
        }

        result[key] = parseValue(envKey, raw, expectedType);

    }

    return result as InferEnvWithDefaults<T>;

}

export function validateEnumEnv<const A extends readonly string[]>(
    key: string, 
    allowed: A, 
    value: string | undefined = process.env[key]
):A[number] {

    if(value === undefined) {
        throw new Error(`Missing environment variable ${key} `)
    }

    if(!allowed.includes(value)) {
        throw new Error(
            `Environment variable ${key} must be one of ${allowed.join(", ")}`
        );
    }

    return value as A[number];
}