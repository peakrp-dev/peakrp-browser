const regex = /peakrp:\/\/(.*)\/?/;

module.exports = (data) => {
  const matches = data.match(regex);

  if (matches === null || matches.length < 2) {
    return '';
  }

  return matches[1];
};
