let articleIndexes = {};
let itemWrappers = [];
let tableBody = null;
let totalCell = null;

const createTable = () => {
    itemWrappers = Array.from(document.querySelectorAll('.table-view__item-wrapper'));
    tableBody = document.getElementById('tableBody');
    totalCell = document.getElementById('total');
    const articleSelect = document.getElementById('articleSelect');

    let totalSum = 0;
    tableBody.innerHTML = '';
    articleIndexes = {};

    for (const [index, wrapper] of itemWrappers.entries()) {
        const article = wrapper.querySelector('.article_block .muted').textContent.trim();
        const name = wrapper.querySelector('.item-title span').textContent.trim();
        const description = wrapper.querySelector('.item-title').getAttribute('title');
        const price = parseFloat(wrapper.querySelector('.price_value').textContent.replace(/\s+/g, ''));
        const currency = wrapper.querySelector('.price_currency').textContent.trim();
        const availability = wrapper.querySelector('.value.font_sxs').textContent.trim();
        const rating = wrapper.querySelectorAll('.item-rating.filed').length;

        const row = `
            <tr>
                <td>${article}</td>
                <td>${name}</td>
                <td>${description}</td>
                <td>${price.toFixed(2)}</td>
                <td>
                    <button class="decrement">-</button>
                    <span class="quantity">1</span>
                    <button class="increment">+</button>
                </td>
                <td class="sum">${price.toFixed(2)}</td>
                <td>${currency}</td>
                <td>${availability}</td>
                <td>${rating}</td>
            </tr>
        `;
        tableBody.innerHTML += row;

        if (!articleIndexes.hasOwnProperty(article)) {
            articleIndexes[article] = [];
        }
        articleIndexes[article].push(index);

        totalSum += price;
    }
    totalCell.textContent = totalSum.toFixed(2);

    articleSelect.innerHTML = '<option value="" selected disabled>Select Article</option>';
    Object.keys(articleIndexes).forEach(article => {
        const option = document.createElement('option');
        option.value = article;
        option.textContent = article;
        articleSelect.appendChild(option);
    });
};

const updateTotalPrice = () => {
    let totalSum = 0;
    const sumElements = document.querySelectorAll('.sum');
    sumElements.forEach(element => {
        totalSum += parseFloat(element.textContent);
    });
    totalCell.textContent = totalSum.toFixed(2);
};

const incrementQuantity = button => {
    const quantityElement = button.parentElement.querySelector('.quantity');
    const priceElement = button.parentElement.parentElement.querySelector('.sum');
    let price = parseFloat(priceElement.textContent);
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
    priceElement.textContent = (price + price / quantity).toFixed(2);
    updateTotalPrice();
};

const decrementQuantity = button => {
    const quantityElement = button.parentElement.querySelector('.quantity');
    const priceElement = button.parentElement.parentElement.querySelector('.sum');
    let price = parseFloat(priceElement.textContent);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
        priceElement.textContent = (price - price / quantity).toFixed(2);
        updateTotalPrice();
    }
};

const selectRow = () => {
    const articleSelect = document.getElementById('articleSelect');
    const selectedArticle = articleSelect.value;
    if (articleIndexes[selectedArticle]) {
        const indexes = articleIndexes[selectedArticle];
        const rows = document.querySelectorAll('#tableBody tr');
        rows.forEach((row, index) => {
            if (indexes.includes(index)) {
                row.style.backgroundColor = 'green';
            } else {
                row.style.backgroundColor = '';
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('create');
    createButton.addEventListener('click', createTable);

    const articleSelect = document.getElementById('articleSelect');
    articleSelect.addEventListener('change', selectRow);

    document.addEventListener('click', event => {
        if (event.target.classList.contains('increment')) {
            incrementQuantity(event.target);
        } else if (event.target.classList.contains('decrement')) {
            decrementQuantity(event.target);
        }
    });
});
