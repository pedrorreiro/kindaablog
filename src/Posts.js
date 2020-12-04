import React from "react";
import './folhaPosts.css';

export class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            campoBusca: "",
            imgChar: '',
            postEmail: '',
            charPost: ''
        }
    }

    componentDidMount() {
        this.atualizaPosts();
    }

    changeAutor = (event) => {
        this.setState({
            campoAutor: event.target.value
        })
    }

    getToken() {
        if (sessionStorage.getItem('token') == null) {
            return '';
        }

        else return sessionStorage.getItem('token');
    }

    atualizaPosts() {

        const axios = require("axios");
        var token = this.getToken();

        axios.get('https://servidorpedro.herokuapp.com/posts/', {
            headers: {
                authorization: token
            }
        })
            .then(((response) => {
                this.setState({
                    posts: response.data.posts
                })
            }));
    }

    changeBusca = (event) => {
        this.setState({
            campoBusca: event.target.value
        })
    }

    buscaPosts = () => {

        var busca = this.state.campoBusca;

        if (busca === '' || busca === ' ') this.atualizaPosts();

        else {
            const axios = require("axios");

            axios.get('https://servidorpedro.herokuapp.com/buscaPosts/' + busca, {
                headers: {
                    authorization: this.getToken()
                }
            })
                .then(((response) => {
                    this.setState({
                        posts: response.data.posts
                    })
                }));

        }
    }

    render() {
        return (
            <div className="posts">
                
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />

                <div id="campoBusca" style={{ textAlign: "center", display: "inline-block" }}>
                    <input className="form-control"

                        onChange={this.changeBusca}
                        placeholder="Busca por nome"
                        style={{
                            display: "inline-block",
                            width: 50 + "%", marginRight: 10 + "px"
                        }}>

                    </input>

                    <button type="button" className="btn btn-primary" onClick={this.buscaPosts}
                        style={{ display: "inline-block", position: "relative", top: -2 + "px" }}>Buscar</button><br/><br/>

                    <div className="alert alert-warning" role="alert">
                    Caso os posts não carregarem, atualize a página. <br/>Estamos tentando resolver isso!
                    </div>
                </div>

                {this.state.posts.reverse().map((post, i) =>{
                    return (
                        <div id={i} className="post" key={post.titulo}>

                                <span className={post.tipoTag}
                                style={{padding: 10 + 'px', marginBottom: 10 + 'px'}}><strong>{post.tag}</strong></span>
                                <p id="tituloPost">{post.titulo}</p>
                                <p id="contPost">{post.conteudo}</p>
                                <p><strong>Autor</strong></p>
                                <img src={post.imgAutor} alt="imgChar" className="rounded-circle"
                                    style={{width: 100 + "px", height: 110 + "px", border: "solid black 1px",
                                    }}>
                                </img><br/><br/>

                                <p id="emailPost"><strong>Contato: </strong>{post.email}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Posts;
