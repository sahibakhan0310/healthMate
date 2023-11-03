import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const workoutData = [
  {
    id: 1,
    title: 'Pilates for beginners',
    thumbnail: require('../../assets/video1.jpg'),
    videoId: 'NyP_waVgL1w',
  },
  {
    id: 2,
    title: 'Strength Training',
    thumbnail: require('../../assets/video2.jpg'),
    videoId: 'tj0o8aH9vJw',
  },
  // Add more workout data objects here
];

const WorkoutScreen = ({ navigation }) => {
  const handleVideoPress = (videoId) => {
    // Handle the press event for a video item.
    // You can navigate to the YouTubeVideoScreen with the given videoId.
    navigation.navigate('YouTubeVideoScreen', { videoId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVideoPress(item.videoId)}>
      <View style={styles.videoItem}>
        <Image source={item.thumbnail} style={styles.thumbnail} />
        <Text style={styles.videoTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workoutData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  videoItem: {
    marginBottom: 16,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9, // Assuming 16:9 aspect ratio for thumbnails
  },
  videoTitle: {
    marginTop: 8,
    fontSize: 18,
  },
});

export default WorkoutScreen;
