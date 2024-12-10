import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  const cartQuantity = () => {
    var sum = 0;
    props.cart.forEach((product) => {
      console.log("q: " + product.quantity);
      console.log("sum: " + sum);
      sum += product.quantity;
    });
    return sum;
  };


  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        SuperM
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "active" : ""} to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "active" : ""} to="/about">
            About us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "active" : ""} to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
            Cart ({cartQuantity()})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
