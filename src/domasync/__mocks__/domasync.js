
import request from '../request';

document.getElementById('button').click = function(){
    const restMock = request.mockResolvedValue("biuuu00000000")

   
    restMock()
    .then(data => {
        document.getElementById('username').text = data;
    })
}
