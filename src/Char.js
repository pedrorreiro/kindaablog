import React from "react";
import './folhaChar.css';

export class Char extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            campoChar: ''
        }
    }

    getToken() {
        if (sessionStorage.getItem('token') == null) {
            return '';
        }

        else return sessionStorage.getItem('token');
    }

    changeChar = (event) => {
        this.setState({
            campoChar: event.target.value
        })
    }

    mudarChar = () => {
        const token = this.getToken();

        const axios = require("axios");
    
        axios.post('https://servidorpedro.herokuapp.com/upChar/', {
          img: this.state.campoChar,
          token: token
        });
    }

    render() {
        return (
            <div className="char">

                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />

                <div className="container" id="updateChar">
                    <p>Alterar Avatar</p>
                    <input className="form-control" onChange={this.changeChar} placeholder="Insira o endereço da imagem"/><br/>
                    <button type="button" className="btn btn-primary" onClick={this.mudarChar}>Atualizar</button>
                </div>

            </div>
        );
    }
}

export default Char;
