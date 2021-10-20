"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerController = void 0;
const common_1 = require("@nestjs/common");
const controller_service_1 = require("./controller.service");
const platform_express_1 = require("@nestjs/platform-express");
const create_controller_dto_1 = require("./dto/create-controller.dto");
const update_controller_dto_1 = require("./dto/update-controller.dto");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
let ControllerController = class ControllerController {
    constructor(controllerService) {
        this.controllerService = controllerService;
    }
    create(createControllerDto) {
        return this.controllerService.create(createControllerDto);
    }
    async uploadedFile(file) {
        const response = {
            originalname: file.originalname,
            filename: file.fieldname,
        };
        console.log(response);
        return this.controllerService.create(file.filename);
        return file.filename;
    }
    findAll() {
        return this.controllerService.findAll();
    }
    findOne(id) {
        return this.controllerService.findOne(+id);
    }
    update(id, updateControllerDto) {
        return this.controllerService.update(+id, updateControllerDto);
    }
    remove(id) {
        return this.controllerService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_controller_dto_1.CreateControllerDto]),
    __metadata("design:returntype", void 0)
], ControllerController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ControllerController.prototype, "uploadedFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ControllerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ControllerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_controller_dto_1.UpdateControllerDto]),
    __metadata("design:returntype", void 0)
], ControllerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ControllerController.prototype, "remove", null);
ControllerController = __decorate([
    (0, common_1.Controller)('controller'),
    __metadata("design:paramtypes", [controller_service_1.ControllerService])
], ControllerController);
exports.ControllerController = ControllerController;
//# sourceMappingURL=controller.controller.js.map