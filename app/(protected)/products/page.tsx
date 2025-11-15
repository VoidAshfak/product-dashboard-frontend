import Products from "@/components/products/Products"
import { Product, sampleProducts } from "@/types/productType"
import { da } from "zod/v4/locales";

async function getData(): Promise<Product[]> {
    return sampleProducts
}

const data = await getData();

export default async function Page() {
    return (
        <div className="container mx-auto py-10 px-10">
            <Products 
                data={data}
            />
        </div>
    )
}