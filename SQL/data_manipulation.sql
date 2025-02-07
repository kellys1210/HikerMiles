-- Patron Directory

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
    Where id = :patron_id;

-- Delete
Delete from Patrons
    Where id = :patron_id;

-- Rewards Directory

-- Park Directory

-- Trail Directory

-- Brain Implant Directory

-- Patron Park Directory

-- Patron Trail Directory