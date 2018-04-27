import { getMessageBy } from './errorMessages';

export function validate(course) {
  let errors = {};

  validateField(course.title, 'title', errors);
  validateField(course.category, 'category', errors);

  return errors;
}

function validateField(value, field, errors) {
  if(value.length < 5) {
    errors[field] = getMessageBy(field);
  }
}
