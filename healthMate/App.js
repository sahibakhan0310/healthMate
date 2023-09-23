import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry } from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import MainContainer from './src/mainContainer';

const themeColors = require('./themeColors.json');
const theme = {
  ...DefaultTheme,
  colors: themeColors.colors, // Copy it from the color codes scheme and then use it here
};
console.log(theme)
export default function App() {
  return (
    <PaperProvider theme={theme}>
   <MainContainer />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
