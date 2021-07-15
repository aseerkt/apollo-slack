import { Error, ValidationError } from 'sequelize';

export default function formatErrors(error) {
  if (error instanceof ValidationError) {
    return error.errors.map(({ path, message }) => ({ path, message }));
  }
  return [{ path: 'unknown', message: 'something went wrong' }];
}
