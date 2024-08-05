//* ===================================================
//*                 Checkout Page Solution
//* ===================================================
// table variables
const shipping = 15.0;
const Tax = 0.18;

let shoppingCart = [
  { name: "Vintage Backpack", price: 34.99, piece: 1, img: "./img/photo.png" },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./img/photo2.png" },
  { name: "Antique Clock", price: 69.99, piece: 1, img: "./img/photo3.png" },
];

// on screen
shoppingCart.forEach(({ img, name, price, piece }) => {
  // dest
  // const{img,name,price}=urun

  document.querySelector("#product-rows").innerHTML += `<div class="card mb-3" style="max-width: 540px;">

  <div class="row ">

    <div class="col-md-5 ">
      <img src=${img}  class=" w-100 rounded-start" alt="...">
    </div>

    <div class="col-md-7 ">

      <div class="card-body">
      
        <h5 class="card-title">${name}</h5>
        
             <div class="product-price">
                    <p class="text-warning h2">$
                      <span class="discount-price">${(price * 0.7).toFixed(2)}</span>
                      <span class="h5 text-dark text-decoration-line-through">${price}</span>
                    </p>
                  </div>

                  
                  <div
                    class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                  >
                    <div class="piece-controller">
                      <button class="btn btn-secondary btn-sm minus">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4" id="product-piece">${piece}</p>
                      <button class="btn btn-secondary btn-sm plus">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                  </div>

                  <div class="product-removal mt-4">
                    <button class="btn btn-danger btn-sm w-100 remove-product">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                  </div>

                  <div class="mt-2">
                    Product Total: $<span class="product-total">${(price * 0.7 * piece).toFixed(2)}</span>
                  </div>
      </div>
    </div>
  </div>
</div>`;
});

// func
calculateCardTotal()

removeButton()

pieceButton()

// removing func
function removeButton() {
  document.querySelectorAll(".remove-product").forEach((btn) => {
    btn.onclick = () => {

      btn.closest(".card").remove()
      calculateCardTotal()
    }
  })
}

// piece func
function pieceButton() {
  document.querySelectorAll(".piece-controller").forEach((box) => {
    const plus = box.lastElementChild
    const minus = box.firstElementChild
    const piece = plus.previousElementSibling
    // const piece = box.children[1]


    // plus btn
    plus.onclick = () => {
      // piece updating
      piece.textContent = +(piece.textContent) + 1

      // product card total 
      plus.closest(".card-body").querySelector(".product-total").textContent = plus.closest(".card-body").querySelector(".discount-price").textContent * piece.textContent

      calculateCardTotal()
    }

    // minus btn 
    minus.onclick = () => {

      piece.textContent = +(piece.textContent) - 1

      minus.closest(".card-body").querySelector(".product-total").textContent = minus.closest(".card-body").querySelector(".discount-price").textContent * piece.textContent

      calculateCardTotal()

      // remove the product if it is smaller then 1
      if (piece.textContent < 1) {
        alert("Remove the product from the cart?")

        minus.closest(".card").remove()
      }
    }
  })
}

// Card total calc
function calculateCardTotal() {

  const total = document.querySelectorAll(".product-total");

  const pTotal = Array.from(total).reduce((acc, item) => acc + Number(item.textContent), 0);

  document.querySelector(".productsTotal").textContent = pTotal

  document.querySelector(".tax").textContent = pTotal * Tax

  document.querySelector(".crg").textContent = pTotal ? shipping : 0

  document.querySelector(".total").textContent = pTotal ? (pTotal + pTotal * Tax + shipping) : 0

}