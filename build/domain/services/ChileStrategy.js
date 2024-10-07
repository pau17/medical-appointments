"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChileStrategy = void 0;
class ChileStrategy {
    async processAppointment(insuredId, scheduleId) {
        return {
            message: 'Cita procesada para Chile',
            insuredId,
            scheduleId,
        };
    }
}
exports.ChileStrategy = ChileStrategy;
