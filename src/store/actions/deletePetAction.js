export const deletePet =
  (petname) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const uid = await firebase.auth().currentUser.uid;
    let email = "";
    let new_pets = [];
    dispatch({ type: "DELETE_START" });
    try {
      await firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => (email = snapshot.data().email));

      //fetch data
      await firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().email === email) {
              doc.data().pets.forEach((pet) => {
                if (petname !== pet.name) {
                  new_pets.push(pet);
                }
              });
            }
          });
        });
      // delete and push
      await firestore
        .collection("users")
        .doc(uid)
        .set({ pets: new_pets }, { merge: true });

      dispatch({ type: "DELETE_SUCCESS" });
    } catch (err) {
      dispatch({ type: "DELETE_FAIL", payload: err.message });
    }
    dispatch({ type: "DELETE_END" });
  };
