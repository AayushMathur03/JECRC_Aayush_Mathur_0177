import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

// Products data lives here (could later come from an API)
const PRODUCTS = [
  { id: 1, name: "React T-Shirt", price: 25 },
  { id: 2, name: "JS Hoodie",     price: 45 },
  { id: 3, name: "CSS Mug",       price: 15 },
  { id: 4, name: "Node Cap",      price: 20 },
];

export default function App() {
  // ✅ LIFTING STATE UP — cart lives here, shared by both children
  const [cart, setCart] = useState([]);

  // ✅ ADD TO CART — immutable update
  const handleAdd = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      // already in cart → bump quantity
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      // new item → spread + add
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ✅ UPDATE QUANTITY — map() to find + change
  const handleUpdateQty = (id, delta) => {
    setCart(
      cart
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)  // remove if qty hits 0
    );
  };

  // ✅ REMOVE ITEM — filter() to exclude
  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div style={{ display: "flex", gap: "32px", padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Pass products + callback DOWN as props */}
      <ProductList products={PRODUCTS} onAddToCart={handleAdd} />

      {/* Pass cart data + callbacks DOWN as props */}
      <Cart cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />
    </div>
  );
}