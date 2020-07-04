const nodemailer = require('nodemailer');

enviar: (name, email, comment) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'drosalesfl@gmail.com',
          pass: 'Morrowind3'
        }
    });

    var mailOptions = {
        from: 'drosalesfl@gmail.com',
        to: 'drosalesfl@gmail.com',
        subject: `Retroalimentacion joyitas de $name`,
        text: `Comentario: $comment. contacto: $email`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
};