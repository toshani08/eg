 import firebase from 'firebase'

 var firebaseConfig = {
  apiKey: "AIzaSyA96ApYhgQ2wyaCU-yil2x-EYrc7UYOrvE",
  authDomain: "booksanta-a56ac.firebaseapp.com",
  databaseURL: "https://booksanta-a56ac.firebaseio.com",
  projectId: "booksanta-a56ac",
  storageBucket: "booksanta-a56ac.appspot.com",
  messagingSenderId: "401700544738",
  appId: "1:401700544738:web:f8643548d208860c737ebb"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
