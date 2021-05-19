import  firebase  from 'firebase/app';

//require('firebase/auth')
import 'firebase/auth';
import firestore from 'firebase/firestore'



const settings = {timestampsInSnapshots: true};

/*const config = {
    apiKey: "AIzaSyB2xFMTmpi2sjB2TmGsVukm0XSDK009ROY",
    authDomain: "eglenirken-ogren-cocuk.firebaseapp.com",
    projectId: "eglenirken-ogren-cocuk",
    storageBucket: "eglenirken-ogren-cocuk.appspot.com",
    messagingSenderId: "251600508755",
    appId: "1:251600508755:web:cf9b61bf736da7c145f3a6"
};*/

const config = {
    apiKey: "AIzaSyAl8oX2RfIb38wlh0uGB_okPS1NA3KI3qU",
    authDomain: "ne-izlesem-c7256.firebaseapp.com",
    projectId: "ne-izlesem-c7256",
    storageBucket: "ne-izlesem-c7256.appspot.com",
    messagingSenderId: "480076290653",
    appId: "1:480076290653:web:f40037a641d0a770fb0bb4"
  };
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;