"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus } from "lucide-react"
import { ProductFormValues } from "@/lib/schema";
import { Modal } from "@/components/products/Modal"
import {
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} from '@/store/features/products/productApi'
import { Product } from "@/types/productType"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export function DataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">("create");
    const [addProduct, { isLoading: addProductLoading, error: addProductError }] = useAddProductMutation();
    const [updateProduct, { isLoading: updateProductLoading, error: updateProductError }] = useUpdateProductMutation();
    const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const handleOpenModal = (mode: "create" | "edit" | "delete", product?: Product) => {
        setModalMode(mode)
        if (product) {
            setSelectedProduct(product)
        } else {
            setSelectedProduct(null)
        }
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const handleSubmit = async (values: ProductFormValues) => {
        try {
            if (modalMode === "create") {
                await addProduct(values).unwrap()
                setSelectedProduct(null)
            } else if (modalMode === "edit" && selectedProduct) {
                await updateProduct({ ...values, id: selectedProduct.id }).unwrap()
                console.log("Would update:", selectedProduct, values)
            } else if (modalMode === "delete" && selectedProduct) {
                console.log("Would delete:", selectedProduct, values)
            }

            setOpenModal(false)
        } catch (e) {
            console.error("Failed to save product", e)
        }
    }
    const handleDelete = async () => {
        if (!selectedProduct) return;
        try {
            await deleteProduct(selectedProduct.id).unwrap();
            setSelectedProduct(null);
            setOpenModal(false);
        } catch (e) {
            console.error("Failed to delete product", e);
        }
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },
        meta: {
            onEdit: (row: Product) => handleOpenModal("edit", row as Product),
            onDelete: (row: Product) => handleOpenModal("delete", row as Product),
        },
    })



    return (
        <>
            <Modal
                mode={modalMode}
                open={openModal}
                onOpenChange={handleCloseModal}
                onSubmit={handleSubmit}
                initialData={selectedProduct
                    ? {
                        name: selectedProduct.name,
                        category: selectedProduct.category,
                        price: selectedProduct.price,
                        stock: selectedProduct.stock,
                        totalSold: selectedProduct.totalSold,
                        totalViews: selectedProduct.totalViews,
                        ratingAvg: selectedProduct.ratingAvg,
                        status: selectedProduct.status,
                    }
                    : undefined}
                onDelete={handleDelete}
            />

            {/* Filter & Add Product Button */}
            <div className="flex items-center justify-between">
                <div className="w-full flex items-center py-4">
                    <Input
                        placeholder="Product..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <div>
                    <Button
                        onClick={() => handleOpenModal("create")}
                    >
                        <Plus />
                        <span className="mr-2">Add Product</span>
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}