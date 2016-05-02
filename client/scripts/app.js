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

var app = {
  init: function() { // click handlers go here 

    $('.username').on('click', function() {
      app.addFriend($(this).text());
    });

    $('#send .submit').on('submit', function(event) {
      event.preventDefault();
      console.log('clicked');
      app.handleSubmit();
    });

  },
  // friends: [],
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
  fetch: function() {
    $.ajax({      
      url: this.server, 
      type: 'GET',
      // data: JSON.stringify(), 
      contentType: 'application/json', 
      success: function (data) {
        console.log('chatterbox: Message fetched');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
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





























