
const fetchCurrentUser = require('./domfetch.js');

document.getElementById('button').click(() => {
  fetchCurrentUser(user => {
    const loggedText = 'Logged ' + (user.loggedIn ? 'In' : 'Out');
    document.getElementById('username').text(user.fullName + ' - ' + loggedText);
  });
});

