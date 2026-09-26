
/* PRODUCTS */
const products = [

    {
        id: 0,
        name: 'benue shoes',
        price: 400,
        image: 'nine.png', category: 'running', tag: 'Best seller'
    }, {
        id: 1,
        name: '9ja shoes',
        price: 300,
        image: 'one.png', category: 'lifestyle', tag: 'New'
    },{
        id: 2,
        name: 'Ghana shoes',
        price: 200,
        image: 'two.png', category: 'street', tag: 'Popular'
    },{
        id: 3,
        name: 'China shoes',
        price: 320,
        image: 'three.png', category: 'running', tag: 'New'
    },{
        id: 4,
        name: 'lagos shoes',
        price: 100,
        image: 'eight.png', category: 'lifestyle', tag: 'Essential'
    },{
        id: 5,
        name: 'Abuja shoes',
        price: 300,
        image: 'five.png', category: 'street', tag: 'Popular'
    },{
        id: 6,
        name: 'kaduna shoes',
        price: 320,
        image: 'six.png', category: 'running', tag: 'Essential'
    },{
        id: 7,
        name: 'American shoes',
        price: 300,
        image: 'seven.png', category: 'street', tag: 'New'
    }
];


const container = document.querySelector('.container');
const cartlist = document.querySelector('.cartlist');
const cartlink = document.querySelector('.cartlink');
const cartCount = document.querySelector('.cart-count');
const notification = document.querySelector('.notification');
const searchInput = document.querySelector('.inputsearch');
const backdrop = document.querySelector('.cart-backdrop');
let cart = [];
let activeFilter = 'all';

const money = value => `$${value.toLocaleString()}`;

function renderProducts() {
    const query = searchInput.value.trim().toLowerCase();
    const visibleProducts = products.filter(product =>
        (activeFilter === 'all' || product.category === activeFilter) &&
        product.name.toLowerCase().includes(query)
    );
    container.innerHTML = visibleProducts.length ? visibleProducts.map(product => `
        <article class="shoe">
            <div class="shoe-image"><span class="tag">${product.tag}</span><img src="images/${product.image}" alt="${product.name}"></div>
            <div class="shoe-info"><div><p class="category">${product.category}</p><h3 class="name">${product.name}</h3></div><strong class="price">${money(product.price)}</strong></div>
            <button class="add-button" data-add="${product.id}" type="button">Add to bag <span>+</span></button>
        </article>
    `).join('') : '<p class="empty-results">No pairs found. Try another search.</p>';
}

function openCart() { cartlist.classList.add('showcartlist'); backdrop.classList.add('show-backdrop'); cartlist.setAttribute('aria-hidden', 'false'); }
function closeCart() { cartlist.classList.remove('showcartlist'); backdrop.classList.remove('show-backdrop'); cartlist.setAttribute('aria-hidden', 'true'); }

function showNotice(message) {
    notification.textContent = message;
    notification.classList.add('notificationshoe');
    setTimeout(() => notification.classList.remove('notificationshoe'), 2200);
}

function addToCart(id) {
    const item = cart.find(product => product.id === id);
    if (item) item.numberunit += 1;
    else cart.push({ ...products.find(product => product.id === id), numberunit: 1 });
    showNotice('Added to your bag');
    renderCart();
    openCart();
}


function renderCart() {
    const itemCount = cart.reduce((total, item) => total + item.numberunit, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.numberunit, 0);
    cartCount.textContent = itemCount;
    cartlist.innerHTML = `<div class="cart-header"><div><p class="eyebrow">Your selection</p><h2>Your bag <span>${itemCount}</span></h2></div><button class="close-cart" type="button" aria-label="Close shopping bag">x</button></div>
        ${cart.length ? `<div class="cart-items">${cart.map(item => `<div class="cartitem"><img src="images/${item.image}" alt="${item.name}"><div class="cart-details"><h3>${item.name}</h3><strong>${money(item.price)}</strong><div class="unit"><button class="btn" data-change="-1" data-id="${item.id}" type="button">-</button><span>${item.numberunit}</span><button class="btn" data-change="1" data-id="${item.id}" type="button">+</button></div></div></div>`).join('')}</div><div class="cart-footer"><div><span>Subtotal</span><strong>${money(total)}</strong></div><button class="checkout" type="button">Checkout <span>-></span></button><p>Shipping calculated at checkout</p></div>` : '<div class="empty-cart"><span class="empty-mark">+</span><h3>Your bag is waiting.</h3><p>Add a pair to get started.</p><button class="continue-shopping" type="button">Continue shopping</button></div>'}`;
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderProducts();
}));
searchInput.addEventListener('input', renderProducts);
container.addEventListener('click', event => { if (event.target.closest('[data-add]')) addToCart(Number(event.target.closest('[data-add]').dataset.add)); });
cartlist.addEventListener('click', event => {
    const control = event.target.closest('[data-change]');
    if (control) { const item = cart.find(product => product.id === Number(control.dataset.id)); item.numberunit += Number(control.dataset.change); if (item.numberunit < 1) cart = cart.filter(product => product.id !== item.id); renderCart(); }
    if (event.target.closest('.close-cart')) closeCart();
    if (event.target.closest('.continue-shopping')) closeCart();
});
cartlink.addEventListener('click', openCart);
backdrop.addEventListener('click', closeCart);
renderProducts();
renderCart();




