const chatTextBox = document.getElementById('chatTextBox')
const usernameTextBox = document.getElementById('usernameTextBox')
const sendMessageBtn = document.getElementById('sendMessageBtn')
const messagesUL = document.getElementById("messagesUL")

sendMessageBtn.addEventListener('click', function() {

    const username = usernameTextBox.value 
    const chatText = chatTextBox.value 

    const chatMessage = { message: chatText, username: username}
    socket.emit('Cinema', chatMessage)
})

socket.on('Cinema', (chat) => {
    console.log(chat)
    const messageItem = `<li>${chat.username} - ${chat.message}</li>`
    messagesUL.insertAdjacentHTML('beforeend', messageItem)
})

