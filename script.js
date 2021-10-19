console.log("Program starting")
const SDB_URL = "https://tinkr.tech/sdb/chatapp"

async function downloadMessages() {
    console.log("Downloading messages from server")
    const messages = await fetchGET(SDB_URL)
    console.log('Downloaded message count:', messages.length)
}

downloadMessages()
