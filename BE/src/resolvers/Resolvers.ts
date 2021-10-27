import { IResolvers } from "graphql-tools";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const User = mongoose.model(
  "User",
  new Schema({
    id: String!,
    name: String,
    email: String,
    serviceEntry: String,
    serviceDepart: String,
    dateCreated: Date,
    dateModified: Date,
  })
);

export const Base = mongoose.model(
  "Base",
  new Schema({
    name: String!,
    latLong: [String]!,
    country: String,
    startDate: String,
    stopDate: String,
    source: String,
    sourceUrl: String,
    dateCreated: Date,
    dateModified: Date,
  })
);

export const Fob = mongoose.model(
  "Fob",
  new Schema({
    name: String!,
    latLong: [String]!,
    country: String,
    startDate: String,
    stopDate: String,
    source: String,
    sourceUrl: String,
    dateCreated: Date,
    dateModified: Date,
  })
);

export const Resolvers: IResolvers = {
  Date: String,
  Map: Object,

  Query: {
    user: () => User.find(),
    base: () => Base.find(),
    fob: () => Fob.find(),

    deleteAllUsers: async () => {
      await User.deleteMany({});
      return true;
    },
    deleteAllBases: async () => {
      await Base.deleteMany({});
      return true;
    },
    deleteAllFobs: async () => {
      await Fob.deleteMany({});
      return true;
    },
    getBasesWithinCountry: async (_, { country }) => {
      const b = await Base.find({ country: country });
      return b;
    },

    getFobsWithinCountry: async (_, { country }) => {
      const f = await Fob.find({ country: country });
      return f;
    },
  },

  Mutation: {
    addUser: async (_, { name, email, serviceEntry, serviceDepart, type }) => {
      const u = new User({
        name,
        email,
        serviceEntry,
        serviceDepart,
      });
      await u.save();

      return u;
    },
    addBase: async (_, { name, latLong, country, startDate, stopDate, source, sourceUrl }) => {
      const b = new Base({
        name,
        latLong,
        country,
        startDate,
        stopDate,
        source, 
        sourceUrl
      });
      await b.save();

      return b;
    },

    addFob: async (_, { name, latLong, country, startDate, stopDate, source, sourceUrl }) => {
      const f = new Fob({
        name,
        latLong,
        country,
        startDate,
        stopDate,
        source, 
        sourceUrl
      });
      await f.save();

      return f;
    },
  },
};
