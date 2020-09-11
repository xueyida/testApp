// __tests__/user-test.js
jest.mock('./request');

import * as user from './user';

// The assertion for a promise must be returned.
test('works with async/await',  async () => {
  const res = await user.getUserName(4);
  expect(res).toEqual('Mark')
});


test('works with promise',  () => {
  user.getUserName(4).then(data => expect(data).toEqual('Mark'));

  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});



test('works with done',   done => {
  user.getUserName(4).then(data => {
    expect(data).toEqual('Mark');
    done();
  });
});




