"use client";
import { Button } from '@/components/ui/button';
import { FormRender } from '@/form-builder/components/form-render'
import { templates } from '@/form-builder/constant/templates'
import type { FormElementOrList } from '@/form-builder/form-types';
import useFormBuilderStore from '@/form-builder/hooks/use-form-builder-store';
import { useFormRenderer } from '@/form-builder/hooks/use-form-renderer';
import JsonView from '@uiw/react-json-view';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Page = () => {
    return (
        <RenderTemplate />
    )
}

const RenderTemplate = () => {
    const formElements = useFormBuilderStore(s => s.formElements);
    const [defaultValues, setDefaultValues] = useState();
    const { form: submissionForm } = useFormRenderer({ formElements: formElements });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied)
            setTimeout(() => {
                setCopied(false);
            }, 2000)
    }, [copied])
    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(formElements || {}));
        setCopied(true);
    };

    return (
        <div className='flex p-10 w-screen overflow-hidden'>
            <div className='flex-1 overflow-y-auto'>

                <div className='mx-auto max-w-[800px]'>
                    <h1 className='text-2xl font-bold flex justify-between mb-10'>Form Submission Preview
                    </h1>
                    <FormRender onSubmit={(value) => { setDefaultValues(value) }} form={submissionForm} formElements={formElements as FormElementOrList[]} />
                    <h1 className='text-2xl font-bold flex justify-between my-10'>Form Element Json
                    </h1>
                    <div className='border p-5 rounded-lg relative'>
                        {copied ? <span className='flex gap-2 items-center absolute right-1 top-1 text-green-500'><ClipboardCheck size={20} /> Copied</span> : <Clipboard size={20} className='absolute right-1 top-1 text-gray-500' onClick={handleCopy} />}
                        <JsonView value={formElements} collapsed={2} enableClipboard={false} displayDataTypes={false} />
                    </div>
                </div>
            </div>
            <RenderSubmittedDataTemplate defaultValues={defaultValues} formElements={formElements as FormElementOrList[]} />
        </div>

    );
}

const RenderSubmittedDataTemplate = ({ defaultValues, formElements }: { defaultValues: object | undefined, formElements: FormElementOrList[] }) => {
    const { form: submittedForm } = useFormRenderer({ formElements: formElements, defaultValues: defaultValues });
    useEffect(() => {
        if (defaultValues)
            submittedForm.reset({ ...defaultValues });
    }, [defaultValues])
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setCopied(false);
        }, 2000)
    }, [copied])
    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(defaultValues || {}));
        setCopied(true);
    }

    return (
        <div className='flex-1 overflow-y-auto border-l-2'>
            <div className='mx-auto max-w-[800px]'>
                <h1 className='text-2xl font-bold flex justify-between mb-10'>Submitted Form Preview
                </h1>
                <FormRender onSubmit={(value) => { console.log(value) }} form={submittedForm} formElements={formElements} disable />
                <h1 className='text-2xl font-bold flex justify-between my-10'>Submitted Data Preview
                </h1>
                <div className='border p-5 rounded-lg relative'>
                    {copied ? <span className='flex gap-2 items-center absolute right-1 top-1 text-green-500'><ClipboardCheck size={20} /> Copied</span> : <Clipboard size={20} className='absolute right-1 top-1 text-gray-500' onClick={handleCopy} />}
                    <JsonView value={defaultValues || {}} collapsed={2} enableClipboard={false} displayDataTypes={false} />
                </div>
            </div>
        </div>
    );
}
export default Page