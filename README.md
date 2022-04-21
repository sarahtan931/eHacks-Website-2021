# eHacks 2021 Website

eHacks is a nonprofit organization dedicated to youth education and enrichment. Our mission is to provide interdisciplinary learning experiences that empower students to solve pressing social issues through technical innovation. This NodeJS + Express + React powered website, facilitates the registration, application and checking in of applicants for the 2022 eHacks Hackathon.

Deployed Version: https://ehacks.ca/

* Succesfully handled over 200 user applications
* Managed tens of thousands of API Requests within 10 days without outage


## Website Walk Through

https://user-images.githubusercontent.com/60834355/164338533-ab983937-47b2-4f95-84d5-e237e5de3f61.mp4

## Technologies
<li>React</li>
<li>Express</li>
<li>Node.js</li>
<li>MongoDB</li>
<li>Sass</li>

## Functionalities
<li>Login</li>
<li>Register</li>
<li>Reset Forgotten Password</li>
<li>View/Edit/Save Application</li>
<li>Submit Application</li>
<li>View Application Submission Status</li>
<li>View Personalized Hacker Dashboard (page with event links and hacker information)</li>
<li>Add Email to Mailing List</li>
<li>Email Questions</li>

## Design

Figma Link: https://www.figma.com/file/XcPi4IeAlirxFmxpXl2VjW/eHacks-2021-Design?node-id=8%3A31

## Getting Started

1. Download repository from github.

### Creating Environment Variables
1. Navigate to `eHacks-Website-2021/backend/keypair` and run `node createKeyPair.js` to create a personal keypair.
2. Create a .env file in the main directory (same directory as .env_sample).
3 Copy values of .env_sample into your .env file and replace values
    *  To get MongoDB Connection string you can follow the documentation: https://www.mongodb.com/docs/atlas/getting-started/. This connection string allows the user to connect their database.
    *  To get the EmailsJS Key, Template ID and service ID you can follow this tutorial https://www.emailjs.com/docs/tutorial/adding-email-service/. These variables allow EmailJS to send the user inquiry emails.

### Installing Dependencies 
1. Navigate to `website` and run `npm i` to install all dependencies.

### Running Locally
1. To run the backend navigate to `eHacks-Website-2021/backend` and run `node index`.
2. To run the frontend navigate to `eHacks-Website-2021` and run `npm run start`.

## Deploying 
This website was deployed using a DigitalOcean Droplet (Linux-based virtual machines) with an SSL certficate and PM2.

