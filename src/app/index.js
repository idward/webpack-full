// import '@babel/polyfill';
import '../assets/css/main.css';
import '../assets/css/iconfont.css';
import '../assets/css/index.scss';
import * as _ from 'lodash';
import print from './print';

// ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => {
      // eslint-disable-next-line
      console.log('sw注册成功');
    })
    .catch(() => {
      // eslint-disable-next-line
      console.log('sw注册失败');
    });
}

const add = (x, y) => x + y;

print();

// lazy loading
document.getElementById('lazy').addEventListener('click', () => {
  import(/* webpackChunkName:'test', webpackPrefetch: true */ './test.js')
    .then(m => {
      // eslint-disable-next-line
      console.log(m);
    })
    .catch(() => {
      // eslint-disable-next-line
      console.log('加载失败');
    });
});

// eslint-disable-next-line
console.log(add(2, 2));
// eslint-disable-next-line
console.log(_);

// import(/* webpackChunkName:'test' */'./test.js')
//   .then(m => {
//     // eslint-disable-next-line
//     console.log(m);
//   })
//   .catch(() => {
//     // eslint-disable-next-line
//     console.log('加载失败');
//   });

const promise = new Promise((resolve, reject) => {
  try {
    setTimeout(() => {
      // eslint-disable-next-line
      console.log('Resolve Successfully!');
      resolve('done');
    }, 1000);
  } catch (err) {
    reject(err);
  }
});

// eslint-disable-next-line
console.log(promise);

// 只针对非入口文件做HMR(热模块替换)功能
if (module.hot) {
  module.hot.accept('./print.js', () => {
    print();
  });
}
