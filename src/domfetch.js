function fetchCurrentUser(callback) {
  callback({
    loggedIn: '123',
    fullName: 'xueyida',
  });
}

module.exports = fetchCurrentUser;