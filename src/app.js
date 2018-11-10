import Twitter     from 'twitter';
import request     from 'request';
require('dotenv').config()

const client = new Twitter({
    consumer_key       : process.env.CONSUMER_KEY,
    consumer_secret    : process.env.CONSUMER_SECRET,
    access_token_key   : process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const stream = client.stream('statuses/filter', { track: `#${process.env.HASHTAG}` })

stream.on('data', function(event) {
    console.log("tweet !")
    //console.log(event.text)
    request.post({
        url    : `${process.env.SERVER_URL}/sms`,
        headers: { 'content-type': 'application/json' },
        body   : JSON.stringify({
            message: event.text,
            from   : event.user.screen_name
        })
    });
});

stream.on('error', function(error) {
    throw error;
});
