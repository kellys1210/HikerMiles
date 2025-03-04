
-- All queries use : character to 
-- denote the variables that will have data from the backend programming language

--------------- Patron Directory ---------------


-- Read - view all patrons
SELECT patron_id, name, date_of_birth, address
FROM Patrons;

-- Create a new patron
INSERT INTO Patrons (name, date_of_birth, address)
VALUES (:name, :date_of_birth, :address);

-- Update Patron information
UPDATE Patrons
SET name = :name, 
    date_of_birth = :date_of_birth, 
    address = :address
WHERE patron_id = :patron_id;

-- Delete patron
DELETE FROM Patrons
WHERE patron_id = :patron_id;

--------------- Rewards Directory ---------------

-- Read - view all reward accounts
SELECT rp.reward_id, p.patron_id, rp.reward
FROM RewardPoints rp
JOIN Patrons p ON rp.patron_id = p.patron_id;

-- Create a new rewards account for a patron
INSERT INTO RewardPoints (patron_id, reward)
SELECT p.patron_id, :reward
FROM Patrons p
WHERE p.name = :name;

-- Update patron's reward value
UPDATE RewardPoints rp
JOIN Patrons p ON rp.patron_id = p.patron_id
SET rp.reward = :reward
WHERE p.name = :name
AND rp.reward_id = :reward_id;

-- Delete patron's reward account
DELETE FROM RewardPoints
WHERE reward_id = :reward_id;

--------------- Park Directory ---------------

-- Read - view all parks
SELECT park_id, name, state, county, has_ranger_station
FROM Parks;

-- Create a new park
INSERT INTO Parks (name, state, county, has_ranger_station)
VALUES (:name, :state, :county, :has_ranger_station);

-- Update park information
UPDATE Parks
SET name = :name, 
    state = :state, 
    county = :county, 
    has_ranger_station = :has_ranger_station
WHERE park_id = :park_id;

-- Delete a park
DELETE FROM Parks
WHERE park_id = :park_id;

--------------- Trail Directory ---------------

-- Read - view all trails
SELECT t.trail_id, p.park_id, p.name AS park_name, t.latitude, t.longitude, t.length
FROM Trails t
JOIN Parks p ON t.park_id = p.park_id;

-- Create a trail
INSERT INTO Trails (park_id, name, latitude, longitude, length)
SELECT p.park_id, :trail_name, :latitude, :longitude, :length
FROM Parks p
WHERE p.name = :park_name;

-- Update trail info
UPDATE Trails t
JOIN Parks p ON t.park_id = p.park_id
SET
    t.park_id = p.park_id, 
    t.name = :trail_name, 
    t.latitude = :latitude, 
    t.longitude = :longitude,
    t.length = :length
WHERE p.name = :park_name 
AND t.trail_id = :trail_id;

-- Delete a trail
DELETE FROM Trails
WHERE trail_id = :trail_id;

--------------- Brain Implant Directory ---------------

-- Read - view all implants
SELECT implant_id, patron_id, expiration_date, berserk_mode
FROM BrainImplants;

-- Create a new implant record for a patron
INSERT INTO BrainImplants (patron_id, expiration_date, berserk_mode)
VALUES (:patron_id, :expiration_date, :berserk_mode);

-- Update implant record
UPDATE BrainImplants
SET expiration_date = :expiration_date, 
    berserk_mode = :berserk_mode
WHERE implant_id = :implant_id;

-- Delete implant record
DELETE FROM BrainImplants
WHERE implant_id = :implant_id;

--------------- Patron Park Directory ---------------

-- Read - View All Parks a Patron Has Visited
SELECT p.name AS patron_name, park.name AS park_name, pp.visit_count
FROM PatronParks pp
JOIN Patrons p ON pp.patron_id = p.patron_id
JOIN Parks park ON pp.park_id = park.park_id;

-- Create a New Patron Park Visit
INSERT INTO PatronParks (patron_id, park_id, visit_count)
SELECT p.patron_id, park.park_id, :visit_count
FROM Patrons p
JOIN Parks park ON park.name = :parkName
WHERE p.name = :patronName;

-- Update a Patron Park Visit
UPDATE PatronParks pp
JOIN Patrons p ON pp.patron_id = p.patron_id
JOIN Parks park ON pp.park_id = park.park_id
SET pp.visit_count = :visit_count
WHERE p.name = :patronName
AND park.name = :parkName;

-- Delete a Patron Park Visit
DELETE pp FROM PatronParks pp
JOIN Patrons p ON pp.patron_id = p.patron_id
JOIN Parks park ON pp.park_id = park.park_id
WHERE p.name = :patronName
AND park.name = :parkName;

--------------- Patron Trail Directory ---------------

-- Read - view all trails a patron has visited
SELECT p.name AS patron_name, t.name AS trail_name, pt.visit_count
FROM PatronTrails pt
JOIN Patrons p ON pt.patron_id = p.patron_id
JOIN Trails t ON pt.trail_id = t.trail_id;

-- Create a patron trail visit
INSERT INTO PatronTrails (patron_id, trail_id, hike_count)
SELECT p.patron_id, t.trail_id, :hike_count
FROM Patrons p
JOIN Trails t ON t.name = :trailName
WHERE p.name = :patronName;

-- Update a patron trail visit
UPDATE PatronTrails pt
JOIN Patrons p ON pt.patron_id = p.patron_id
JOIN Trails t ON pt.trail_id = t.trail_id
SET pt.hike_count = :hike_count
WHERE p.name = :patronName
AND t.name = :trailName;

-- Delete a patron trail visit
DELETE pt FROM PatronTrails pt
JOIN Patrons p ON pt.patron_id = p.patron_id
JOIN Trails t ON pt.trail_id = t.trail_id
WHERE p.name = :patronName
AND t.name = :trailName;
