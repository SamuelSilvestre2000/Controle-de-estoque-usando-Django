const apiUrl = 'http://127.0.0.1:8000/api/produtos/';

const productForm = document.getElementById('product-form');
const productTable = document.getElementById('product-table');

function createProductRow(product) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${product.nome}</td>
        <td>${product.preco}</td>
        <td>${product.descricao}</td>
        <td><button class="delete-button" data-id="${product.id}">Excluir</button></td>
    `;

    tr.querySelector('.delete-button').addEventListener('click', () => {
        deleteProduct(product.id);
    });

    return tr;
}

function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            productTable.querySelector('tbody').innerHTML = '';
            products.forEach(product => {
                productTable.querySelector('tbody').appendChild(createProductRow(product));
            });
        });
}

function addProduct(product) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then(response => {
        if (response.ok) {
            fetchProducts();
        } else {
            alert('Erro ao adicionar produto');
        }
    });
}

function deleteProduct(id) {
    fetch(apiUrl + id + '/', {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            fetchProducts();
        } else {
            alert('Erro ao excluir produto');
        }
    });
}

productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const product = {
        nome: productForm.querySelector('#nome').value,
        preco: productForm.querySelector('#preco').value,
        descricao: productForm.querySelector('#descricao').value
    };

    addProduct(product);

    productForm.reset();
});

fetchProducts();
