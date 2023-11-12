const { remote } = require('webdriverio');

const opts = {
  port: 4723, // The default Appium port
  path: '/wd/hub',
  capabilities: {
    platformName: 'iOS',
    platformVersion: '17.0',
    deviceName: 'iPhone 15 Pro Max', // or the name of your physical device
    app: '/Users/sahibakhan/resources/ASE/healthMate/healthMate/App.js', // Path to your React Native iOS application
    automationName: 'XCUITest',
    appium: {
      // Specify the Appium React Native driver
      args: {
        address: 'localhost',
        port: 4723,
        commandTimeout: process.env.APPIUM_COMMAND_TIMEOUT || '7200',

      },
    },
  },
};

async function runTest() {
  const client = await remote(opts);

  // Your React Native test code goes here
  await client.pause(3000); // Example: pause for 3 seconds

  await client.deleteSession(); // Close the session
}

runTest();
