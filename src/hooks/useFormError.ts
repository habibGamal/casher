import { useState } from "react";
import { ErrorResult } from "../app/config/interfaces";

const useFormError = () => {

    const [errors, setErrors] = useState<ErrorResult[]>([]);

    const isError = (property: string) => {
        const result = errors?.filter(error => error.property === property).length > 0
        return result;
    }
    const getErrorMessage = (property: string) => {
        return errors?.filter(error => error.property === property)[0]?.message
    }
    return { errors, setErrors, isError, getErrorMessage }
}

export default useFormError;