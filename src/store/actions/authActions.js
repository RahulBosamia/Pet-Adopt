//signUp action
export const SignUp =
  (data) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    dispatch({ type: "AUTH_START" });

    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      await firestore.collection("users").doc(result.user.uid).set({
        email: data.email,
        pets: [],
      });
      dispatch({ type: "AUTH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "AUTH_FAIL", payload: err.message });
    }

    dispatch({ type: "AUTH_END" });
  };

//sigin
export const SignIn =
  (data) =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    dispatch({ type: "AUTH_START" });

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      dispatch({ type: "AUTH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "AUTH_FAIL", payload: err.message });
    }
    dispatch({ type: "AUTH_END" });
  };

//Logout action
export const SignOut =
  () =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err.message);
    }
  };

//Forgot Password
export const ForgotPassword =
  ({ email }) =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch({ type: "AUTH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "AUTH_FAIL", payload: err.message });
    }
  };
