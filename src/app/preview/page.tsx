"use client";
import { FormPreview } from '@/form-builder/components/form-preview'
import { FormRender } from '@/form-builder/components/form-render'
import { templates } from '@/form-builder/constant/templates'
import type { FormElement, FormElementOrList, FormStep } from '@/form-builder/form-types';
import { useFormRenderer } from '@/form-builder/hooks/use-form-renderer';
import React from 'react'

const page = () => {
    return (
        <RenderTemplate templateName={'multiStepForm'} />
    )
}
const defaultValues = {
    "Name": "Subu",
    "last-name": "Acharya",
    "your-email": "subuacharya19@gmail.com",
    "phone-number": 9821504897,
    "preferences": [
        "technology"
    ],
    "Comment": "This is test"
};


const RenderTemplate = ({ templateName }: { templateName: string }) => {
    const formElements = templates[templateName]
        .template as FormElementOrList[];
    const { form } = useFormRenderer({ formElements: formElements, defaultValues: defaultValues });

    return (
        <div className='cursor-pointer'>
            <FormRender onSubmit={(value) => { console.log(value) }} form={form} formElements={formElements} disable />
        </div>
    );
}

export default page