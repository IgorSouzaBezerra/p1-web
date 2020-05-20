const livrosDOM = document.querySelector('.products-center');
const carrinho = document.querySelector('.cart-overlay');
const carrinho2 = document.querySelector('.cart');

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
}

class DOM {
    exibirLivros(livros) {
        let resultado = '';
        livros.forEach(livro => {
            resultado += `
            <article class="product">
                <div class="img-container">
                    <img src=${livro.image} alt="product" class="product-img">
                    <button id="botaoLivro" class="bag-btn" data-id=${livro.id}>
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
}

const livraria = new Livros();
const dom = new DOM();

const livros = livraria.getLivros().then(livros => {
    dom.exibirLivros(livros);
});



function mostrarCarrinho() {
    carrinho.style.visibility = "visible";
    carrinho2.style.transform = "translateX(0%)";
}

function esconderCarrinho() {
    carrinho.style.visibility = "hidden";
    carrinho2.style.transform = "translateX(100%)";
}