import React from 'react';
import { connect } from 'react-redux';
import { inserir } from "../../Actions/mensagens"
import { passe_livre, passe_negado } from '../../Actions/passe'

const estados = (state) => {
  return {
    mensagens: state.mensagens,
    passe: state.passe
  }
}
const funcoes = () => {
  return {
    passelivre: passe_livre,
    passenegado: passe_negado,
    inserir: inserir
  }
}

class Contato extends React.Component {
  constructor(props) {
    super(props);
    this.enviarFormulario = this.enviarFormulario.bind(this);
  }

  async componentDidMount() {
    if (this.props.passe) {
      this.props.passenegado()
      console.log('Passou!')
      const resposta = await fetch('http://localhost:8000/pegarMensagem');
      const json = await resposta.json();
      this.props.inserir(json)
    }
  }


  async enviarFormulario(elemento) {
    elemento.preventDefault();
    const url = "http://localhost:8000/enviarMensagem";
    const dados = new FormData(elemento.target);
    let json = {}
    dados.forEach((valor, chave) => {
      json[chave] = valor;
    })
    const cabecalho = {
      method: 'post',
      body: JSON.stringify(json),
      headers: {
        'Content-Type': 'application/json'
      }

    }
    await fetch(url, cabecalho);
  }

  render() {
    return (

      <div>

        <div className="social">
          <div>
            <a href="https://instagram.com" target="_blank"><img className="lgsocial" src={require('./../../imagens/logos/instagram.png').default} /></a>
            <a href="https://facebook.com" target="_blank" ><img className="lgsocial" src={require('./../../imagens/logos/facebook.png').default} /></a>
            <a href="https://whatsapp.com" target="_blank"><img className="lgsocial" src={require('./../../imagens/logos/whats.png').default} /></a>
          </div>
        </div>

        <div id="form">
          <form className="form-group" onSubmit={this.enviarFormulario}>
            <h1>Como podemos te ajudar ?</h1>
            <hr />

            <label for="pnome">Nome:</label><br />
            <input className="form-control" type="text" id="nome" name="nome" />
            <br />
            <br />
            <label className="areaMsg">E-mail:</label><br />
            <input className="form-control" type="email" name="email"></input>

            <br /><br />
            <label className="areaMsg">Mensagem:</label><br />
            <textarea className="form-control" name="msg" id="msg" rows="5"></textarea>
            <br /><br />

            <input className="d-inline" type="checkbox" name="checkbox" id="checkbox" />
            <label className="form-check-label d-inline" for="checkbox">Concordo com termos de segurança.</label>
            <br /><br />

            <input className="form-control btn btn-primary" onClick={this.props.passelivre} type="submit" id="submit" style={{ width: "200px" }} />
            <br /><br />
          </form>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h3>Comentarios dos clientes</h3>
                <div className="list-group">
                  {this.props.mensagens.map(mensagem => (
                    <div className="list-group-item">
                      <h5>{mensagem.nome}</h5>
                      <p>{mensagem.msg} </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(estados, funcoes())(Contato)