import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    LoginRequest,
    LoginResponse,
    MeResponse,
} from "@/types/userType";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL!,
        credentials: "include",
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Auth", id: "Me" }],
        }),

        getMe: builder.query<MeResponse, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [{ type: "Auth" as const, id: "Me" }]
                    : [{ type: "Auth" as const, id: "Me" }],
        }),

        logout: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: [{ type: "Auth", id: "Me" }],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMeQuery,
    useLogoutMutation,
} = authApi;
