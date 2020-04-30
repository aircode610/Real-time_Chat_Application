function display(){

  var name = document.getElementById("display-name").value;

  if (name == ""){
    $('#myModal').modal('toggle');
  }
  else{
    localStorage.setItem("name", name);
    localStorage.setItem("channel", "No channel chosen")
  }

}

var count = 0;

function open_channel(e){

  e.preventDefault();

  localStorage.setItem("channel", event.target.dataset.channel);
  document.querySelector("#channel-top-name").innerHTML = localStorage.getItem("channel");

  if (count == 0) {
    var input = document.createElement("INPUT");

    input.setAttribute("type", "text");
    input.setAttribute("name", "message");
    input.className = "form-control d-inline col-xl-11 sending-messages";
    input.setAttribute("placeholder", "Send a message...");

    var image = document.createElement("IMG");

    image.setAttribute("src", "static/Images/send.png");
    image.setAttribute("width", "27");
    image.setAttribute("height", "27");

    var submit = document.createElement("BUTTON");

    submit.appendChild(image);
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "send-btn");
    submit.setAttribute("id", "send-btn");
    submit.className = "btn d-inline mb-1 ml-2 sending-messages";

    document.querySelector("#sending-messages").appendChild(input);
    document.querySelector("#sending-messages").appendChild(submit);

    count += 1;
  }

}

document.addEventListener('DOMContentLoaded', () => {

  if (localStorage.getItem("name") == null){
    $('#myModal').modal('toggle');
  }

  document.querySelector("#display-name-show").innerHTML = localStorage.getItem("name");

  document.querySelector("#channel-top-name").innerHTML = localStorage.getItem("channel");

  if (document.querySelector("#channel-top-name").innerHTML != "No channel chosen"){
    var input = document.createElement("INPUT");

    input.setAttribute("type", "text");
    input.setAttribute("name", "message");
    input.className = "form-control d-inline col-xl-11 sending-messages";
    input.setAttribute("placeholder", "Send a message...");

    var image = document.createElement("IMG");

    image.setAttribute("src", "static/Images/send.png");
    image.setAttribute("width", "27");
    image.setAttribute("height", "27");

    var submit = document.createElement("BUTTON");

    submit.appendChild(image);
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "send-btn");
    submit.setAttribute("id", "send-btn");
    submit.className = "btn d-inline mb-1 ml-2 sending-messages";

    document.querySelector("#sending-messages").appendChild(input);
    document.querySelector("#sending-messages").appendChild(submit);

    count += 1
  }

  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  socket.on('connect', () => {

    document.querySelector('#channel').onsubmit = () => {

      var channel_name = document.querySelector('#channel_name').value;

      socket.emit('add channel', {'channel' : channel_name});

      document.querySelector('#channel_name').value = "";

      return false;

    }

  });

  var count = 0;

  socket.on('channel show', data => {

    if ( (channel == "error") && (count == 0) ) {
      alert("This channel is already created. Try again!");
      count = 1;
    }
    else if (count == 0){

      var channel_view = document.createElement("DIV");
      channel_view.setAttribute("id", "channel-view");

      var channel_image = document.createElement("IMG");
      channel_image.setAttribute("src", "static/Images/channel.jpg");
      channel_image.setAttribute("width", "48");
      channel_image.setAttribute("height", "48");
      channel_image.setAttribute("id", "channel-image");

      var channel_text = document.createElement("A");
      var text = document.createTextNode("#" + data.channel);
      channel_text.appendChild(text);
      channel_text.setAttribute("id", "channel-text");
      channel_text.setAttribute("data-channel", channel);

      channel_text.addEventListener("click", open_channel)

      channel_view.appendChild(channel_image);
      channel_view.appendChild(channel_text);

      document.querySelector("#channels").appendChild(channel_view);

      count = 1;
    }
  });

  count = 0;

});
