import { ValidationError } from 'sequelize';

export default function formatErrors(error) {
  if (error.code === '23503') {
  }
  if (error instanceof ValidationError) {
    return error.errors.map(({ path, message }) => ({ path, message }));
  }
  return [{ path: 'unknown', message: 'something went wrong' }];
}
