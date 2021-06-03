const regex = /peakrp:\/\/(.+?)\/?$/;

module.exports = (launchArg) => {
  const matches = launchArg.match(regex);

  if (matches === null || matches.length < 2) {
    return '';
  }

  return matches[1];
};
