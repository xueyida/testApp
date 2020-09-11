// __tests__/timerGame-test.js
'use strict';

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('./timerGame');
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});


test('calls the callback after 1 second', () => {
    const timerGame = require('./timerGame');
    const callback = jest.fn();
  
    timerGame(callback);
  
    // 在这个时间点，定时器的回调不应该被执行
    expect(callback).not.toBeCalled();
  
    // “快进”时间使得所有定时器回调被执行
    jest.runAllTimers();
  
    // 现在回调函数应该被调用了！
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});
