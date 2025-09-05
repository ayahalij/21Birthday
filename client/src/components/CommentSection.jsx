import React, { useState, useEffect } from 'react';
import { commentAPI } from '../utils/api';

const CommentSection = ({ cardId, userName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [cardId]);

  const fetchComments = async () => {
    try {
      const response = await commentAPI.getByCardId(cardId);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await commentAPI.create({
        cardId,
        userName,
        comment: newComment.trim()
      });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (loading) return <div>إنها تصل...</div>;

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="نبي تعبير شوي 😊"
          rows={3}
        />
        <button type="submit">اخرجي ما تكنين 💭</button>
      </form>
      
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <span className="comment-author">{comment.userName}</span>
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;