import * as languages from './languages';

const getCodeLanguage = (filename: string): string => {
  const ext = filename.split('.', -1);

  const c = languages[ext[ext.length - 1]];

  if (c) return c.name;

  return 'text';
};

export { getCodeLanguage };
