import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { getAllPosts } from "../redux/dashboard/posts/postOperations";

const togglLike = async (post, user) => {
    try {
        if (!post?.listLike?.includes(user.userId)) {
            console.log("AAA");
            const cityRef = doc(db, "posts", `${post.id}`);
            const listLike = post?.listLike
                ? { listLike: [...post.listLike, user.userId] }
                : { listLike: [user.userId] };
            await setDoc(cityRef, { ...post, ...listLike });
        } else {
            console.log("BBB");
            const listLike = [];
            post.listLike.forEach((element) => {
                element !== user.userId && listLike.push(element);
            });

            const cityRef = doc(db, "posts", `${post.id}`);
            await setDoc(cityRef, { ...post, listLike: listLike });
        }
    } catch (error) {
        console.log("error", error);
    }
};
export default togglLike;
