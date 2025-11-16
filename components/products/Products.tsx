"use client"

import { columns } from "@/components/products/Columns"
import { Product } from "@/types/productType"
import { DataTable } from "@/components/products/DataTable"
import { useEffect, useState } from "react"
import { ProductFormValues } from "@/lib/schema";
import {
    useGetProductsQuery
} from '@/store/features/products/productApi'
import { useRouter } from "next/navigation"
import { useGetMeQuery } from "@/store/features/auth/authApi"



export default function Products() {
    const {
        data: products = [],
    } = useGetProductsQuery();

    const router = useRouter();
    const { data, isError, error } = useGetMeQuery();

    useEffect(() => {
        console.log(data);
        if (isError === true) {
            router.push("/login");
        }    
    }, [data, isError, error, router]);

    return (
        <div className="container mx-auto py-10 px-10">
            <DataTable
                columns={columns}
                data={products}
            />
        </div>
    )
}