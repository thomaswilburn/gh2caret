var pattern = /(github.com\/[^/]+\/[^/]+\/)(blob|edit|blame|commits|raw)/;

var sendToCaret = function(command, argument) {
  var message = {
    command: command,
    argument: argument
  };
  ["nllpfnakhpmhjggbagjgemckanoangnd", "fljalecfjciodhpcledpamjachpmelml"].forEach(function(id) {
    chrome.runtime.sendMessage(id, message);
  });
}

chrome.tabs.onUpdated.addListener(function(tabID, change, tab) {
  if (pattern.test(tab.url)) {
    chrome.pageAction.show(tabID);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  var url = tab.url;
  var replacement = url.replace(pattern, "$1raw");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", replacement);
  xhr.onload = function() {
    var text = xhr.responseText;
    sendToCaret("session:new-file", text);
  };
  xhr.send();
});

var sendFortune = function() {
  var fortunes = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
  ];
  var pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  sendToCaret("status:toast", pick);
  setTimeout(sendFortune, 60 * 1000)
};

sendFortune();