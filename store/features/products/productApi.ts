import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types/productType";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { ProductFormValues } from "@/lib/schema";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        credentials: "include",
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            // one-time initial fetch
            async queryFn() {
                try {
                    const q = query(collection(firestore, "dashboard"));
                    const snap = await getDocs(q);

                    const initialData: Product[] = snap.docs.map((doc) => ({
                        id: doc.id,
                        ...(doc.data() as Omit<Product, "id">),
                    }));

                    return { data: initialData };
                } catch (err: any) {
                    return {
                        error: {
                            status: "CUSTOM_ERROR",
                            error: err?.message ?? "Failed to load products",
                        },
                    };
                }
            },

            // subscribe to live updates
            async onCacheEntryAdded(_arg, { updateCachedData, cacheEntryRemoved }) {
                const q = query(collection(firestore, "dashboard"));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    updateCachedData((draft) => {
                        draft.length = 0;
                        snapshot.forEach((doc) => {
                            draft.push({
                                id: doc.id,
                                ...(doc.data() as Omit<Product, "id">),
                            });
                        });
                    });
                });

                try {
                    await cacheEntryRemoved;
                } finally {
                    unsubscribe();
                }
            },

            providesTags: (result) =>
                result
                    ? [
                        { type: "Product" as const, id: "LIST" },
                        ...result.map((p) => ({ type: "Product" as const, id: p.id })),
                    ]
                    : [{ type: "Product" as const, id: "LIST" }],
        }),

        addProduct: builder.mutation<Product, ProductFormValues>({
            query: (body) => ({
                url: "/products/create",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Product", id: "LIST" }],
        }),

        updateProduct: builder.mutation<
            Product,
            Partial<Product> & Pick<Product, "id">
        >({
            query: ({ id, ...patch }) => ({
                url: `/products/update/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Product", id },
                { type: "Product", id: "LIST" },
            ],
        }),

        deleteProduct: builder.mutation<{ id: string }, string>({
            query: (id) => ({
                url: `/products/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Product", id },
                { type: "Product", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;
