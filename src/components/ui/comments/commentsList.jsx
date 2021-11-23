import React from "react";
import PropTypes from "prop-types";
// import api from "../../../API";
import Comment from "./comment";

const CommentsList = ({ comments, onDelete }) => {
    return (
        <>
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {comments.map((comment) => (
                    <Comment
                        onDelete={onDelete}
                        comment={comment}
                        key={comment._id}
                    />
                ))}
            </div>
        </>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentsList;
