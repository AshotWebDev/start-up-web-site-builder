import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// User type
export interface User {
  id: string
  first_name: string,
  last_name: string
  email: string
  password?: string
  tariff_plan?: string | null
  // կարող ես ավելացնել այլ դաշտեր, օրինակ role, createdAt և այլն
}

// Register/Login types
export interface RegisterUserPayload {
  first_name: string,
  last_name: string
  email: string
  password: string
  tariff_plan?: string | null
}

export interface LoginUserPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    // GET all users
    getUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // GET single user by ID
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // REGISTER user
    registerUser: build.mutation<User, RegisterUserPayload>({
      query: (userData) => ({
        url: '/v1/auth/register/',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    // LOGIN user
    loginUser: build.mutation<AuthResponse, LoginUserPayload>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // UPDATE user
    updateUser: build.mutation<User, Partial<User> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),

    // DELETE user
    deleteUser: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    verifyEmail: build.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `users/verify-email/${id}`,
        method: 'GET',
      }),
    })
  }),
})

// Export hooks
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useVerifyEmailMutation
} = usersApi

// Export reducer
export const usersReducer = usersApi.reducer
