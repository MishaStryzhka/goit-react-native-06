import {
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { postSlice } from "./postRedusers";
import { auth, db, storage } from "../../../firebase/config";
import { nanoid } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getAllPosts = () => async (dispatch, getState) => {
    // const unsub = onSnapshot(doc(db, "posts"), (doc) => {
    //     console.log("Current data: ", doc);
    // });
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsAll = [];
    querySnapshot.forEach((doc) => {
        postsAll.push({ id: doc.id, ...doc.data() });
    });
    dispatch(
        postSlice.actions.getAllPost({
            postsAll,
        })
    );
};

export const createPost =
    (urlPhoto, description, locationName, location) =>
    async (dispatch, getState) => {
        const user = await auth.currentUser;

        const response = await fetch(urlPhoto);
        const file = await response.blob();

        const pathFoto = `photos/${nanoid()}.jpeg`;
        const storageRef = ref(storage, pathFoto);

        const date = new Date().getTime();

        await uploadBytes(storageRef, file)
            .then()
            .catch((error) => {
                console.log("error", error);
            });

        await getDownloadURL(ref(storage, pathFoto))
            .then((url) => {
                console.log("user", user);
                addDoc(collection(db, "posts"), {
                    userID: user.uid,
                    userAvatarsURL: user.photoURL,
                    nickName: user.displayName,
                    description,
                    urlFoto: url,
                    date: date,
                    locationName,
                    location,
                });
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

export const getUserPosts = (userID) => async (dispatch, getState) => {
    const q = query(collection(db, "posts"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    const userPosts = [];
    querySnapshot.forEach((doc) => {
        userPosts.push({ id: doc.id, ...doc.data() });
    });
    console.log("userPosts", userPosts.length);
    dispatch(
        postSlice.actions.getUserPosts({
            userPosts,
        })
    );
};
