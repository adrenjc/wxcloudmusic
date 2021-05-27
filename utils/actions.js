import request from './request';

let URL = 'http://localhost:4000';

//轮播图
export const getBanner = (type) => {
  return request(URL + '/banner', type);
};

//获取推荐歌单
export const getPersonalized = () => {
  return request(URL + '/personalized');
};

export const getToplist = () => {
  return request(URL + '/toplist');
};

export const getTopsong = (id) => {
  return request(URL + '/playlist/detail', { id });
};
