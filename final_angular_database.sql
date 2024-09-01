create database steel_ride;
use steel_ride;

create table users(
id int primary key auto_increment,
first_nm varchar(255),
last_nm varchar(255),
email varchar(255),
password varchar(255),
last_logged_in varchar(255),
level varchar(10) default 'USER',
status varchar(255) default 'Active'
);
select * from users;
SELECT * FROM users WHERE email = 'by@mail.com' ;

update users set level = 'ADMIN' where id = 2;
SELECT * FROM users WHERE level = 'ADMIN';

delete from users where id = 8; 

drop table users;

CREATE TABLE vehicles_for_rent (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_model VARCHAR(50) NOT NULL,
    vehicle_make VARCHAR(50) NOT NULL,
    seat_num INT NOT NULL,
    year YEAR NOT NULL,
    door INT NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    descr TEXT NOT NULL,
    img VARCHAR(255) NOT NULL,
    status VARCHAR(15) NOT NULL
);

select * from vehicles_for_rent;
select * from vehicles_for_rent where status = 'available';
update vehicles_for_rent set status = 'Available';


CREATE TABLE vehicles_for_sale (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_model VARCHAR(50) NOT NULL,
    vehicle_make VARCHAR(50) NOT NULL,
    seat_num INT NOT NULL,
    year YEAR NOT NULL,
    door INT NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    descr TEXT NOT NULL,
    img VARCHAR(255) NOT NULL
);



select * from vehicles_for_sale;
alter table vehicles_for_sale add column status varchar(15);
update vehicles_for_sale set strental_bookingsatus = 'Available';
SET SQL_SAFE_UPDATES = 0;



create table rental_bookings (
id int primary key auto_increment, 
user_id int, 
vehicle_id int,
rent_date date,
return_date date,
total_price float,
foreign key(user_id) references users(id),
foreign key(vehicle_id) references vehicles_for_rent(id)
);

select * from rental_bookings;
drop table rental_bookings;
delete from rental_bookings where id = 6;

ALTER TABLE rental_bookings
MODIFY COLUMN rent_date DATETIME,
MODIFY COLUMN return_date DATETIME;

select * from rental_bookings where user_id = 2;

select user_id, vehicle_id, vehicles_for_rent.vehicle_make, vehicles_for_rent.vehicle_model, 
rent_date, return_date, total_price from rental_bookings 
inner join vehicles_for_rent on rental_bookings.vehicle_id
where user_id = 2;


insert into rental_bookings(user_id, vehicle_id, rent_date, return_date, total_price) 
values(3, 5, '2024-05-20', '2024-05-27', 90000);

select users.first_nm, users.last_nm, vehicles_for_rent.vehicle_make, vehicles_for_rent.vehicle_model, 
rent_date, return_date, total_price from rental_bookings
inner join users on rental_bookings.user_id = users.id
inner join vehicles_for_rent on rental_bookings.vehicle_id = vehicles_for_rent.id
where users.id = 3;


select rental_bookings.id,  users.first_nm, users.last_nm, vehicles_for_rent.vehicle_make, vehicles_for_rent.vehicle_model,  rent_date, return_date, total_price from rental_bookings
    inner join users on rental_bookings.user_id = users.id
    inner join vehicles_for_rent on rental_bookings.vehicle_id = vehicles_for_rent.id where user_id = 2;
    

    

    
    
create table purchases(
id int primary key auto_increment, 
user_id int, 
vehicle_id int,
purchase_date date,
total_price float,
foreign key(user_id) references users(id),
foreign key(vehicle_id) references vehicles_for_sale(id)
);

select * from purchases;
drop table purchases;

select users.id, users.first_nm, users.last_nm, vehicles_for_sale.vehicle_make, vehicles_for_sale.vehicle_model, vehicles_for_sale.img, purchase_date, total_price from purchases 
inner join users on purchases.user_id = users.id
inner join vehicles_for_sale on purchases.vehicle_id = vehicles_for_sale.id;

select rental_bookings.id,  users.first_nm, users.last_nm, vehicles_for_rent.vehicle_make, vehicles_for_rent.vehicle_model, vehicles_for_rent.img, vehicles_for_rent.id,  rent_date, return_date, total_price from rental_bookings
        inner join users on rental_bookings.user_id = users.id
        inner join vehicles_for_rent on rental_bookings.vehicle_id = vehicles_for_rent.id where user_id = 2;


SELECT rental_bookings.id,  u.first_nm, u.last_nm, v.vehicle_make, v.vehicle_model, v.img, v.id AS vehicle_id, rental_bookings.rent_date, 
    rental_bookings.return_date, 
    rental_bookings.total_price FROM 
    rental_bookings
INNER JOIN users u ON rental_bookings.user_id = u.id
INNER JOIN vehicles_for_rent v ON rental_bookings.vehicle_id = v.id 
WHERE rental_bookings.user_id = 2;

select users.first_nm, users.last_nm, 
vehicles_for_rent.vehicle_make, 
vehicles_for_rent.vehicle_model,  
rent_date, return_date, 
vehicles_for_rent.img,  
vehicles_for_rent.id AS vehicle_id,
vehicles_for_rent.price,
total_price from rental_bookings
inner join users on rental_bookings.user_id = users.id
inner join vehicles_for_rent on rental_bookings.vehicle_id = vehicles_for_rent.id where rental_bookings.id = 15;
