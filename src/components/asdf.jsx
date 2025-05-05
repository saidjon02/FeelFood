import { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/products/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(res => res.json())
      .then(data => {
        alert("Yaratildi!");
        window.location.reload();
      });
  };

  return (
    <div>
      <h1>Mahsulotlar</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>

      <h2>Yangi mahsulot qo‘shish</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nomi" onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Narxi" onChange={e => setFormData({ ...formData, price: e.target.value })} />
        <input placeholder="Izoh" onChange={e => setFormData({ ...formData, description: e.target.value })} />
        <button type="submit">Qo‘shish</button>
      </form>
    </div>
  );
}

export default ProductList;
