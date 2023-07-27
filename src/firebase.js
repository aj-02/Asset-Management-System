import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCx_LJBDeRC0Ek5ISy6TrmHszCGEfGcuPs",
    authDomain: "asset-management-system-5f8be.firebaseapp.com",
    projectId: "asset-management-system-5f8be",
    storageBucket: "asset-management-system-5f8be.appspot.com",
    messagingSenderId: "1097788457918",
    appId: "1:1097788457918:web:151c6dd9e1bdec1cb82fef"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
export default firebase