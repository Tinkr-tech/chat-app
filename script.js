console.log("Program starting")
const SDB_URL = "https://tinkr.tech/sdb/chatapp"
const messagesContainer = document.querySelector('#messages-container')

async function downloadMessages() {
    console.log("Downloading messages from server")
    const messages = await fetchGET(SDB_URL)
    console.log('Downloaded message count:', messages.length)
    console.log('First message content:', messages[0])
    console.log('First message user:', messages[0].user)

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
