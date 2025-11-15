import Products from "@/components/products/Products"
import { Product, sampleProducts } from "@/types/productType"


export default async function Page() {
    return (
        <div className="container mx-auto py-10 px-10">
            <Products />
        </div>
    )
}