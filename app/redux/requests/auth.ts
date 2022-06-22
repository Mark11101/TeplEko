import { baseApi } from "./baseApi";

import { 
  SignUpRequestData, 
  SignUpResponseData,
  SignInRequestData, 
  SignInResponseData 
} from "../types/auth";

const authApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({

    requestSignUp: builder.mutation<SignUpResponseData, SignUpRequestData>({
      query: (payload) => ({
        url: `/auth/signup`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          login: payload.login,
          password: payload.password,
        }
      })
    }),

    requestSignIn: builder.mutation<SignInResponseData, SignInRequestData>({
      query: (payload) => ({
        url: `/auth/signin`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          login: payload.login.toLowerCase(),
          password: payload.password,
        }
      })
    }),

    requestCurrentUser: builder.query<unknown, void>({
      query: () => ({
        url: `/auth/currentUser`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    })
  })
});

export const {
  useRequestSignUpMutation,
  useRequestSignInMutation,
  useRequestCurrentUserQuery,
} = authApi;

export default authApi
