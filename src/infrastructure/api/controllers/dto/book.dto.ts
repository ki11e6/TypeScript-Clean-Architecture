import { z } from "zod";

export const BookOutputDto = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    author: z.string().min(1),
    summary: z.string().min(5),
    totalPages: z.number().min(1),
})