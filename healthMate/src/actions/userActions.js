export const addUserDetails= userDetails => (
    {
      type: 'SET_USER_DETAILS',
      payload: userDetails,
    }
  );

  export const updateStepCount = (stepCount) => ({
    type: 'UPDATE_STEP_COUNT',
    stepCount,
  });