"use client";
import { FormBuilderMain, type FormElementsProps } from '@/form-builder/components/form-builder-main';
import { redirect } from 'next/navigation';


export default function FormBuilderPage() {
  const handleCreate = (formElement: FormElementsProps) => {
    console.log(formElement);
    redirect("/preview");
  }
  return <div className='p-10'>
    <FormBuilderMain handleCreate={handleCreate} />
  </div>
}
