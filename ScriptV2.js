let products = [
  {
    name:"Nike Air Max",
    price:550000,
    img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    name:"Adidas Running",
    price:480000,
    img:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  },
  {
    name:"Converse Classic",
    price:350000,
    img:"https://images.unsplash.com/photo-1514989940723-e8e51635b782",
  }
];

let cart = [];

function renderProducts(){
  const wrap = document.getElementById("products");
  const search = document.getElementById("search").value.toLowerCase();

  wrap.innerHTML="";

  products
  .filter(p=>p.name.toLowerCase().includes(search))
  .forEach((p,i)=>{
    wrap.innerHTML+=`
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>Rp ${p.price}</p>
        <button onclick="addToCart(${i})">Tambah</button>
      </div>
    `;
  });
}

function addToCart(i){
  cart.push(products[i]);
  renderCart();
  toast("Masuk keranjang 🛒");
}

function renderCart(){
  const wrap = document.getElementById("cartItems");
  let total=0;
  wrap.innerHTML="";

  cart.forEach(c=>{
    total+=c.price;
    wrap.innerHTML+=`<p>${c.name}</p>`;
  });

  document.getElementById("total").textContent=total;
  document.getElementById("cartCount").textContent=cart.length;
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("hidden");
}

function toggleDark(){
  document.body.classList.toggle("dark");
}

function goHome(){
  window.scrollTo({top:0,behavior:"smooth"});
}

/* CHAT */
function toggleChat(){
  document.getElementById("chat").classList.toggle("hidden");
}

function sendChat(){
  const text = document.getElementById("chatText").value;
  if(!text) return;

  addMsg("Lu", text);

  let reply="Admin bantu ya 👍";

  if(text.includes("harga")) reply="Harga sesuai produk ya bro 😆";
  if(text.includes("ongkir")) reply="Ongkir 10k flat 🚚";
  if(text.includes("halo")) reply="Halo juga! Ada yang bisa dibantu?";

  setTimeout(()=>addMsg("CS", reply),500);

  document.getElementById("chatText").value="";
}

function addMsg(user,msg){
  const body=document.getElementById("chatBody");
  body.innerHTML+=`<p><b>${user}:</b> ${msg}</p>`;
  body.scrollTop=body.scrollHeight;
}

/* TOAST */
function toast(msg){
  const t=document.createElement("div");
  t.textContent=msg;
  t.style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:8px 14px;border-radius:8px";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),1500);
}

renderProducts();
