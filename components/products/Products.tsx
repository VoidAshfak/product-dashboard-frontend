"use client"

import { columns } from "@/components/products/Columns"
import { sampleProducts, Product } from "@/types/productType"
import { DataTable } from "@/components/products/DataTable"
import { Modal } from "@/components/products/Modal"
import { useState } from "react"
import { ProductFormValues } from "@/lib/schema";
import {
    useAddProductMutation,
    useGetProductsQuery
} from '@/store/features/products/productApi'



export default function Products() {
    const data: Product[] = sampleProducts
    const [selected, setSelected] = useState<ProductFormValues | null>(null);

    return (
        <div className="container mx-auto py-10 px-10">
            <DataTable
                columns={columns}
                data={data}
            />
            {/* <Modal
                mode={mode}
                open={open}
                initialData={selected ?? undefined}
                onOpenChange={setOpen}
                onSubmit={handleSubmit}
            /> */}
        </div>
    )
}