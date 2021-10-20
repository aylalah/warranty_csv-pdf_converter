/// <reference types="multer" />
export declare class CreateControllerDto {
    csv: string;
}
export declare class UploadControllerDto {
    csv: Express.Multer.File;
}
