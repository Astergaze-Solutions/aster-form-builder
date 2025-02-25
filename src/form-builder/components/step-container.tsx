"use client";
import { Button } from '@/components/ui/button';
import useFormBuilderStore from '@/form-builder/hooks/use-form-builder-store';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useCommand } from '../hooks/use-command-ctx';

//======================================
export function StepContainer({
  children,
  stepIndex,
  fieldIndex,
}: {
  children: React.ReactNode;
  stepIndex: number;
  fieldIndex?: number;
}) {
  const { addFormStep, removeFormStep } = useFormBuilderStore();
  const { setStepIndex, setOpenCommand } = useCommand();
  const handleAddElement = () => {
    setStepIndex(stepIndex);
    setOpenCommand(true);
  }
  return (
    <motion.div
      key={stepIndex}
      className="rounded-lg px-3 md:px-4 md:py-5 py-4 border-dashed border bg-secondary/40 shadow-sm"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.05 } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
    >

      <div className="space-y-3">{children}</div>
      <div className="flex flex-row items-center justify-start my-3 text-muted-foreground">
        <Button size={"sm"} className='rounded-md' onClick={handleAddElement} variant={"default"}> <Plus /> Add Element</Button>
      </div>
      <div className="flex flex-row items-center justify-between px-2 pt-4 border-t">
        <div className="py-1 text-muted-foreground center font-medium">
          Step {stepIndex + 1}
        </div>
        <div className="flex flex-row items-center justify-end gap-3">
          <Button
            onClick={() => removeFormStep(stepIndex)}
            variant="ghost"
            size="icon"
            className="rounded-lg"
            type="button"
          >
            <MdDelete />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-lg"
            onClick={() => addFormStep(stepIndex)}
          >
            <MdAdd />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
