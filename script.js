// var btc = document.getElementById("bitcoin");
// var eth = document.getElementById("ethereum");
// var doge = document.getElementById("dogecoin");

// var settings = {
//     "async": true,
//     "scrossDomain": true,
//     "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2C%20ethereum%2C%20dogecoin&vs_currencies=usd",
//     "method": "GET",
//     "headers": {}
// }


// $.ajax(settings).done(function(response){
//     btc.innerHTML = response.bitcoin.usd;
//     eth.innerHTML = response.ethereum.usd;
//     doge.innerHTML = response.dogecoin.usd;
// });
$(document).ready(function() {
    var btc = document.getElementById("bitcoin");
    var eth = document.getElementById("ethereum");
    var doge = document.getElementById("dogecoin");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        "method": "GET"
    };

    $.ajax(settings).done(function(response) {
        btc.innerHTML = response.bitcoin.usd;
    });

    settings.url = "https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd";

    $.ajax(settings).done(function(response) {
        doge.innerHTML = response.dogecoin.usd; 
    });

    settings.url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

    $.ajax(settings).done(function(response) {
        eth.innerHTML = response.ethereum.usd; 
    });
});


// Toggle chatbox visibility
document.getElementById("chatIcon").addEventListener("click", function() {
    var chatBox = document.getElementById("chatBox");
    if (chatBox.style.display === "block") {
      chatBox.style.display = "none"; // Close chatbox
    } else {
      chatBox.style.display = "block"; // Open chatbox
      scrollToBottom(); // Scroll to the bottom of the chatbox
    }
  });
  
  // Function to scroll to the bottom of the chatbox
  function scrollToBottom() {
    var chatContent = document.getElementById("chatContent");
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
  
  // Handle user input
  document.getElementById("sendBtn").addEventListener("click", function() {
    var userInput = document.getElementById("userInput").value;
    if (userInput !== "") {
      addMessage("user", userInput);
      sendMessage(userInput);
      document.getElementById("userInput").value = "";
    }
  });
  
  // Add a message to the chatbox
  function addMessage(sender, message) {
    var chatContent = document.getElementById("chatContent");
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender === "user" ? "message--user" : "message--bot");
    messageElement.innerText = message;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
  // Send user message to ChatGPT API
  function sendMessage(message) {
    var apiKey = "OPEN-AI KEY"; // Replace with your actual API key
    var url = "https://api.openai.com/v1/chat/completions";
    var data = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": message }
      ]
    };
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      var botReply = data.choices[0].message.content;
      addMessage("bot", botReply);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  

//   LANGUAGE TRANSLATOR
function setLanguage(language) {
    localStorage.setItem('language', language);
    location.reload();
  }
  
  function getLanguage() {
    return localStorage.getItem('language');
  }
  
  function initializeLanguage() {
    var language = getLanguage();
  
    if (language === 'fr') {
      updatePageContent('fr');
    } else {
      updatePageContent('en');
    }
  }
  
  function updatePageContent(language) {
    var greetingsElement = document.getElementById('greetings');
    var pageContentElement = document.getElementById('page-content');
    var welcomeMessage = '';
    var pageContent = '';
  
    if (language === 'fr') {
      welcomeMessage = 'Bonjour !';
      pageContent = "La plus grande page Web de crypto-monnaies disponible pour le Web ainsi que pour les téléphones mobiles.";
    } else {
      welcomeMessage = 'Hello!';
      pageContent = "World's biggest crypto web page available for web as well as mobile phone.";
    }
  
    greetingsElement.textContent = welcomeMessage;
    pageContentElement.textContent = pageContent;
  }
  
  document.addEventListener('DOMContentLoaded', initializeLanguage);
  
  
  
