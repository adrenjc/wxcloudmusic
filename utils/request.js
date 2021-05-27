import Taro from '@tarojs/taro';

const request = (url, data = {}, method = 'GET') => {
  return new Promise((res, rej) => {
    Taro.request({
      url,
      data,
      method,
      success: (info) => {
        res(info);
      },
      fail: (err) => {
        rej(err);
      },
    });
  });
};

export default request;
