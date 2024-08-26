import { dbUser } from "@/app/api/lib/definitions";
import { Session } from "next-auth";

// Extend the Session type to include dbUser
declare module "next-auth" {
  interface Session {
    dbUser?: dbUser | null;
  }
}
