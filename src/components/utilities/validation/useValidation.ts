import { ValueNotFoundInCollection } from "./exceptions/ValueNotFoundInCollection";
import type { IValidation } from "./interfaces/useValidation";

function useValidations(): IValidation {
    const validateValueCollectionExists = ({
        collection,
        value
    }: { collection: Record<string, any>, value: string }): boolean => {
        const checkValueInCollection = Object.values(collection).includes(value);
        if (!checkValueInCollection) throw new ValueNotFoundInCollection(value, collection);
        return checkValueInCollection;
    }

    return {
        validateValueCollectionExists
    }
}

const { validateValueCollectionExists } = useValidations();
export { validateValueCollectionExists }