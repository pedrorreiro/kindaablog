import React from "react";

const jwt = require("jsonwebtoken");

export class Conta extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayLogin: "inline-block",
            displayCadastro: "none",
            displayForgot: "none",
            tipoMsg: "",
            campoEmail: "",
            campoSenha: ""

        }
    }

    componentDidMount() {}

    async getEmailByToken() {
        const jwtKey = 'p3dr0rr3ir0';

        var token = this.getToken();

        return await jwt.verify(token, jwtKey).email;

    }

    changeEmail = (event) => {
        this.setState({
            campoEmail: event.target.value
        })
    }

    changeSenha = (event) => {
        this.setState({
            campoSenha: event.target.value
        })
    }

    changeNome = (event) => {
        this.setState({
            campoNome: event.target.value
        })
    }

    esqueciRequest(){
        const axios = require('axios');

        let email = this.state.campoEmail;

        if(email === ""){
            this.setState({
                msgErro: "Campo vazio!",
                tipoMsg: "alert cwarning",

                displayErro: "block",
            })
        }

        else{

            axios.get('https://servidorpedro.herokuapp.com/forgotPass/' + email
            ).then(((response) => {

                this.setState({
                    msgErro: response.data.msg,
                    tipoMsg: response.data.tipo,

                    displayErro: "block",
                })

                if (response.data.sucess) {

                    console.log("Senha enviada!");
                }

            })).catch((error) => {
                console.log("Erro na recuperação de senha");

                this.setState({
                    msgErro: "Erro na recupeção de senha!",
                    tipo: "alert alert-danger"
                });
            });

        }
    }

    loginRequest() {

        this.setState({

            displayErro: "none",
            msgLoad: "inline-block",
            brLoad: "inline-block"

        });

        const axios = require('axios');

        let email = this.state.campoEmail;
        let senha = this.state.campoSenha;

        if (email === "" || senha === "") {
            this.setState({
                msgErro: "Campos Vazios!",
                tipoMsg: "alert alert-warning",
                displayErro: "block",
                msgLoad: "none"
            });
        }

        else {
            axios.post('https://servidorpedro.herokuapp.com/logar/', {
                email: email,
                senha: senha
            }).then(((response) => {

                this.setState({ // zera campos da tela de login
                    msgErro: response.data.msg,
                    tipoMsg: response.data.tipo,
                    token: response.data.token,

                    displayErro: "block",
                    msgLoad: "none"
                })

                if (response.data.sucess) {

                    console.log("LOGOU");

                    this.props.onLogado();
                    this.props.onVerificaAdm(this.state.token);

                    sessionStorage.setItem('token', this.state.token);

                }

            })).catch((error) => {
                console.log("Erro login");

                this.setState({
                    msgErro: "Erro no login!",
                    color: "red",
                    displayErro: "inline-block"
                });
            });
        }
    }

    cadastroRequest = () => {

        this.setState({
            displayErro: "none"
        })

        const axios = require('axios');

        let gmail = "@gmail.com";
        let hotmail = "@hotmail.com";
        let reqres = "@reqres.in";

        let tamanhoGmail = gmail.length; // 10
        let tamanhoHotmail = hotmail.length; // 12
        let tamanhoReqres = reqres.length; // 10

        let email = this.state.campoEmail;
        let senha = this.state.campoSenha;
        let nome = this.state.campoNome;

        if (email === "" || senha === "") {
            this.setState({
                displayErro: "block",
                msgErro: "Campos vazios!",
                tipoMsg: "alert alert-primary"
            })
        }

        else if (email.length < 3 || senha.length < 3) {
            this.setState({
                displayErro: "block",
                msgErro: "Os campos devem ter no mínimo 3 caracteres",
                tipoMsg: "alert alert-primary"
            })
        }

        else {

            if ((email.substring((email.lenght, (email.length - tamanhoGmail))) === gmail) ||
                (email.substring((email.lenght, (email.length - tamanhoHotmail))) === hotmail ||
                    (email.substring((email.lenght, (email.length - tamanhoReqres))) === reqres)
                )
            ) {

                this.setState({
                    displayErro: "none",
                    msgLoad: "inline-block"
                })

                axios.post('https://servidorpedro.herokuapp.com/cadastrar/', {
                    email: email,
                    password: senha,
                    nome: nome
                }).then(((response) => {

                    this.setState({
                        msgErro: response.data.msg,
                        tipoMsg: response.data.tipo,
                        displayErro: "block",
                        msgLoad: "none"
                    });

                })).catch((error) => {
                    console.log("Erro no cadastro");

                    this.setState({
                        displayErro: "block",
                        msgErro: "Erro no cadastro!",
                        tipoMsg: "alert alert-danger"
                    });
                });
            }

            else {
                this.setState({
                    displayErro: "block",
                    msgErro: "O campo não corresponde ao formato de e-mail",
                    tipoMsg: "alert alert-warning"
                });

            }
        }
    }

    mudaLogin = () => {
        if(this.state.displayCadastro === "inline-block") 
            this.setState({displayCadastro: "none", displayLogin: "inline-block"});

        else if(this.state.displayCadastro === "none")
            this.setState({displayCadastro: "inline-block", displayLogin: "none"});

        this.setState({
            displayErro: "none"
        })
    }

    esqueciSenha = () => {

        this.setState({
            displayCadastro: "none", 
            displayLogin: "none",
            displayForgot: "inline-block"
        });

    }

    render() {
        return (
            <div className="Conta">

                <div id="cadastro" className="conta" style={{ display: this.state.displayCadastro }}>
                    <form>

                        <div className="form-group">
                            <label>Nome</label>
                            <input className="form-control" placeholder="Fulado de tal" onChange={this.changeNome} />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="email@exemplo.com" onChange={this.changeEmail} />
                            <small id="emailHelp" className="form-text text-muted">Não vamos compartilhar seu email com ninguém!</small>
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" placeholder="**********" onChange={this.changeSenha} />
                        </div>

                        <div className={this.state.tipoMsg} role="alert" style={{display: this.state.displayErro}}>
                        {this.state.msgErro}
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.cadastroRequest}>Cadastrar</button><br /><br />

                        <button type="button" className="btn btn-primary btn-sm" onClick={this.mudaLogin}>Já possui uma conta?</button>

                    </form>
                </div>

                <div id="login" className="conta" style={{ display: this.state.displayLogin }}>
                    <form>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" onChange={this.changeEmail} placeholder="email@exemplo.com" />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" onChange={this.changeSenha} placeholder="**********" />
                        </div>

                        <small>Para fins de teste. Para entrar como administrador</small><br/>
                        <small><strong>user:</strong> admin, <strong>senha:</strong> admin</small><br/><br/>

                        <div className={this.state.tipoMsg} role="alert" style={{display: this.state.displayErro}}>
                        {this.state.msgErro}
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.loginRequest.bind(this)}>Entrar</button><br /><br />

                        <button type="button" className="btn btn-primary btn-sm" id="btnForgot" onClick={this.esqueciSenha}
                        >Esqueceu sua senha?</button>

                        <button type="button" className="btn btn-primary btn-sm" onClick={this.mudaLogin}>Não possui uma conta?</button>

                    </form>
                </div>

                <div id="esqueci" className="conta" style={{ display: this.state.displayForgot }}>
                    <form>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" onChange={this.changeEmail} placeholder="email@exemplo.com" />
                        </div>

                        <div className={this.state.tipoMsg} role="alert" style={{display: this.state.displayErro}}>
                        {this.state.msgErro}
                        </div>

                        <button type="button" className="btn btn-primary" onClick={this.esqueciRequest.bind(this)}>Enviar senha</button><br /><br />

                    </form>
                </div>
            </div>
        );
    }
}

export default Conta;
