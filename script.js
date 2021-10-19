console.log("Program starting")
const SDB_URL = "https://tinkr.tech/sdb/chatapp"
const messagesContainer = document.querySelector('#messages-container')

async function downloadMessages() {
    console.log("Downloading messages from server")
    const messages = await fetchGET(SDB_URL)
    console.log('Downloaded message count:', messages.length)
    console.log('First message content:', messages[0])
    console.log('First message user:', messages[0].user)

    messagesContainer.innerHTML = null
    for (const message of messages) {
        let messageHTML = '<div class="message">'
        messageHTML += '<p class="user">' + message.user + '</p>'
        messageHTML += '<p class="content">' + message.message + '</p>'
        messageHTML += '</div>'
        console.log('messageHTML', messageHTML)
        messagesContainer.innerHTML += messageHTML
    }
}

downloadMessages()

const messageInput = document.querySelector('input#message')
console.log("Selected element with id:", messageInput.id)

messageInput.onkeyup = async function (event) {
    console.log('User is typing:', event.target.value)
    const message = event.target.value

    if (event.key === 'Enter') {
        console.log('Enter pressed, send message')
        const userInput = document.querySelector('input#user')
        console.log('userInput.value', userInput.value)
        const data = { user: userInput.value, message: message }
        await fetchPOST(SDB_URL, data)
    }
}
