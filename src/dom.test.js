describe('my dom  test', () => {

			
	function fntest(a){
		return a+1;
	}
	test('dom click test', () => {


			document.body.innerHTML =
				'<div>' +
				'  <span id="username">bn</span>' +
				'  <button id="button" />' +
				'</div>';
			
			require('./dom')
    
			document.getElementById('button').click();

			const mockFn = jest.fn();
			console.log('******************');
			console.log(mockFn())

			// console.log(document.getElementById('username').text);
			
			expect(document.getElementById('username').text).toBe('abc');	

		});
		
			
	test('function test', () => {
		const res = fntest(2);
		expect(res).toBe(3);
	})
});


