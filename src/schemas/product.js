import { z } from "zod";

const productSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).min(3, "Name must be at least 3 characters long").max(255, "Name must be at most 255 characters long"),
    category: z.array(
        z.enum([
            "Almacen",
            "Electronica",
            "Joyeria",
            "Libros",
            "Juguetes",
            "Deportes",
            "Ropa"
        ]), 
        {
            required_error: "Category is required",
            invalid_type_error: "Category must be an array"
        }
    ),
    rating: z.number({
        required_error: "Rating is required",
        invalid_type_error: "Rating must be a number"
    }).default(1)
})

export const validateProduct = (object) => {
    return productSchema.safeParse(object);
}

export const validatePartialProduct = (object) => {
    return productSchema.partial().safeParse(object);
}
