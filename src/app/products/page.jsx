import ProductCard from "@/components/ProductCard";
import {pool} from "@/libs/mysql" 
import axios from "axios";
 
async function loadProducts(){
    const {data} = await axios.get('http://localhost:3000/api/products');
    return data
}

export default async function productPage(){
    const product = await loadProducts();
    console.log(product);
    return(
        <div className="grid gap-4 grid-cols-5">
            {product.map(product => (
                <ProductCard product={product} key={product.id}/>
            ))}
        </div>
    )
}