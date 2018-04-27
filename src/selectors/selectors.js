//Function to be able to map object from API to the one use in the presentation component select
export function authorsFormattedforDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
};
