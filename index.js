const slackBot = require("slackbots");
const axios = require("axios");

const bot = new slackBot({
  token: "xoxb-42625242116-416604041845-E5rFomPfFIXMEPs5LkJi1KsP",
  name: "jokebot"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":eyes:"
  };

  bot.postMessageToChannel(
    "general",
    "Get ready to experience Kevin Hubert - type @jokebot kevinhubert for a factoid about the man, the myth, the legend.",
    params
  );
});

// Error Handling
bot.on("error", err => {
  console.log(err);
});

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

// Respond to Data
function handleMessage(message) {
  if (message.includes(" kevinhubert")) {
    chuckJoke();
  }
}

// Tell a chuck norris joke
function chuckJoke() {
  axios.get("http://api.icndb.com/jokes/random/").then(res => {
    const chuckResponse = res.data.value.joke.split(" ");
    const replaceNames = chuckResponse.map(item => {
      if (item === "Chuck") {
        return "Kevin";
      } else if (item === "Norris") {
        return "Hubert";
      }
      return item;
    });
    const kevinResponse = replaceNames.join(" ");

    const params = {
      icon_emoji: ":muscle:"
    };

    const fourSeers = [
      "Austin Rice",
      "Brian Allen",
      "Erik Oberg",
      "Jake Mason",
      "Zach Sunberg"
    ];

    const randomFourseer =
      fourSeers[Math.floor(Math.random() * fourSeers.length)];

    bot.postMessageToChannel(
      "general",
      `${randomFourseer}: ${kevinResponse}`,
      params
    );
  });
}
