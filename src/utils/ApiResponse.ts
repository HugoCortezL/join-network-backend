import { v4 } from "uuid"

export enum Status {
    Success = "Success",
    Warning = "Warning",
    Error = "Error"
}
export type ApiResponse = {
    id: string,
    data: (Object | [Object] | null),
    message: string,
    status: Status
}

export const createApiResponse = (data: (Object | [Object] | null) , message: string, status: Status): ApiResponse => {
    const response: ApiResponse = {
        id: v4(),
        data,
        message,
        status
    }
    return response
}