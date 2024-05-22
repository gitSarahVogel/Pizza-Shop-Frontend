import { useState, useEffect } from 'react'
import "./User/Product.css"


function Product() {
    const [product, setProduct] = useState([])
    const [currentProduct, setCurrentProduct] = useState({})

    async function showProduct() {
        try {
            const response = await fetch(`http://localhost:7000/api/product`)
            const data = await response.json();
            setProduct(data)
        }
        catch (error) {
            console.log("failed to fetch");
        }
    }
    useEffect(() => { showProduct() }, [product])


    const addProduct = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": currentProduct.id,
            "name": currentProduct.name,
            "description": currentProduct.description,
            "price": currentProduct.price,
            "isDairy": currentProduct.isDairy,
            "image": currentProduct.image
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        let a;
        fetch("http://localhost:7000/api/product", requestOptions)
            .then(response => {a =response
                response.json()})
            .then(result =>  console.log(result))
            .catch(error => console.log('error', error));
        closeDialog2()
    }
    function openDialog2() {

        document.getElementById("Dialog2").showModal()

    }

    function closeDialog2() {
        document.getElementById("Dialog2").close()

    }



    const updateProduct = async (id4) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": currentProduct.id,
            "name": currentProduct.name,
            "description": currentProduct.description,
            "price": currentProduct.price,
            "isDairy": currentProduct.isDairy,
            "image": currentProduct.image
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`http://localhost:7000/api/product/${id4}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        closeDialog()
    }

    function openDialog(i) {
        setCurrentProduct(i)
        document.getElementById("Dialog1").showModal()
        showProduct()
    }

    function closeDialog() {
        document.getElementById("Dialog1").close()
    }
    useEffect(() => { change() }, [currentProduct])

    const change = () => {
        document.getElementById("id").value = currentProduct.id
        document.getElementById("name").value = currentProduct.name
        document.getElementById("desc").value = currentProduct.description
        document.getElementById("price").value = currentProduct.price
        document.getElementById("isDairy").value = currentProduct.isDairy
        document.getElementById("image").value = currentProduct.image
    }


    const deleteProduct = async (id) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

       await fetch(`http://localhost:7000/api/product/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (<>
            <button onClick={() => openDialog2()}>add new product</button>
        <br/>
        <br/>
        {product && product.map((i) => {
            return <div key={i.id} className="border">
                <img src={i.image} style={{ height: '150px', width: '240px', border: "dashed", fontFamily: "fantasty", background: "black", borderWidth: "6px", borderColor: "red" }}></img>
                <div>{i.name + " | " + i.description + " | " + i.price + "$"}</div>

                <button onClick={() => deleteProduct(i._id)}>delete</button>
                <button onClick={() => openDialog(i)}>update</button>

            </div>
        })}
        <dialog id="Dialog1" style={{ width: '180px', height: '360px', color: 'red' }}>
            <h1>update</h1>
            <input id={"id"} defaultValue={currentProduct.id} onChange={(e) => setCurrentProduct({ ...currentProduct, id: e.target.value })}></input><h1>   </h1>
            <input id={"name"} defaultValue={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}></input><h1>   </h1>
            <input id={"desc"} defaultValue={currentProduct.description} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}></input><h1>   </h1>
            <input id={"price"} defaultValue={currentProduct.price} onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}></input><h1>   </h1>
            <input id={"isDairy"} defaultValue={currentProduct.isDairy} onChange={(e) => setCurrentProduct({ ...currentProduct, isDairy: e.target.value })}></input><h1>   </h1>
            <input id={"image"} defaultValue={currentProduct.image} onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}></input><h1>   </h1>
            <button style={{ color: 'red', background: 'white' }} onClick={() => updateProduct(currentProduct._id)}>save</button>
            <button style={{ color: 'red', background: 'white' }} onClick={() => closeDialog()}>close</button>
        </dialog>
        <dialog id="Dialog2" style={{ width: '180px', height: '360px', color: 'red' }}>

            <h1>add</h1>
            <input placeholder='id' onChange={(e) => setCurrentProduct({ ...currentProduct, id: e.target.value })}></input><h1>  </h1>
            <input placeholder='name' onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}></input><h1>  </h1>
            <input placeholder='description' onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}></input><h1>  </h1>
            <input placeholder='price' onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}></input><h1>  </h1>
            <input placeholder='isDairy' onChange={(e) => setCurrentProduct({ ...currentProduct, isDairy: e.target.value })}></input><h1>  </h1>
            <input placeholder='image' onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}></input><h1>  </h1>
            <button style={{ color: 'red', background: 'white' }} onClick={() => addProduct()}> save </button>
            <button style={{ color: 'red', background: 'white' }} onClick={() => closeDialog2()}> close </button>
        </dialog>

    </>)

}
export default Product;