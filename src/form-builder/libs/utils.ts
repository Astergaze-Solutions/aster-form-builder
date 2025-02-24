export const isStatic = (fieldType: string) => {
  return ['Separator', 'H1', 'H2', 'H3', 'P'].includes(fieldType);
};
