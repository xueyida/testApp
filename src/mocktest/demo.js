import axios from 'axios';

export const getData = () => {
    return axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res => {
        return res.data;
    });
};

// callBack调用
export const runCallback = (callback) => {
    callback('abc');
};

export const add = (a, b) => {
    return a + b;
};
