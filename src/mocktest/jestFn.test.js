import { runCallback } from './demo';

describe('模拟函数', () => {
    test('jest fn函数mock', () => {
        const mockFn = jest.fn();
        // 没有内部实现的时候返回undefined

        runCallback(mockFn); // mockFn被回调函数执行, 会在mockFn上挂在一个mock属性，方便我们跟踪函数的调用

        expect(mockFn).toBeCalled(); // mock函数被执行
    });
});