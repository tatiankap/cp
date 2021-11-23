import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddComment from "../../ui/comments/addComment";
import CommentsList from "./../../ui/comments/commentsList";
import _ from "lodash";
import api from "../../../API";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState([]);

    const handleDelete = (id) => {
        setComments((prevComment) =>
            prevComment.filter((comment) => comment._id !== id)
        );
        api.comments.remove(id);
    };

    const handleAdd = (comment) => {
        api.comments.add({ ...comment, pageId: userId });
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(_.orderBy(data, ["created_at"], ["desc"])));
    };

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(_.orderBy(data, ["created_at"], ["desc"])));
    }, []);

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <AddComment onAdd={handleAdd} pageId={userId} />
            </div>

            <div className="card mb-3">
                {comments.length
                    ? <CommentsList
                        comments={comments}
                        onDelete={handleDelete}
                        userId={userId}
                    />
                    : false}
            </div>
        </div>
    );
};

Comments.propTypes = {
    userId: PropTypes.string.isRequired
};

export default Comments;
