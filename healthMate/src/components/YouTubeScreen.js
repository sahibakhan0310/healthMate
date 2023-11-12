import React from 'react';
import { View, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube-iframe';

function YouTubeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <YouTube
          videoId="VIDEO_ID" // Replace with your YouTube video ID
          width={300}
          height={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background color
  },
  videoContainer: {
    borderRadius: 12, // Add border radius for a modern look
    overflow: 'hidden', // Clip the border radius
    elevation: 3, // Add elevation for a shadow effect
  },
});

export default YouTubeScreen;
