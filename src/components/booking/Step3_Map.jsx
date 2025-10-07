import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // 👈 1. Import axios

// The hardcoded 'resources' array is no longer needed. You can delete it!

function Step3_Map({ onNext, onPrev, bookingDetails }) {
  const [selectedResource, setSelectedResource] = useState(null);
  const [hoveredResource, setHoveredResource] = useState(null);

  // 👇 2. Add state for fetched data, loading, and errors
  const [availableResources, setAvailableResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👇 3. Add useEffect to fetch data from your backend API
  useEffect(() => {
    // Make sure we have the necessary details before fetching
    if (!bookingDetails.date || !bookingDetails.resourceType?.id) {
        setError("Date or resource type not selected. Please go back.");
        setIsLoading(false);
        return;
    }

    const fetchResources = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/api/resources', {
                params: {
                    date: bookingDetails.date,
                    type: bookingDetails.resourceType.id
                }
            });
            setAvailableResources(response.data);
            // Set the first available resource as the default hovered item
            if (response.data.length > 0) {
                setHoveredResource(response.data[0]);
            } else {
                setHoveredResource(null); // No resources available
            }
        } catch (err) {
            console.error("Failed to fetch resources:", err);
            setError("Sorry, we couldn't load the available spaces. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    fetchResources();
  }, [bookingDetails.date, bookingDetails.resourceType]); // Re-run effect if these change

  // 👇 4. Add UI states for loading and error messages
  if (isLoading) {
    return <div className="loading-state">Loading available spaces...</div>;
  }
  
  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <motion.div
      className="booking-step map-step"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
    >
      <div className="map-panel-left">
        <motion.h2 className="map-panel-title" initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.2}}>
          Available:<br/>{bookingDetails.resourceType?.name}s
        </motion.h2>
        <div className="resource-list">
          {/* 👇 5. Handle the case where no resources are available */}
          {availableResources.length === 0 ? (
            <div className="no-resources-found">
                <p><strong>Oops!</strong> No {bookingDetails.resourceType?.name}s are available for this date.</p>
                <p>Try selecting a different date or workspace type.</p>
            </div>
          ) : (
            availableResources.map(res => (
              <div
                key={res.id}
                // The 'available' property is gone, as the API only returns available items.
                className={`resource-list-item ${selectedResource?.id === res.id ? 'selected' : ''} ${hoveredResource?.id === res.id ? 'hovered' : ''}`}
                onClick={() => setSelectedResource(res)}
                onMouseEnter={() => setHoveredResource(res)}
              >
                {/* Use image_url from the database */}
                <img src={res.image_url} alt={res.zone} className="item-thumbnail" /> 
                <div className="item-info">
                  <span className="item-id">{res.id}</span>
                  <span className="item-zone">{res.zone}</span>
                </div>
              </div>
            ))
          )}
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
              {/* Use image_url from the database */}
              <img src={hoveredResource.image_url} alt={hoveredResource.zone} className="details-image-large"/>
            </div>
            <div className="details-content">
              <h3>{hoveredResource.zone} ({hoveredResource.id})</h3>
              <p>{hoveredResource.info}</p>
              <div className="key-info">
                  <div className="info-item"><span>👤 Capacity</span><strong>{hoveredResource.capacity} Person(s)</strong></div>
                  {/* Use price_per_day from the database */}
                  <div className="info-item"><span>💰 Price / Day</span><strong>₹{hoveredResource.price_per_day}</strong></div>
              </div>
              <h4>What's Included</h4>
              {/* Amenities are stored as a JSON string, so we parse it */}
              <ul className="amenities-list">{hoveredResource.amenities.map(amenity => <li key={amenity}>✔️ {amenity}</li>)}</ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Step3_Map;