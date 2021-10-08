import React, { createContext, useState } from "react";
// import { auth } from "../firebase";
// import firestore from 'firebase/firestore';
import * as firebase from "firebase";
import "firebase/firestore";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login: (email,password) => {
            firebase.auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => {
                firebase
                .firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((doc)=>{
                  setUser(doc.data());
                })
            }).then(()=>{
                console.log('logged in user is ', user.username)
            })
            .catch(error => alert(error.message))
            },
        register: (username,email,password) => {
            firebase.auth().
            createUserWithEmailAndPassword(email,password).then(()=>
            {
                console.log(firebase.auth().currentUser.uid);
                const db = firebase.firestore();
                db.collection('users').doc(firebase.auth().currentUser.uid)
              .set({
                  username: username,
                  email: email,
                  userImg: './assets/register.png',
              })
              .catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error.message);
              })
            })
            .then(userCredentials => {
                setUser(user);
                console.log("registered user is ",user.email)
            })
            .catch(error => alert(error.message))
        },
        logout: ()=> {
          firebase.auth().
            signOut();
        }
        }}
    >
      {children}
    </UserContext.Provider>
  );
};