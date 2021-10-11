const socket = io()
var threds = [];
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
// do {
//     name = prompt('Please enter your name: ')
// } while(!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    document.title = "Message sent.."
    let msg = {
        from: {
            user: uname,
            id: uid
        },
        to: {
            id: "6161e39f81639e10747e312c"
        },
        message: message.trim()
    };
    let apmsg = {
        user: "You",
        message: message.trim()
    }
    // Append 
    // appendMessage(apmsg, 'outgoing')
    textarea.value = ''
    // scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type, elemId) {



    document.title = "New Message..."

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.from.user}</h4>
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


    // messageArea.appendChild(mainDiv)
}



socket.on("connect", function() {


    /*let msg = {
            user: "You",
            message: "You are now connected to this chart"
        }
        appendMessage(msg, 'outgoing')*/
    // scrollToBottom()
    console.log("connected");

    /*let fm = {
        user: name,
        message: `${name} is now connected to this chart`
    } */
    socket.emit('join', {
        username: uname,
        id: uid
    });

    // setInterval(function(){
    // socket.emit('join', {username: uname, id: uid});  
    // },5000)
    // socket.emit('message', fm)

    /*$(window).bind('beforeunload', function(event) {
        return "You have unsaved work, it will be lost if you leave this page.";
        console.log(event);
    });
    */

    // socket.on('disconnect', function(){
    //     alert("disconected")
    // });


})


// Recieve messages 
socket.on('message', (msg) => {

    var apmsg = {
        user: msg.from.user,
        message: msg.msg,
    }
    var idstr = '#thred-' + msg.from.id;
    appendMessage(msg, 'incoming', msg.from.id);
    scrollToBottom(idstr)
})

// Recieve persoanl  messages 
/*socket.on('personal', (msg) => {
    console.log(msg)
    appendMessage(msg, 'incoming')

    scrollToBottom()
})*/

// Recieve new user data 
socket.on('erteERERDCXZ', (users) => {
    // console.log(users);

    users.forEach(function(user) {
        if (user.id !== uid) {

            if ($(`#${user.id}`).length == 0) {
                $(".userlist").append(`<li id="${user.id}" onclick="createThred()">${user.username}</li>`);
            }

        }


    })

})

function scrollToBottom(id) {
    // messageArea.scrollTop = messageArea.scrollHeight
    document.querySelector(id).scrollTop = document.querySelector(id).scrollHeight;
};