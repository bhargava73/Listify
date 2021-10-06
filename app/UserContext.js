import React, { createContext, useState } from "react";
import { auth } from "../firebase";
import firestore from 'firebase/firestore';
export const UserContext = createContext();


// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login: (email,password) => {
            auth
            .signInWithEmailAndPassword(email,password)
            .then(userCredentials => {
                setUser(userCredentials.user)
            }).then(()=>{
                console.log('logged in user is ', user.email)
            })
            .catch(error => alert(error.message))
            },
        register: (username,email,password) => {
            auth.
            createUserWithEmailAndPassword(email,password).then(()=>
            {
                firestore.collection('users').doc(auth.currentUser.uid)
              .set({
                  username: username,
                  email: email,
                  createdAt: firestore.Timestamp.fromDate(new Date()),
                  userImg: null,
              })
              .catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
              })
            })
            .then(userCredentials => {
                const user = userCredentials.user;
                setUser(userCredentials.user)
                console.log("registered user is ",user.email)
            })
            .catch(error => alert(error.message))
        }
        }}
    >
      {children}
    </UserContext.Provider>
  );
};