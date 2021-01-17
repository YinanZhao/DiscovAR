import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCcQTrBFCesXBhAmvYOMns_7LCWjHpL3sc",
  authDomain: "discover-7c65d.firebaseapp.com",
  databaseURL: "https://discover-7c65d.firebaseio.com",
  projectId: "discover-7c65d",
  storageBucket: "discover-7c65d.appspot.com",
  appId: "1:187573988164:ios:f633e2e7dac1554d228511",
  messagingSenderId: "187573988164"
  
};
//firebase.initializeApp(firebaseConfig);


export { firebaseConfig, firebase };