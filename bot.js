console.log("Bot is starting");
/**
 * importing the twit package
 */
var Twit = require('twit');

/**
 * importing the configuration
 */
var config = require('./config');


var T = new Twit(config);

/**
 * parameters for getting tweets
 */
const paramsGet = {
    q: 'real madrid psg',
    count: 2 
};

/**
 * parameters for posting tweets
 */
const paramsPost = { 
    status: '#realmadridpsg ended 2-2 after 90 minutes' 
};

/**
 * callback for T.get()
 * @param {*} err 
 * @param {*} data 
 * @param {*} response 
 */
const gotData = (err, data, response) =>  {
    var tweets = data.statuses;
    for(var i = 0; i < tweets.length; i++)
    {
        console.log(tweets[i].text);
    }
}


/**
 * callback for T.post()
 * @param {*} err 
 * @param {*} data 
 * @param {*} response 
 */
const postedData = (err, data, response) => {
    if (err)
    {
        console.log("something went wrong");
    }
    else
    {
        console.log("tweet posted");
    }
}

T.get('search/tweets', paramsGet, gotData);

T.post('statuses/update', paramsPost, postedData);


