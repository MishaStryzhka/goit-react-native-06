import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth, storage } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const authSignUpUser =
    ({ name, email, password, photoURL }) =>
    async (dispatch, getState) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, {
                displayName: name,
            });

            const user = await auth.currentUser;

            dispatch(
                authSlice.actions.updateUserProfile({
                    userId: user.uid,
                    nickName: user.displayName,
                })
            );

            // upload avatars ==========================================
            const response = await fetch(photoURL);
            const file = await response.blob();

            const pathFoto = `avatars/${user.uid}`;
            const storageRef = ref(storage, pathFoto);

            await uploadBytes(storageRef, file)
                .then()
                .catch((error) => {
                    console.log("error", error);
                });
            await getDownloadURL(ref(storage, pathFoto))
                .then((url) => {
                    updateProfile(auth.currentUser, {
                        photoURL: url,
                    });
                    dispatch(
                        authSlice.actions.updatePhotoURL({ photoURL: url })
                    );
                })
                .catch((error) => {
                    console.log("error", error);
                });

                // ===========================================================
        } catch (error) {
            console.log("error.code", error.code);
            console.log("error.message", error.message);
        }
    };

export const authSignInUser =
    ({ email, password }) =>
    async (dispatch, getState) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            const user = await auth.currentUser;

            dispatch(
                authSlice.actions.updateUserProfile({
                    userId: user.uid,
                    nickName: user.displayName,
                    photoURL: user.photoURL,
                })
            );
        } catch (error) {
            console.log("error.code", error.code);
            console.log("error.message", error.message);
        }
    };

export const authSignOutUser = () => async (dispatch, getState) => {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(
                authSlice.actions.updateUserProfile({
                    userId: user.uid,
                    nickName: user.displayName,
                    photoURL: user.photoURL,
                })
            );
            dispatch(authSlice.actions.authStateChange({ stateChande: true }));
        } else {
            // User is signed out
            // ...
        }
    });
};

export const updatePhotoURL = (urlFoto) => async (dispatch, getState) => {
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    const user = auth.currentUser;

    const response = await fetch(urlFoto);
    const file = await response.blob();

    const pathFoto = `avatars/${user.uid}`;
    const storageRef = ref(storage, pathFoto);

    await uploadBytes(storageRef, file)
        .then()
        .catch((error) => {
            console.log("error", error);
        });
    await getDownloadURL(ref(storage, pathFoto))
        .then((url) => {
            updateProfile(auth.currentUser, {
                photoURL: url,
            });
            dispatch(authSlice.actions.updatePhotoURL({ photoURL: url }));
        })
        .catch((error) => {
            console.log("error", error);
        });
};
