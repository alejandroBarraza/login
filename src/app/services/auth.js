import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_PUBLIC_URL}/api/auth/` }),

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
                url: `forgot-password`,
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ data, token }) => ({
                url: `reset-password/${token}`,
                method: 'PUT',
                body: data,
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
        loginGoogle: builder.mutation({
            query: (tokenId) => ({
                url: `login/google`,
                method: 'POST',
                body: JSON.stringify({
                    tokenId,
                }),
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
    useLoginGoogleMutation,
} = authApi
