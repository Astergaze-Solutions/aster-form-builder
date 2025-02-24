'use client';;
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Circle, Eye, Trash } from 'lucide-react';
import type { FormElementList, FormStep } from '../form-types';
import { CommandProvider } from '../hooks/use-command-ctx';
import { useFormBuilder } from '../hooks/use-form-builder';
import useFormBuilderStore from '../hooks/use-form-builder-store';
import { FormEdit } from './form-edit';
import { FormElementSelector } from './form-elements-selector';
import { FormPreview } from './form-preview';

//======================================
export type FormElementsProps = FormStep[] | FormElementList
interface props {
  handleCreate: (formElements: FormElementsProps) => void
}
export function FormBuilderMain({ handleCreate }: props) {
  const { resetForm, form } = useFormBuilder();
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const setIsMS = useFormBuilderStore((s) => s.setIsMS);
  return (
    <CommandProvider>
      <div className="w-full h-full grid md:grid-cols-5  gap-3 lg:gap-5">
        <FormElementSelector />
        <div className="px-4 sm:px-0 w-full md:col-span-4 min-w-full grow">
          <div className='m-auto  max-w-[800px]'>
            <div className="pb-4 flex-row-between">
              <Button
                size="sm"
                variant="outline"
                className="rounded-lg"
                onClick={() => setIsMS(!isMS)}
              >
                {isMS ? 'Single-step' : 'Multi-step'} Form
              </Button>
              <Button
                size="sm"
                variant="default"
                className="rounded-lg bg-primary"
                onClick={() => handleCreate(formElements)}
              >
                Create
              </Button>
            </div>
            <div className=' border rounded-xl'>
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
                          <Eye size={20} /> Preview
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Form Preview</DialogTitle>
                        <DialogDescription>
                          <FormPreview form={form} />
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
        </div>
      </div>
    </CommandProvider>
  );
}
