"use client";;
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { MultiStepViewer } from '@/form-builder/components/multi-step-viewer';
import { RenderFormElement } from '@/form-builder/components/render-form-element';
import type { FormElementList, FormElementOrList, FormStep } from '@/form-builder/form-types';
import type { UseFormReturn } from 'react-hook-form';
import { disableAllElements } from '../libs/utils';

interface FormPreviewProps {
    form: UseFormReturn<any, any, undefined>;
    formElements: FormElementOrList[]
    onSubmit: (data: any) => void;
    disable?: boolean
}

export function FormRender({ form, formElements: initialElements, onSubmit, disable = false }: FormPreviewProps) {
    const isMS = (initialElements[0] as unknown as FormStep)?.stepFields !== undefined;
    const data = Object.keys(form.watch());
    const { formState } = form;
    const formElements = disable ? disableAllElements(initialElements) : initialElements;

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
                                disable={disable}
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
                        {!isMS && !disable && (
                            <div className="flex flex-row items-center justify-end w-full pt-3">
                                <Button type="submit" className="rounded-lg">
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
