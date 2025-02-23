'use client';

import { useFormBuilder } from '@/components/form-builder/hooks/use-form-builder';
import { Button } from '@/components/ui/button';
import { FormElementSelector } from '@/components/form-builder/components/form-elements-selector';
import { FormEdit } from '@/components/form-builder/components/form-edit';
import { FormPreview, FormPreviewProps } from '@/components/form-builder/components/form-preview';
import * as React from 'react';
import { CommandProvider } from '@/components/form-builder/hooks/use-command-ctx';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { templates } from '../constant/templates';
import { FormProps, UseFormReturn } from 'react-hook-form';
import { TemplatesSelect } from './templates-select';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

//======================================
export function FormBuilderMain() {
  const { submittedData, resetForm, form } = useFormBuilder();
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const setIsMS = useFormBuilderStore((s) => s.setIsMS);

  React.useEffect(() => {
    console.log(form);
    console.log(formElements)
  }, [formElements])

  return (
    <>
      <div className="w-full h-full grid md:grid-cols-12 gap-3 lg:gap-5 p-10">
        <CommandProvider>
          <FormElementSelector />
        </CommandProvider>
        <div className="px-4 sm:px-0 w-full md:col-span-6 min-w-full grow ">
          <div className="pb-4 flex-row-between">
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg"
              onClick={() => setIsMS(!isMS)}
            >
              {isMS ? 'Single-step' : 'Multi-step'} Form
            </Button>
            {formElements.length > 0 && (<div className='flex gap-2 '>
              <Dialog>
                <DialogTrigger>
                  <Button size="sm" className=' flex w-full gap-2 bg-[rgb(36,36,36)]'>
                    <Eye></Eye> Form Preview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Form Preview</DialogTitle>
                  <DialogDescription>
                    <FormPreview form={form}></FormPreview>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                variant="outline"
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
            )}
          </div>
          <FormEdit />
        </div>
        <div className="md:col-span-4 flex flex-col gap-2">
          <TemplatesSelect></TemplatesSelect>
        </div>
      </div>
    </>
  );
}
