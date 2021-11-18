// Put your application javascript here
function toggleMenu() {
  let menu = document.querySelector('.menu-wrapper');
  menu.classList.toggle('open');
}

function toggleCart() {
  let menu = document.querySelector('.cart-drawer');
  menu.classList.toggle('open');
}

function addToCart() {
  let formData = {
    'items': [{
      'id': 42065672470773,
      'quantity': 1
    }]
  };
  fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    }).then( () => {
      updateCart();
      toggleCart();
    });
}

function updateCart() {
  fetch('/cart').then(response => {
      return response.text()
    })
    .then(response => {
      // console.log(response)
      const $cartDrawer = $(response).find('.js-cart-drawer');
      $('.js-cart-drawer').html($cartDrawer.html());
    })
}

function updateCartData(id, qty) {
  $.ajax({
    type: "POST",
    url: '/cart/change.js',
    data: {
      id: id,
      quantity: qty
    },
    dataType: 'json',
    success: function(response) {
      updateCart();
    }
  });
}

$(document).on('click', '.js-qty-wrapper .js-qty-minus, .js-qty-wrapper .js-qty-plus', function () {
  const $qtyEl = $(this).closest('.js-qty-wrapper').find('.js-qty-field');
  var qty = parseInt($qtyEl.val());
  var id = $qtyEl.attr('data-id');

  if ($(this).hasClass('js-qty-minus')) {
    qty--;
  } else if ($(this).hasClass('js-qty-plus')) {
    qty++;
  }

  $qtyEl.val(qty).trigger('change');

  if (id) {
    updateCartData(id, qty)
  }
})

$(document).on('click', '.js-remove-line', function (e) {
  e.preventDefault();

  const $qtyEl = $(this).closest('.js-line-item').find('.js-qty-field');
  var id = $qtyEl.attr('data-id');
  $qtyEl.val(0).trigger('change');
  if (id) {
    updateCartData(id, 0)
  }
})
