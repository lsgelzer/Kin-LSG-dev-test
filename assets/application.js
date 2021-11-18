// Put your application javascript here
function toggleMenu () {
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
        }).then(
            updateCart()
       );
}
function updateCart() { 

     fetch('/cart.js').then(response => 
         response.json())
    .then(
        console.log(response.total_price)
    )
        
}