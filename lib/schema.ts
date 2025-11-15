import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(0),
    stock: z.number().min(0),
    totalSold: z.number().min(0),
    totalViews: z.number().min(0),
    ratingAvg: z.number().min(0).max(5),
    status: z.string().min(1)
});

export type ProductFormValues = z.infer<typeof productSchema>;


export const FormSchema = z.object({
    email: z.email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export type LoginFormValues = z.infer<typeof FormSchema>;