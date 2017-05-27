javascript:(function (){
  document.body.innerHTML = "/";
  var key = prompt("Key: ");
  var emotions = ["😨", "😨", "😞", "😐", "😃", "😁"]; /* "D:D::(:|:):D"; */
  var parse = "";
  var result = "";

  var form = document.createElement("form");
  var text = document.createElement("input");
  text.id = "text";
  text.type = "text";
  text.style.width = "80%";
  text.style.position = "fixed";
  text.style.top = "0";
  form.appendChild(text);
  
  form.onsubmit = function(event){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://language.googleapis.com/v1/documents:analyzeSentiment?key="+key+"&alt=json", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({"document": {"type": "PLAIN_TEXT", "content": text.value}, "encodingType": "UTF8"}));
    var chat = document.createElement("div");
    chat.style.display = "block";
    document.body.appendChild(chat);
    chat.innerHTML = "Requesting...";
    
    xhr.onreadystatechange = function(){
      if (xhr.readyState == XMLHttpRequest.DONE){
        parse = JSON.parse(xhr.responseText);
        var overallScore = Math.abs(((parse.documentSentiment.score) + 1)/2 * 100)/20;

        chat.innerHTML = "";
        for (var i = 0; i < parse.sentences.length; i++){
          var sentenceScore = Math.abs(((parse.sentences[i].sentiment.score) + 1)/2 * 100)/20;
          var sentence = document.createElement("span");
          sentence.innerHTML = parse.sentences[i].text.content+" "+emotions[Math.ceil(sentenceScore)]+" ";
          sentence.style.opacity = sentenceScore/5;
          chat.appendChild(sentence);
        }
        /* chat.innerHTML = text.value+" "+emotions.substr(Math.ceil(score) * 2, 2)+"<br />"; */
        chat.setAttribute("score", overallScore);
        chat.addEventListener("click", function(event){if (confirm("Remove? Score: "+this.getAttribute("score"))) this.style.display = "none"});
      }
    };
    return false;
  };
  document.body.appendChild(form);
}) ();
