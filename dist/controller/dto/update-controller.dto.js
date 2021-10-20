"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateControllerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_controller_dto_1 = require("./create-controller.dto");
class UpdateControllerDto extends (0, mapped_types_1.PartialType)(create_controller_dto_1.CreateControllerDto) {
}
exports.UpdateControllerDto = UpdateControllerDto;
//# sourceMappingURL=update-controller.dto.js.map