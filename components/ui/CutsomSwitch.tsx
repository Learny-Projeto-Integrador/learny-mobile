import {
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters';

type Props = {
  value: boolean;
  onToggle?: (value: boolean) => void;
}

export const CustomSwitch: React.FC<Props> = ({
  value,
  onToggle,
}) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  // traduz a posição do botão
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [scale(2), scale(26)], // ajustado para size-matters
  });

  const gradientColors = value
    ? ['#da6171', '#69bbe3']
    : ['#417e99', '#7b4a57'];

  const toggleSwitch = () => {
    onToggle?.(!value);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <LinearGradient
      //@ts-ignore
        colors={gradientColors}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: scale(50),         // antes era 16% (melhor padronizar)
    height: verticalScale(25),
    borderRadius: moderateScale(30),
    paddingVertical: verticalScale(2),
    paddingLeft: scale(3),
    justifyContent: 'center',
  },

  circle: {
    width: scale(15),
    height: scale(15),
    borderRadius: moderateScale(20),
    backgroundColor: '#fff',
  },
});
