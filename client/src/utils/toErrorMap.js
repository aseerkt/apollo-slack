export default function toErrorMap(errors) {
  return errors.map(({ path, message }) => ({ name: path, errors: [message] }));
}
