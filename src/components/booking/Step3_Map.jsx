import React, { useState } from 'react';
import { motion } from 'framer-motion';

const resources = [
  { id: 'SD-01', type: 'shared_desk', zone: 'Social Hub Desk', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7', info: 'Perfect for networking and collaborative energy.', amenities: ['High-Speed Wi-Fi', 'Power Outlet', 'USB-C Port'], capacity: 1, price: 799, available: true },
  { id: 'PD-01', type: 'private_desk', zone: 'Focus Desk Alpha', image: 'https://images.pexels.com/photos/8489670/pexels-photo-8489670.jpeg', info: 'A dedicated spot in our quiet zone with an ergonomic chair.', amenities: ['Dual Monitors', 'Ergonomic Chair', '24/7 Access'], capacity: 1, price: 1499, available: true },
  { id: 'CR-01', type: 'conference_room', zone: 'The Boardroom', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', info: 'Our largest meeting space, fully equipped for presentations.', amenities: ['4K Projector', 'Whiteboard', 'Video Conferencing'], capacity: 8, price: 3999, available: true },
];

function Step3_Map({ onNext, onPrev, bookingDetails }) {
  const [selectedResource, setSelectedResource] = useState(null);
  const [hoveredResource, setHoveredResource] = useState(null);

  const availableResources = resources.filter(res => res.type === bookingDetails.resourceType?.id);

  React.useEffect(() => {
    const firstAvailable = availableResources.find(r => r.available);
    if (firstAvailable) setHoveredResource(firstAvailable);
  }, [bookingDetails.resourceType]);

  return (
    <motion.div
      className="booking-step map-step"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
    >
      <div className="map-panel-left">
        <motion.h2 className="map-panel-title" initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.2}}>Available:<br/>{bookingDetails.resourceType?.name}s</motion.h2>
        <div className="resource-list">
          {availableResources.map(res => (
            <div
              key={res.id}
              className={`resource-list-item ${!res.available ? 'unavailable' : ''} ${selectedResource?.id === res.id ? 'selected' : ''} ${hoveredResource?.id === res.id ? 'hovered' : ''}`}
              onClick={() => res.available && setSelectedResource(res)}
              onMouseEnter={() => res.available && setHoveredResource(res)}
            >
              <img src={res.image} alt={res.zone} className="item-thumbnail" />
              <div className="item-info">
                <span className="item-id">{res.id}</span>
                <span className="item-zone">{res.zone}</span>
              </div>
              {!res.available && <span className="item-status">Booked</span>}
            </div>
          ))}
        </div>
        <div className="step-actions">
          <button className="btn btn-back" onClick={onPrev}>Back</button>
          <button className="btn btn-primary" onClick={() => onNext({ desk: selectedResource })} disabled={!selectedResource}>
            {selectedResource ? `Book ${selectedResource.id}` : 'Select a Space'}
          </button>
        </div>
      </div>

      <div className="map-panel-right">
        {hoveredResource && (
          <motion.div className="details-panel" key={hoveredResource.id} initial={{opacity: 0, scale: 0.98}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.4}}>
            <div className="details-image-wrapper">
              <img src={hoveredResource.image} alt={hoveredResource.zone} className="details-image-large"/>
            </div>
            <div className="details-content">
              <h3>{hoveredResource.zone} ({hoveredResource.id})</h3>
              <p>{hoveredResource.info}</p>
              <div className="key-info">
                  <div className="info-item"><span>👤 Capacity</span><strong>{hoveredResource.capacity} Person(s)</strong></div>
                  <div className="info-item"><span>💰 Price / Day</span><strong>₹{hoveredResource.price}</strong></div>
              </div>
              <h4>What's Included</h4>
              <ul className="amenities-list">{hoveredResource.amenities.map(amenity => <li key={amenity}>✔️ {amenity}</li>)}</ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Step3_Map;