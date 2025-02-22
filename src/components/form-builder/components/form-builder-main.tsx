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

//======================================
export function FormBuilderMain() {
  const { submittedData, resetForm, form } = useFormBuilder();
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const setIsMS = useFormBuilderStore((s) => s.setIsMS);
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
            {formElements.length > 1 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={resetForm}
                className="rounded-lg"
              >
                Reset
              </Button>
            )}
          </div>
          <FormEdit />
        </div>
        <div className="md:col-span-4 flex flex-col">
          <TemplatesSelect></TemplatesSelect>
        </div>
      </div>
    </>
  );
}
