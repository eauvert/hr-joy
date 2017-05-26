javascript:(function (){
  var key = "";
  var form = document.createElement("form");
  form.addEventListener("onsubmit", function(){
    sendRequest();
    return false;
  });
  document.body.appendChild(form);
  
  var text = document.createElement("input");
  text.id = "text";
  text.type = "text";
  form.appendChild(text);
  
  var emotions = "D:D::(:|:):D";
  var parse = '';
  var result = "";
  
  function sendRequest(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://language.googleapis.com/v1/documents:analyzeSentiment?key="+key+"&alt=json", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({"document": {"type": "PLAIN_TEXT", "content": speech}, "encodingType": "UTF8"}));
    
    xhr.onreadystatechange = function(){
      result = xhr.responseText;
      parse = JSON.parse(result);
      document.write(speech+"<br>");
    
      var score = Math.abs(((parse.documentSentiment.score) + 1)/2 * 100)/20;
      document.write(score+"/5 "+emotions.substr(Math.ceil(score) * 2, 2)+"<br><br>");
    };
  }
}) ();
