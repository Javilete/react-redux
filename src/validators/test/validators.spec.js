import expect from 'expect';
import {Validators} from '../validators';

describe('Validators', () => {

  describe('course form', () => {

    let validators = new Validators(5);

    it('should return errors empty when the course has all mandatory values', () => {
      const course = {
        title: 'Course title',
        category: 'Category'
      };

      expect(validators.validateCourse(course)).toEqual({});
    });

    it('should return title as error when it has less than five characters', () => {
      const course = {
        title: 'Cor',
        category: 'Category'
      };

      const errors = {
        title: 'Title must be at least 5 characters'
      };

      expect(validators.validateCourse(course)).toEqual(errors);
    });
  });

  describe('author form', () => {

    let validators = new Validators(3);

    it('should return errors empty when the author has all mandatory values', () => {
      const author = {
        firstName: 'Pepito',
        lastName: 'Grillo'
      };

      expect(validators.validateAuthor(author)).toEqual({});
    });

    it('should return firstName as error when it has less than three characters', () => {
      const course = {
        firstName: 'Pe',
        lastName: 'Grillo'
      };

      const errors = {
        firstName: 'First name must be at least 3 characters'
      };

      expect(validators.validateAuthor(course)).toEqual(errors);
    });
  });
});
