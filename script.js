




function addToCart(name, price) {
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    
    

  }

  function addGlitchEffect(button) {
    button.classList.add('clicked');

    
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 1000);
  }
  
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    const totalBox = document.getElementById('total');
    if (!container || !totalBox) return;
  
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalBox.textContent = "";
      return;
    }
  
    let total = 0;
    container.innerHTML = '';
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      container.innerHTML += `
        <div class="product">
          <h2>${item.name}</h2>
          <p>$${item.price} x ${item.qty}</p>
          <div class="qty-controls">
            <button onclick="updateQty(${index}, -1)">➖</button>
            <button onclick="updateQty(${index}, 1)">➕</button>
          </div>
        </div>`;
    });
  
    totalBox.textContent = `Total: ${total.toFixed(5)} BITCOIN`;
  }
  
  function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[index]) return;
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
  
  document.addEventListener("DOMContentLoaded", loadCart);
  
