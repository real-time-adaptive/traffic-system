import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendEmail } from "@/src/utils/email";
import { resetPasswordEmailTemplate } from "@/utils/email/templates/resetPassword";
import { db } from "./db";
import * as schema from "./db/schema/auth-schema";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      const name = (user as any).name ?? user.email;
      const { subject, html, text } = resetPasswordEmailTemplate({ url, name });
      void sendEmail({ to: user.email, subject, html, text });
    },
  },
  onPasswordReset: async ({ user }, request) => {
    console.log(`Password reset for user: ${user.email}`);
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true,
    },
  },
});
