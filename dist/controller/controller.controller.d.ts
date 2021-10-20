/// <reference types="multer" />
import { ControllerService } from './controller.service';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
export declare class ControllerController {
    private readonly controllerService;
    constructor(controllerService: ControllerService);
    create(createControllerDto: CreateControllerDto): Promise<{
        status: number;
        title: string;
        message: string;
        data: any;
    }>;
    uploadedFile(file: Express.Multer.File): Promise<string | {
        status: number;
        title: string;
        message: string;
        data: any;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateControllerDto: UpdateControllerDto): string;
    remove(id: string): string;
}
