const SDB_URL = "https://tinkr.tech/sdb/chatapp"
const messagesContainer = document.querySelector('#messages-container')
const membersContainer = document.querySelector('#right-pane div')

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
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    const members = []
    for (const message of messages) {
        if (!members.includes(message.user)) {
            members.push(message.user)
        }
    }
    console.log('members', members)

    let membersHTML = ''
    for (const name of members) {
        membersHTML += '<p>' + name + '</p>'
    }
    console.log('membersHTML', membersHTML)

    membersContainer.innerHTML = membersHTML
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
