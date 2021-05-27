import React, { useState, useEffect, useRef } from 'react';
import { AtIcon } from 'taro-ui';
import {
  View,
  // Text,
  Swiper,
  SwiperItem,
  Image,
  ScrollView,
} from '@tarojs/components';

import 'taro-ui/dist/style/components/icon.scss'; // 引入所需的组件样式 - 方式三
import './index.scss';
import {
  getBanner,
  getPersonalized,
  getToplist,
  getTopsong,
} from '../../../utils/actions';

import Header from '../../component/header';

function Index() {
  const [banner, setBanner] = useState([]);
  const [recommend, setCommend] = useState();
  const [topArr, setTopArr] = useState();

  const topId = useRef([]);
  useEffect(() => {
    const featchData = async () => {
      const value = await getBanner(2);
      setBanner(value.data.banners);
      const value2 = await getPersonalized();
      const {
        data: { result = {} },
      } = value2;
      setCommend(result.slice(0, 10));
    };
    featchData();
  }, []);
  useEffect(() => {
    const featchData = async () => {
      const value3 = await getToplist();

      const {
        data: { list = {} },
      } = value3;
      topId.current = list.slice(0, 4);
      let arr = [];

      topId.current.map(async (items) => {
        const value = await getTopsong(items.id);
        const {
          data: {
            playlist: { tracks },
          },
        } = value;

        let obj = {};
        obj.name = value.data.playlist.name;
        obj.arr = tracks.slice(0, 5);
        arr.push(obj);
        if (arr.length === 4) {
          setTopArr(arr);
        }
      });
    };

    featchData();
  }, []);
  return (
    <View>
      <Swiper
        className='banner'
        indicatorDots
        indicatorColor='ivory'
        indicatorActiveColor='#d43c33'
        autoplay
        circular>
        {banner
          ? banner.map((items) => (
              <SwiperItem key={items.encodeId}>
                <Image src={items.imageUrl} className='image-banner'></Image>
              </SwiperItem>
            ))
          : null}
      </Swiper>
      <View className='icon-list'>
        <View className='icon-box'>
          <AtIcon
            className='icon'
            value='heart'
            size='30'
            color='#FFF'></AtIcon>
          <View className='icon-title'>每日推荐</View>
        </View>
        <View className='icon-box'>
          <AtIcon
            className='icon'
            value='filter'
            size='30'
            color='#FFF'></AtIcon>
          <View className='icon-title'>歌单</View>
        </View>
        <View className='icon-box'>
          <AtIcon className='icon' value='menu' size='30' color='#FFF'></AtIcon>
          <View className='icon-title'>排行榜</View>
        </View>
        <View className='icon-box'>
          <AtIcon
            className='icon'
            value='lightning-bolt'
            size='30'
            color='#FFF'></AtIcon>
          <View className='icon-title'>电台</View>
        </View>
        <View className='icon-box'>
          <AtIcon
            className='icon'
            value='streaming'
            size='30'
            color='#FFF'></AtIcon>
          <View className='icon-title'>直播</View>
        </View>
      </View>
      {/* <View className="recommend-box">
        <View className="recommend">推荐歌曲</View>
        <View className="user-title">
          <View className="user-heart">为你精心推荐</View>
          <View className="more-button">查看更多</View>
        </View>
      </View> */}
      <Header name='为你精心推荐'></Header>
      <ScrollView
        className='playlist-recommend'
        scrollX
        scrollWithAnimation
        enableFlex>
        {recommend
          ? recommend.map((items) => (
              <View key={items.id} className='scroll-item'>
                <Image src={items.picUrl} className='recommend-pic'></Image>
                <View className='recommend-text'>{items.name}</View>
              </View>
            ))
          : null}
      </ScrollView>
      <Header name='热歌风向标'></Header>
      <Swiper
        className='top-list'
        nextMargin='30px'
        circular
        previousMargin='20px
      '>
        {topArr
          ? topArr.map((items, index) => (
              <SwiperItem key={index}>
                <View className='swiperItems'>
                  <View className='top-title'>{items.name}</View>
                  {items.arr.map((items2, index2) => (
                    <View className='all-items' key={index2}>
                      <View className='top-items'>
                        <Image
                          className='top-img'
                          src={items2.al.picUrl}></Image>
                        <View className='top-index'>{index + 1}</View>
                        <View className='top-name'>{items2.name}</View>
                      </View>
                    </View>
                  ))}
                </View>
              </SwiperItem>
            ))
          : null}
        {/* <SwiperItem>
          <View className="swiperItems">
            <View className="top-title">云音乐热榜</View>
            <View className="top-items">
              <View className="top-img"></View>
              <View className="top-index">1</View>
              <View className="top-name">海阔天空</View>
            </View>
          </View>
        </SwiperItem> */}
      </Swiper>
    </View>
  );
}

export default Index;
