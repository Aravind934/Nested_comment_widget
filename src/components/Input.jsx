import { useContext, useRef, useState } from "react";
import "../global.css";
import { CommentContext } from "../context/CommentContext";

const Input = ({ purpose, parentId }) => {
    let [open, setOpen] = useState(true);
    let ref = useRef();
    let { editComment, addComment } = useContext(CommentContext);
    let selector = {
        add: { placeholder: "Add a comment...", text: "COMMENT" },
        reply: { placeholder: "Add a reply...", text: "REPLY" },
        edit: { placeholder: "Edit the comment...", text: "SAVE" },
    };

    const handleClick = () => {
        if (ref.current.value === "" || ref.current.value === " ") {
            return alert("Enter something!");
        }
        let params;
        if (purpose === "edit") {
            params = {
                id: parentId,
                msg: ref.current.value,
                createdAt: new Date(),
            };
            editComment(params);
        } else {
            params = {
                msg: ref.current.value,
                createdAt: new Date(),
                parentId: parentId ? parentId : null,
                liked: false,
                disliked: false,
            };
            addComment(params);
        }
        ref.current.value = "";
        setOpen(true);
    };

    return (
        <div className="container">
            <div className="cmd">
                <input
                    type="text"
                    placeholder={selector[purpose].placeholder}
                    className={`cmdBox ${
                        !open ? "highlightborder" : "normalBorder"
                    }`}
                    onClick={() => setOpen(false)}
                    ref={ref}
                />
                <div className="btn-group" hidden={open}>
                    <button
                        type="button"
                        className="cancel"
                        onClick={() => setOpen(true)}
                    >
                        CANCEL
                    </button>
                    <button
                        type="button"
                        className="comment"
                        onClick={handleClick}
                    >
                        {selector[purpose].text}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Input;
