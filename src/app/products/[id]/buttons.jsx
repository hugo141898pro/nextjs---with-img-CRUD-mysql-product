'use client'
import axios from "axios"
import React from "react"
import { useRouter } from "next/navigation" 

export default function Buttons({productId}){
    const router = useRouter();
    return(
    <div className=" flex gap-x-2 justify-center items-center m-2">
        <button className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded text-white" 
         onClick={async () =>{
            
            if(confirm('estas seguro que quieres eliminar este producto')) {
                const deleteProduct = await axios.delete('/api/products/' + productId);
                console.log(deleteProduct);
                if(deleteProduct.status === 204){
                    router.push('/products');
                    router.refresh();
                }
            };
        }}>
            Delete
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded text-white"
        onClick={() => {
            router.push('/products/edit/' + productId);
        }}
        >
            Edit
        </button>
    </div>    
    )
}