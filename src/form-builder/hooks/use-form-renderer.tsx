'use client';;
import type { FormElement, FormElementList, FormStep } from '@/form-builder/form-types';
import { flattenFormSteps } from '@/form-builder/libs/form-elements-helpers';
import { generateZodSchema } from '@/form-builder/libs/generate-zod-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';

//-------------------------------------------
interface DefaultValues {
    [key: string]: any;
}
interface props {
    formElements: FormStep[] | FormElementList
    defaultValues?: DefaultValues
}
export const useFormRenderer = ({ formElements, defaultValues: userInputs }: props) => {

    const isMS = (formElements[0] as FormStep)?.stepFields !== undefined;

    const flattenFormElements = isMS
        ? flattenFormSteps(formElements as FormStep[]).flat()
        : (formElements.flat() as FormElement[]);

    const filteredFormFields = flattenFormElements.filter((o) => !o.static);

    const defaultValues: DefaultValues = filteredFormFields.reduce(
        (acc: DefaultValues, element) => {
            acc[element.name] = element?.defaultValue ?? '';
            return acc;
        },
        {},
    );

    const zodSchema = generateZodSchema(filteredFormFields);

    const form = useForm({
        defaultValues: userInputs ? userInputs : defaultValues,
        resolver: zodResolver(zodSchema),
    });

    const { watch, reset } = form;
    const [submittedData, setSubmittedData] = React.useState({});

    React.useEffect(() => {
        const { unsubscribe } = watch((data) => {
            setSubmittedData(data);
        });
        return unsubscribe;
    }, [watch]);


    const onSubmit = async (data: any) => {
        setSubmittedData(data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return {
        form,
        submittedData,
        onSubmit,
    };
};
