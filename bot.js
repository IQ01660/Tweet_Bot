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

//tweetIt();
//setInterval(tweetIt, 1000 * 20);

//set up user stream
var stream = T.stream('statuses/filter', { track: ['bananas', 'oranges', 'strawberries'] });

//anytime someone follows me
stream.on('tweet', tweetSeen)

function tweetSeen(eventMsg) {
    var name = eventMsg.user.name;
    var screenName = eventMsg.user.screen_name; //actual twitter account name
    tweetIt('@' + screenName + ' , loved your fruit tweet');
}

function tweetIt(msg) {
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
    var randomNum = Math.floor(Math.random()*100);
    const paramsPost = { 
        status: `${msg}; a random number ${randomNum}`
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

}
