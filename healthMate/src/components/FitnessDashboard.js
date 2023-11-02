import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useTheme, Card, Title, Paragraph, Avatar, Appbar, Text, Menu,Button } from 'react-native-paper';
import CircularProgress from './CircularProgress';
import ProfileMenu from './ProfileMenu';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import SettingsScreen from './SettingsScreen';

function FitnessDashboard({ user }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [stepCountDataReq, getStepDataReqCount] = useState([]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const handleEditProfile = () => {
    // Handle the edit profile action here
    // You can navigate to the edit profile screen or show a modal, etc.
    setIsSettingsVisible(false); // Close the menu
    navigation.navigate('UserProfile');
  };

  const handleLogout = () => {
    // Handle the logout action here
    // You can clear user data and navigate to the login screen, for example.
    setIsSettingsVisible(false); // Close the menu
  };

  useEffect(() => {
    const fetchStepCountData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/activity?user_id=${user.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data) {
            getStepDataReqCount(data);
          } else {
            Alert.alert('Data not found');
          }
        } else {
          Alert.alert('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', <Text>User ID not found{'\n'}Your message here</Text>);
      }
    };

    fetchStepCountData();
  }, [user.user_id]);

  const stepCountData = {
    labels: stepCountDataReq?.map(item => item.activity_date),
    datasets: [
      {
        data: stepCountDataReq?.map(item => item.steps_taken),
      },
    ],
  };

  const stepPercentage = (user?.step_count / 10000) * 100;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Appbar.Header>
          <ProfileMenu />
          <Appbar.Content title="Fitness Dashboard" />
          <Appbar.Action
            icon="cog"
            onPress={() => setIsSettingsVisible(true)}
          />
        </Appbar.Header>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.leftSide}>
              <Avatar.Icon size={60} icon="account" style={{ backgroundColor: theme.colors.primary }} />
            </View>
            <View style={styles.rightSide}>
              <Title style={styles.title}>
                {user.first_name} {user.last_name}
              </Title>
              <Paragraph style={styles.userInfoLabel}>Height: {user?.height}</Paragraph>
              <Paragraph style={styles.userInfoLabel}>Weight: {user?.weight}</Paragraph>
            </View>
          </Card.Content>
          <View style={styles.progressContainer}>
            <CircularProgress
              percentage={stepPercentage}
              size={120}
              strokeWidth={10}
              backgroundColor="#ccc"
              progressColor={theme.colors.primary}
              innerText={`${stepPercentage}%`}
              innerTextStyle={styles.progressText}
            />
          </View>
        </Card>
        <Card style={styles.graphCard}>
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
                verticalLabelRotation: 45,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </Card.Content>
        </Card>
        <SettingsScreen
          visible={isSettingsVisible}
          onClose={() => setIsSettingsVisible(false)}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    margin: 5,
  },
  card: {
    elevation: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
  },
  leftSide: {
    alignItems: 'center',
  },
  rightSide: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userInfoLabel: {
    fontSize: 16,
    marginTop: 5,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  graphCard: {
    elevation: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    marginTop: 20,
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.userDetails,
  };
};

export default connect(mapStateToProps)(FitnessDashboard);
