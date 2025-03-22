import { Controller, SuccessResponse, Get, Post, Delete, Route, Body } from "tsoa";
import { GetBookOutputDto, GetBooksOutputDto, PostBookInputDto } from "./dto";

@Route('books')
export class BookController extends Controller {
    constructor() {
        super();
    }

    @Get()
    @SuccessResponse("200", "Success")
    async list(): Promise<GetBooksOutputDto> {
        return [];
    }

    @Get('{id}')
    @SuccessResponse("200", "Success")
    async getById(): Promise<GetBookOutputDto> {
        return {
            id: 'Mock Id',
            title: 'Mock Title',
            author: 'Mock Author',
            summary: 'Mock Summary',
            totalPages: 100
        }
    }

    @Post()
    @SuccessResponse("201", "Created")
    async create(
        @Body() requestBody: PostBookInputDto
    ): Promise<PostBookInputDto> {
        return {
            id: 'Mock Id',
            title: 'Mock Title',
            author: 'Mock Author',
            summary: 'Mock Summary',
            totalPages: 100
        }
    }

    @Delete('{id}')
    @SuccessResponse("204", "Deleted")
    async delete(): Promise<void> {
        return;
    }
}
