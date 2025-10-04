create database officedeskmanagement;
use officedeskmanagement;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(255) DEFAULT 'https://i.pravatar.cc/150',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a sample user to test with
INSERT INTO users (name, email, password_hash, bio)
VALUES (
  'Garmin',
  'garmin@example.com',
  'some_secure_hash', -- In a real app, this would be a bcrypt hash
  'Software developer and pickleball enthusiast. Building the future of work at Co.Work.'
);

DELETE FROM users WHERE email = 'garmin@example.com';

SELECT id, name, email FROM users;