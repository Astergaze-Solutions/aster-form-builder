"use client";
import { Form } from '@/components/ui/form';
import { RenderFormElement } from '@/components/form-builder/components/render-form-element';
import type { FormElementList, FormElementOrList, FormStep } from '@/components/form-builder/form-types';
import { Button } from '@/components/ui/button';
import { MultiStepViewer } from '@/components/form-builder/components/multi-step-viewer';
import { useFormBuilder } from '@/components/form-builder/hooks/use-form-builder';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import type { UseFormReturn } from 'react-hook-form';
import * as React from 'react';

export interface FormPreviewProps {
    form: UseFormReturn<any, any, undefined>;
    formElements: FormStep[] | FormElementList
    onSubmit: (data: any) => void;
}

export function FormRender({ form, formElements, onSubmit }: FormPreviewProps) {
    const isMS = formElements[0].hasOwnProperty('stepFields');
    const data = Object.keys(form.watch());
    const { formState } = form;
    return (
        <div className="w-full animate-in rounded-md border">
            {data.length > 0 ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col p-2 md:p-5 w-full gap-2"
                    >
                        {isMS ? (
                            <MultiStepViewer
                                formElements={formElements as unknown as FormStep[]}
                                form={form}
                            />
                        ) : (
                            (formElements as FormElementOrList[]).map((element, i) => {
                                if (Array.isArray(element)) {
                                    return (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2"
                                        >
                                            {element.map((el, ii) => (
                                                <div key={el.name + ii} className="w-full">
                                                    <RenderFormElement formElement={el} form={form} />
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                                return (
                                    <div key={element.name + i} className="w-full">
                                        <RenderFormElement formElement={element} form={form} />
                                    </div>
                                );
                            })
                        )}
                        {!isMS && (
                            <div className="flex-row-end w-full pt-3">
                                <Button type="submit" className="rounded-lg" size="sm">
                                    {formState.isSubmitting
                                        ? 'Submitting...'
                                        : formState.isSubmitted
                                            ? 'Submitted ✅'
                                            : 'Submit'}
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            ) : (
                <div className="h-full py-10 px-3">
                    <p className="text-center text-muted-foreground text-lg">
                        Add form elements to preview
                    </p>
                </div>
            )}
        </div>
    );
}
