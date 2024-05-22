import { useState, useEffect } from 'react'
import "./User/Product.css"
import { Navigate } from 'react-router-dom';
function CustomerProduct() {
  const [basket, setBasket] = useState()

  const getCart = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://localhost:7000/api/cart", requestOptions)
      .then(response => response.json())
      .then(result => {
        setBasket(result)
        console.log("basket: " + basket)
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => { getCart() }, [basket])

  const deleteProduct = async (i) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);


    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    

    fetch(`http://localhost:7000/api/cart/${i}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const move = ()=>{
    Navigate("/cart")
  }

  return (
    <>
    <button onClick={()=>move()}></button><br/>
      {basket && basket.map((i) => {
        return <div className="border" key={i.product.id}>
          <img src={i.product.image} style={{ height: '150px', width: '200px', border: "dashed", fontFamily: "fantasty", background: "black", borderWidth: "6px", borderColor: "red" }}></img><h1>   </h1>
          <div>{i.product.name + " | " + i.product.description + " | " + i.product.price + "$"}</div><h1>   </h1>
          <button onClick={() => deleteProduct(i._id)}>delete</button>
        </div>
      })}
    </>
  )
}
export default CustomerProduct