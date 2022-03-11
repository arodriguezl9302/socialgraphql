import { gql } from '@apollo/client'

export const REGISTER = gql`
    mutation Register($input: UserInput) {
    register(input: $input) {
        id
        name
        username
        email
        createdAt
  }
}
`

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      token
    }
  }
`