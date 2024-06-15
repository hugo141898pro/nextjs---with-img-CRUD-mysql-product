
import axios from "axios";
import Buttons from "./buttons";

async function loadProduct(productId){
    const {data} = await axios.get(`http://localhost:3000/api/products/` + productId);
    return data;
}

export default async function ProductPage({params}){
    const product = await loadProduct(params.id)
    console.log(product)
    return(
        <section className="flex justify-center items-center">
            <div className="p-6 bg-white text-black" >
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>

                <Buttons productId={product.id}/>
            </div>
        </section>
    )
}