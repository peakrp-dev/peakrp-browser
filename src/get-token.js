const regex = /peakrp:\/\/(.+?)\/?$/;

module.exports = (url) => {
  const matches = url.match(regex);

  if (matches === null || matches.length < 2) {
    return '';
  }

  return matches[1];
};
