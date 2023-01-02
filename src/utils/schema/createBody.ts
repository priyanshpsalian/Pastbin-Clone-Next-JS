import { ApiCreatePasteBody } from '@utils/interfaces/paste';
import Joi from 'joi';

const ApiCreateBodySchema = Joi.object<ApiCreatePasteBody>({
  filename: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  description: Joi.string().allow('').default(false),
  isPrivate: Joi.boolean().default(false),
  expiryDate: Joi.date().iso().min('now').allow(null).raw()
}).with('filename', 'content');

export { ApiCreateBodySchema };
