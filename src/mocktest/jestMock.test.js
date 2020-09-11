jest.mock('axios');

import axios from 'axios';
import { getData } from './demo';



describe('改变模块的默认一些实现', () => {
    test('测试ajax', () => {
        axios.get.mockResolvedValue({data: 'hello world'});
        return getData().then(res => {
            expect(res).toBe('hello world');
        });
    });
});
