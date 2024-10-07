"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointment = void 0;
const joi_1 = __importDefault(require("joi"));
const appointmentSchema = joi_1.default.object({
    insuredId: joi_1.default.string().required().messages({
        'string.base': `"insuredId" debe ser un texto`,
        'string.empty': `"insuredId" no puede estar vacío`,
        'any.required': `"insuredId" es un campo requerido`
    }),
    scheduleId: joi_1.default.string().required().messages({
        'string.base': `"scheduleId" debe ser un texto`,
        'string.empty': `"scheduleId" no puede estar vacío`,
        'any.required': `"scheduleId" es un campo requerido`
    }),
    countryISO: joi_1.default.string().length(2).required().valid('PE', 'CL').messages({
        'string.base': `"countryISO" debe ser un texto de 2 caracteres`,
        'string.empty': `"countryISO" no puede estar vacío`,
        'string.length': `"countryISO" debe tener exactamente 2 caracteres`,
        'any.required': `"countryISO" es un campo requerido`,
        'any.only': `"countryISO" debe ser uno de los siguientes valores: 'PE', 'CL'`
    }),
});
const validateAppointment = (data) => {
    const { error } = appointmentSchema.validate(data);
    if (error) {
        return error.details.map(detail => detail.message);
    }
    return [];
};
exports.validateAppointment = validateAppointment;
