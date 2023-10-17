import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Card, Title, Paragraph, Avatar, Appbar } from 'react-native-paper';
import { ImageBackground } from 'react-native';

import CircularProgress from './CircularProgress'; // Import your CircularProgress component
import ProfileMenu from './ProfileMenu';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit'; // Import a chart library

function FitnessDashboard({ user }) {
  const theme = useTheme();

  // Sample data for the step count graph (replace with actual data)
  const stepCountData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [7500, 8000, 9000, 7500, 8500, 9500, 10000], // Replace with your weekly step count data
      },
    ],
  };

  const stepPercentage = (user?.step_count / 10000) * 100; // Assuming the goal is 10,000 steps

  return (
    
    <View style={styles.container}>
   
      <Appbar.Header>
        <ProfileMenu />
        <Appbar.Content title="Fitness Dashboard" />
      </Appbar.Header>
      <Card style={[styles.card, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
        <Card.Content>
          <Avatar.Icon size={60} icon="account" style={{ backgroundColor: theme.colors.primary }} />
          <Title style={styles.title}>
            {user.first_name} {user.last_name}
          </Title>
          <Paragraph style={styles.userInfoLabel}>Height: {user?.height}</Paragraph>
          <Paragraph style={styles.userInfoLabel}>Weight: {user?.weight}</Paragraph>
          <Paragraph style={styles.userInfoLabel}>Step Count: {user?.step_count}</Paragraph>
          {/* Circular Progress Indicator */}
          <View style={styles.progressContainer}>
            <CircularProgress
              percentage={stepPercentage}
              size={200}
              strokeWidth={10}
              backgroundColor="#ccc"
              progressColor={theme.colors.primary}
              innerText={`${stepPercentage}%`}
              innerTextStyle={styles.progressText}
            />
          </View>
        </Card.Content>
      </Card>
      {/* Step Count Graph */}
      <Card style={[styles.graphCard, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
        <Card.Content>
          <Title style={styles.graphTitle}>Step Count in the Last Week</Title>
          <LineChart
            data={stepCountData}
            width={300}
            height={200}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            withDots={true}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </Card.Content>
      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:5 ,
  },
  card: {
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  graphCard: {
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
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
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.userDetails,
  };
};

export default connect(mapStateToProps)(FitnessDashboard);
