const livrosDOM = document.querySelector('.products-center');
const livrosCarrinhoDOM = document.querySelector('.cart-content');
const carrinho = document.querySelector('.cart-overlay');
const carrinho2 = document.querySelector('.cart');
const idBotao = document.getElementById('botaoLivro');

let ArrayLivros = [];
let ArrayCarrinho = [];

class Livros {
    async getLivros() {
        try {
            let result = await fetch('livros.json');
            let data = await result.json();
            let livros = data.items;
            return livros;
        }catch (error) {
            console.log(error);
        }
    }

    getLivrosCarrinho() {
        let livros = JSON.parse(localStorage.getItem('livrosCarrinho'));
        return livros;
    }
}

class Storage {
    salvarLivros(livros) {
        localStorage.setItem('livros', JSON.stringify(livros));
    }

    salvarLivroCarrinho() {
        localStorage.setItem('livrosCarrinho', JSON.stringify(ArrayCarrinho));
    }
}

class DOM {
    exibirLivros(livros) {
        let resultado = '';
        livros.forEach(livro => {
            resultado += `
            <article class="product">
                <div class="img-container">
                    <img src=${livro.image} alt="product" class="product-img">
                    <button id="botaoLivro" onclick="addCarrinho(${livro.id})" class="bag-btn" data-id=${livro.id}>
                        <i class="fas fa-shopping-cart"></i>
                        Add ao carrinho
                    </button>
                </div>
                <h3>${livro.title}</h3>
                <h4>${livro.price}</h4>
            </article>
            `
        });
        livrosDOM.innerHTML = resultado;
    }

    exibirLivrosCarrinho(livros) {
        let resultado = '';
        livros.forEach(livro => {
            resultado += `
            <div class="cart-item">
                <img src=${livro.image} alt="product">
                <div>
                    <h4>${livro.title}</h4>
                    <h5>$ ${livro.price}</h5>
                </div>
            </div>
            `
        });
        livrosCarrinhoDOM.innerHTML = resultado;
    }
}

const livraria = new Livros();
const dom = new DOM();
const storage = new Storage();

const livros = livraria.getLivros().then(livros => {
    this.ArrayLivros = livros;
    storage.salvarLivros(this.ArrayLivros);
    dom.exibirLivros(livros);

    const livrosCarrinho = livraria.getLivrosCarrinho();
    dom.exibirLivrosCarrinho(livrosCarrinho);

});

function addCarrinho(id) {
    const livros = JSON.parse(localStorage.getItem('livros'));
    livros.map(livro => {
        if(Number(livro.id) === (id)) {
            ArrayCarrinho.push(livro);
            storage.salvarLivroCarrinho();
        }
    })
    
}

function mostrarCarrinho() {
    carrinho.style.visibility = "visible";
    carrinho2.style.transform = "translateX(0%)";
}

function esconderCarrinho() {
    carrinho.style.visibility = "hidden";
    carrinho2.style.transform = "translateX(100%)";
}