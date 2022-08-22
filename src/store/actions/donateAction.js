export const donate =
  (data) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    let email = "";

    const uid = await firebase.auth().currentUser.uid;
    var imgUrl = [];

    dispatch({ type: "DONATE_START" });
    try {
      //get pet array
      await firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => (email = snapshot.data().email));

      //getimages
      for (let i = 0; i < data.images.length; i++) {
        await firebase
          .storage()
          .ref()
          .child("Pets")
          .child(uid)
          .child(data.images[i].name)
          .put(data.images[i])
          .then((snapshot) => {});

        await firebase
          .storage()
          .ref("Pets")
          .child(uid)
          .child(data.images[i].name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            imgUrl.push(fireBaseUrl);
          });
      }

      let pets = {
        name: data.name,
        category: data.category,
        breed: data.breed,
        about: data.about,
        number: data.num,
        images: imgUrl,
      };
      let new_pets;

      //fetch data
      await firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data().email === email) {
              new_pets = doc.data().pets;
              new_pets.push(pets);
            }
          });
        });

      //push

      await firestore
        .collection("users")
        .doc(uid)
        .set({ pets: new_pets }, { merge: true });

      dispatch({ type: "DONATE_SUCCESS" });
    } catch (err) {
      dispatch({ type: "DONATE_FAIL", payload: err.message });
      console.log(err);
    }
    dispatch({ type: "DONATE_END" });
  };
