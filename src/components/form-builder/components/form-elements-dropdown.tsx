'use client';
import { formElementsList } from '@/components/form-builder/constant/form-elements-list';
import type { FormElement } from '@/components/form-builder/form-types';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DynamicIcon } from 'lucide-react/dynamic';
import { FaPlus } from 'react-icons/fa';
import { formElementsListIcon } from '../constant/form-elements-icons';

/**
 * Use for adding a nested form element
 */
//======================================
export function FormElementsDropdown({
  fieldIndex,
  stepIndex,
}: {
  /**
   * Field Index where a nested element should be appended to the main array
   */
  fieldIndex: number;
  stepIndex?: number;
}) {
  const appendElement = useFormBuilderStore((s) => s.appendElement);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-200 h-9">
          <FaPlus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        data-align="end" // not working
        className="space-y-3 max-h-64 overflow-y-scroll"
      >
        {formElementsList.map((o) => (
          <DropdownMenuItem
            onSelect={() => {
              appendElement({
                fieldIndex,
                fieldType: o.fieldType as FormElement['fieldType'],
                stepIndex,
              });
            }}
            key={o.name}
            disabled={!!o.static}
            className="px-4"
          >
            <DynamicIcon size={16} name={`${formElementsListIcon[o.fieldType]}` as any} />
            {o.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

