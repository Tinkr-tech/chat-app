const SDB_URL = "https://tinkr.tech/sdb/chatapp"
const messagesContainer = document.querySelector('#messages-container')

async function downloadMessages() {
    const messages = await fetchGET(SDB_URL)

    messagesContainer.innerHTML = null
    for (const message of messages) {
        let messageHTML = '<div class="message">'
        messageHTML += '<p class="user">' + message.user + '</p>'
        messageHTML += '<p class="content">' + message.message + '</p>'
        messageHTML += '</div>'
        messagesContainer.innerHTML += messageHTML
    }
}

downloadMessages()

const messageInput = document.querySelector('input#message')

messageInput.onkeyup = async function (event) {
    const message = event.target.value

    if (event.key === 'Enter') {
        const userInput = document.querySelector('input#user')
        const data = { user: userInput.value, message: message }
        await fetchPOST(SDB_URL, data)
        messageInput.value = null
        downloadMessages()
    }
}
