import React, {useState} from 'react';
import {Animated, Pressable} from 'react-native';

// Pressable that gently shrinks while held. Drop-in for TouchableOpacity.
const PressableScale = ({children, style, scaleTo = 0.96, disabled, ...rest}) => {
  const scale = useState(() => new Animated.Value(1))[0];
  const to = v => Animated.spring(scale, {toValue: v, useNativeDriver: true, speed: 40, bounciness: 6}).start();

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => to(scaleTo)}
      onPressOut={() => to(1)}
      {...rest}>
      <Animated.View style={[style, {transform: [{scale}]}, disabled && {opacity: 0.5}]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default PressableScale;
