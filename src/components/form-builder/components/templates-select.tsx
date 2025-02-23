
import { templates } from '@/components/form-builder/constant/templates';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { FormElementOrList } from '../form-types';
import { useForm } from 'react-hook-form';
import { FormRender } from './form-render';
import { useFormRenderer } from '../hooks/use-form-renderer';


const formTemplates = Object.entries(templates).map((template) => ({
  label: template[1].name,
  value: template[0],
}));
//======================================
export function TemplatesSelect() {
  return (
    <div className=" flex flex-col gap-2  border rounded-sm border-dashed  p-3">
      <h1 className='font-bold text-lg text-center mb-3'>Templates</h1>
      {formTemplates.map(({ label, value }) => (
        <RenderTemplate templateName={value} key={label}></RenderTemplate>
      ))}
    </div>
  );
}

const RenderTemplate = ({ templateName }: { templateName: string }) => {
  const setTemplate = useFormBuilderStore((s) => s.setTemplate);
  const formElements = templates[templateName]
    .template as FormElementOrList[];
  const { form } = useFormRenderer({ formElemetns: formElements });
  return (
    <div className='cursor-pointer' onClick={() => setTemplate(templateName)}>
      <FormRender onSubmit={() => { }} form={form} formElements={formElements} />
    </div>
  );
}
