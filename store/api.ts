import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { LoginRequest, LoginResponse, MeResponse } from '../types/userType'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
        }),
        getMe: builder.query<MeResponse, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
        }),
        logout: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const { 
    useLoginMutation,
    useGetMeQuery,
    useLogoutMutation
 } = api;