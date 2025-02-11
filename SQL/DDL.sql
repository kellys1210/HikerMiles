-- Austin Holcomb
-- Kelly Shields
-- Eric Peters

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- --------- Patrons -----------
CREATE OR REPLACE TABLE Patrons (
    patron_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    address VARCHAR(255)
);

-- --------- Parks -----------
CREATE OR REPLACE TABLE Parks (
    park_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    county VARCHAR(255) NOT NULL,
    has_ranger_station BOOLEAN NOT NULL
);

-- --------- TRAILS -----------
CREATE OR REPLACE TABLE Trails (
    trail_id INT AUTO_INCREMENT PRIMARY KEY,
    park_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(8, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    length FLOAT NOT NULL,
    FOREIGN KEY (park_id) REFERENCES Parks(park_id)
    ON DELETE CASCADE
);

-- --------- BrainImplants -----------
CREATE OR REPLACE TABLE BrainImplants (
    implant_id INT AUTO_INCREMENT PRIMARY KEY,
    patron_id INT UNIQUE,
    expiration_date DATE NOT NULL,
    berserk_mode BOOLEAN NOT NULL,
    FOREIGN KEY (patron_id) REFERENCES Patrons(patron_id)
    ON DELETE SET NULL
);

-- --------- RewardsPoints -----------
CREATE OR REPLACE TABLE RewardsPoints (
    reward_id INT AUTO_INCREMENT PRIMARY KEY,
    patron_id INT NOT NULL UNIQUE,
    reward FLOAT,
    FOREIGN KEY (patron_id) REFERENCES Patrons(patron_id)
    ON DELETE CASCADE
);


-- --------- PatronTrails  -----------
CREATE OR REPLACE TABLE PatronTrails (
    patron_id INT NOT NULL,
    trail_id INT NOT NULL,
    hike_count INT NOT NULL,
    PRIMARY KEY (patron_id, trail_id),
    FOREIGN KEY (patron_id) REFERENCES Patrons(patron_id) ON DELETE CASCADE,
    FOREIGN KEY (trail_id) REFERENCES Trails(trail_id) ON DELETE CASCADE
);


-- --------- PatronParks  -----------
CREATE OR REPLACE TABLE PatronParks (
    patron_id INT NOT NULL,
    park_id INT NOT NULL,
    visit_count INT NOT NULL,
    PRIMARY KEY (patron_id, park_id),
    FOREIGN KEY (patron_id) REFERENCES Patrons(patron_id) ON DELETE CASCADE,
    FOREIGN KEY (park_id) REFERENCES Parks(park_id) ON DELETE CASCADE
    
);

-- --------- Patrons -----------
INSERT INTO Patrons (name, date_of_birth, address) VALUES 
('James Jimenez', '1954-09-15', '7111 Ronald Curve, Fieldsbury, CT 77656'),
('April Singleton', '1993-01-03', '507 Bauer Corner Suite 771, Port Jennifer, HI 60644'),
('Jay Spears', '1994-03-22', '648 James Crescent Suite 576, New Ryanview, SC 10982'),
('Bradley Barrett', '1980-03-30', '560 Dillon Course Suite 939, Lopezberg, SD 51099'),
('Lauren Barajas', '1977-10-26', '7736 Steele Lodge, South Brianstad, AZ 63162');

-- --------- Parks -----------
INSERT INTO Parks (name, state, county, has_ranger_station) VALUES 
('Yellowstone National Park', 'Wyoming', 'Park', TRUE),
('Grand Canyon National Park', 'Arizona', 'Coconino', FALSE),
('Yosemite National Park', 'California', 'Mariposa', TRUE),
('Zion National Park', 'Utah', 'Washington', TRUE),
('Great Smoky Mountains National Park', 'Tennessee', 'Sevier', FALSE);

-- --------- TRAILS -----------
INSERT INTO Trails (name, park_id, latitude, longitude, length) VALUES 
('Fairy Falls Trail', (SELECT park_id FROM Parks WHERE name = 'Yellowstone National Park'), 44.51434, -110.83184, 2.3);
INSERT INTO Trails (name, park_id, latitude, longitude, length) VALUES 
('Bright Angel Trail', (SELECT park_id FROM Parks WHERE name = 'Grand Canyon National Park'), 36.1935, -112.0486, 7.8);
INSERT INTO Trails (name, park_id, latitude, longitude, length) VALUES 
('Mist Trail', (SELECT park_id FROM Parks WHERE name = 'Yosemite National Park'), 37.72694, -119.54444, 3.0);
INSERT INTO Trails (name, park_id, latitude, longitude, length) VALUES 
('Angels Landing', (SELECT park_id FROM Parks WHERE name = 'Zion National Park'), 37.2690, -112.9469, 2.5);
INSERT INTO Trails (name, park_id, latitude, longitude, length) VALUES 
('Alum Cave Trail', (SELECT park_id FROM Parks WHERE name = 'Great Smoky Mountains National Park'), 35.629553, -83.451443, 4.6);

-- --------- BrainImplants -----------
INSERT INTO BrainImplants (expiration_date, berserk_mode, patron_id) VALUES 
('2031-05-20', TRUE, (SELECT patron_id FROM Patrons WHERE name = 'James Jimenez'));
INSERT INTO BrainImplants (expiration_date, berserk_mode, patron_id) VALUES 
('2034-07-15', FALSE, (SELECT patron_id FROM Patrons WHERE name = 'April Singleton'));
INSERT INTO BrainImplants (expiration_date, berserk_mode, patron_id) VALUES 
('2030-11-05', TRUE, (SELECT patron_id FROM Patrons WHERE name = 'Jay Spears'));
INSERT INTO BrainImplants (expiration_date, berserk_mode, patron_id) VALUES 
('2029-01-25', FALSE, (SELECT patron_id FROM Patrons WHERE name = 'Bradley Barrett'));
INSERT INTO BrainImplants (expiration_date, berserk_mode, patron_id) VALUES 
('2028-09-10', TRUE, (SELECT patron_id FROM Patrons WHERE name = 'Lauren Barajas'));

-- --------- RewardsPoints -----------
INSERT INTO RewardsPoints (reward, patron_id) VALUES 
(30.5, (SELECT patron_id FROM Patrons WHERE name = 'James Jimenez'));
INSERT INTO RewardsPoints (reward, patron_id) VALUES 
(50.0, (SELECT patron_id FROM Patrons WHERE name = 'April Singleton'));
INSERT INTO RewardsPoints (reward, patron_id) VALUES 
(10.0, (SELECT patron_id FROM Patrons WHERE name = 'Jay Spears'));
INSERT INTO RewardsPoints (reward, patron_id) VALUES 
(70.5, (SELECT patron_id FROM Patrons WHERE name = 'Bradley Barrett'));
INSERT INTO RewardsPoints (reward, patron_id) VALUES 
(40.0, (SELECT patron_id FROM Patrons WHERE name = 'Lauren Barajas'));

-- --------- PatronTrails  -----------
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'James Jimenez'), 
    (SELECT trail_id FROM Trails WHERE name = 'Bright Angel Trail'), 
    2
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'April Singleton'), 
    (SELECT trail_id FROM Trails WHERE name = 'Mist Trail'), 
    3
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Jay Spears'), 
    (SELECT trail_id FROM Trails WHERE name = 'Fairy Falls Trail'), 
    1
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Bradley Barrett'), 
    (SELECT trail_id FROM Trails WHERE name = 'Alum Cave Trail'), 
    2
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Lauren Barajas'), 
    (SELECT trail_id FROM Trails WHERE name = 'Angels Landing'), 
    3
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'James Jimenez'), 
    (SELECT trail_id FROM Trails WHERE name = 'Fairy Falls Trail'), 
    5
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'April Singleton'), 
    (SELECT trail_id FROM Trails WHERE name = 'Bright Angel Trail'), 
    3
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Jay Spears'), 
    (SELECT trail_id FROM Trails WHERE name = 'Mist Trail'), 
    2
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Bradley Barrett'), 
    (SELECT trail_id FROM Trails WHERE name = 'Angels Landing'), 
    4
);
INSERT INTO PatronTrails (patron_id, trail_id, hike_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Lauren Barajas'), 
    (SELECT trail_id FROM Trails WHERE name = 'Alum Cave Trail'), 
    6
);

