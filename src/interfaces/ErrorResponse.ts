export interface ErrorResponse {
    message:  string;
    name:     string;
    stack:    string;
    code:     string;
    status:   number;
    response: Response;
}

export interface Response {
    data:       Data;
    status:     number;
    statusText: string;
    request:    Request;
}

export interface Data {
    detail: string;
}

export type Request = object;
