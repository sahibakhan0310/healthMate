export const addUserDetails= userDetails => (
    {
      type: 'SET_USER_DETAILS',
      payload: userDetails,
    }
  );

  export const updateStepCount = (stepCount) => ({
    type: 'UPDATE_STEP_COUNT',
    payload:stepCount,
  });

  export const isUserLoggedIn = (loggedIn) => ({
    type: 'IS_USER_LOGGED_IN',
    payload:loggedIn
  });