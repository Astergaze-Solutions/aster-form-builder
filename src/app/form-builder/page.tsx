"use client"
import { FormBuilderMain, type FormElementsProps } from '@/components/form-builder/components/form-builder-main';

export default function FormBuilderPage() {
  const handleCreate = (formElement: FormElementsProps) => {
    console.log(formElement);
  }
  return <div className='p-10'>
    <FormBuilderMain handleCreate={handleCreate} />
  </div>
}
