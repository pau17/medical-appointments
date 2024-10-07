"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeruStrategy = void 0;
class PeruStrategy {
    async processAppointment(insuredId, scheduleId) {
        return {
            message: 'Cita procesada para Perú',
            insuredId,
            scheduleId,
        };
    }
}
exports.PeruStrategy = PeruStrategy;
