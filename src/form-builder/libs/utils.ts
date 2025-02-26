import type { FormElement, FormElementOrList, FormStep } from '../form-types';

export const isStatic = (fieldType: string) => {
  return ['Separator', 'H1', 'H2', 'H3', 'P'].includes(fieldType);
};

export const disableAllElements = (
  formElements: FormElementOrList[]
): FormElementOrList[] => {
  const disableElement = (formElement: FormElement): FormElement => {
    if (formElement.static) {
      return formElement;
    }
    return { ...formElement, disabled: true };
  };

  return formElements.map((element) => {
    if (Array.isArray(element)) {
      // If the element is an array, recursively process each item in the array
      return element.map((subElement) => disableElement(subElement));
    } else if ((element as unknown as FormStep).stepFields !== undefined) {
      // If the element is a FormStep, recursively process its stepFields
      const formStep = element as unknown as FormStep;
      return {
        ...formStep,
        stepFields: disableAllElements(formStep.stepFields),
      };
    } else {
      // If the element is a FormElement, disable it
      return disableElement(element as FormElement);
    }
  });
};
