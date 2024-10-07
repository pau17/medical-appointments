"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const RDSRepository_1 = require("../../infrastructure/rds/RDSRepository");
const rdsRepository = new RDSRepository_1.RDSRepository();
const handler = async (event, context) => {
    for (const record of event.Records) {
        const appointmentData = JSON.parse(record.body);
        await rdsRepository.saveAppointment(appointmentData);
    }
};
exports.handler = handler;
