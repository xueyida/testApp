
import request from './request';

document.getElementById('button').click = function(){
    const userID = '4';
    request('/users/' + userID).then(user => {
        document.getElementById('username').text = user.name;
    });
}
