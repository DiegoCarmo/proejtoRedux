import React from 'react';
import * as Script from './../../JavaScript/main';
export default class Produtos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			BD: []
		}
		this.enviarCompra = this.enviarCompra.bind(this);
	}
	async componentDidMount() {
		let resposta = await fetch('http://localhost:8000/produto');
		let dados = await resposta.json();
		this.setState({ BD: dados });
	}

	async enviarCompra(elemento) {
		elemento.preventDefault();
		const url = "http://localhost:8000/compra";
		const dados = new FormData(elemento.target);
		let json = {};
		dados.forEach((valor, chave) => {
			json[chave] = valor;
		})
		const cabecalho = {
			method: "post",
			body: JSON.stringify(json),
			headers: {
				'Content-Type': 'application/json'
			}
		};
		await fetch(url, cabecalho);
	}

	render() {
		return (

			<div>
				<div className="container-fluid bg-secondary mx-0 px-0 py-2">
					<nav className="navbar-expand-lg navbar-dark">

						<button className="navbar-toggler w-100" type="button" data-toggle="collapse" data-target="#categoriasNav">
							<span className="text-light">Categorias</span></button>

						<div id="categoriasNav" className="collapse navbar-collapse justify-content-end">
							<ul className="navbar-nav nav-fill w-100">
								<li className="nav-item font-weight-bold">
									<span className="col text-light mx-4" onClick={Script.exibir_todos}>Todos(12)</span>
								</li>
								<li className="nav-item font-weight-bold">
									<span className="col text-light mx-4" onClick={() => Script.exibir_categoria('acessorios')}>Acessorios(3)</span>
								</li>
								<li className="nav-item font-weight-bold">
									<span className="col text-light mx-4" onClick={() => Script.exibir_categoria('livros')}>Livros(3)</span>
								</li>
								<li className="nav-item font-weight-bold">
									<span className="col text-light mx-4" onClick={() => Script.exibir_categoria('eletronicos')}>Eletronicos(3)</span>
								</li>
								<li className="nav-item font-weight-bold">
									<span className="col text-light mx-4" onClick={() => Script.exibir_categoria('canecas')}>Canecas(3)</span>
								</li>
							</ul>
						</div>
					</nav>
				</div>


				<header className="container-fluid">
					<h2>Produtos</h2>
				</header> <hr />


				<div className="container-fluid">
					<div className="row row-cols-2 row-cols-md-3 mx-auto">
						{this.state.BD && this.state.BD.map((item, id,) =>
							<div className="boxproduto col" id={item['categoria']}>
								<div className="bg-secondary  py-4 bg-produto">
									<img className="imgproduto" src={require('./../../' + item['nome_imagem']).default} alt="" /> <br /> <hr />
									<p className="nomeproduto text-light">{item['descricao']}</p>
									<p className="preco">R${item['preco_antigo']}</p>
									<p className="novopreco">R${item['preco']}</p>

									<form onSubmit={this.enviarCompra}>
										<input type="submit" className="btnComprar btn btn-primary" value="Comprar" onClick={Script.comprou} />
										<input type="hidden" name="cliente" value="cliente_default" />
										<input type="hidden" name="nome_produto" value={item['descricao']} />
										<input type="hidden" name="valor_unitario" value={item['preco']} />
									</form>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>


		);
	}
}