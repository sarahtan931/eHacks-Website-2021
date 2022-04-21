const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

// DOTENV 
dotenv.config();

// URI 
const uri = process.env.CONNECTION_STRING;

// Create new mongo client 
const client = new MongoClient(uri, {useNewUrlParser: true});

// Function to receive account 
async function getAccount(email) {
  // Retrieve value from key 
  const parameter = email['email'];
  // Connect to db 
  await client.connect().then(()=>{
    console.log('Connected');
  }).catch((err)=>{
    console.log(err);
  });
  // Select database 
  const database = client.db('sample_mflix');
  let account = database.collection('users');
  // mongo cursor with user 
  account = account.find(
      {email: parameter},
  );
  // Convert to an array 
  account = account.toArray();
  return account;
}

// Formats the object 
function formatObject(userObject) {
  // Store name from object 
  const name = userObject.name;
  // Store submission status 
  const isSubmitted = userObject.isSubmitted;
  const isAccepted = userObject.isAccepted;
  const isDeclined = userObject.isDeclined;
  // New string for the formatted name 
  let formattedName = '';
  // Flag to end the while loop
  let breakFlag = true;
  // Index to increment for each character in the string 
  let index = 0;
  // Iterate over the full name 
  while (breakFlag) {
    // If the current index in name is not an empty space add it to new format 
    if (name[index] !== ' ') {
      formattedName += name[index];
      // Increments to move across the string 
      index++;
    } else {
      // Once it spots the empty space, then it knows the first name ended
      // Exit the loop
      breakFlag = false;
      break;
    }
  }
  // Structuring the response object with the formatted user data 
  const response = {
    name: formattedName,
    isSubmitted: isSubmitted,
    isAccepted: isAccepted,
    isDeclined: isDeclined,
  };
  // Return to routing script 
  return response;
}

module.exports = {getAccount, formatObject};
