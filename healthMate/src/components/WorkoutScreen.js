import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const workoutData = [
  {
    id: 1,
    title: 'Pilates for beginners',
    thumbnail: require('../../assets/video1.jpg'),
    description: 'This beginner-friendly Pilates workout is designed to improve flexibility and strengthen your core.',
    videoId: 'NyP_waVgL1w',
  },
  {
    id: 2,
    title: 'Strength Training',
    thumbnail: require('../../assets/video2.jpg'),
    description: 'Build strength and endurance with this beginner-friendly strength training workout.',
    videoId: 'tj0o8aH9vJw',
  },
  {
    id: 3,
    title: 'Yoga',
    thumbnail: require('../../assets/video3.jpg'),
    description: 'Experience the benefits of yoga with this beginner-friendly session.',
    videoId: 'j7rKKpwdXNE',
  },
  {
    id: 4,
    title: 'Dance Workout',
    thumbnail: require('../../assets/video4.jpg'),
    description: 'Get your body moving with this energetic dance workout. ',
    videoId: 'Z7QGF4l9buc',
  },
  {
    id: 5,
    title: 'Full Body Strength',
    thumbnail: require('../../assets/video5.jpg'),
    description: 'Challenge your entire body with this full-body strength workout. ',
    videoId: 'Gg4tWUffXMM',
  },
  // Add more workout data objects here
];


const WorkOutScreen = ({ navigation }) => {
  const handleVideoPress = (videoId) => {
    navigation.navigate('YouTubeScreen', { videoId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleVideoPress(item.videoId)}>
      <View style={styles.videoItem}>
        <Image source={item.thumbnail} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.videoDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workoutData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false} // Hide scroll indicator
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5', // Light background color
  },
  flatListContent: {
    paddingBottom: 16,
  },
  videoItem: {
    marginBottom: 20, // Increased marginBottom
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    flexDirection: 'row',
    width: '100%', // Adjusted width to take the full width of the container
  },
  thumbnail: {
    width: 150, // Increased width
    height: 120, // Increased height
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    padding: 16, // Increased padding
  },
  videoTitle: {
    fontSize: 20, // Increased font size
    color: '#333',
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 16, // Increased font size
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default WorkOutScreen;
