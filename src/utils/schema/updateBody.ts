import { ApiUpdatePasteBody } from '@utils/interfaces/paste';
import Joi from 'joi';

const ApiUpdateBodySchema = Joi.object<ApiUpdatePasteBody>({
  filename: Joi.string().min(1),
  content: Joi.string().min(1),
  description: Joi.string(),
  isPrivate: Joi.bool(),
  expiryDate: Joi.date().min('now').allow(null).raw()
});

export { ApiUpdateBodySchema };
