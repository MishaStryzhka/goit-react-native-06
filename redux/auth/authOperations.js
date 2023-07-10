import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, firebase } from "../../firebase/config";
import {authSlice} from "./authReducer"

export const authSignUpUser =
    ({ name, email, password }) =>
    async (dispatch, getState) => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            await updateProfile(auth.currentUser, {
                displayName: name 
            })
            
            const user = await auth.currentUser
            
            dispatch(authSlice.actions.updateUserProfile({userId: user.uid, nickName: user.displayName}))
        } catch (error) {
            console.log("error.code", error.code);
            console.log("error.message", error.message);
        }
    };

export const authSignInUser =
    ({ name, email, password }) =>
    async (dispatch, getState) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = await auth.currentUser
            
            dispatch(authSlice.actions.updateUserProfile({userId: user.uid, nickName: user.displayName}))
        } catch (error) {
            console.log("error.code", error.code);
            console.log("error.message", error.message);
        }
    };

export const authSignOutUser = () => async (dispatch, getState) => {
    await signOut(auth);
    console.log('qwe')
    dispatch(authSlice.actions.authSignOut())
};

export const authStateChangeUser = () => async (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(authSlice.actions.authStateChange({stateChande: true}))
            dispatch(authSlice.actions.updateUserProfile({userId: user.uid, nickName: user.displayName}))
        } else {
          // User is signed out
          // ...
        }
      });
};



// export {
//     authSignUpUser,
//     authSignInUser,
//     authSignOutUser
// }
