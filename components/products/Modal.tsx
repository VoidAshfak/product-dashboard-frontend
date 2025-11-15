"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema, ProductFormValues } from "@/lib/schema";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from '@/components/ui/scroll-area'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Product } from "@/types/productType";

interface ProductDialogProps {
    open: boolean;
    mode: "create" | "edit";
    initialData?: ProductFormValues;
    onOpenChange?: (open: boolean) => void;
    onSubmit: (values: ProductFormValues) => Promise<void>;
    // onSubmit: (values: ProductFormValues) => ProductFormValues;
    loading?: boolean;
}

export function Modal({
    open,
    mode,
    initialData,
    onOpenChange,
    onSubmit,
    loading,
}: ProductDialogProps) {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ?? {
            name: "",
            category: "",
            price: 0,
            stock: 0,
            totalSold: 0,
            totalViews: 0,
            ratingAvg: 0,
            status: "active",
        },
        values: initialData,
    });

    const handleSubmit = async (values: ProductFormValues) => {
        await onSubmit(values);
        console.log("Form submitted");
        
    };

    return (
        <div className="">
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{mode === "create" ? "Create Product" : "Edit Product"}</DialogTitle>
                        <DialogDescription>
                            {mode === "create" ? "Create a new product. All fields mark with * are required" : "Make changes to the product here. Click save when you&apos;re done."}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <ScrollArea className="max-h-[70vh] pr-2">
                                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2 lg:col-span-3">
                                                <FormLabel>Product Name*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. 4K Gaming Laptop" {...field} />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. Electronics" {...field} />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. active / draft" {...field} />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0.00"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === "" ? "" : Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === "" ? "" : Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="totalSold"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Sold</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === "" ? "" : Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="totalViews"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Views</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === "" ? "" : Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="ratingAvg"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Rating (0–5)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        max={5}
                                                        step={0.1}
                                                        placeholder="4.5"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.value === "" ? "" : Number(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="min-h-[8px]">
                                                    <FormMessage className="text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </ScrollArea>

                            <DialogFooter className="mt-2 border-t pt-4 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onOpenChange?.bind(null, false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Saving..." : mode === "create" ? "Create" : "Save"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>
        </div>
    );
}
