$(window).load( function() {
  app.init();
});

var helpers = {
  vanillaEsc: function(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },
  unescape: function(str, pattern) { 
    str = str.replace(pattern, '');
    return decodeURI(str);
  },
  appendData: function(data) {
    var msgArray = data.results; // array of message objects
    var uniqueRooms = {};

    app.clearMessages();
    $('.dropdown-menu').empty();

    msgArray.forEach(function(msgObj) {
      if (msgObj.roomname === app.roomname) {
        app.addMessage(msgObj);
      }
      uniqueRooms[msgObj.roomname] = true;
    });
    
    for (var key in uniqueRooms) {
      app.addRoom(key);
    }
    
    // set up click handler for changing rooms after appending rooms to dropdown
    $('.dropdown-menu li a').on('click', function() {
      // hide all messages on the page
      // show only those with a data attribute matching anchor text
      // change app.roomname 
      // console.log(this);
      // console.log(this.innerHTML);

      // this refers to the html element clicked, namely <a></a>
      app.roomname = this.innerHTML;
      app.fetch(helpers.appendData);
    });
    

  }
};

var app = {
  server: 'https://api.parse.com/1/classes/messages',
  roomname: 'Lobby',
  username: '',
  init: function() { // click handlers go here 

    // remove click handlers (for test purposes)
    //$('.username').off();
    //$('#send .submit').off();

    app.username = helpers.unescape(window.location.search, /\?username\=/);

    $('.username').on('click', function() {
      app.addFriend($(this).text());
    });

    $('#send').on('submit', function(event) { // note to self: on submit works with form only
      event.preventDefault(); 
      console.log('clicked');
      app.handleSubmit();
    });

    $('#switchUser').on('submit', function(event) { // note to self: on submit works with form only
      event.preventDefault(); 
      var userName = $('#newUserName').val();
      // clear out the form field
      $('#newUserName').val('');
      app.username = userName;
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
    $('#chats').append('<span data-room="' + helpers.vanillaEsc(obj.roomname) + '"><a href="#" class="username">' + helpers.vanillaEsc(obj.username) + '</a>: ' + helpers.vanillaEsc(obj.text) + '</span><br/>'); 
  },
  addRoom: function(name) {
    $('.dropdown-menu').append('<li><a href="#">' + helpers.vanillaEsc(name) + '</a></li>');
  },
  addFriend: function(friend) {
  },
  handleSubmit: function() {
    // grab text input from textarea within form, send to server
    var msgTxt = $('#message').val();
    // clear out the form field
    $('#message').val('');
    var forServer = {
      username: this.username,
      text: msgTxt,
      roomname: this.roomname
    };
    app.send(forServer);
  }
};


    // var test = _.groupBy(msgArray, function(msgObj) { 
    //   return msgObj.roomname; 
    // });
    // console.log(test);

    // click handler to select room
    // run through current messages, show/hide based on selected tags
    // what happens upon next fetch?
    // not a private implementation:  hidden messages still available in source

    // alt approach:
    // a flag to indicated current selected room
    // on each call to fetch, 
    // filter the collection returned by the selected room 
    // only append those to the page
















