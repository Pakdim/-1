let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  showNotification(`${name} добавлен в корзину!`);
  updateCartView();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartView();
}

function updateCartView() {
  const cartItemsList = document.getElementById('cart-items');
  const totalPriceElem = document.getElementById('total-price');
  const discountInfo = document.getElementById('discount-info');

  if (!cartItemsList || !totalPriceElem) return;

  cartItemsList.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ${item.price}₽
      <button onclick="removeFromCart(${index})">Удалить</button>
    `;
    cartItemsList.appendChild(li);
    totalPrice += item.price;
  });

  let discount = 0;
  if (totalPrice >= 300000) discount = totalPrice * 0.2;
  else if (totalPrice >= 150000) discount = totalPrice * 0.1;

  totalPriceElem.textContent = totalPrice - discount;
  discountInfo.textContent = discount > 0 ? `Скидка: ${discount/totalPrice*100}%` : 'Скидка отсутствует';
}

function checkout() {
  if (cart.length === 0) {
    alert('Ваша корзина пуста!');
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let discount = 0;

  if (total >= 300000) discount = total * 0.1;
  else if (total >= 150000) discount = total * 0.05;

  let finalTotal = total - discount;

  alert(`Спасибо за заказ! Итоговая сумма: ${finalTotal}₽ (скидка: ${discount}₽)`);

  cart = [];
  saveCart();
  updateCartView();
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;

  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

document.addEventListener('DOMContentLoaded', updateCartView);