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