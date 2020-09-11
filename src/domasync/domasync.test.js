// The assertion for a promise must be returned.
jest.mock('./request');

jest.mock('./domasync');

test('异步dom测试',  async () => {

    document.body.innerHTML =
    '<div>' +
    '  <span id="username">bn</span>' +
    '  <button id="button" />' +
    '</div>';

    // console.log(document.getElementById('username').text);
    require('./domasync');
    
    document.getElementById('button').click();

    console.log(document.getElementById('username').text);

    // expect(document.getElementById('username').text()).toBe('Mark');
});

