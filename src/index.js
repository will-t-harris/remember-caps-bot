const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
const readWriteClient = twitterClient.readWrite;

const ALL_CAPS_WHEN_YOU_SPELL_THE_MAN_NAME =
  "https://www.youtube.com/watch?v=gSJeHDlhYls";

let results = [];
readWriteClient.v2
  .search("mf doom", { max_results: 50 })
  .then((res) => {
    res.data.data.forEach((item, index) => {
      if (
        RegExp(/mf doom/gim).test(item.text) &&
        !RegExp(/MF DOOM/).test(item.text)
      ) {
        const tweetId = item.id;
        readWriteClient.v2.post("statuses/update", {
          status: `Remember all caps when you spell the man name: ${ALL_CAPS_WHEN_YOU_SPELL_THE_MAN_NAME}`,
          in_reply_to_status_id: tweetId,
          auto_populate_reply_metadata: true,
        });
      }
    });
  })
  .catch((error) => console.error(error));
