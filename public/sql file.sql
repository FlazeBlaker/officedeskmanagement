-- This is your one master file to build the entire database from scratch.

-- Safely delete the old database if it exists to prevent errors.
DROP DATABASE IF EXISTS officedeskmanagement;

-- Create and select the database.
CREATE DATABASE officedeskmanagement;
USE officedeskmanagement;

-- 1. USERS TABLE
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

-- 2. RESOURCES TABLE (for desks, rooms, etc.)
CREATE TABLE resources (
  id VARCHAR(10) PRIMARY KEY,
  type ENUM('shared_desk', 'private_desk', 'conference_room') NOT NULL,
  zone VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  info TEXT,
  amenities JSON,
  capacity INT,
  price_per_day DECIMAL(10, 2)
);

-- 3. BOOKINGS TABLE (to store confirmed bookings)
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource_id VARCHAR(10) NOT NULL,
    booking_date DATE NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resource_id) REFERENCES resources(id),
    UNIQUE KEY (resource_id, booking_date) -- Prevents double booking
);

-- 4. CONTACT INQUIRIES TABLE
CREATE TABLE contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject ENUM('General Inquiry', 'Partnership Proposal', 'Tour Request', 'Feedback') NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from contact_inquiries;

-- --- PRE-POPULATE WITH SAMPLE DATA ---

-- Insert sample resources from your React code
INSERT INTO resources (id, type, zone, image_url, info, amenities, capacity, price_per_day) VALUES
('SD-01', 'shared_desk', 'Social Hub Desk', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7', 'Perfect for networking.', '["High-Speed Wi-Fi", "Power Outlet"]', 1, 799.00),
('PD-01', 'private_desk', 'Focus Desk Alpha', 'https://images.pexels.com/photos/8489670/pexels-photo-8489670.jpeg', 'A dedicated spot in our quiet zone.', '["Dual Monitors", "Ergonomic Chair"]', 1, 1499.00),
('CR-01', 'conference_room', 'The Boardroom', 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', 'Fully equipped for presentations.', '["4K Projector", "Whiteboard"]', 8, 3999.00);

-- Insert a sample user
INSERT INTO users (name, email, password_hash) VALUES ('Sanika', 'sanika@example.com', 'a_very_secure_hash');

-- Show a success message
SELECT 'Database officedeskmanagement and all tables created successfully!' AS Status;

