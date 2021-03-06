export function getMessageBy(field) {
  let errors = {
    'title': 'Title must be at least 5 characters',
    'category': 'Category must be at least 5 characters',
    'firstName': 'First name must be at least 3 characters',
    'lastName': 'Last name must be at least 3 characters'
  };

  return errors[field];
}
