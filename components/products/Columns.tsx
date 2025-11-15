"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types/productType"
import { ArrowUpDown, Trash, Edit2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Product ID</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Product Name</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Category</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Price</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))

            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Stock</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "totalSold",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Sold</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "totalViews",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Views</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "ratingAvg",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Rating</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <div
                    className="py-5 cursor-pointer flex items-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span className="hover:text-gray-600">Status</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <Badge
                    variant={
                        row.getValue('status') === 'active' ?
                            'default' : (row.getValue('status') === 'inactive' ?
                                'destructive' : 'secondary')
                    }
                    className="uppercase"
                >
                    {row.getValue('status')}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        header: 'Action',
        enableHiding: false,
        cell: ({ row, table }) => {
            const product = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => (table.options.meta as any)?.onEdit?.(product)}
                        >
                            <Edit2 />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => (table.options.meta as any)?.onDelete?.(product)}
                        >
                            <Trash />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


