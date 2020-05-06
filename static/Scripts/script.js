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

function logout(){

  localStorage.clear();

  location.reload();

}

var count = 0;

function open_channel(e){

  e.preventDefault();

  if (event.target.id == "channel-text-modal" ||  event.target.id == "channel-image-modal"){
    $('#channel-modal').modal('toggle');
  }

  localStorage.setItem("channel", event.target.dataset.channel);
  document.querySelector("#channel-top-name").innerHTML = localStorage.getItem("channel");

  document.querySelector("#show-messages").innerHTML = "";

  location.reload();

  message_show(messages);

  if (count == 0) {

    var input = document.createElement("INPUT");

    input.setAttribute("type", "text");
    input.setAttribute("name", "message");
    input.className = "form-control d-inline col-xl-12 col-lg-11 col-md-8 col-sm-8 col-8 sending-messages";
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
    submit.className = "btn d-inline mb-1 sending-messages";

    document.querySelector("#sending-messages").appendChild(input);
    document.querySelector("#sending-messages").appendChild(submit);

    count += 1;

  }

}

function message_show(messages){

  messages = messages[localStorage.getItem("channel")];

  if (messages != null){

    for (message of messages){

      if (message["name"] == localStorage.getItem("name")){

        var message_container = document.createElement("DIV");
        message_container.className = "mt-2 d-block both-message";

        var message_span = document.createElement("SPAN");
        message_span.className = "my-message";

        var message_sender = document.createElement("SPAN");
        var m_sender = document.createTextNode(message["name"] + " ");
        message_sender.appendChild(m_sender);
        message_sender.className = "message-sender";
        message_span.appendChild(message_sender);

        var message_date = document.createElement("SPAN");
        var m_date = document.createTextNode(message["date"]);
        message_date.appendChild(m_date);
        message_date.className = "message-date";
        message_span.appendChild(message_date);

        var bre = document.createElement("BR");
        message_span.appendChild(bre);

        var message_text = document.createTextNode(message["message"]);
        message_text.className = "message-text";
        message_span.appendChild(message_text);

        var delete_img = document.createElement("IMG");
        delete_img.setAttribute("src", "static/Images/delete.png");
        delete_img.setAttribute("width", "20");
        delete_img.setAttribute("height", "20");
        delete_img.className = "delete-image";
        message_span.appendChild(delete_img);

        message_container.appendChild(message_span);

        document.querySelector("#show-messages").appendChild(message_container);

      }
      else{

        var message_container = document.createElement("DIV");
        message_container.className = "mt-2 d-block both-message";

        var message_span = document.createElement("SPAN");
        message_span.className = "else-message d-inline-block";

        var message_sender = document.createElement("SPAN");
        var m_sender = document.createTextNode(message["name"] + " ");
        message_sender.appendChild(m_sender);
        message_sender.className = "message-sender";
        message_span.appendChild(message_sender);

        var message_date = document.createElement("SPAN");
        var m_date = document.createTextNode(message["date"]);
        message_date.appendChild(m_date);
        message_date.className = "message-date";
        message_span.appendChild(message_date);

        var bre = document.createElement("BR");
        message_span.appendChild(bre);

        var message_text = document.createTextNode(message["message"]);
        message_text.className = "message-text";
        message_span.appendChild(message_text);

        message_container.appendChild(message_span);

        document.querySelector("#show-messages").appendChild(message_container);

      }

    }

  }

}

