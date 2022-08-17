import profile from "./profile.png";
import "./comment.css";
import { useContext, useEffect, useState } from "react";
import Input from "./Input";
import { CommentContext } from "../context/CommentContext";
import moment from "moment";

const Comment = ({ item }) => {
    let [replys, setReplys] = useState([]);
    let [open, setOpen] = useState(true);
    let [pupose, setPurpose] = useState("reply");
    let { getReplys, toggleLike, toggleDisLike, deleteComment } =
        useContext(CommentContext);

    useEffect(() => {
        setReplys(getReplys(item.id));
    }, [getReplys, item.id]);

    return (
        <div key={item.id} className="box">
            <div className="container">
                <img src={profile} alt="help!" className="profile" />
                <h4>Person name</h4>
                <span>{moment(item.createdAt).fromNow()}</span>
            </div>
            <div className="container msg">
                <p>{item.msg}</p>
            </div>
            <div className="container msg">
                <div onClick={() => toggleLike(item.id)}>
                    {item.liked ? (
                        <i className="fas fa-thumbs-up ml-5"></i>
                    ) : (
                        <i className="far fa-thumbs-up ml-5"></i>
                    )}
                </div>
                <div onClick={() => toggleDisLike(item.id)}>
                    {item.disliked ? (
                        <i className="fa-solid fa-thumbs-down ml-5"></i>
                    ) : (
                        <i className="fa-regular fa-thumbs-down ml-5"></i>
                    )}
                </div>
                <small
                    className="ml-5"
                    onClick={() => {
                        setOpen(!open);
                        setPurpose("reply");
                    }}
                >
                    Reply
                </small>
                <small
                    className="ml-5"
                    onClick={() => {
                        setOpen(!open);
                        setPurpose("edit");
                    }}
                >
                    Edit
                </small>
                <small className="ml-5" onClick={() => deleteComment(item.id)}>
                    Delete
                </small>
            </div>
            <div style={{ marginLeft: "35px" }} hidden={open}>
                <Input parentId={item.id} purpose={pupose} />
            </div>
            <div style={{ marginLeft: "35px" }}>
                {replys.map((reply) => {
                    return <Comment item={reply} key={reply.id} />;
                })}
            </div>
        </div>
    );
};

export default Comment;
