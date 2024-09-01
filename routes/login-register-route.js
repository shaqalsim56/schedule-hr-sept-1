import express from 'express';
export const loginRegister = express.Router();
import bcrypt from 'bcryptjs'
import { saveAboutBusiness, saveAboutYourself, saveAbout, isLoginCorrect, isJoinCorrect } from '../data/database.js';
import session from 'express-session';
import  cookie from 'cookie-parser'

loginRegister.use(express.urlencoded({ extended: true }));

//Session Middleware
loginRegister.use(session({
    secret: 'schedule-hr-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge: 60000 * 60 }
  }));

loginRegister.use(cookie());

  //Login Page
loginRegister.get('/', async (request, response) => {
    response.render('auth/login-page', {
    });
});

//Register Landing Page
loginRegister.get('/register-page', async(request, response)=>{
    response.render('auth/register-page', {
    })
})

//Register Yourself Page
loginRegister.get('/register-page-yourself', async(request, response)=>{
    response.render('auth/register-page-yourself', {
    })
})

//Join Team
loginRegister.get('/join-team', async(request, response)=>{
    response.render('auth/join-team', {
    })
})



// Register Post Both
loginRegister.post('/register', async (request, response)=>{
    const obj_about = new Object();

    obj_about.full_name = request.body.full_name;
    obj_about.phone_number = request.body.phone_number;
    obj_about.email = request.body.email;
    obj_about.password = request.body.password;
    obj_about.company_name = request.body.company_name;
    obj_about.industry = request.body.industry;
    obj_about.country= request.body.country;
    obj_about.size = request.body.size;
    obj_about.reason_for = request.body.reason_for;
    const hashedPassword = await bcrypt.hash(obj_about.password, 10);
  
    obj_about.password = hashedPassword;
    const results = saveAbout(obj_about)
    response.redirect('/')
})

// Login Post
loginRegister.post('/login-post', async (request, response) => {
    const { email, password } = request.body; 
  
    try {
      const user = await isLoginCorrect(email);
  
      if (user.length > 0) {
        const data = user[0];
        const isMatch = await bcrypt.compare(password, data.password);
  
        if (isMatch) {
            request.session.loggedIn = true;
          request.session.fullName = data.full_name;
          request.session.Userid = data.id;
          response.send('DASHBOARD PAGE')
        } else {
          response.render('auth/login-page',{title: 'Login Page', error: 'Incorrect username or password. Please try again.'}); 
        }
      } else {
        response.render('auth/login-page',{title: 'Login Page', error: 'User not found. Please create an account.'}); 
      }
    } catch (error) {
      console.error("Error:", error);
      response.status(500).send("Internal Server Error");
    }
  });


  //Join Team
  loginRegister.post('/join-post', async (request, response) => {
    const { email, company_name } = request.body; 
  
    try {
      const user = await isJoinCorrect(email, company_name);
  
      if (user.length > 0) {
        const data = user[0];
        request.session.loggedIn = true;
        request.session.fullName = data.full_name; 
        request.session.Userid = data.id;
        response.send('Join Team Success');
      } else {
        response.render('auth/error-joining'); 
      }
    } catch (error) {
      console.error("Error:", error);
      response.status(500).send("Internal Server Error");
    }
  });



    //Logout
loginRegister.get('/logout', async (request, response) => {
    request.session.destroy();
    response.redirect('/')
});