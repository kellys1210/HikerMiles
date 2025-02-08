-- Patron Directory--------------------------------------------
-- Read
Select patron_id, name, date_of_birth, address
From Patrons;

-- Create
Insert Into Patrons (name, date_of_birth, address)
    Values (:name, :date_of_birth, :address);

-- Update
Update Patrons
Set name = :name, date_of_birth = :date_of_birth, 
    address = :address
    Where patron_id = :patron_id;

-- Delete
Delete from Patrons
    Where patron_id = :patron_id;

-- Rewards Directory-------------------------------------------
-- Read
Select reward_id, patron_id, distance, reward
From RewardPoints;

-- Create
Insert Into RewardPoints 
    (name, distance, reward)
    Values ((SELECT name FROM Patrons WHERE name = :name), :distance, :reward);

-- Update
Update RewardPoints
Set name = (SELECT name FROM Patrons WHERE name = :name),
    distance = :distance, reward = :reward
    Where reward_id = :reward_id_id;

-- Delete
Delete from RewardPoints
    Where reward_id = :reward_id;

-- Park Directory----------------------------------------------
-- Read
Select park_id, name, state, county, has_ranger_station
From Parks;

-- Create
Insert Into Parks (name, state, county, has_ranger_station)
    Values (:name, :state, :county, :has_ranger_station);

-- Update
Update Parks
Set name = :name, state = :state, 
    county = :county, has_ranger_station = :has_ranger_station
    Where park_id = :park_id;

-- Delete
Delete from Parks
    Where park_id = :park_id;

-- Trail Directory---------------------------------------------
-- Read
Select trail_id, park_id, name, trail_head_coord, length
From Trails;

-- Create
Insert Into Trails 
    (name, trail_head_coord, length)
    Values ((SELECT name FROM Parks WHERE name = :name),
     :trail_head_coord, :length);

-- Update
Update Trails
Set name = (SELECT name FROM Parks WHERE name = :name),
    trail_head_coord = :trail_head_coord, length = :length
    Where trail_id = :trail_id;

-- Delete
Delete from Trails
    Where trail_id = :trail_id;

-- Brain Implant Directory-------------------------------------
-- Read
Select implant_id, patron_id, expiration_date, berserk_mode
From BrainImplants;

-- Create
Insert Into BrainImplants (patron_id, expiration_date, berserk_mode)
    Values (:patron_id, :expiration_date, :berserk_mode);

-- Update
Update BrainImplants
Set expiration_date = :expiration_date, 
    berserk_mode = :berserk_mode
    Where implant_id = :implant_id;

-- Delete
Delete from BrainImplants
    Where implant_id = :implant_id;

-- Patron Park Directory---------------------------------------
-- Read
Select (Select name from Patron), (Select name from Parks), visit_count
From PatronParks;

-- Create
Insert Into PatronParks (patron_id, park_id, visit_count) 
    Values (
        (Select patron_id From Patrons Where name = :patronName),
        (Select park_id From Parks Where name = :parkName),
        :visit_count
    );

-- Update
Update PatronParks
Set visit_count = :visit_count, 
    Where patron_id = (Select patron_id From Patrons Where name = :patronName)
    And park_id = (Select park_id From Parks Where name = :parkName)

-- Delete
Delete From PatronParks
    Where patron_id = (Select patron_id From Patrons Where name = :patronName)
    And park_id = (Select park_id From Parks Where name = :parkName)

-- Patron Trail Directory--------------------------------------
-- Read
Select (Select name from Patron), (Select name from Trails), hike_count
From PatronTrails;

-- Create
Insert Into PatronTrails (patron_id, trail_id, hike_count) 
    Values (
        (Select patron_id From Patrons Where name = :patronName),
        (Select trail_id From Trails Where name = :trailName),
        :hike_count
    );

-- Update
Update PatronTrails
Set hike_count = :hike_count, 
    Where patron_id = (Select patron_id From Patrons Where name = :patronName)
    And trail_id = (Select trail_id From Trails Where name = :trailName)

-- Delete
Delete From PatronTrails
    Where patron_id = (Select patron_id From Patrons Where name = :patronName)
    And trail_id = (Select trail_id From Trails Where name = :trailName)
    
