
function callback(){
	return {
		data: 1,
		success: 200,
	}
}


jest.mock(callback);



describe('my dom  show test', () => {
	test('dom click test', () => {


			document.body.innerHTML =
				'<div>' +
				'  <span id="username">bn</span>' +
				'  <button id="button" />' +
				'</div>';
			
			require('./dom')
    
			document.getElementById('button').click();

			console.log(document.getElementById('username').text);
			
			expect(document.getElementById('username').text).toBe('abc');	

    });
});