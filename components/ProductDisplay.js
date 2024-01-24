app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template:
    /*HTML*/`
    <div class="product-display">
      <div class="product-container">
        <div class="product-image">

         <img 
            :src="image" 
            :class="{ 'out-of-stock-img': inStock <= 0 }"
            alt="Pair of socks">
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else="inStock == 0">Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{backgroundColor: variant.color}">
            </div>
          <!-- <button class="button" v-on:click="cart += 1">Add to Cart</button> -->
          <button 
            class="button"
            :class="{ disabledButton: selectedVariantQuantity <= 0}"  
            v-on:click="addToCart"
            :disabled="inStock <= 0">
            Add to Cart
        </button>
          <button 
            class="button" 
            :class="{ disabledButton: cart <= 0 }"
            v-on:click="removeFromCart">
            Remove from Cart
         </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { 
                    id: 2234, 
                    color: 'green', 
                    image: './assets/images/socks_green.jpg', 
                    quantity: 10, 
                    onSale: false,
                },
                { 
                    id: 2235, 
                    color: 'blue', 
                    image: './assets/images/socks_blue.jpg', 
                    quantity: 3, 
                    onSale: true,
                },
            ],
            reviews: [],
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
            this.variants[this.selectedVariant].quantity -= 1;
        },
        removeFromCart(){
            this.$emit('remove-from-cart' , this.variants[this.selectedVariant].id)
            this.variants[this.selectedVariant].quantity += 1;
        },
        updateVariant(index){
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        },
    },
    computed: {
        title() {
            if (this.variants[this.selectedVariant].onSale == true){
                return this.brand + ' ' + this.product + ' is on sale!';
            } else {
            return this.brand + ' ' + this.product;
            }
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0;
        },
        selectedVariantQuantity() {
            return this.variants[this.selectedVariant].quantity;
        },
        shipping(){
            if (this.premium) {
                return 'Free'
            }
            return '29,9Kr'
        },
    },
})