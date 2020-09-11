describe('my dom  test', () => {
	test('dom click test', () => {


		document.body.innerHTML =
			'<div>' +
			'  <span id="username">bn</span>' +
			'  <button id="button" />' +
			'</div>';
		
		require('./dom')


		document.getElementById('button').click();

		expect(document.getElementById('username').text).toBe('abc');	

	});
});


describe('普通函数测试', () => {

	function fntest(a){
		return a+1;
	}

	test('function test', () => {
		const res = fntest(2);
		expect(res).toBe(3);
	})

})


