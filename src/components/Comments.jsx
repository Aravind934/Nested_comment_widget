import { useContext } from "react";
import { CommentContext } from "../context/CommentContext";
import "../global.css";
import Comment from "./Comment";
import Input from "./Input";

const Comments = () => {
    let { rootCommets } = useContext(CommentContext);
    return (
        <div style={{ marginBottom: "30px" }}>
            <h3 className="title">Comment widget</h3>
            <Input purpose="add" />
            {rootCommets.map((item) => {
                return <Comment item={item} key={item.id} />;
            })}
        </div>
    );
};

export default Comments;
