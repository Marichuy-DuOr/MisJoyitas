const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

//Lo de firebase
const admin = require('firebase-admin');

//Clave de servicio de firebase
var serviceAccount = require("./misjoyitas.json");

//Inizializa la clave
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

//db tiene los contenidos de la firestore database
let db = admin.firestore();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json())

/*app.use(express.static(path.join(__dirname, 'dist/MisJoyitas')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/MisJoyitas/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));*/
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/MisJoyitas/index.html'));
});

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));

/*const port = process.env.PORT || 3000;

// app.use(express.static(process.cwd() + "/dist/MisJoyitas"));

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
})*/

app.post("/send", (req, res) => {
    console.log("peticion");
    let feedback = req.body;
    sendMail(feedback, info => {
        res.send(info);
    });
});

async function sendMail(feedback, callback) {
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
        subject: `Retroalimentacion por ${feedback.name}`,
        text: `Mensaje: ${feedback.comment} \nContacto: ${feedback.email}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.get("/cupones", (req, res) => {
    var datos = '';
    //Consigo el contenido de la colleccion buscandola por nombre entonces (then)
    db.collection('Cupones').get().then((snapshot) => {
        console.log(snapshot.docs.map(doc => doc.data()));
        res.send(snapshot.docs.map(doc => doc.data()));
    }).catch((err) => {
        //Si hay error muestra esto
        console.log('Error getting documents', err);
    });
});