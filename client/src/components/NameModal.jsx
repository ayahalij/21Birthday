import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NameModal = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Safe localStorage access
      if (typeof window !== 'undefined') {
        localStorage.setItem('scrapbook_visitor_name', name.trim());
      }
      onSubmit(name.trim());
    }
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2>اهلًا بفتاة العيد ميلاد 🎉</h2>
        <p>لكي يخلد كل هذا وقعي باسمك 🌸</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ما اسم اجمل فناة في الكون؟! "
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button type="submit">دعنا نبدأ ✨</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NameModal;