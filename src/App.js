import React from 'react';
import './App.css';
import './style.css';
import Conta from './Conta';
import Postar from './Postar';
import Posts from './Posts';
import Char from './Char';

const jwt = require("jsonwebtoken");

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: "",
            btnCadastro: "inline-block",
            btnSair: "none",
            btnLogar: "inline-block",
            displayPostar: "none",
            displayConta: "inline-block",
            displayPosts: "none",
            displayChar: "none",
            displayBtnPostar: "none",
            imgChar: 'https://freepngimg.com/thumb/emoji/65263-emoticon-of-smiley-face-tears-joy-whatsapp.png',
            atualizaPost: false,
            adm: false,

        }
    }

    componentDidMount() {

        this.teste();

        var token = this.getToken();

        if (this.isLogado(token)) {

            this.setState({logado: true});

            this.showDadosLogado();
            this.verificaAdm(token);

        }

        else {
            console.log("Não foi logado automaticamente!");
            this.setState({ displaySair: "none" });
        }
    }

    teste() {
        const axios = require('axios');

        axios.get('https://servidorpedro.herokuapp.com/teste/')
            .then(((response) => {
                console.log("RESPOSTA: " + response.data.msg);
            }))
    }

    getToken() {
        if (sessionStorage.getItem('token') == null) {
            return '';
        }

        else return sessionStorage.getItem('token');
    }

    verificaAdm = (token) => {

        const axios = require('axios');

        axios.post('https://servidorpedro.herokuapp.com/isAdm/', {
            token: token
        })
            .then(((response) => {

                if (response.data.isAdm) {
                    this.setState({
                        displayBtnPostar: "inline-block",
                        adm: true
                    });

                    this.atualizaImgChar();

                    console.log("Bem vindo, administrador!");
                }

                else {

                    this.setState({
                        displayBtnPostar: "none",
                    });

                    this.atualizaImgChar();

                    console.log("Bem vindo, usuário!");
                }

                this.setState({
                    brLoad: "none",
                    displayErro: "inline-block"
                });

            }));
    }

    sair = () => {

        sessionStorage.removeItem("token");

        this.setState({
            postArea: "none",
            displaySair: "none",
            displayConta: "inline-block",
            displayPostar: "none",
            displayPosts: "none",
            displayBtnPostar: "none",
            displayChar: "none",
            logado: false,
            imgChar: "https://freepngimg.com/thumb/emoji/65263-emoticon-of-smiley-face-tears-joy-whatsapp.png"
        });

    }

    isLogado(token) {

        const jwtKey = 'p3dr0rr3ir0';

        try {

            if (sessionStorage.getItem("token") === '') {
                //console.log("nao ta logado");
                return false;
            }

            else if (jwt.verify(token, jwtKey).email !== '') {
                //console.log("ta logado");

                return true;
            }

        } catch (JsonWebTokenError) {
            //console.log("Token not found to login");
        } return false;
    }

    showDadosLogado() {

        console.log("mostrando posts");

        this.setState(
            {
                displayConta: "none",
                displaySair: "inline-block",
                displayPosts: "inline-block",
                displayChar: "inline-block"
            });
    }
    /*
        showMenu = () => {
    
            if (this.state.hiddenMenu === "inline-block") this.setState({ hiddenMenu: "none" });
    
            else this.setState({ hiddenMenu: "inline-block" });
        }
    */

    atualizaImgChar = () => {

        const axios = require("axios");

        axios.get('https://servidorpedro.herokuapp.com/getChar/', {
            headers: {
                authorization: this.getToken()
            }
        })
            .then(((response) => {

                this.setState({
                    imgChar: response.data.img
                })

            }));
    }

    showPostar = () => {
        if (this.state.displayPostar === "none") {
            this.setState({
                displayPostar: "inline-block"
            });
        }

        else if (this.state.displayPostar === "inline-block") {
            this.setState({
                displayPostar: "none"
            });
        }
    }

    atualizaPost = () => {
        this.setState({
            atualizaPost: true
        })
    }

    render() {
        return (
            <div className="wrapper" resize={this.resize}>

                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />

                <header >

                    <div id="contentHeader">
                        <div className="imgsLogo">
                            <img src={this.state.imgChar} alt="imgChar" className="rounded-circle"
                                style={{width: 85 + "px", height: 85 + "px", border: "solid black 1px"}}></img>
                        </div>

                        <nav className="navbar navbar-expand-lg navbar-light">

                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">

                                    <li className="nav-item">
                                        <a className="nav-link" href="/"><strong>Home</strong></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="https://pedrorreiro.github.io/contato.html" rel="noreferrer" target="_blank"><strong>Contato</strong></a>
                                    </li>

                                </ul>
                            </div>

                        </nav>

                    </div>

                </header>

                <div id="corpo">
                    <div id="conta" style={{ display: this.state.displayConta }}>
                        <Conta
                            onLogado={this.showDadosLogado.bind(this)}
                            onVerificaAdm={this.verificaAdm.bind(this)}
                        ></Conta>
                    </div>
  
                    <div style={{ textAlign: "center" }}>
                        <button type="button" className="btn btn-warning" style={{ display: this.state.displaySair, padding: 8 + 'px ' + 40 + 'px', marginBottom: 15 + "px" }} onClick={this.sair} >Sair</button><br />
                        <button type="button" className="btn btn-primary" style={{ display: this.state.displayBtnPostar, padding: 8 + 'px ' + 40 + 'px' }} onClick={this.showPostar} >Postar</button>
                    </div>

                    <div id="charArea" style={{ display: this.state.displayChar }}>
                        <Char></Char>
                    </div><br/>

                    <div id="postarArea" style={{ display: this.state.displayPostar }}>
                        <Postar
                            onPostar={this.atualizaPost}></Postar>
                    </div>

                    <br />

                    <div id="postsArea" style={{ display: this.state.displayPosts }}>
                        <Posts
                            postou={this.state.atualizaPost}>
                            </Posts>
                    </div>

                </div>
            </div>

        );

    }
}

export default App;
