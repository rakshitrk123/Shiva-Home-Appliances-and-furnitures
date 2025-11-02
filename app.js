
const yearEl = document.getElementById('year');
if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

// Load products
async function loadProducts(){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  const res = await fetch('assets/js/products.json');
  const products = await res.json();

  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const sort = document.getElementById('sort');

  function render(){
    let list = products.slice();
    const q = (search.value || '').toLowerCase();
    if(q){ list = list.filter(p => (p.name+p.brand+p.category).toLowerCase().includes(q)); }
    if(category.value !== 'all'){ list = list.filter(p => p.category === category.value); }
    if(sort.value === 'price-asc'){ list.sort((a,b)=>a.price-b.price); }
    if(sort.value === 'price-desc'){ list.sort((a,b)=>b.price-a.price); }

    grid.innerHTML = list.map(p => `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" />
        <div class="p-body">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
            <strong>${p.name}</strong>
            <span class="tag">${p.brand}</span>
          </div>
          <div class="price">₹ ${p.price.toLocaleString('en-IN')}</div>
          <small style="color:#8aa0b8">${p.short}</small>
          <div style="display:flex;gap:8px;margin-top:8px">
            <a class="btn" href="https://wa.me/919916757929?text=I'm%20interested%20in%20${encodeURIComponent(p.name)}" target="_blank">Enquire</a>
            <a class="btn primary" href="#" onclick="alert('Add to cart coming soon')">Add</a>
          </div>
        </div>
      </div>`).join('');
  }

  [search, category, sort].forEach(el => el && el.addEventListener('input', render));
  render();
}

loadProducts();

// Fake contact form handler
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Thanks! We will contact you shortly. (Connect this form to email/WhatsApp in production).');
    form.reset();
  });
}
