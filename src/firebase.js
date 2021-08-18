import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';

// import { cityDb } from './temp/m-city-export';

const firebaseConfig = {
  apiKey: "AIzaSyBnGW3fYSXgIsrS6Kn62WZA16fH7lyT_Hs",
  authDomain: "mcity-c5894.firebaseapp.com",
  projectId: "mcity-c5894",
  storageBucket: "mcity-c5894.appspot.com",
  messagingSenderId: "317757627416",
  appId: "1:317757627416:web:59f51e9cf807a1ff03776d",
  measurementId: "G-MQHPSYX4WN",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();
const matchesCollection = DB.collection('matches');
const playerCollection = DB.collection('players');
const positionsCollection = DB.collection('positions');
const promotionsCollection = DB.collection('promotions');
const teamsCollection = DB.collection('teams');

// cityDb.matches.forEach(item =>{
// matchesCollection.add(item)
// });

// cityDb.players.forEach(item =>{
//   playerCollection.add(item)
//   });

// cityDb.positions.forEach(item =>{
//   positionsCollection.add(item)
//   });

// cityDb.promotions.forEach(item=>{
//   promotionsCollection.add(item)
// });

// cityDb.teams.forEach(item=>{
//   teamsCollection.add(item)
//   });



export { 
  firebase,
matchesCollection,
playerCollection,
positionsCollection,
promotionsCollection,
teamsCollection
 };
