'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Form, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RenderFormElement } from '@/form-builder/components/render-form-element';
import type { FormElement } from '@/form-builder/form-types';
import useFormBuilderStore from '@/form-builder/hooks/use-form-builder-store';
import { useMediaQuery } from '@/form-builder/hooks/use-media-query';
import { isStatic } from '@/form-builder/libs/utils';
import { Plus, X } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit } from 'react-icons/fa';

const inputTypes = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'number', label: 'Number' },
  { value: 'password', label: 'Password' },
  { value: 'tel', label: 'Telephone' },
];
interface OptionsInterface {
  value: string,
  label: string
}
function FormElementOptions({
  fieldIndex,
  close,
  j,
  stepIndex,
  ...formElement
}: FormElement & {
  fieldIndex: number;
  stepIndex?: number;
  j?: number;
  close: () => void;
}) {
  const form = useForm<FormElement>({
    defaultValues: formElement as FormElement,
  });
  const { handleSubmit, getValues, setValue } = form;

  //Options
  const optionLabelRef = React.useRef(null);
  const hasOptions = ['Select', 'MultiSelect', 'RadioGroup'].includes(formElement.fieldType);
  const [options, setOptions] = React.useState<OptionsInterface[]>(hasOptions ? (formElement as any).options : [])

  const addOption = () => {
    if (!optionLabelRef.current) return;
    const labelElement = optionLabelRef.current as HTMLInputElement;
    if (labelElement.value.trim() === "") return;
    const newOption: OptionsInterface = {
      value: (options.length + 1).toString(),
      label: labelElement.value
    }
    setOptions((opt) => [...opt, newOption]);
    labelElement.value = "";
  }

  React.useEffect(() => {
    if (hasOptions) {
      setValue("options", options);
    }
  }, [options]);

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((opt, i) => i !== index);
    const updatedValues: OptionsInterface[] = updatedOptions.map((opt, i) => {
      return {
        label: opt.label,
        value: (i + 1).toString()
      }
    });
    setOptions(updatedValues);
  }
  const editOption = (index: number, value: string) => {
    const updatedOptions: OptionsInterface[] = options.map((opt, i) => {
      if (i === index) {
        const updatedOption: OptionsInterface = { value: opt.value, label: value };
        return updatedOption;
      }
      return opt;
    });
    setOptions(updatedOptions);
  }
  const editElement = useFormBuilderStore((s) => s.editElement);
  const onSubmit = () => {
    editElement({
      fieldIndex: fieldIndex,
      modifiedFormElement: getValues(),
      j,
      stepIndex,
    });
    close();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-3 border-t border-dashed"
      >
        <div>
          {isStatic(formElement.fieldType) ? (
            <div className="mb-4">
              <RenderFormElement
                formElement={{
                  name: 'content',
                  label: `Customize ${formElement.fieldType}`,
                  fieldType: 'Input',
                  defaultValue: formElement.content,
                  required: true,
                }}
                form={form}
              />
            </div>
          ) : (
            <div className="flex flex-col w-full gap-3 mb-2">
              <div className="flex flex-row items-center justify-between gap-2 w-full">

                <RenderFormElement
                  formElement={{
                    name: 'label',
                    label: 'Title',
                    fieldType: 'Input',
                    type: 'text',
                    required: true,
                  }}
                  form={form}
                />
                <RenderFormElement
                  formElement={{
                    name: 'placeholder',
                    label: 'Placeholder',
                    fieldType: 'Input',
                    type: 'text',
                    required: true,
                  }}
                  form={form}
                />
              </div>
              <RenderFormElement
                formElement={{
                  name: 'description',
                  label: 'Describe the field',
                  fieldType: 'Input',
                  placeholder: 'Add a description',
                }}
                form={form}
              />
              <div className="flex flex-row items-center justify-between gap-2 w-full">
                {formElement.fieldType === 'Input' && (
                  <RenderFormElement
                    formElement={{
                      name: 'type',
                      label: 'Select input type',
                      fieldType: 'Select',
                      options: inputTypes,
                      required: true,
                      placeholder: 'Select input type',
                    }}
                    form={form}
                  />
                )}
              </div>
              <div className="flex flex-row items-center justify-start gap-4 pl-1">
                <RenderFormElement
                  formElement={{
                    name: 'required',
                    label: 'Required',
                    fieldType: 'Checkbox',
                  }}
                  form={form}
                />
                <RenderFormElement
                  formElement={{
                    name: 'disabled',
                    label: 'Disabled',
                    fieldType: 'Checkbox',
                  }}
                  form={form}
                />
              </div>
              {hasOptions ? (
                <div className='flex flex-col gap-2'>
                  <FormLabel className='text-gray-500'>Options</FormLabel>
                  <div className='flex flex-col gap-2 border rounded-lg w-fit p-3 '>
                    <div className='flex gap-2'>
                      <Input ref={optionLabelRef} placeholder='Option Name' />
                      <Button type='button' onClick={addOption} variant={"outline"} size={"sm"}><Plus /></Button>
                    </div>
                    <hr />
                    {options.map((opt, i) => (
                      <div key={opt.value} className='flex gap-2 items-center'>
                        <div>{opt.value}.</div>
                        <Input onChange={(e) => editOption(i, e.target.value)} className='w-44 bg-white' value={opt.label} />
                        <Button onClick={() => removeOption(i)} type='button' className='duration-100' variant={"ghost"}> <X size={16} /></Button>
                      </div>
                    ))}
                  </div>
                </div>

              ) : ""}

              {formElement.fieldType === 'Slider' && (
                <div className="flex flex-row items-center justify-between gap-3">
                  <RenderFormElement
                    formElement={{
                      name: 'min',
                      label: 'Min value',
                      fieldType: 'Input',
                      type: 'number',
                      defaultValue: formElement.min,
                      required: true,
                    }}
                    form={form}
                  />
                  <RenderFormElement
                    formElement={{
                      name: 'max',
                      label: 'Max value',
                      fieldType: 'Input',
                      type: 'number',
                      defaultValue: formElement.max,
                      required: true,
                    }}
                    form={form}
                  />
                  <RenderFormElement
                    formElement={{
                      name: 'step',
                      label: 'Step value',
                      fieldType: 'Input',
                      type: 'number',
                      defaultValue: formElement.step,
                      required: true,
                    }}
                    form={form}
                  />
                </div>
              )}
              {formElement.fieldType === 'ToggleGroup' && (
                <RenderFormElement
                  formElement={{
                    name: 'type',
                    label: 'Choose single or multiple choices',
                    fieldType: 'ToggleGroup',
                    options: [
                      { value: 'single', label: 'Single' },
                      { value: 'multiple', label: 'Multiple' },
                    ],
                    defaultValue: formElement.type,
                    required: true,
                    type: 'single',
                  }}
                  form={form}
                />
              )}
              <RenderFormElement
                formElement={{
                  name: 'name',
                  label: 'Name attribute (leave as it is or put unique name)',
                  fieldType: 'Input',
                  defaultValue: formElement.name,
                  required: true,
                }}
                form={form}
              />

            </div>
          )}
        </div>
        <div className="flex flex-row items-center justify-end gap-3 w-full">
          <Button size="sm" variant="ghost" onClick={close} type="button">
            Cancel
          </Button>
          <Button size="sm" type="submit" variant="default">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function FieldCustomizationView({
  fieldIndex,
  formElement,
  j,
  stepIndex,
}: {
  fieldIndex: number;
  j?: number;
  formElement: FormElement;
  stepIndex?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const close = () => setOpen(false);
  const title = 'Customize form field attributes';
  const SavedFormElementOptions = () => (
    <FormElementOptions
      fieldIndex={fieldIndex}
      stepIndex={stepIndex}
      j={j}
      {...formElement}
      close={close}
    />
  );
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className=" h-9 hover:bg-gray-200"
          >
            <FaEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px]">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className='max-h-[80vh] overflow-y-auto p-2'>
            <SavedFormElementOptions />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-xl h-9"
        >
          <FaEdit />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-start">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <SavedFormElementOptions />
      </DrawerContent>
    </Drawer>
  );
}
