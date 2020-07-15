const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: '98fa983021824d',
       pass: '65ff24fca556f6'
    }
});

const zmq = require('zeromq')
const sock = zmq.socket('req')
const storeURL = 'tcp://127.0.0.1:2000'
sock.connect(storeURL)

sock.send(JSON.stringify({
  action: 'read',
  payload: {}
}))

sock.on('message', (msg) => {
  const emails = JSON.parse(msg)
  emails.forEach(email => {
    const message = {
      from: 'no-reply@susanin',
      to: email.address,
      subject: 'Hello from Susanin',
      text: 'Susanin sends his regards'
    }
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    })
  })
})
