import { ObjectProps } from '@utils/interfaces/query';
import { ObjectSchema } from 'joi';

type SchemaValidateReturns<T> = {
  error: boolean;
  result?: T;
  message?: string;
};

// helper for validating joi schemas
const schemaValidate = async <T>(d: ObjectSchema<T>, val: ObjectProps): Promise<SchemaValidateReturns<T>> => {
  return await d
    .validateAsync(val)
    .then((r) => {
      return {
        error: false,
        result: r
      };
    })
    .catch((e) => {
      return {
        error: true,
        message: e.details[0].message
      };
    });
};

export { schemaValidate };
