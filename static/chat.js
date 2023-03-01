$('#chat-form').submit(function(e) {
  e.preventDefault();
  var userInput = $('#user-input').val();
  $('#chat-window').append('<p><strong>You:</strong> ' + userInput + '</p>');
  $('#user-input').val('Loading.....Please wait!');
  $.ajax({
    url: '/chat',
    data: { user_input: userInput },
    type: 'POST',
    cache: false,
    success: function(response) {
      $('#chat-window').append('<p><strong>ChatGPT:</strong> ' + response.response.choices[0].text.replace('\n', '<br>') + '</p>');
      $('#user-input').val('');
    },
    error: function(xhr, status, error) {
    // Handle any errors here
    console.log("Error: " + error);
    $('#chat-window').append('<p><strong>ChatGPT:</strong> ' + 'Server Error Occured! Please Try Again.' + '</p>');
    $('#user-input').val('');
  }
  });
});
