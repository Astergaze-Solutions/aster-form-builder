// 'use client';

// import { templates } from '@/components/form-builder/constant/templates';
// import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
// import type { FormElementOrList } from '../form-types';
// import { useFormRenderer } from '../hooks/use-form-renderer';
// import { FormRender } from './form-render';


// const RenderTemplate = ({ templateName }: { templateName: string }) => {
//   const setTemplate = useFormBuilderStore((s) => s.setTemplate);
//   const formElements = templates[templateName]
//     .template as FormElementOrList[];
//   const { form } = useFormRenderer({ formElemetns: formElements });
//   return (
//     <div className='cursor-pointer' onClick={() => setTemplate(templateName)}>
//       <FormRender onSubmit={() => { }} form={form} formElements={formElements} />
//     </div>
//   );
// }
