import * as z from "zod";

export const registrationSchema = z
  .object({
    username: z
      .string({ required_error: "Name is required" })
      .min(3, { message: "Name must be at least 3 character's long" }),
    email: z.string({ required_error: "Email address is required" }).email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be 6 character's long" }),
    confirm_password: z.string({ required_error: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password's do not match",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export type RegistrationFormInputs = z.infer<typeof registrationSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>;
