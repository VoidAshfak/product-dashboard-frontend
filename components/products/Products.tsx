"use client"

import { columns } from "@/components/products/Columns"
import { Product } from "@/types/productType"
import { DataTable } from "@/components/products/DataTable"
import { Modal } from "@/components/products/Modal"


interface ProductsProps {
  data: Product[];
}

export default function Products({data}:ProductsProps) {

    return (
        <div className="container mx-auto py-10 px-10">
            <DataTable 
                columns={columns} 
                data={data} 
            />
            <Modal 
                mode="create"
                open= {false}
            />
        </div>
    )
}