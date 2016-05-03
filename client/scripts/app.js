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
  // console.log('loaded');
  app.init();
});

var helpers = {
  vanillaEsc: function(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },
  appendData: function(data) {
    var textArray = data.results;
    app.clearMessages();
    textArray.forEach(function(msgObj) {
      app.addMessage(msgObj);
    });
  },
  unescape: function(str, pattern) { 
    str = str.replace(pattern, '');
    return decodeURI(str);
  }
};

var app = {
  server: 'https://api.parse.com/1/classes/messages',
  init: function() { // click handlers go here 

    // remove click handlers (for test purposes)
    //$('.username').off();
    //$('#send .submit').off();

    $('.username').on('click', function() {
      app.addFriend($(this).text());
    });

    $(document).on('submit', function(event) {
      event.preventDefault(); // 
      console.log('clicked');
      app.handleSubmit();
    });

    app.fetch(helpers.appendData);
  },     

  send: function(msg) {
    $.ajax({
      url: this.server, 
      type: 'POST',
      data: JSON.stringify(msg), 
      // dataType: 'jsonp',
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
      // dataType: 'jsonp',
      contentType: 'application/json', 
      success: function (data) {
        cb(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        // console.error('chatterbox: Failed to fetch message', data);
      },
      complete: function() {
        setTimeout(function() {
          app.fetch(helpers.appendData);
        }, 2000);
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },
  addMessage: function(obj) {
    $('#chats').append('<p><a href="#" class="username">' + helpers.vanillaEsc(obj.username) + '</a>: ' + helpers.vanillaEsc(obj.text) + '</p>'); 
  },
  addRoom: function(name) {
    $('#roomSelect').append('<p>' + name + '</p>');
  },
  addFriend: function(friend) {
  },
  handleSubmit: function() {
    console.log('in handleSubmit');
    // grab text input from textarea within form
    // send to server
    var msgTxt = $('#message').val();
    $('#message').val('');
    var forServer = {
      username: helpers.unescape(window.location.search, /\?username\=/),
      text: msgTxt,
      roomname: ''
    };
    app.send(forServer);
  }
};

























