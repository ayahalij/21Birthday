import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cardAPI, commentAPI } from '../utils/api';
import { useAudio } from '../hooks/useAudio';
import Card from '../components/Card';
import Terminal from '../components/Terminal';
import NameModal from '../components/NameModal';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [recentComments, setRecentComments] = useState([]);
  const [userName, setUserName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { play, pause, isPlaying, toggle, hasUserInteracted } = useAudio('/audio/ZahraAyamey.mp3', {
    loop: true,
    volume: 0.3
  });

  useEffect(() => {
    // Safe localStorage access - only run on client side
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('scrapbook_visitor_name');
      if (!savedName) {
        setShowNameModal(true);
      } else {
        setUserName(savedName);
      }
    } else {
      // If running on server or localStorage not available, show name modal
      setShowNameModal(true);
    }
    
    fetchData();
  }, []);

  // Auto-play music after user interaction and name is set
  useEffect(() => {
    if (userName && !showNameModal && hasUserInteracted && !isPlaying) {
      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        play();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [userName, showNameModal, hasUserInteracted, isPlaying, play]);

  const fetchData = async () => {
    try {
      const [cardsResponse, commentsResponse] = await Promise.all([
        cardAPI.getAll(),
        commentAPI.getRecent()
      ]);
      setCards(cardsResponse.data);
      setRecentComments(commentsResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNameSubmit = (name) => {
    setUserName(name);
    setShowNameModal(false);
    
    // Safe localStorage access
    if (typeof window !== 'undefined') {
      localStorage.setItem('scrapbook_visitor_name', name);
    }
    
    // Music will auto-start due to the useEffect above
  };

  const handleCardClick = (card) => {
    // Optional: Navigate to detailed view or expand card
    console.log('Card clicked:', card);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          🎂
        </motion.div>
        <p>ننطر شوي ما يضر...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {showNameModal && <NameModal onSubmit={handleNameSubmit} />}
      
      <header className="app-header">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>🎉كل عام و انت يا هبة من الله بخير 🎂</h1>
          <p>الى من اكملت ٢١ ربيعًا, و هي ربيع حياتي</p>
        </motion.div>
        
        <div className="controls">
          <button onClick={() => setShowTerminal(true)} className="terminal-button">
            🤍 لنرى هنا أولًا 
          </button>
        </div>
      </header>

      <main className="main-content">
        <motion.div 
          className="cards-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card 
                card={card} 
                userName={userName}
                onCardClick={handleCardClick}
              />
            </motion.div>
          ))}
        </motion.div>

        {recentComments.length > 0 && (
          <motion.section 
            className="recent-comments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h3>مقتطفات من ما علقتي به</h3>
            <div className="comments-feed">
              {recentComments.slice(0, 5).map((comment) => (
                <div key={comment._id} className="comment-preview">
                  <span className="comment-author">{comment.userName}:</span>
                  <span className="comment-snippet">"{comment.comment}"</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      <Terminal 
        isOpen={showTerminal} 
        onClose={() => setShowTerminal(false)} 
      />
    </div>
  );
};

export default Home;