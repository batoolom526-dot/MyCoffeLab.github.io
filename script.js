function showSurpriseOption() {
  document.getElementById('special-desc').textContent = "Surprise! You'll get a random pastry chosen by our chef.";
  document.getElementById('special-add-btn').style.display = 'inline-block';
}

function showRevealOption() {
  document.getElementById('special-desc').textContent = "Today's Special is: Opera Cake!";
  document.getElementById('special-add-btn').style.display = 'inline-block';
}

function showPastryModal() {
  document.getElementById('pastry-modal').style.display = 'flex';
}
function closePastryModal() {
  document.getElementById('pastry-modal').style.display = 'none';
  document.querySelectorAll('#pastry-modal input[name="pastryType"]:checked').forEach(cb => cb.checked = false);
  document.querySelector('#pastry-modal .note-box').value = '';
  document.querySelector('#pastry-modal .note-box').style.display = 'none';
}

function addPastryToCartFromModal() {
  const modal = document.getElementById('pastry-modal');
  const note = modal.querySelector('.note-box').value;
  const typeInputs = modal.querySelectorAll('input[name="pastryType"]:checked');
  if (typeInputs.length === 0) {
    alert('Please select at least one pastry type!');
    return;
  }
  typeInputs.forEach(typeInput => {
    const type = typeInput.value;
    let itemName = `Dessert (${type})`;
    let found = cart.find(entry => entry.item === itemName && entry.note === note);
    if (found) {
      found.count = (found.count || 1) + 1;
      total += 4;
    } else {
      cart.push({ item: itemName, price: 4, note, count: 1, img: 'images/pastries.webp' });
      total += 4;
    }
  });
  displayCart();
  closePastryModal();
}
function showSpecialModal(event) {
  event.stopPropagation();
  document.getElementById('special-modal').style.display = 'flex';
}

function closeSpecialModal() {
  document.getElementById('special-modal').style.display = 'none';
}

function addSpecialToCart() {
  let itemName = 'Dessert (Today\'s Special)';
  let found = cart.find(entry => entry.item === itemName);
  if (found) {
    found.count = (found.count || 1) + 1;
    total += 4;
  } else {
    cart.push({ item: itemName, price: 4, note: '', count: 1, img: 'images/pastries.webp' });
    total += 4;
  }
  displayCart();
  closeSpecialModal();
}
function addPastryToCart(button) {
  const menuItem = button.parentElement;
  const note = menuItem.querySelector('.note-box').value;
  const typeInputs = menuItem.querySelectorAll('input[name="pastryType"]:checked');
  if (typeInputs.length === 0) {
    alert('Please select at least one pastry type!');
    return;
  }
  const img = menuItem.querySelector('img');
  typeInputs.forEach(typeInput => {
    const type = typeInput.value;
    let itemName = `Dessert (${type})`;
    let found = cart.find(entry => entry.item === itemName && entry.note === note);
    if (found) {
      found.count = (found.count || 1) + 1;
      total += 4;
    } else {
      cart.push({ item: itemName, price: 4, note, count: 1, img: img ? img.src : '' });
      total += 4;
    }
  });
  displayCart();
}
function showNoteBox(button) {
  const menuItem = button.parentElement;
  const noteBox = menuItem.querySelector('.note-box');
  noteBox.style.display = 'block';
  button.style.display = 'none';
}
let cart = [];
let total = 0;

function addToCart(button, item, price) {
  const menuItem = button.parentElement;
  const note = menuItem.querySelector('.note-box').value;

  let found = cart.find(entry => entry.item === item && entry.note === note);
  if (found) {
    found.count = (found.count || 1) + 1;
    total += price;
  } else {
    const img = menuItem.querySelector('img');
    cart.push({ item, price, note, count: 1, img: img ? img.src : '' });
    total += price;
  }
  displayCart();
}

function displayCart() {
  let cartList = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");
  cartList.innerHTML = "";
  cart.forEach((entry, index) => {
    cartList.innerHTML += `
      <li style="display:flex;align-items:center;gap:10px;">
        <img src="${entry.img}" alt="${entry.item}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;">
        <span>${entry.item} - $${entry.price} x${entry.count}</span>
        ${entry.note ? `<span style='font-size:0.9em;color:#888;'>(Note: ${entry.note})</span>` : ""}
        <button onclick="deleteCartItem(${index})" style="margin-left:auto;background:#e74c3c;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;">Delete</button>
      </li>`;
  });
  cartTotal.textContent = total;

  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartTotal', total);
}


function deleteCartItem(index) {

  total -= cart[index].price * cart[index].count;
  cart.splice(index, 1);
  displayCart();
}

function checkout() {
  window.location.href = "contact.html";
}

function isMobile() {
  return window.innerWidth <= 600 || /Mobi|Android/i.test(navigator.userAgent);
}

window.addEventListener('DOMContentLoaded', function() {
  var cartSection = document.getElementById('cart');
  var cartNavBtn = document.querySelector('.cta[href="#cart"]');
  if (cartSection && cartNavBtn) {
    if (isMobile()) {
      cartSection.style.display = 'none';
      cartNavBtn.onclick = function(e) {
        e.preventDefault();
        window.location.href = 'cart.html';
      };
    } else {
      cartSection.style.display = 'block';
      cartNavBtn.onclick = null;
    }
  }

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    total = parseFloat(localStorage.getItem('cartTotal')) || 0;
    displayCart();
  }
});

