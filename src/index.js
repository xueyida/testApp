import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const res = [
  {
    key: '12',
    id: '12',
    name: 'test',
    children: [
      {
        key: '123',
        id: '123',
        name: 'test1',
      }
    ]
  }
]

ReactDOM.render(
  <React.StrictMode>
    <App classAndStudentList={res} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
