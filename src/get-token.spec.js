const getToken = require('./get-token');

test('should return an empty string if the url is an emptry string', () => {
  const url = '';
  const token = getToken(url);
  expect(token).toBe('');
});

test('should return an empty string if the url is not in the correct format', () => {
  const url = 'gibberish';
  const token = getToken(url);
  expect(token).toBe('');
});

test('should return the token when the url does not have a trailing slash', () => {
  const url = 'peakrp://token123';
  const token = getToken(url);
  expect(token).toBe('token123');
});

test('should return the token when the url has a trailing slash', () => {
  const url = 'peakrp://token123/';
  const token = getToken(url);
  expect(token).toBe('token123');
});
