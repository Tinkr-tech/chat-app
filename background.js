const fetchGET = async function (uri) {
    const request = await fetch(uri)
    const text = await request.text()
    let json
    try {
        json = JSON.parse(text)
    } catch (e) { /* ignore */ }
    return json || text
}

const fetchPOST = async function (uri, content) {
    const request = await fetch(uri, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(content)
    })
    const text = await request.text()
    let json
    try {
        json = JSON.parse(text)
    } catch (e) { /* ignore */ }
    return json || text
}

const sdbURL = "https://tinkr.tech/sdb/chatapp"
async function populate() {
    const messages = await fetchGET(sdbURL)
    if (!messages.length) {
        fetchPOST(sdbURL, { user: "Krister", message: "Tere! (that's hello in Estonian)" })
    }

}
populate()
