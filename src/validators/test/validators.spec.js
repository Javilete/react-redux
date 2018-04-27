import expect from 'expect';
import { validate } from '../validators';

describe('Validators', () => {
  describe('course form', () => {
    it('should return errors empty when the course has all mandatory values', () => {
      const course = {
        title: 'Course title',
        category: 'Category'
      };

      expect(validate(course)).toEqual({});
    });

    it('should return title as error when it has less than five characters', () => {
      const course = {
        title: 'Cor',
        category: 'Category'
      };

      const errors = {
        title: 'Title must be at least 5 characters'
      };

      expect(validate(course)).toEqual(errors);
    });
  });
});
