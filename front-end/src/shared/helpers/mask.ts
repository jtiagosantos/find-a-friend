const phoneMask = (input: string) => {
  input = input.replace(/\D/g, '');
  input = input.replace(/^(\d)/, '($1');
  input = input.replace(/^(\(\d{2})(\d)/, '$1) $2');
  input = input.replace(/(\d{5})(\d{1,5})/, '$1-$2');
  input = input.replace(/(-\d{4})\d+?$/, '$1');

  return input;
};

const zipCodeMask = (input: string) => {
  input = input.replace(/\D/g, '');
  input = input.replace(/(\d{5})(\d{1,3})/, '$1-$2');

  return input.substring(0, 9);
};

export const mask = {
  phoneMask,
  zipCodeMask,
};
