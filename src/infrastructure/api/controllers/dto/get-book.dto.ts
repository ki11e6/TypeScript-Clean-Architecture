import { z } from "zod";
import { BookOutputDto } from "./book.dto";

// get single book
export const GetBookOutputDto = BookOutputDto
export type GetBookOutputDto = ReturnType<typeof GetBookOutputDto.parse>
// get array of books
export const GetBooksOutputDto = z.array(BookOutputDto)
export type GetBooksOutputDto = ReturnType<typeof GetBooksOutputDto.parse>