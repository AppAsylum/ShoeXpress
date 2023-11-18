import React, {useRef} from 'react';
import {StyleSheet, View, Text,  Dimensions} from 'react-native';
import Video from 'react-native-video';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../Constants/theme';


const {height, width} = Dimensions.get('window');

const EmptyListAnimation = ({title}) => {
  const playerRef = useRef(null);

  const onBuffer = () => {
    // Callback when remote video is buffering
    console.log('Buffering');
  };

  const videoError = () => {
    // Callback when video cannot be loaded
    console.log('Video Error');
  };

  return (
    <View style={styles.EmptyCartContainer}>
      <View style={styles.animationContainer}>
        <Video
          source={{
            uri: 'https://player.vimeo.com/external/576784608.sd.mp4?s=a8ba529a3311735f4203f4666c24cd40956bea84&profile_id=165&oauth2_token_id=57447761',
          }}
          ref={playerRef}
          onBuffer={onBuffer}
          onError={videoError}
          style={styles.animatedVideo}
          paused={false}
          repeat={true} // Use repeat instead of loop
          ignoreSilentSwitch={'obey'}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.animatedText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  animationContainer: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 20
  },
  animatedVideo: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  animatedText: {
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default EmptyListAnimation;

