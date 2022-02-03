import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'api/auth/' }),

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: `register`,
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: `login`,
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `/user/forgot-password/`,
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ data, token }) => ({
                url: `/user/reset-password/${token}`,
                method: 'PUT',
                body: data,
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi
