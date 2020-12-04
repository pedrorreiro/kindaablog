import React from "react";
import './folhaPostar.css';

export class Postar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campoTitulo: "",
      campoConteudo: "",
      campoAutor: "",
      msgErro: "Teste",
      displayErro: "none",
      tipoMsg: "",
      campoNomeTag: '',
      tipoTag: '',
      imgAutor: ''
    }
  }

  showErro = () => {
    if (this.state.displayErro === "block")
      this.setState({ displayErro: "none" });

    else if (this.state.displayErro === "none")
      this.setState({ displayErro: "block" });

  }

  changeTitulo = (event) => {
    this.setState({
      campoTitulo: event.target.value
    })
  }

  changeConteudo = (event) => {
    this.setState({
      campoConteudo: event.target.value
    })
  }

  changeAutor = (event) => {
    this.setState({
      campoAutor: event.target.value
    })
  }

  changeNomeTag = (event) => {
    this.setState({
      campoNomeTag: event.target.value
    })
  }

  getToken() {
    if (sessionStorage.getItem('token') == null) {
      return '';
    }

    else return sessionStorage.getItem('token');
  }

  postar = async() => {
    const titulo = this.state.campoTitulo;
    const conteudo = this.state.campoConteudo;
    const autor = this.state.campoAutor;
    const nomeTag = this.state.campoNomeTag;
    const tipoTag = this.state.tipoTag;

    const token = this.getToken();

    const axios = require("axios");

    await this.setaImgAutor();

    let imgAutor = this.state.imgAutor;

    console.log("imgAutor: " + imgAutor);

    axios.post('https://servidorpedro.herokuapp.com/post/', {
      titulo: titulo,
      conteudo: conteudo,
      autor: autor,
      nomeTag: nomeTag,
      tipoTag: tipoTag,
      imgAutor: imgAutor,
      token: token
    })
      .then(((response) => {

        this.setState({
          tipoMsg: response.data.tipo,
          msgErro: response.data.msg,
        });

        this.props.onPostar();

        this.showErro();
      }));

  }

  handleChange = (event) => {
    this.setState({
      tipoTag: event.target.value
    })
  }

  async setaImgAutor() {

    const axios = require("axios");
    var token = this.getToken();

    await axios.get('https://servidorpedro.herokuapp.com/getChar/', {
      headers: {
        authorization: token
      }
    })
      .then(((response) => {
        this.setState({
          imgAutor: response.data.img
        })
      }));
  }

  render() {
    return (
      <div className="Postar">
        <header className="App-header">

          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossOrigin="anonymous" />
          <div className="container">
            <form>
              <div className="form-group">
                <label>Autor</label>
                <input className="form-control" placeholder="Autor da postagem" onChange={this.changeAutor} />
                <small id="emailHelp" className="form-text text-muted">Esse nome estará visível como autor do post.</small>
              </div>

              <div className="form-group">
                <label>Título</label>
                <input className="form-control" placeholder="Título da postagem" onChange={this.changeTitulo} />
              </div>

              <div className="form-group">
                <label>Conteúdo</label>
                <textarea className="form-control" placeholder="Conteúdo da postagem" onChange={this.changeConteudo} />
              </div>

              <div className="form-group">
                <label style={{ marginRight: 15 + "px" }}>TAG </label><span className={this.state.tipoTag}>{this.state.campoNomeTag}</span>
                <input className="form-control" placeholder="Nome da tag" onChange={this.changeNomeTag} />
              </div>

              <div className="tags" style={{ textAlign: "left", paddingLeft: 40 + "%", marginBottom: 20 + "px" }}>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="badge badge-primary" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    <span className="badge badge-primary">Primário</span>
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="badge badge-secondary" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    <span className="badge badge-secondary">Secundário</span>
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="badge badge-success" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios3">
                    <span className="badge badge-success">Sucesso</span>
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="badge badge-danger" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios4">
                    <span className="badge badge-danger">Perigo</span>
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="badge badge-warning" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios5">
                    <span className="badge badge-warning">Aviso</span>
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="badge badge-info" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios6">
                    <span className="badge badge-info">Info</span>
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios7" value="badge badge-light" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios7">
                    <span className="badge badge-light">Ligth</span>
                  </label>
                </div>

                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios8" value="badge badge-dark" onChange={this.handleChange} />
                  <label className="form-check-label" htmlFor="exampleRadios8">
                    <span className="badge badge-dark">Dark</span>
                  </label>
                </div>

              </div>

              <div className={this.state.tipoMsg} role="alert" style={{ display: this.state.displayErro }}>
                {this.state.msgErro}
              </div>

              <button type="button" className="btn btn-primary" onClick={this.postar}>Postar</button>

              <br /><br />
              <div className="alert alert-warning" role="alert">
                Para visualizar o novo post, atualize a página. <br /> Estamos tentando automatizar...
              </div>

            </form>
          </div>


        </header>
      </div>
    );
  }
}

export default Postar;
