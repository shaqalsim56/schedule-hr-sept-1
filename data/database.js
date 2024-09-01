import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({path: './config.env'});

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();

//Add New `About Yourself`
export const saveAboutYourself = async(obj_about_yourself) =>{
    const result = await pool.query(`INSERT INTO about_yourself(full_name, phone_number, email, password) VALUES(?, ?, ?, ?)`,
     [obj_about_yourself.full_name, obj_about_yourself.phone_number, obj_about_yourself.email, obj_about_yourself.password, ]);
   return result;    
}

//Add New `About Yourself`
export const saveAboutBusiness = async(obj_about_business) =>{
    const result = await pool.query(`INSERT INTO about_business(company_name, industry, country, size, reason_for) VALUES(?, ?, ?, ?, ?)`,
     [obj_about_business.company_name, obj_about_business.industry, obj_about_business.country, obj_about_business.size, obj_about_business.reason_for ]);
   return result;    
}

//Add New About
export const saveAbout = async(obj_about) =>{
    const result = await pool.query(`INSERT INTO about(full_name, phone_number, email, password, company_name, industry, country, size, reason_for) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
     [obj_about.full_name, obj_about.phone_number, obj_about.email, obj_about.password, obj_about.company_name, 
      obj_about.industry, obj_about.country, obj_about.size, obj_about.reason_for ]);
   return result;    
}

//Checking If Login is Correct
export const isLoginCorrect = async(email) => {
    const result = await pool.query(`SELECT * FROM about WHERE email = ? `, [email]);
    const rows = result[0];
    return rows;
}

//Checking If Login is Correct
export const isJoinCorrect = async(email, company_name) => {
    const result = await pool.query(`SELECT * FROM about WHERE email = ?  AND company_name = ?`, [email, company_name]);
    const rows = result[0];
    return rows;
}