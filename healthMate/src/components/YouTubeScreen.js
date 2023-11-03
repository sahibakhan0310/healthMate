import React from 'react';
import { View, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube-iframe';

function YouTubeScreen() {
  return (
    <View style={styles.container}>
      <YouTube
        videoId="VIDEO_ID" // Replace with your YouTube video ID
        width={300}
        height={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default YouTubeScreen;
