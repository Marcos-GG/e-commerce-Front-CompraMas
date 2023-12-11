import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Card({ id, title, image, price, gender, category, likes }) {
  return (
    <div style={{ border: "solid 1px", margin: "10px" }}>
      <p>title: {title}</p>
      <p>image: {image}</p>
      <p>price: {price}</p>
      <p>gender: {gender}</p>
      <p>category: {category}</p>
      <p>likes: {likes}</p>

      <button>
        <NavLink to={`/detail/${id}`}>Ver mas</NavLink>
      </button>
    </div>
  );
}

export default Card;
