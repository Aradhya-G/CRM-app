const Client = require("node-rest-client").Client

const client = new Client();

exports.client = client
exports.sendEmail = (ticketId, subject, content, emailId, requester) => {
    let reqBody = {
        "subject": subject,
        "ticketId": ticketId,
        "content": content,
        "recepientEmails": emailId,
        "requester": requester
    }
    
    const args = {
        data: reqBody,
        headers: { "Content-Type": "application/json" }
    }

    client.post("http://localhost:3030/notifiServ/api/notifications/",
        args,
        (data, response) => {
            console.log("Request sent")
            console.log(data)
        }
    )
}