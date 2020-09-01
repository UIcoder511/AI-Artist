import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCfmL6q7vDHjPJeNRLRmOOilFdwsNJgBzs",
  authDomain: "ai-artist-511.firebaseapp.com",
  databaseURL: "https://ai-artist-511.firebaseio.com",
  projectId: "ai-artist-511",
  storageBucket: "ai-artist-511.appspot.com",
  messagingSenderId: "615817205886",
  appId: "1:615817205886:web:148ca272c49e03c0ec602f",
  measurementId: "G-Y8WH3XBHH1"
};
const fire=firebase.initializeApp(firebaseConfig);

export default fire