import Joi from 'joi';

const appointmentSchema = Joi.object({
    insuredId: Joi.string().required().messages({
        'string.base': `"insuredId" debe ser un texto`,
        'string.empty': `"insuredId" no puede estar vacío`,
        'any.required': `"insuredId" es un campo requerido`
    }),
    scheduleId: Joi.string().required().messages({
        'string.base': `"scheduleId" debe ser un texto`,
        'string.empty': `"scheduleId" no puede estar vacío`,
        'any.required': `"scheduleId" es un campo requerido`
    }),
    countryISO: Joi.string().length(2).required().valid('PE', 'CL').messages({
        'string.base': `"countryISO" debe ser un texto de 2 caracteres`,
        'string.empty': `"countryISO" no puede estar vacío`,
        'string.length': `"countryISO" debe tener exactamente 2 caracteres`,
        'any.required': `"countryISO" es un campo requerido`,
        'any.only': `"countryISO" debe ser uno de los siguientes valores: 'PE', 'CL'`
    }),
});

export const validateAppointment = (data: any): string[] => {
    const { error } = appointmentSchema.validate(data);
    if (error) {
        return error.details.map(detail => detail.message); 
    }
    return []; 
};
