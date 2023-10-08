import * as Font from 'expo-font';

export const loadCustomFonts = async () => {
  await Font.loadAsync({
    'SF-Pro-Display-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
    // Add other custom fonts if needed
  });
};