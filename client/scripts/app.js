// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

$(window).load( function() {
  console.log('loaded');
  app.init();
});

var helpers = {
  vanillaEsc: function(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
};

var app = {
  init: function() { // click handlers go here 

    // remove click handlers (for test purposes)
    $('.username').off();
    $('#send .submit').off();

    $('.username').on('click', function() {
      app.addFriend($(this).text());
    });

    $('#send .submit').on('submit', function(event) {
      event.preventDefault();
      console.log('clicked');
      app.handleSubmit();
    });

    // updating messages from server
    // grab our chats element from the DOM
    var stopNum = setInterval(function() {
      app.fetch(function(data) {
        console.log('inside fetch');
        console.log(data);
        var textArray = data.results;
        app.clearMessages();
        textArray.forEach(function(msgObj) {
          $('#chats').append('<div class="userMsgs"><strong>' + 
            helpers.vanillaEsc(msgObj.username) + "</strong>, " +
            helpers.vanillaEsc(msgObj.text) + 
            '</div>');
        });
                // append each message retrieved by fetch to that div
      }, 10000000);
    });
    console.log('test');

    // setTimeout(function() {
    //   clearInterval(stopNum);
    // }, 1);

  },


  // setInterval(detectNewTweets, time);
  // detectNewTweets, 



  server: 'https://api.parse.com/1/classes/messages',
  send: function(msg) {
    $.ajax({
      url: this.server, 
      type: 'POST',
      data: JSON.stringify(msg), 
      contentType: 'application/json', 
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function(cb) {
    $.ajax({      
      url: this.server, 
      type: 'GET',
      // data: JSON.stringify(), 
      contentType: 'application/json', 
      success: function (data) {
        cb(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        // console.error('chatterbox: Failed to fetch message', data);
      }
    });

  },
  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(obj) {

    $('#chats').append('<p><a href="#" class="username">' + obj.username + '</a>' + obj.text + '</p>'); 
  },
  addRoom: function(name) {
    $('#roomSelect').append('<p>' + name + '</p>');
  },
  addFriend: function(friend) {
  },
  handleSubmit: function() {
    console.log('in handle submit');
  }
};





























