import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "@/store/About.jsx";
import Cart from "@/purchase/Cart.jsx";
import Home from "@/store/Home.jsx";
import Navbar from "@/ui/Navbar.jsx";
import ProductDetailInfo from "@/product/ProductDetailInfo.jsx";
import ProductDetailNutrition from "@/product/ProductDetailNutrition.jsx";
import ProductDetailStorage from "@/product/ProductDetailStorage.jsx";
import ProductDetails from "@/product/ProductDetails.jsx";
import Products from "@/product/Products.jsx";


function App() {
  const [cart, setCart] = useState([]);
  /* !! DO NOT REMOVE !!*/
  window.__testsCart = cart; // used for the tests in this project

  useEffect(() => {
    // to visualize the cart in the console every time in changes
    // you can also use React dev tools
    console.log(cart);
  }, [cart]);

  function handleProductDelete(id) {
    console.log("Deleting product " + id);
    const updatedCart = cart.filter((product) => product.id !== id);
      setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );

    console.log(existingProduct);
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/products"
            element={
              <Products
                cart={cart}
                onProductAdd={handleProductAdd}
                onProductDelete={handleProductDelete}
            
              />
            }
          ></Route>
          <Route
            path="/products/:id/"
            element={<ProductDetails onProductAdd={handleProductAdd} />}
          >
            <Route
              path=""
              element={<ProductDetailInfo onProductAdd={handleProductAdd} />}
            ></Route>

            <Route
              path="nutrition"
              element={<ProductDetailNutrition />}>
            </Route>

            <Route path="storage" element={<ProductDetailStorage />}></Route>
          </Route>
          <Route path="cart" element={<Cart cart={cart} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
