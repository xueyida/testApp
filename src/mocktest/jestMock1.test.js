jest.mock('./demo');

import { getData } from './demo';

describe('mock整个模块', () => {
    test('测试ajax',  () => {
        return getData()
        .then(res => {
            expect(res.data).toBe('hello world');
        })
    });
});