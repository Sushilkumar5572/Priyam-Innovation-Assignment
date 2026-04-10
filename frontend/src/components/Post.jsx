// Post popup component to display post details
import React from "react";

const Post = ({ heading, para, onClose }) => {
    if (!heading || !para) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h2>{heading}</h2>
                <p>{para}</p>
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Post;