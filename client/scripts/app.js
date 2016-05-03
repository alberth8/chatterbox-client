$(window).load( function() {
  app.init();
});

var helpers = {
  vanillaEsc: function(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },
  appendData: function(data) {
    var msgArray = data.results; // array of message objects
    var uniqueRooms = {};

    app.clearMessages();
    $('.dropdown-menu').empty();

    msgArray.forEach(function(msgObj) {
      app.addMessage(msgObj);
      uniqueRooms[msgObj.roomname] = true;
    });
    
    for (var key in uniqueRooms) {
      app.addRoom(key);
    }
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
        console.error('chatterbox: Failed to fetch message', data);
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
    $('.dropdown-menu').append('<li><a href="#">' + helpers.vanillaEsc(name) + '</a></li>');
  },
  addFriend: function(friend) {
  },
  handleSubmit: function() {
    // console.log('in handleSubmit');
    // grab text input from textarea within form, send to server
    var msgTxt = $('#message').val();
    // clear out the form field
    $('#message').val('');
    var forServer = {
      username: helpers.unescape(window.location.search, /\?username\=/),
      text: msgTxt,
      roomname: ''
    };
    app.send(forServer);
  }
};

























