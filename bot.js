const dotenv = require('dotenv')
const {TwitterApi} = require('twitter-api-v2')


dotenv.config({path: './config.env'});


const twitterClient = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
})




const rwClient = twitterClient.readWrite
// module.exports = rwClient


const shareTweet = async () => {
    
    const mediaIds = await Promise.all([
        twitterClient.v1.uploadMedia('./images/panda-ant.jpg'),
        twitterClient.v1.uploadMedia('./images/panda-ant2.jpg'),
        // twitterClient.v1.uploadMedia(Buffer.from(rotatedImage), {type: 'png'}),
    ]);
    
    await twitterClient.v1.tweet('Testing Tweet with multiple images' , {media_ids: mediaIds});
    
}


const shareAnimal = async () => {


    try {
        await rwClient.v1.tweet("First tweet")
        console.log("succesful tweet"); 
    } catch (error) {
        console.log(error);
    }
}


// shareTweet();


const getLikes = async () => {
    const user = await twitterClient.v2.userByUsername('austinrettig');
    let id = user['data']['id']
    const likedTweets = await twitterClient.v2.userLikedTweets(id);
    
    console.log(likedTweets.tweets[2]);
    

    // await likedTweets.fetchNext(100);
    // await likedTweets.fetchNext(100);
    // let i = 0;
    // while (i < 130) {
    //     console.log(i + " ----- " + likedTweets.tweets[i].text);
    //     i += 1;
    // }

}

getLikes();


