let products = JSON.parse(localStorage.getItem("products")) || [
  {name:"Kaos", price:50000, img:"https://picsum.photos/200?1", cat:"Baju"},
  {name:"Sepatu Sport", price:150000, img:"https://picsum.photos/200?2", cat:"Sepatu"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save(){
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts(){
  const wrap = document.getElementById("products");
  const search = document.getElementById("search").value.toLowerCase();
  const filter = document.getElementById("filter").value;

  wrap.innerHTML = "";

  products
  .filter(p=>p.name.toLowerCase().includes(search))
  .filter(p=>!filter || p.cat===filter)
  .forEach((p,i)=>{
    wrap.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>Rp ${p.price}</p>
        <button onclick="addToCart(${i})">Tambah</button>
        <button onclick="deleteProduct(${i})">Hapus</button>
      </div>
    `;
  });
}

function addProduct(){
  const name = document.getElementById("name").value;
  const price = +document.getElementById("price").value;
  const img = document.getElementById("img").value;
  const cat = document.getElementById("cat").value;

  products.push({name, price, img, cat});
  save();
  renderProducts();
}

function deleteProduct(i){
  products.splice(i,1);
  save();
  renderProducts();
}

function addToCart(i){
  cart.push(products[i]);
  save();
  renderCart();
}

function renderCart(){
  const wrap = document.getElementById("cartItems");
  let total=0;
  wrap.innerHTML="";

  cart.forEach((c,idx)=>{
    total+=c.price;
    wrap.innerHTML+=`
      <p>${c.name} - ${c.price}
      <button onclick="removeCart(${idx})">x</button></p>
    `;
  });

  document.getElementById("total").textContent=total;
  document.getElementById("cartCount").textContent=cart.length;
}

function removeCart(i){
  cart.splice(i,1);
  save();
  renderCart();
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("hidden");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

renderProducts();
renderCart();
