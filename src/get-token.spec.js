const getToken = require('./get-token');

it('returns an empty string if the url is an emptry string', () => {
  const url = '';
  const token = getToken(url);
  expect(token).toBe('');
});

it('returns an empty string if the url is not in the correct format', () => {
  const url = 'gibberish';
  const token = getToken(url);
  expect(token).toBe('');
});

it('returns the token when the url does not have a trailing slash', () => {
  const url = 'peakrp://token123';
  const token = getToken(url);
  expect(token).toBe('token123');
});

it('returns the token when the url has a trailing slash', () => {
  const url = 'peakrp://token123/';
  const token = getToken(url);
  expect(token).toBe('token123');
});
