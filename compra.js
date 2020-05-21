const livrosFront = document.querySelector('.products-center');
const livrosCarrinhoFront = document.querySelector('.cart-content');
const qtd = document.querySelector('.cart-items');
const totalValor = document.querySelector('.cart-total');

let ArrayLivros = [];
let ArrayCarrinho = [];

class Livros {
    async getLivros() {
        try {
            let resultado = await fetch('livros.json');
            let dados = await resultado.json();
            let livros = dados.items;
            return livros;
        }catch(err) {
            alert('Erro ao carregar Livros...');
        }
    }

    getCarrinho() {
        let livrosCarrinho = JSON.parse(localStorage.getItem('livrosCarrinho'));
        return livrosCarrinho;
    }
}

class Memoria {
    salvarLivros(livros) {
        localStorage.setItem('livros', JSON.stringify(livros));
    }

    salvarLivrosCarrinho(livros) {
        localStorage.setItem('livrosCarrinho', JSON.stringify(livros));
    }
}

class Frontend {
    exibirLivros(livros) {
        let html = '';
        livros.forEach(livro => {
            html += `
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
        livrosFront.innerHTML = html;
    }

    exibirLivrosCarrinho(livros) {
        let html = '';
        livros.forEach(livro => {
            html += `
            <div class="cart-item">
                <img src=${livro.image} alt="product">
                <div>
                    <h4>${livro.title}</h4>
                    <h5>$ ${livro.price}</h5>
                </div>
            </div>            
            `
        });
        livrosCarrinhoFront.innerHTML = html;
    }

    exibirQtd(array) {
        qtd.innerHTML = array.length;
    }

    exibirValorTotal(array) {
        let valorTotal = 0;
        array.map(livro => {
            valorTotal += livro.price;
        });

        totalValor.innerHTML = valorTotal;
    }
}


const livraria = new Livros();
const memoria = new Memoria();
const frontend = new Frontend();

const livros = livraria.getLivros().then(livros => {
    ArrayLivros = livros;
    memoria.salvarLivros(ArrayLivros);
    memoria.salvarLivrosCarrinho(ArrayCarrinho);
    frontend.exibirLivros(livros);
});

let livrosNoCarrinho = livraria.getCarrinho();
frontend.exibirLivrosCarrinho(livrosNoCarrinho);
frontend.exibirQtd(livrosNoCarrinho);



function addCarrinho(id) {
    ArrayLivros.map(livro => {
        if(livro.id == id) {
            ArrayCarrinho.push(livro);
        }
    });

    memoria.salvarLivrosCarrinho(ArrayCarrinho);
    frontend.exibirQtd(ArrayCarrinho);
    frontend.exibirLivrosCarrinho(ArrayCarrinho);
    frontend.exibirValorTotal(ArrayCarrinho);
    mostrarCarrinho();
    
}


function mostrarCarrinho() {
    const carrinho = document.querySelector('.cart-overlay');
    const carrinho2 = document.querySelector('.cart');

    carrinho.style.visibility = "visible";
    carrinho2.style.transform = "translateX(0%)";
}

function esconderCarrinho() {
    const carrinho = document.querySelector('.cart-overlay');
    const carrinho2 = document.querySelector('.cart');

    carrinho.style.visibility = "hidden";
    carrinho2.style.transform = "translateX(100%)";
}

