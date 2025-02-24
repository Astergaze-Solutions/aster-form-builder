import { FormElementsSelectorCommand } from '@/components/form-builder/components/form-elements-selector-command';
import { formElementsList } from '@/components/form-builder/constant/form-elements-list';
import type { FormElement } from '@/components/form-builder/form-types';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DynamicIcon } from 'lucide-react/dynamic';
import { MdAdd } from 'react-icons/md';
import { formElementsListIcon } from '../constant/form-elements-icons';

//======================================
export function FormElementSelector() {
  const appendElement = useFormBuilderStore((s) => s.appendElement);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  return (
    <ScrollArea
      className="border rounded-sm border-dashed overflow-auto p-3 w-full md:col-span-2"
      style={{
        height: '100%',
        maxHeight: '100vh',
      }}
    >

      <FormElementsSelectorCommand />
      <div className="flex md:flex-col flex-wrap gap-2 flex-row">
        {formElementsList.map((o) => (
          <Button
            key={o.name}
            size="sm"
            variant="secondary"
            onClick={() => {
              appendElement({
                fieldType: o.fieldType as FormElement['fieldType'],
                stepIndex: isMS ? formElements.length - 1 : undefined,
              });
            }}
            className="gap-1 justify-start rounded-lg w-fit md:w-full relative text-sm px-2"
          >
            <div className="flex-row-start gap-1">
              <MdAdd />
              <DynamicIcon name={formElementsListIcon[o.fieldType] as any} size={16} /> {o.name}

            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
