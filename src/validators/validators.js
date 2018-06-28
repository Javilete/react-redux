import { getMessageBy } from './errorMessages';

export class Validators {

  constructor(limit) {
    this.limit = limit;
  }

  validateCourse(course) {
    let errors = {};

    this.validateField(course.title, 'title', errors);
    this.validateField(course.category, 'category', errors);

    return errors;
  }

  validateAuthor(author) {
    let errors = {};

    this.validateField(author.firstName, 'firstName', errors);
    this.validateField(author.lastName, 'lastName', errors);

    return errors;
  }


  validateField(value, field, errors) {
    if (value.length < this.limit) {
      errors[field] = getMessageBy(field);
    }
  }
}