-- --------- PatronParks  -----------
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'James Jimenez'), 
    (SELECT park_id FROM Parks WHERE name = 'Grand Canyon National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'April Singleton'), 
    (SELECT park_id FROM Parks WHERE name = 'Yosemite National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Jay Spears'), 
    (SELECT park_id FROM Parks WHERE name = 'Yellowstone National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Bradley Barrett'), 
    (SELECT park_id FROM Parks WHERE name = 'Great Smoky Mountains National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Lauren Barajas'), 
    (SELECT park_id FROM Parks WHERE name = 'Zion National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'James Jimenez'), 
    (SELECT park_id FROM Parks WHERE name = 'Yellowstone National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'April Singleton'), 
    (SELECT park_id FROM Parks WHERE name = 'Grand Canyon National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Jay Spears'), 
    (SELECT park_id FROM Parks WHERE name = 'Yosemite National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Bradley Barrett'), 
    (SELECT park_id FROM Parks WHERE name = 'Zion National Park'), 
    1
);
INSERT INTO PatronParks (patron_id, park_id, visit_count) VALUES 
(
    (SELECT patron_id FROM Patrons WHERE name = 'Lauren Barajas'), 
    (SELECT park_id FROM Parks WHERE name = 'Great Smoky Mountains National Park'), 
    1
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;