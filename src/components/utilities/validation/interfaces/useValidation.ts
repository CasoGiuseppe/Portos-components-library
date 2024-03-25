export interface IValidation {
    validateValueCollectionExists({ collection, value }:{ collection: Record<string, any>, value: string }): boolean;
}