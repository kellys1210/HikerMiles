



--------------- Patron Directory ---------------

-- Read
SELECT patron_id, name, date_of_birth, address
FROM Patrons;

-- Create
INSERT INTO Patrons (name, date_of_birth, address)
VALUES (:name, :date_of_birth, :address);

-- Update
UPDATE Patrons
SET name = :name, 
    date_of_birth = :date_of_birth, 
    address = :address
WHERE patron_id = :patron_id;

-- Delete
DELETE FROM Patrons
WHERE patron_id = :patron_id;

--------------- Rewards Directory ---------------

-- Read
SELECT reward_id, patron_id, reward
FROM RewardPoints;

-- Create
INSERT INTO RewardPoints (name, distance, reward)
VALUES (
    (SELECT name FROM Patrons WHERE name = :name), 
    :reward
);

-- Update
UPDATE RewardPoints
SET name = (SELECT name FROM Patrons WHERE name = :name), 
    reward = :reward
WHERE reward_id = :reward_id;

-- Delete
DELETE FROM RewardPoints
WHERE reward_id = :reward_id;

--------------- Park Directory ---------------

-- Read
SELECT park_id, name, state, county, has_ranger_station
FROM Parks;

-- Create
INSERT INTO Parks (name, state, county, has_ranger_station)
VALUES (:name, :state, :county, :has_ranger_station);

-- Update
UPDATE Parks
SET name = :name, 
    state = :state, 
    county = :county, 
    has_ranger_station = :has_ranger_station
WHERE park_id = :park_id;

-- Delete
DELETE FROM Parks
WHERE park_id = :park_id;

--------------- Trail Directory ---------------

-- Read
SELECT trail_id, park_id, name, latitude, longitude, length
FROM Trails;

-- Create
INSERT INTO Trails (name, latitude, longitude, length)
VALUES (
    (SELECT name FROM Parks WHERE name = :name), 
    :latitude,
    :longitude, 
    :length
);

-- Update
UPDATE Trails
SET name = (SELECT name FROM Parks WHERE name = :name), 
    latitude = :latitude, 
    longitude = :longitude,
    length = :length
WHERE trail_id = :trail_id;

-- Delete
DELETE FROM Trails
WHERE trail_id = :trail_id;

--------------- Brain Implant Directory ---------------

-- Read
SELECT implant_id, patron_id, expiration_date, berserk_mode
FROM BrainImplants;

-- Create
INSERT INTO BrainImplants (patron_id, expiration_date, berserk_mode)
VALUES (:patron_id, :expiration_date, :berserk_mode);

-- Update
UPDATE BrainImplants
SET expiration_date = :expiration_date, 
    berserk_mode = :berserk_mode
WHERE implant_id = :implant_id;

-- Delete
DELETE FROM BrainImplants
WHERE implant_id = :implant_id;

--------------- Patron Park Directory ---------------

-- Read
SELECT 
    (SELECT name FROM Patrons WHERE patron_id = PatronParks.patron_id) AS patron_name, 
    (SELECT name FROM Parks WHERE park_id = PatronParks.park_id) AS park_name, 
    visit_count
FROM PatronParks;

-- Create
INSERT INTO PatronParks (patron_id, park_id, visit_count)
VALUES (
    (SELECT patron_id FROM Patrons WHERE name = :patronName), 
    (SELECT park_id FROM Parks WHERE name = :parkName), 
    :visit_count
);

-- Update
UPDATE PatronParks
SET visit_count = :visit_count
WHERE patron_id = (SELECT patron_id FROM Patrons WHERE name = :patronName)
AND park_id = (SELECT park_id FROM Parks WHERE name = :parkName);

-- Delete
DELETE FROM PatronParks
WHERE patron_id = (SELECT patron_id FROM Patrons WHERE name = :patronName)
AND park_id = (SELECT park_id FROM Parks WHERE name = :parkName);

--------------- Patron Trail Directory ---------------

-- Read
SELECT 
    (SELECT name FROM Patrons WHERE patron_id = PatronTrails.patron_id) AS patron_name, 
    (SELECT name FROM Trails WHERE trail_id = PatronTrails.trail_id) AS trail_name, 
    hike_count
FROM PatronTrails;

-- Create
INSERT INTO PatronTrails (patron_id, trail_id, hike_count)
VALUES (
    (SELECT patron_id FROM Patrons WHERE name = :patronName), 
    (SELECT trail_id FROM Trails WHERE name = :trailName), 
    :hike_count
);

-- Update
UPDATE PatronTrails
SET hike_count = :hike_count
WHERE patron_id = (SELECT patron_id FROM Patrons WHERE name = :patronName)
AND trail_id = (SELECT trail_id FROM Trails WHERE name = :trailName);

-- Delete
DELETE FROM PatronTrails
WHERE patron_id = (SELECT patron_id FROM Patrons WHERE name = :patronName)
AND trail_id = (SELECT trail_id FROM Trails WHERE name = :trailName);
