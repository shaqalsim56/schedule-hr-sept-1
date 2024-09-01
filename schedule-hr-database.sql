create database schedule_hr;
use schedule_hr;

-- Register
create table about_yourself(
id int primary key auto_increment,
full_name varchar(255),
phone_number varchar(20),
email varchar(255),
password varchar(255)
);



create table about_business(
id int primary key auto_increment,
company_name varchar(255),
industry varchar(75),
country varchar(255),
size int,
reason_for text
);

create table about(
id int primary key auto_increment,
full_name varchar(255),
phone_number varchar(20),
email varchar(255),
password varchar(255),
company_name varchar(255),
industry varchar(75),
country varchar(255),
size int,
reason_for text
);

select * from about;
drop table about;



select * from about_yourself;
drop table about_yourself;

select * from about_business;
drop table about_business;