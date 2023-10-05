import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { CircularProgress } from 'react-native-svg-circular-progress'; // Import the circular progress component

function FitnessDashboard() {
  const theme = useTheme();

  // Static user details (replace with actual user data)
  const userDetails = {
    firstName: 'John',
    lastName: 'Doe',
    height: '5\'11"',
    weight: '175 lbs',
    stepCount: 8000, // Change the step count value
  };

  // Calculate the percentage of completed steps
  const stepPercentage = (userDetails.stepCount / 10000) * 100; // Assuming the goal is 10,000 steps

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content>
          <Avatar.Icon
            size={60}
            icon="account"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Title style={styles.title}>
            {userDetails.firstName} {userDetails.lastName}
          </Title>
          <Paragraph style={styles.userInfoLabel}>Height: {userDetails.height}</Paragraph>
          <Paragraph style={styles.userInfoLabel}>Weight: {userDetails.weight}</Paragraph>
          <Paragraph style={styles.userInfoLabel}>Step Count: {userDetails.stepCount}</Paragraph>
          {/* Circular Progress Indicator */}
          <View style={styles.progressContainer}>
            <CircularProgress
              percentage={stepPercentage}
              size={200} // Increased the size of the progress circle
              strokeWidth={10}
              backgroundColor="#ccc" // Background color of the progress circle
              progressColor={theme.colors.primary} // Progress color based on the theme
              innerText={`${stepPercentage}%`} // Display the percentage text
              innerTextStyle={styles.progressText} // Style for the percentage text
            />
          </View>
          {/* Add icons or images here */}
          {/* <View style={styles.imageContainer}>
            <Image
              source={require('./assets/fitness-icon.png')} // Replace with your own image
              style={styles.image}
            />
          </View> */}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  card: {
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20, // Added padding to the card
    alignItems: 'center', // Center the content horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  userInfoLabel: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center', // Center the text horizontally
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    fontSize: 24, // Increased the font size of the percentage text
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 100, // Adjust the image size as needed
    height: 100, // Adjust the image size as needed
  },
});

export default FitnessDashboard;
