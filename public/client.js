const socket = io()
var threds = [];
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
// do {
//     name = prompt('Please enter your name: ')
// } while(!name)
var toId;
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value,toId)
    }
})





   //================
  // send messages |
 //==================

function sendMessage(message,id) {
    document.title = "Message sent.."
    let msg = {
        from: {
            user: uname,
            id: uid
        },
        to: {
            id: id
        },
        message: message.trim()
    };
  var apmsg = {
    msg: message.trim(),
    from: {
        user: "You",
    }
}
var idstr = "thred-" + id;

    appendMessage(apmsg, 'outgoing',id)
    textarea.value = ''
    scrollToBottom(idstr)


    socket.emit('message', msg)

}



   //================
  // append messages |
 //==================
function appendMessage(msg, type, elemId) {



    document.title = "New Message..."

    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        
        <p>${msg.msg}</p>
    `
    mainDiv.innerHTML = markup;

    var idstr = 'thred-' + elemId;



    if ($(`#${idstr}`).length) {

        var divs = $(".main_area div");


        $(`#${idstr}`).nextAll().hide()
        $(`#${idstr}`).prevAll().hide()
        $(`#${idstr}`).append(mainDiv);
        $(`#${idstr}`).show();


    } else {


        $(".main_area").append(`<div id="${idstr}" class="message__area"></div>`);


        $(`#${idstr}`).nextAll().hide()
        $(`#${idstr}`).prevAll().hide()
        $(`#${idstr}`).append(mainDiv);
        $(`#${idstr}`).show();

    }


}



socket.on("connect", function() {
    socket.emit('join', {
        username: uname,
        id: uid
    });

    // setInterval(function(){
    // socket.emit('join', {username: uname, id: uid});  
    // },5000)
    // socket.emit('message', fm)


})


// Recieve messages 
socket.on('message', (msg) => {

    var apmsg = {
        user: msg.from.user,
        message: msg.msg,
    }
    var idstr = 'thred-' + msg.from.id;
    toId = msg.from.id;
    $("#thredPerson").text($(`#${msg.from.id}`).text())
    appendMessage(msg, 'incoming', msg.from.id);
    scrollToBottom(idstr)
})

// Recieve new user data 
socket.on('erteERERDCXZ', (users) => {
    // console.log(users);

    users.forEach(function(user) {
        if (user.id !== uid) {

            if ($(`#${user.id}`).length == 0) {
                $(".userlist").append(`<li id="${user.id}" onclick="createThred(id)">${user.username}</li>`);
            }

        }


    })

})

function scrollToBottom(id) {
    document.querySelector(`#${id}`).scrollTop = document.querySelector(`#${id}`).scrollHeight;
};


function createThred(id) {

    var idstr = 'thred-' + id;
    toId = id;
    $("#thredPerson").text($(`#${id}`).text())
    if ($(`#${idstr}`).length) {
        $(`#${idstr}`).nextAll().hide();
        $(`#${idstr}`).prevAll().hide();
        $(`#${idstr}`).show();
        scrollToBottom(idstr)
    } else {
        $(".main_area").append(`<div id="${idstr}" class="message__area"></div>`);
        $(`#${idstr}`).nextAll().hide();
        $(`#${idstr}`).prevAll().hide();
        $(`#${idstr}`).show();
    }

}