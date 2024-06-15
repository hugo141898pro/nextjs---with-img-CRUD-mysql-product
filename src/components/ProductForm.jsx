'use client'
import { useRef, useState, useEffect } from "react"
import axios from 'axios';
import { useRouter, useParams } from "next/navigation";

function ProductForm(){
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: ""
    });

    const [file, fileState] = useState(null);

    const form = useRef(null);

    const router = useRouter();
    const params = useParams();
    
    console.log(params);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    } 

    useEffect(() => {
        if(params.id){
            axios.get('/api/products/' + params.id).then(res => {
                setProduct({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price
                })
            })
        }
    }, [])

    const handleSumit = async (e) => {
        e.preventDefault();
        console.log(product);

        if(!params.id){
            const formData = new FormData()
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('image', file);

            const res = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
        } else {
            const res = await axios.put('/api/products/' + params.id, product)
            console.log(res);
        }

        form.current.reset();
        router.push('/products');
        router.refresh();
    }

    return(
        <div className="flex ">
            <form action="" className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4" onSubmit={handleSumit} ref={form}>
        <label htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Product Name</label>
        <input name="name" type="text" placeholder="name" onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black" autoFocus value={product.name}
        />

        <label htmlFor="price"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Product Price: </label>
        <input name="price" type="text" placeholder="00.00" onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black" value={product.price}
        />

        <label htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Product description: </label>
        <textarea name="description" rows={3} placeholder="description" onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black" value={product.description}
        />

        <label htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
        >Product Imagen: </label>
        <input type="file" className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
        onChange={(e) => {
            fileState(e.target.files[0]);
        }}
        />
        {file && <img className="w-96 object-contain mx-auto my-4" src={URL.createObjectURL(file)} alt="img" />}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            {params.id ? "Update product" : "Saved product"}
        </button>
            </form>

        </div>
    )
}

export default ProductForm;