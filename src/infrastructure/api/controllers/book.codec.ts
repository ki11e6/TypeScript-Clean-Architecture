import { PostBookInputDto } from "./dto"; ``


export const getBookCodec = {
    decodeBookId: (params: unknown) =>
}

export const createBookCodec = {
    decode: (params: unknown) => PostBookInputDto.safeParse(params)
}