import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CommentSection from './CommentSection';

const Card = ({ card, userName, onCardClick }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div 
      className="card"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="card-image" onClick={() => onCardClick(card)}>
        <img src={card.image} alt={card.title} />
        <div className="card-overlay">
          <h3>{card.title}</h3>
          <p className="card-date">{card.date}</p>
        </div>
      </div>
      
      <div className="card-content">
        <p className="card-note">{card.note}</p>
        
        <button 
          className="secret-button"
          onClick={() => setShowSecret(!showSecret)}
        >
          {showSecret ? '✨ نخفي الفضايح' : '🤫 في شي سري '}
        </button>
        
        {showSecret && (
          <motion.div 
            className="secret-message"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p>{card.secretMessage}</p>
          </motion.div>
        )}
        
        <button 
          className="comment-toggle"
          onClick={() => setShowComments(!showComments)}
        >
          💬 تعليقش
        </button>
        
        {showComments && (
          <CommentSection 
            cardId={card.id} 
            userName={userName}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Card;