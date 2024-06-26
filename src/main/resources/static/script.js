var stompClient = null;

function connect(){
    let socket = new SockJS("/server1");

    stompClient = Stomp.over(socket);
    stompClient.connect({},function(frame){
        $('#name-from').addClass('d-none');
        $('#chat-room').removeClass('d-none');
        //Subscribe to Chanel for message
        stompClient.subscribe("/topic/return-to", function(response){
            showMessage(JSON.parse(response.body));
        });
    });
}

function showMessage(message){
    $('#message-container-table').prepend(`<tr><td><b>${message.name}:</b> ${message.content}</td></tr>`);
    $('#message-value').val('');
}

function sendMessage(){
    let jsonOb = {
        name:localStorage.getItem("name"),
        content:$("#message-value").val()
    }
    stompClient.send("/app/message",{},JSON.stringify(jsonOb));
}

$(document).ready((e)=>{
    $('#login').click(()=>{
        let name = $('#name-value').val();
        localStorage.setItem("name",name);
        $('#name-title').html(`Welcome, <b>${name}</b>`);
        connect();
    });

    $('#send-button').click(()=>{
        sendMessage();
    });

     $('#logout-button').click(()=>{
        localStorage.removeItem("name");
        if(stompClient!=null){
            stompClient.disconnect();
             $('#name-from').removeClass('d-none');
             $('#chat-room').addClass('d-none');
        }
    });
})