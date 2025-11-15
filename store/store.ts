import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { authApi } from '@/store/features/auth/authApi'
import { productsApi } from '@/store/features/products/productApi'

export const makeStore = () => {
    return configureStore({
        reducer: {
            [authApi.reducerPath]: authApi.reducer,
            [productsApi.reducerPath]: productsApi.reducer,
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                authApi.middleware, 
                productsApi.middleware
            ),
    });
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']