updateView();
function updateView(){
    document.getElementById('app').innerHTML = /*HTML*/`
    <div class="nav-bar"></div>
      
    <div class="cart">Cart({{ cart.length }})</div>

    <product-display 
    :premium="premium" 
    @add-to-cart="addToCart"
    @remove-from-cart="removeFromCart">
    </product-display>

    <!-- Can use the same component more than once like this:

    <product-display></product-display>
    <product-display></product-display>
    <product-display></product-display>
    -->
    `;
}