document.addEventListener('DOMContentLoaded', () => {

  if (localStorage.getItem("name") == null){
    $('#myModal').modal('toggle');
  }

  document.querySelector("#display-name-show").innerHTML = localStorage.getItem("name");

  document.querySelector("#channel-top-name").innerHTML = localStorage.getItem("channel");

  if (document.querySelector("#channel-top-name").innerHTML != "No channel chosen"){

    message_show(messages);

    var input = document.createElement("INPUT");

    input.setAttribute("type", "text");
    input.setAttribute("name", "message");
    input.className = "form-control d-inline col-md-11 col-sm-10 col-10 sending-messages";
    input.setAttribute("placeholder", "Send a message...");
    input.setAttribute("id", "send-input");

    var image = document.createElement("IMG");

    image.setAttribute("src", "static/Images/send.png");
    image.setAttribute("width", "27");
    image.setAttribute("height", "27");

    var submit = document.createElement("BUTTON");

    submit.appendChild(image);
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "send-btn");
    submit.setAttribute("id", "send-btn");
    submit.className = "btn d-inline mb-1 ml-1 sending-messages";

    document.querySelector("#sending-messages").appendChild(input);
    document.querySelector("#sending-messages").appendChild(submit);

    count += 1
  }

  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  var count2 = 0;

  socket.on('show channel', channel => {

    if ( (channel == "error") && (count2 == 0) ) {
      alert("This channel is already created. Try again!");
    }
    else if (count2 == 0){

      var channel_view = document.createElement("DIV");
      channel_view.setAttribute("id", "channel-view");

      var channel_image = document.createElement("IMG");
      channel_image.setAttribute("src", "static/Images/channel.jpg");
      channel_image.setAttribute("width", "48");
      channel_image.setAttribute("height", "48");
      channel_image.setAttribute("id", "channel-image");
      channel_image.setAttribute("data-channel", channel);

      channel_image.addEventListener("click", open_channel);

      var channel_text = document.createElement("A");
      var text = document.createTextNode("#" + channel);
      channel_text.appendChild(text);
      channel_text.setAttribute("id", "channel-text");
      channel_text.setAttribute("data-channel", channel);

      channel_text.addEventListener("click", open_channel);

      channel_view.appendChild(channel_image);
      channel_view.appendChild(channel_text);

      document.querySelector("#channels-modal").appendChild(channel_view);

      var channel_view = document.createElement("DIV");
      channel_view.setAttribute("id", "channel-view");

      var channel_image = document.createElement("IMG");
      channel_image.setAttribute("src", "static/Images/channel.jpg");
      channel_image.setAttribute("width", "48");
      channel_image.setAttribute("height", "48");
      channel_image.setAttribute("id", "channel-image");
      channel_image.setAttribute("data-channel", channel);

      channel_image.addEventListener("click", open_channel);

      var channel_text = document.createElement("A");
      var text = document.createTextNode("#" + channel);
      channel_text.appendChild(text);
      channel_text.setAttribute("id", "channel-text");
      channel_text.setAttribute("data-channel", channel);

      channel_text.addEventListener("click", open_channel);

      channel_view.appendChild(channel_image);
      channel_view.appendChild(channel_text);

      document.querySelector("#channels").appendChild(channel_view);

    }
  });

  socket.on('show message', data => {

    var message = data["message"];
    var date = data["date"];
    var dn = data["name"];
    var channel = localStorage.getItem("channel");

    if (channel in messages){

      if (messages[channel].length == 100){
        messages[channel].splice(0, 1);
        document.querySelector("#show-messages").removeChild(document.querySelector("#show-messages").childNodes[0]);
      }

      messages[channel].push( { 'channel' :  channel,'message' : message, 'date' : date, 'name' : dn } );
    }
    else{
      messages[channel] = [{ 'channel' :  channel,'message' : message, 'date' : date, 'name' : dn }]
    }

    if (dn == localStorage.getItem("name")){

      var message_container = document.createElement("DIV");
      message_container.className = "mt-2 d-block both-message";

      var message_span = document.createElement("SPAN");
      message_span.className = "my-message";

      var message_sender = document.createElement("SPAN");
      var m_sender = document.createTextNode(dn + " ");
      message_sender.appendChild(m_sender);
      message_sender.className = "message-sender";
      message_span.appendChild(message_sender);

      var message_date = document.createElement("SPAN");
      var m_date = document.createTextNode(date);
      message_date.appendChild(m_date);
      message_date.className = "message-date";
      message_span.appendChild(message_date);

      var bre = document.createElement("BR");
      message_span.appendChild(bre);

      var message_text = document.createTextNode(message);
      message_text.className = "message-text";
      message_span.appendChild(message_text);

      var delete_img = document.createElement("IMG");
      delete_img.setAttribute("src", "static/Images/delete.png");
      delete_img.setAttribute("width", "20");
      delete_img.setAttribute("height", "20");
      delete_img.className = "delete-image";
      message_span.appendChild(delete_img);

      message_container.appendChild(message_span);

      document.querySelector("#show-messages").appendChild(message_container);

    }
    else{

      var message_container = document.createElement("DIV");
      message_container.className = "mt-2 d-block both-message";

      var message_span = document.createElement("SPAN");
      message_span.className = "else-message d-inline-block";

      var message_sender = document.createElement("SPAN");
      var m_sender = document.createTextNode(dn + " ");
      message_sender.appendChild(m_sender);
      message_sender.className = "message-sender";
      message_span.appendChild(message_sender);

      var message_date = document.createElement("SPAN");
      var m_date = document.createTextNode(date);
      message_date.appendChild(m_date);
      message_date.className = "message-date";
      message_span.appendChild(message_date);

      var bre = document.createElement("BR");
      message_span.appendChild(bre);

      var message_text = document.createTextNode(message);
      message_text.className = "message-text";
      message_span.appendChild(message_text);

      message_container.appendChild(message_span);

      document.querySelector("#show-messages").appendChild(message_container);

    }

  });

  socket.on('delete show message', data => {

    element = data["target"];

    element.parentElement.style.aimationPlayState = 'running';
    element.parentElement.addEventListener('animationend', () => {
      element.parentElement.remove();
    });

  });

  document.querySelector('#channel').onsubmit = () => {

    var channel_name = document.querySelector('#channel_name').value;

    socket.emit("add channel", {'channel' : channel_name});

    document.querySelector('#channel_name').value = "";

    return false;

  };

  document.querySelector('#channel-modal').onsubmit = () => {

    var channel_name = document.querySelector('#channel-name-modal').value;

    socket.emit("add channel", {'channel' : channel_name});

    document.querySelector('#channel-name-modal').value = "";

    return false;

  };

  document.querySelector('#sending-messages').onsubmit = () => {

    var channel = localStorage.getItem("channel");

    var message = document.querySelector('#send-input').value;

    var d = new Date();
    var date = d.getHours() + ":" + d.getMinutes();

    var dn = localStorage.getItem("name");

    socket.emit("add message", {'channel' :  channel,'message' : message, 'date' : date, 'name' : dn});

    document.querySelector('#send-input').value = "";

    return false;

  };

  document.querySelector('.delete-image').onclick = () => {

    var message_text = event.target.previousSibling.textContent;

    socket.emit("delete message", { 'message' :  message_text, 'channel' : localStorage.getItem("channel"), 'target' : event.target });

  };

});
