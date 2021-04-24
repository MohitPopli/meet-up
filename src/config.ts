import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyBVf2JtrsAVPgY6F2yrNyI2GGScjbjn_eE',
  authDomain: 'meet-up-853b4.firebaseapp.com',
  projectId: 'meet-up-853b4',
  storageBucket: 'meet-up-853b4.appspot.com',
  messagingSenderId: '57737698542',
  appId: '1:57737698542:web:65e93f998b977ae88967ff',
  measurementId: 'G-WH4YJQWCEL',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
