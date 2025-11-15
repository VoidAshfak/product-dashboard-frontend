import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types/productType";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
        credentials: "include",
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            // First load (one-time fetch)
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
                    return { error: { status: "CUSTOM_ERROR", error: err.message } };
                }
            },
            // Then subscribe for live updates
            async onCacheEntryAdded(
                _arg,
                { updateCachedData, cacheEntryRemoved }
            ) {
                const q = query(collection(firestore, "dashboard"));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    updateCachedData((draft) => {
                        console.log("snapshot size", snapshot.size);

                        draft.length = 0;
                        snapshot.forEach((doc) => {
                            draft.push({
                                id: doc.id,
                                ...(doc.data() as Omit<Product, "id">),
                            });
                        });
                    });
                });

                await cacheEntryRemoved;
                unsubscribe();
            },
        }),

        // Mutations call your Express API, which writes to Firestore
        addProduct: builder.mutation<Product, Omit<Product, "id" | "createdAt" | "updatedAt">>({
            query: (body) => ({
                url: "/products",
                method: "POST",
                body,
            }),
        }),

        updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
            query: ({ id, ...rest }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: rest,
            }),
        }),

        deleteProduct: builder.mutation<{ id: string }, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
        }),

    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;
