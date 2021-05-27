import { View } from '@tarojs/components';
import React from 'react';

const Header = (props) => {
  // const [name, setName] = useState();
  return (
    <View className='recommend-box'>
      <View className='recommend'>推荐歌曲</View>
      <View className='user-title'>
        <View className='user-heart'>{props.name}</View>
        <View className='more-button'>查看更多</View>
      </View>
    </View>
  );
};

export default Header;
