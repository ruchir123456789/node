const socket = io();
let names;
let textarea = document.querySelector('#textarea')
let messageArea =document.querySelector('.message__area')

do {
    names = prompt("enter your name to join");
} while (!names)

// socket.emit('new-user-joined', name);  


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// btn.addEventListener('click', (e) => {
    
//         sendMessage(e.target.value)
    
// })

function sendMessage(message) {
    let msg = {
        user: names,
        message: message.trim( ),
    }
 
    // append
    appendMessage(msg, 'outgoing')
    textarea.value =''


    //socket
    socket.emit('message',msg)

}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `


    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


//recive message

socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}