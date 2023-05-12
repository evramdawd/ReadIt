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
    // console.log('parsedData: ', parsedData);
    const savedArray = parsedData.data.children;
    console.log('SAVED ARRAY LENGTH: ', savedArray.length);

    // DELETE everything in DB upon every refresh of the page:
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
      await db.query(query);
    }

    let text = 'SELECT data -> \'data\' ->> \'id\' AS post_id,data -> \'data\' ->> \'subreddit_name_prefixed\' AS subreddit, data -> \'data\' ->> \'link_title\' AS link_title, data -> \'data\' ->> \'title\' AS title, data -> \'data\' ->> \'subreddit_name_prefixed\' AS subreddit,data -> \'data\' ->> \'author\' AS author, data -> \'data\' ->> \'created_utc\' AS created, data -> \'data\' ->> \'thumbnail\' AS thumbnail, data -> \'data\' ->> \'permalink\' AS url, data -> \'data\' ->> \'score\' AS score, data -> \'data\' ->> \'selftext\' AS text FROM saved;'

    // displaying the result of populating the DB above:
    const response = await db.query(text);
    console.log('THIS IS THE REAL QUERY SON!');
    console.log('RESPONSE.ROWS.length: ', response.rows.length)
    console.log('RESPONSE.ROWS[0]', response.rows[0]);

    // console.log('RESPONSE.ROWS: ', response.rows);
    res.locals.posts = response.rows;
    console.log(typeof res.locals.posts);
    console.log(Array.isArray(res.locals.posts));

    return next();
  }
  catch (err) {
    console.log('PROBLEMS!!!')
    return next(err);
  }

}

// EXPORT THE CONTROLLER HERE:
module.exports = fileController;