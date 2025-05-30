// CustomSwitch.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomSwitchProps {
  value: boolean;
  onToggle?: (value: boolean) => void;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
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

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28], // posição do botão
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.11,
    height: height * 0.035,
    borderRadius: 30,
    paddingVertical: width * 0.02,
    paddingLeft: width * 0.01,
    justifyContent: 'center',
  },
  circle: {
    width: width * 0.04,
    height: width * 0.04,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
});
