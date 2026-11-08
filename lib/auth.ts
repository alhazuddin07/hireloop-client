import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
const db = client.db("hireloop")

const roles = ["seeker", "recruiter", "admin"] as const

const roleValidator = {
  "~standard": {
    version: 1 as const,
    vendor: "hireloop",
    validate: (value: unknown) =>
      typeof value === "string" && (roles as readonly string[]).includes(value)
        ? { value }
        : {
            issues: [{ message: "Role must be seeker, recruiter, or admin." }],
          },
  },
}

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "seeker",
        input: true,
        validator: { input: roleValidator },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
})
