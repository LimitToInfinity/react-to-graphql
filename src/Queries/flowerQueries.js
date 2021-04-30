import { gql } from '@apollo/client';

export const flowersQuery = gql`{
  flowers {
    _id
    kind
    petals
  }
}`

export const createFlowerQuery = gql`mutation CreateFlower($kind: String!, $petals: Int) {
  createFlower(flower: {kind: $kind, petals: $petals}) {
      _id
      kind
      petals
    }
}`
