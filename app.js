//Import NPM Packages
import express from 'express'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import session from 'express-session'
import bodyParser from 'body-parser'
import  cookie from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//Import Routes
import { loginRegister } from './routes/login-register-route.js'

//Configuartions
const port = 7500;
const app = express();

//Session Middleware
app.use(session({
    secret: 'schedule-hr-key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge: 60000 * 60 }
  }));

  app.use(cookie());

//Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//Handle form field values from method=post
app.use(express.urlencoded({ extended: true }));


//Body Parsing
app.use(bodyParser.json({limit: '1kb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '1kb'}));

//Endpoint Analytics
app.use(morgan('dev'));

//Static Folders For Images
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware Routing
app.use('/', loginRegister)

//Initialize Server 
app.listen(port, () => {
    console.log(`The Server is Running On Port ${port}`);
});