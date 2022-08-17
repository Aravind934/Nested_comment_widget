import Comments from "./components/Comments";
import { useState } from "react";
import { CommentContext } from "./context/CommentContext";

let defaultComments = [
    {
        id: 1,
        msg: "intial  msg",
        parentId: null,
        liked: false,
        disliked: false,
        createdAt: new Date(),
    },
];

function App() {
    let [id, setId] = useState(2);
    let [comments, setComments] = useState(defaultComments);
    let rootCommets = comments.filter((o) => !o.parentId);
    let toggleLike = (id) => {
        let temp = [...comments];
        temp.forEach((cmd) => {
            if (cmd.id === id) {
                cmd.liked = !cmd.liked;
                if (cmd.liked && cmd.disliked) {
                    cmd.disliked = false;
                }
            }
        });
        setComments(temp);
    };

    let toggleDisLike = (id) => {
        let temp = [...comments];
        temp.forEach((cmd) => {
            if (cmd.id === id) {
                cmd.disliked = !cmd.disliked;
                if (cmd.disliked && cmd.liked) {
                    cmd.liked = false;
                }
            }
        });
        setComments(temp);
    };

    let getReplys = (id) => {
        return comments.filter((cmt) => cmt.parentId === id);
    };

    let addComment = (comment) => {
        setComments([...comments, { ...comment, id }]);
        setId(++id);
    };

    let deleteComment = (id) => {
        let temp = [...comments];
        temp = temp.filter((cmt) => cmt.parentId !== id);
        temp = temp.filter((cmt) => cmt.id !== id);
        setComments(temp);
    };

    let editComment = (params) => {
        let temp = [...comments];
        temp.forEach((cmt) => {
            if (cmt.id === params?.id) {
                cmt.msg = params.msg;
                cmt.createdAt = params.createdAt;
            }
        });
        setComments(temp);
    };

    return (
        <CommentContext.Provider
            value={{
                rootCommets,
                toggleLike,
                toggleDisLike,
                getReplys,
                addComment,
                deleteComment,
                editComment,
            }}
        >
            <Comments />
        </CommentContext.Provider>
    );
}

export default App;
