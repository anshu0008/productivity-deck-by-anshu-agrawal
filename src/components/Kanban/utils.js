export const formatText = text => {
  if (text.length > 30) {
    return `${text.slice(0, 1).toUpperCase() + text.substring(0, 30)}...`;
  }

  return text;
};
