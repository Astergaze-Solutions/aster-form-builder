'use client';
import { FieldCustomizationView } from '@/components/form-builder/components/field-customization-view';
import { FormElementsDropdown } from '@/components/form-builder/components/form-elements-dropdown';
import { StepContainer } from '@/components/form-builder/components/step-container';
import type {
  FormElement,
  FormElementOrList,
  FormStep,
} from '@/components/form-builder/form-types';
import useFormBuilderStore from '@/components/form-builder/hooks/use-form-builder-store';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AnimatePresence, Reorder } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { LuGripVertical } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import { RenderFormElement } from './render-form-element';

type EditFormItemProps = {
  element: FormElement;
  /**
   * Index of the main array
   */
  fieldIndex: number;
  /**
   * Index of the nested array element
   */
  j?: number;
  stepIndex?: number;
};

const EditFormItem = (props: EditFormItemProps) => {
  const { element, fieldIndex } = props;
  const dropElement = useFormBuilderStore((s) => s.dropElement);
  const isNested = typeof props?.j === 'number';
  let DisplayName =
    'label' in element
      ? element?.label
      : 'content' in element
        ? element.content
        : element.name;
  const slicedDisplayName = DisplayName?.split(' ').slice(0, 5) ?? [];

  DisplayName =
    slicedDisplayName.length > 4
      ? `${slicedDisplayName.join(' ')} ...`
      : slicedDisplayName.join(' ');
  const form = useForm();
  return (
    <div className="relative w-full group">
      <div className=" flex-row-between p-2">
        <div className="flex-row-start gap-2 size-full">
          {isNested ? (
            <span className="w-1" />
          ) : (
            <LuGripVertical className="dark:text-muted-foreground text-muted-foreground group-hover:opacity-100 opacity-0 transition-all" />
          )}
          <Form {...form}>
            <RenderFormElement formElement={element} form={form} />
          </Form>
        </div>

        <div className="right-3 -top-6  bg-background  absolute flex-row-end opacity-0 group-hover:opacity-100 duration-75 border border-dashed border-gray-300 rounded-lg">
          {element.fieldType !== 'Separator' && (
            <FieldCustomizationView
              formElement={element as FormElement}
              fieldIndex={fieldIndex}
              j={props?.j}
              stepIndex={props?.stepIndex}
            />
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              dropElement({
                fieldIndex,
                j: props?.j,
                stepIndex: props?.stepIndex,
              });
            }}
            className=" h-9 hover:bg-gray-200 "
          >
            <MdDelete />
          </Button>
          {!isNested && (
            <FormElementsDropdown
              fieldIndex={fieldIndex}
              stepIndex={props?.stepIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const NoStepsPlaceholder = () => {
  const { addFormStep } = useFormBuilderStore();
  return (
    <div className="flex-col-center gap-4 text-muted-foreground">
      <Button size="sm" onClick={() => addFormStep(0)}>
        Add first Step
      </Button>
    </div>
  );
};
//======================================
export function FormEdit() {
  const isMS = useFormBuilderStore((s) => s.isMS);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const reorder = useFormBuilderStore((s) => s.reorder);

  const animateVariants = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };
  switch (isMS) {
    case true:
      if (formElements.length === 0) {
        return <NoStepsPlaceholder />;
      }
      return (
        <div className="flex flex-col gap-4 select-none">
          {(formElements as FormStep[]).map((step, stepIndex) => {
            return (
              <div key={step.id}>
                <StepContainer key={stepIndex} stepIndex={stepIndex}>
                  <Reorder.Group
                    axis="y"
                    onReorder={(newOrder) => {
                      reorder({ newOrder, stepIndex });
                    }}
                    values={step.stepFields}
                    className="flex flex-col gap-2"
                    tabIndex={-1}
                  >
                    <AnimatePresence mode="popLayout">
                      {step.stepFields.map((element, fieldIndex) => {
                        if (Array.isArray(element)) {
                          return (
                            <Reorder.Item
                              value={element}
                              key={element.map((f) => f.name).join('-')}
                              className="relative group rounded-xl p-1.5  justify-start  border border-transparent hover:border-dashed hover:border-gray-300 bg-background"
                              variants={animateVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                            >
                              <Button
                                onClick={() => {
                                  reorder({
                                    newOrder: element.reverse(),
                                    fieldIndex,
                                    stepIndex,
                                  });
                                }}
                                variant="ghost"
                                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-75 bg-background border border-dashed border-gray-300 z-10 -left-4 top-[50%] p-0 -translate-y-[50%] rounded-full w-10 h-10"
                              >
                                <ArrowLeftRight size={16} className="dark:text-muted-foreground text-muted-foreground" />
                              </Button>
                              <div className="flex items-center justify-start grow flex-wrap sm:flex-nowrap w-full gap-2">
                                {element.map((el, j) => (
                                  <div
                                    key={el.name + j}
                                    className="w-full"
                                  >
                                    <EditFormItem
                                      fieldIndex={fieldIndex}
                                      j={j}
                                      element={el}
                                      stepIndex={stepIndex}
                                    />
                                  </div>
                                ))}
                              </div>
                            </Reorder.Item>
                          );
                        }
                        return (
                          <Reorder.Item
                            key={element.name + stepIndex + 10}
                            value={element}
                            className="w-full rounded-xl border border-transparent hover:border-dashed hover:border-gray-300 py-1.5 bg-background"
                            variants={animateVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          >
                            <EditFormItem
                              fieldIndex={fieldIndex}
                              element={element}
                              stepIndex={stepIndex}
                            />
                          </Reorder.Item>
                        );
                      })}
                    </AnimatePresence>
                  </Reorder.Group>
                </StepContainer>
              </div>
            );
          })}
        </div>
      );
    default:
      return (
        <Reorder.Group
          axis="y"
          onReorder={(newOrder) => {
            reorder({ newOrder, fieldIndex: null });
          }}
          values={formElements as FormElementOrList[]}
          className="flex flex-col gap-2"
          tabIndex={-1}
        >
          <AnimatePresence mode="popLayout">
            {(formElements as FormElementOrList[]).map((element, i) => {
              if (Array.isArray(element)) {
                return (
                  <Reorder.Item
                    value={element}
                    key={element.map((f) => f.name).join('-')}
                    variants={animateVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative group rounded-xl p-1.5  justify-start  border border-transparent hover:border-dashed hover:border-gray-300 bg-white"

                  >
                    <div className="flex items-center justify-start gap-2 ">
                      <Button
                        onClick={() => {
                          reorder({
                            newOrder: element.reverse(),
                            fieldIndex: i,
                          });
                        }}
                        variant="ghost"
                        className="absolute opacity-0 group-hover:opacity-100 transition-all duration-75 bg-background border border-dashed border-gray-300 z-10 -left-4 top-[50%] p-0 -translate-y-[50%] rounded-full w-10 h-10"
                      >
                        <ArrowLeftRight size={16} className="dark:text-muted-foreground text-muted-foreground" />
                      </Button>
                      <div className="flex items-center justify-start grow flex-wrap sm:flex-nowrap w-full gap-2">
                        {element.map((el, j) => (
                          <div
                            key={el.name + j}
                            className="w-full "
                          >
                            <EditFormItem
                              key={el.name + j}
                              fieldIndex={i}
                              j={j}
                              element={el}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reorder.Item>
                );
              }
              return (
                <Reorder.Item
                  key={element.name}
                  value={element}
                  className="rounded-xl border border-transparent hover:hover:border-dashed hover:border-gray-300 py-1.5 w-full bg-white"
                  variants={animateVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <EditFormItem
                    key={element.name + i}
                    fieldIndex={i}
                    element={element}
                  />
                </Reorder.Item>
              );
            })}
          </AnimatePresence>
        </Reorder.Group>
      );
  }
}
