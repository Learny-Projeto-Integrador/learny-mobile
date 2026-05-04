import { RF, RS, RW } from '@/theme';
import { View, Text, Image } from 'react-native';

interface Props {
  rank: string;
  name: string;
  points: number;
}

export default function OtherRanking ({ rank, name, points }: Props) {
  return (
    <View 
      className="flex-row items-center"
      style={{ gap: RS(20)}}
    >
      <Image 
        source={require("@/assets/images/ranking/gradient-circle.png")} 
        style={{
          width: RW(20),
          marginRight: RS(20),
          aspectRatio: 1/1
        }} 
      />
      <View
        className="flex-row items-center"
        style={{
          borderRadius: 15,
          paddingVertical: RS(10),
          width: RW(200)
        }}
      >
        
        <View 
          className="flex-1 flex-row items-center"
          style={{ gap: RS(10) }}
        >
          <Text 
            className='font-montserratBold text-white'
            style={{ fontSize: RF(20) }}
          >
            {rank}º
          </Text>
          <Text 
            className='font-montserratBold text-white'
            style={{ fontSize: RF(16) }}
          >
            {name}
          </Text>
        </View>

        <Text className='text-white'>
          <Text 
            className='font-montserratBold text-white'
            style={{ fontSize: RF(16) }}
          >
            {points}
          </Text> pts.
        </Text>

      </View>
    </View>
  );
};
