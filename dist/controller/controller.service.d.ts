import { UpdateControllerDto } from './dto/update-controller.dto';
export declare class ControllerService {
    create(createControllerDto: any): Promise<{
        status: number;
        title: string;
        message: string;
        data: any;
    }>;
    pupetter(json: {}): Promise<{
        status: number;
        title: string;
        message: string;
        data: any;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateControllerDto: UpdateControllerDto): string;
    remove(id: number): string;
}
