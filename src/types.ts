export type EnvPrimitive = 'boolean' | 'string' | 'number'; // values can only have these three data types

export type EnvSchema = Record<string, EnvPrimitive>; // the keys must be strings and the values must be either one of the three mentioned in EnvPrimitive

export type InferType<T extends EnvPrimitive> = 
    T extends "string" ? string :
    T extends "boolean" ? boolean :
    T extends "number" ? number :
    never;


export type InferEnv<T extends EnvSchema> = {
    [K in keyof T]: InferType<T[K]>
}


export type EnvDefault<T extends EnvPrimitive> = [
    type : T,
    defaultValue: InferType<T>
]

export type EnvSchemaWithDefaults = Record<string, EnvDefault<EnvPrimitive>>;

export type InferEnvWithDefaults<T extends EnvSchemaWithDefaults> = {
    [K in keyof T]: InferType<T[K][0]>
}

export type InferOptionalEnv<T extends EnvSchema> = {
    [K in keyof T]?: InferType<T[K]>
}