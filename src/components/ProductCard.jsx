import Link from "next/link";

export default function ProductCard({product}){
    return(
        <div>
            <Link href={`/products/${product.id}`}>
                <div className="bg-white rounded-lg border-gray-800 mb-3 text-black hover:bg-gray-100 hover:cursor-pointer"
                href={`/products/${product.id}`}>
                    <h1 className="text-lg font-bold ">{product.name}</h1>
                    <h2 className="text-2xl text-slate-600">{product.price}</h2>
                    <p>{product.description}</p>
                </div>
            </Link>

        </div>
    )
}