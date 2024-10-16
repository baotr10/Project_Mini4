//Call API by useEffect

import { useEffect, useState } from "react";
import "./UseEffect3.scss";

function ListProduct() {
  const limit = 10;
  const [data, setData] = useState([]);
  const [pageActive, setPageActive] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?skip=${pageActive * limit}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.products);
        setData(data.products);
        setTotalPage(Math.ceil(data.total / limit));
      });
  }, [pageActive]);

  const handleClick = (e) => {
    setPageActive(e);
  };

  console.log([...Array(totalPage)]);
  console.log(totalPage);

  return (
    <>
      <div className="product__list">
        {data.map((item) => (
          <div className="product__item" key={item.id}>
            <div className="product__img">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <h3 className="product__title">{item.title}</h3>
            <div className="product__price">{item.price}$</div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <ul>
          {[...Array(totalPage)].map((_, index) => (
            <li onClick={() => handleClick(index)} key={index}>{index+1}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ListProduct;
