import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { templates } from '@/components/form-builder/constant/templates';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { ChevronDown } from 'lucide-react';

const formTemplates = Object.entries(templates).map((template) => ({
  label: template[1].name,
  value: template[0],
}));
//======================================
export function TemplatesSelect() {
  const setTemplate = useFormBuilderStore((s) => s.setTemplate);
  return (
    <div className=" flex flex-col gap-2  border rounded-sm border-dashed  p-3">
      <h1 className='font-bold text-lg text-center mb-3'>Templates</h1>

      {formTemplates.map(({ label, value }) => (
        <div key={label} onClick={() => setTemplate(value)} className='border p-2 rounded-lg cursor-pointer h-32 flex items-center justify-center'>
          {label}
        </div>
      ))}
    </div>
  );
}
