import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const resourceTypes = [
  { id: 'shared_desk', name: 'Shared Desk', description: 'Work in a dynamic, open-plan area perfect for collaboration.', image: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5' },
  { id: 'private_desk', name: 'Private Desk', description: 'Your own dedicated spot, offering focus and consistency.', image: 'https://images.pexels.com/photos/326504/pexels-photo-326504.jpeg?_gl=1*16br838*_ga*MTAzMTIzMDEwNy4xNzU5NTc5NDI2*_ga_8JE65Q40S6*czE3NTk1ODI1ODUkbzIkZzEkdDE3NTk1ODI2MDgkajM3JGwwJGgw' },
  { id: 'conference_room', name: 'Conference Room', description: 'A professional space equipped for team meetings.', image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef' },
];

function Step2_ResourceType({ onNext, onPrev }) {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <motion.div
      className="booking-step resource-selection-step"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="step-content-full">
        <motion.h1 className="step-title" initial={{y: -20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.1}}>What kind of space do you need?</motion.h1>
        <motion.p className="step-subtitle" initial={{y: -20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.2}}>Select the workspace that best fits your goals for the day.</motion.p>
        
        <div className="resource-carousel">
          {resourceTypes.map((type, index) => (
            <motion.div
              key={type.id}
              className={`resource-card-new ${selectedType?.id === type.id ? 'selected' : ''}`}
              onClick={() => setSelectedType(type)}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -20, boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
            >
              <img src={type.image} alt={type.name} className="card-bg-image" />
              <div className="card-overlay-new">
                <h3 className="card-title-new">{type.name}</h3>
                <AnimatePresence>
                  {selectedType?.id === type.id && (
                    <motion.p 
                      className="card-description-new"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto', transition: { delay: 0.2 } }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {type.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="step-actions">
          <button className="btn btn-back" onClick={onPrev}>Back</button>
          <button className="btn btn-primary" onClick={() => onNext({ resourceType: selectedType })} disabled={!selectedType}>
            Next: Find on Map
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Step2_ResourceType;