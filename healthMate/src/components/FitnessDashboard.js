import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert,Dimensions } from 'react-native';
import { useTheme, Card, Title, Paragraph, Avatar, Appbar, Text, Menu, Button } from 'react-native-paper';
import CircularProgress from './CircularProgress';
import ProfileMenu from './ProfileMenu';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import SettingsScreen from './SettingsScreen';
import { clearUserSession } from '../session';

const screenWidth = Dimensions.get('window').width;
function FitnessDashboard({ user }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [stepCountDataReq, getStepDataReqCount] = useState([]);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const handleEditProfile = () => {
    setIsSettingsVisible(false);
    navigation.navigate('UserProfile');
  };

  const handleLogout = () => {
    clearUserSession();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    setIsSettingsVisible(false);
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
    labels: stepCountDataReq?.map((item) => item.activity_date),
    datasets: [
      {
        data: stepCountDataReq?.map((item) => item.steps_taken),
      },
    ],
  };

  const stepPercentage = (user?.step_count / 10000) * 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.userCard}>
        <Card.Content style={styles.userCardContent}>
          <Avatar.Image size={80} source={require('../../assets/running.png')} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Title style={styles.userName}>
              {user.first_name} {user.last_name}
            </Title>
            <Paragraph style={styles.userInfoText}>
              Height: {user.height} cm
            </Paragraph>
            <Paragraph style={styles.userInfoText}>
              Weight: {user.weight} kg
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.stepCountCard}>
        <Card.Content>
          <View style={styles.stepCountVisual}>
            <CircularProgress
              percentage={stepPercentage}
              size={120}
              strokeWidth={10}
              progressColor={theme.colors.primary}
              innerText={`${stepPercentage.toFixed(1)}%`}
              innerTextStyle={styles.progressText}
            />
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.graphCard}>
        <Card.Content>
          <Title style={styles.graphTitle}>Step Count in the Last Week</Title>
          <LineChart
            data={stepCountData}
            width={screenWidth - 32} // Adjust the width as needed
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#F8F8F8',
              backgroundGradientTo: '#F8F8F8',
              color: (opacity = 1) => `rgba(74, 142, 255, ${opacity})`, // Line color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </Card.Content>
      </Card>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  userCard: {
    elevation: 4,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  userCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#FF6347',
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfoText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  stepCountCard: {
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    marginBottom: 16,
  },
  stepCountVisual: {
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
    backgroundColor: '#ecf0f1',
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
});


const mapStateToProps = (state) => {
  return {
    user: state.user.userDetails,
  };
};

export default connect(mapStateToProps)(FitnessDashboard);
