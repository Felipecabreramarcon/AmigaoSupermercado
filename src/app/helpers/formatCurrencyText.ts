export const formatCurrencyText = (text: string) => {
  return `R$ ${text.replace(".", ",")}`;
};
