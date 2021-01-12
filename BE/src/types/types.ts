import { gql } from "apollo-server-express";

export const Types = gql`
  scalar Date
  scalar Map

  type Query {
    user: [User]!
    base: [Base]!
    fob: [Fob]!
    deleteAllUsers: Boolean
    deleteAllBases: Boolean
    deleteAllFobs: Boolean

    getBasesWithinCountry(country: String!): [Fob]
    getFobsWithinCountry(country: String!): [Fob]
  }
  type User {
    id: String!
    name: String
    email: String!
    serviceEntry: String
    serviceDepart: String
    dateCreated: Date
    dateModified: Date
  }

  type Base {
    name: String!
    latLong: [String]!
    country: String
    startDate: String
    stopDate: String
    dateCreated: Date
    dateModified: Date
  }

  type Fob {
    name: String!
    latLong: [String]!
    country: String
    startDate: String
    stopDate: String
    dateCreated: Date
    dateModified: Date
  }

  type Mutation {
    addUser(
      name: String
      email: String
      serviceEntry: String
      serviceDepart: String
    ): User!

    addBase(
      name: String
      latLong: [String]
      country: String
      startDate: String
      stopDate: String
    ): Base!

    addFob(
      name: String
      latLong: [String]
      country: String
      startDate: String
      stopDate: String
    ): Fob!
  }
`;
