window.onload = replacer;
replaceStart();

var keys = []
var values = []

console.log("Im Not Active idk what u r talking about");

String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "gi");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };

function replacer() {
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
            if (node.nodeType === 3) {
                var text = node.nodeValue;
                var replacedText = text.replaceArray(keys, values)
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function replaceStart() {
  if (window.location.hostname=="idp.mit.edu") {

    alert("hello");

  }

  chrome.runtime.sendMessage({ command: "GetCookies"},
      function(response) {
            console.log("I received cookies!")
            console.log(response)
      }
  );

  chrome.storage.sync.set({
        keys: ["certificate"],
        values: ["mommy"]
    }, function(result) {
        console.log("saved")
        console.log(result);
    });

  chrome.storage.sync.get(['keys', 'values'], function(result) {
      console.log("loaded")
      console.log(result)
      if (result.keys && result.values) {
          keys = result.keys
          values = result.values
      }
      console.log('Loading Torque');
    });
}
