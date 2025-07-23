import { z } from "zod";

const userSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).min(3, "Name must be at least 3 characters long").max(255, "Name must be at most 255 characters long"),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email("Email must be a valid email"),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).min(6, "Password must be at least 6 characters long").max(255, "Password must be at most 255 characters long")
})

export const validateUser = (object) => {
    return userSchema.safeParse(object);
}
