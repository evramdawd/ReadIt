const fs = require('fs/promises');
const fsCallback = require('fs');
const path = require('path');
const db = require('../models/model');

// Error Handling: helper function to create fileController error objects. See lines 5-13 of fileController.js on Unit-9
const createErr = (errInfo) => {};

// Instantiate empty controller Object:
const fileController = {};

fileController.initialLoad = async (req, res, next) => {
  try{
    // Reading static data saved locally. This would be replaced with a fetch to Reddit's API. Would need to deal with OAuth then.
    const saved = await fs.readFile(path.resolve(__dirname, '../data/reddit_saved.json'), 'UTF-8'); // not sure if 'UTF-8' is required or appropriate...
  
    console.log('IN THE FILECONTROLLER.INITIALLOAD MIDDLEWARE FUNCTION!')

    // Parsing the JSON User Data and saving the array of objects under data.children to "savedArray"
    const parsedData = JSON.parse(saved);
    console.log('parsedData: ', parsedData);
    const savedArray = parsedData.data.children;
    console.log('SAVED ARRAY LENGTH: ', savedArray.length);

    // Will need to DELETE everything in DB upon every refresh of the page right?
    await db.query('DELETE from saved;');
    await db.query('ALTER SEQUENCE saved_id_seq RESTART WITH 1;');
    await db.query('UPDATE saved SET id=nextval(\'saved_id_seq\');');

    // Iterate through the array of objects under the children key in the parsed data and insert each object into correct column (already defined in SQL structure)
    const query = {
      text: `INSERT INTO saved (data) VALUES ($1);`
    }
    
    for(let i = 0; i < savedArray.length; i++) {
      query.values = [savedArray[i]];
      console.log('CHECK ME: !!!!!!');
      let response = await db.query(query);
    }

    // displaying the result of populating the DB above:
    db.query('SELECT * FROM saved', (error, results) => {
      if (error) { throw error}

      console.log('RESULTS.ROWS: ', results.rows);
      // response.status(200)
    })

    // Playing around with querying the DB to find what we need for the website (e.g. title, subreddit, author, etc.)
    // db.query()

    return next();
  }
  catch (err) {
    console.log('PROBLEMS!!!')
    return next(err);
  }

}

// EXPORT THE CONTROLLER HERE:
module.exports = fileController;