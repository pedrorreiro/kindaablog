/*const nodemailer = require("nodemailer");

transporter = nodemailer.createTransport({
    host: "smtp.live.com",
    port: 25,
    secure: true,
    auth: {
        user: "pedro_rique17@hotmail.com",
        pass: "21010000a"
    }
});

sendEmail = (destinatario, senha) => {
    transporter.sendMail({
        from: "Equipe PedroBlog <pedro_rique17@hotmail.com>",
        to: destinatario,
        subject: "Recuperação de senha",
        text: "",
        html: "Olá! Vi que esqueceu a sua senha, então podemos te ajudar!" +
            "<br><br>A sua senha atual é: <strong>" + senha + "</strong>. <br><br>" +
            "Caso queira alterar sua senha, contate a nossa equipe!"
    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })
}
*/