import * as React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { FaEdit } from 'react-icons/fa';
import type { FormElement } from '@/components/form-builder/form-types';
import { useForm } from 'react-hook-form';
import { Form, FormLabel } from '@/components/ui/form';
import { isStatic } from '@/components/form-builder/libs/utils';
import { RenderFormElement } from '@/components/form-builder/components/render-form-element';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { Input } from '@/components/ui/input';
import { Plus, Trash, Trash2, X } from 'lucide-react';

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
  const optionValueRef = React.useRef(null);
  const optionLabelRef = React.useRef(null);
  const hasOptions = ['Select', 'MultiSelect', 'RadioGroup'].includes(formElement.fieldType);
  const [options, setOptions] = React.useState<OptionsInterface[]>(hasOptions ? (formElement as any).options : [])

  const addOption = () => {
    if (!optionLabelRef.current || !optionValueRef.current) return;
    const labelElement = optionLabelRef.current as HTMLInputElement;
    const valueElement = optionValueRef.current as HTMLInputElement;
    if (labelElement.value.trim() === "") return;
    const newOption: OptionsInterface = {
      value: valueElement.value,
      label: labelElement.value
    }
    setOptions((opt) => [...opt, newOption]);
    labelElement.value = "";
    valueElement.value = (parseInt(valueElement.value) + 1).toString();
  }

  React.useEffect(() => {
    if (hasOptions) {
      setValue("options", options);
    }
  }, [options]);

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((opt, i) => i != index);
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
        {/* {JSON.stringify(watch(), null, 2)} {index} */}
        {/* {JSON.stringify(formElement, null, 2)} */}
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
            <div className="flex-col-start w-full gap-3 mb-2">
              <div className="flex-row-between gap-2 w-full">

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
              <div className="flex-row-between gap-2 w-full">
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
              {formElement.fieldType === 'Slider' && (
                <div className="flex-row-between gap-3">
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
              <div className="flex-row-start gap-4 pl-1">
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
            </div>
          )}
          {hasOptions ? (
            <div className='flex flex-col gap-2'>
              <FormLabel className='text-gray-500'>Options</FormLabel>
              <div className='flex flex-col gap-2 border rounded-lg w-fit p-3 '>
                <div className='flex gap-2'>
                  <Input ref={optionValueRef} placeholder='Value' className='w-10' defaultValue={options.length + 1} />
                  <Input ref={optionLabelRef} placeholder='Label' />
                  <Button type='button' onClick={addOption} variant={"outline"} size={"sm"}><Plus /></Button>
                </div>
                <hr />
                {options.map((opt, i) => (
                  <div className='flex gap-2 items-center'>
                    <div className=''> {opt.value}.</div>
                    <Input className='w-44 bg-white' defaultValue={opt.label}></Input>
                    <Button onClick={() => removeOption(i)} type='button' className='duration-100' variant={"ghost"}> <X size={16} /></Button>
                  </div>
                ))}

              </div>
            </div>

          ) : ""}
        </div>
        <div className="flex-row-end gap-3 w-full">
          <Button size="sm" variant="ghost" onClick={close} type="button">
            Cancel
          </Button>
          <Button size="sm" type="submit" variant="secondary">
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
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
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
