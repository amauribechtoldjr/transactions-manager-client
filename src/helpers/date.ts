export const formatDate = (date: string): string => {
  let convertedDate = new Date(date);
  return (
    ('0' + convertedDate.getDay()).slice(-2) +
    '/' +
    convertedDate.getMonth() +
    '/' +
    convertedDate.getFullYear() +
    ' ' +
    convertedDate.getHours() +
    ':' +
    ('0' + convertedDate.getMinutes()).slice(-2)
  );
};
