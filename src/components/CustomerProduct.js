import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import "./User/Product.css"
function CustomerProduct() {
const navigate = useNavigate()
const [product, setProduct] = useState([])
  async function showProduct() {
    try {
        const response = await fetch("http://localhost:7000/api/product")
        const data = await response.json();
        setProduct(data)
    }
    catch (error) {
        console.log("failed to fetch");
    }
    }
useEffect(() => { showProduct() }, [product]) 
const addToCart = async(i)=>{
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")} `);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "product": i._id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:7000/api/cart", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
    return(<>
        {product && product.map((i)=>{return <div className="border" key = {i.id}><h1>  </h1>
        <img src = {i.image}  style = {{ height:'150px', width:'200px', border:"dashed", fontFamily:"fantasty", background:"black" , borderWidth:"6px", borderColor:"red"}}></img><h1></h1>
        <button onClick={()=>addToCart(i)}>add to cart</button>
        </div>
        })}
        <button onClick={()=>navigate("/cart")}>move to cart</button>
    </>)
}
export default CustomerProduct
