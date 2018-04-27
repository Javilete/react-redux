export function getMessageBy(field) {
  let errors = {
    'title': 'Title must be at least 5 characters',
    'category': 'Category must be at least 5 characters'
  }

  return errors[field];
}
