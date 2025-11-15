"use client"

import { columns } from "@/components/products/Columns"
import { Product } from "@/types/productType"
import { DataTable } from "@/components/products/DataTable"
import { useState } from "react"
import { ProductFormValues } from "@/lib/schema";
import {
    useGetProductsQuery
} from '@/store/features/products/productApi'



export default function Products() {
    const {
        data: products = [],
        isLoading,
        isError,
        error,
    } = useGetProductsQuery();

    return (
        <div className="container mx-auto py-10 px-10">
            <DataTable
                columns={columns}
                data={products}
            />
        </div>
    )
}