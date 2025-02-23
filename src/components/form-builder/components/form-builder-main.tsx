'use client';

import { useFormBuilder } from '@/components/form-builder/hooks/use-form-builder';
import { Button } from '@/components/ui/button';
import { FormElementSelector } from '@/components/form-builder/components/form-elements-selector';
import { FormEdit } from '@/components/form-builder/components/form-edit';
import { FormPreview, FormPreviewProps } from '@/components/form-builder/components/form-preview';
import * as React from 'react';
import { CommandProvider } from '@/components/form-builder/hooks/use-command-ctx';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { TemplatesSelect } from './templates-select';
import { Circle, Eye, Trash } from 'lucide-react';
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
        <div className="px-4 sm:px-0 w-full md:col-span-6 min-w-full grow">
          <div className="pb-4 flex-row-between">
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg"
              onClick={() => setIsMS(!isMS)}
            >
              {isMS ? 'Single-step' : 'Multi-step'} Form
            </Button>

          </div>
          <div className='m-auto border  max-w-[800px] rounded-xl'>
            <div className='w-full p-2 py-3 flex gap-2 justify-between'>
              <div className='flex flex-1 gap-2 items-center'>
                <Circle size={16} className='text-red-500 fill-red-500' />
                <Circle size={16} className='text-yellow-500 fill-yellow-500' />
                <Circle size={16} className='text-green-500 fill-green-500' />
              </div>
              <div className='flex flex-1 items-center justify-end pr-5'>
                {formElements.length > 0 && (<div className='flex gap-5 '>
                  <Dialog>
                    <DialogTrigger>
                      <div className='flex items-center gap-2 hover:text-gray-500 cursor-pointer'>
                        <Eye size={20}></Eye> Preview
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Form Preview</DialogTitle>
                      <DialogDescription>
                        <FormPreview form={form}></FormPreview>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                  <div className='flex items-center gap-2 hover:text-gray-500 cursor-pointer' onClick={resetForm}>

                    <Trash size={20} /> Reset

                  </div>
                </div>
                )}
              </div>
            </div>
            <hr />
            <div className='p-5'>
              <FormEdit />
            </div>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-2">
          <TemplatesSelect></TemplatesSelect>
        </div>
      </div>
    </>
  );
}
