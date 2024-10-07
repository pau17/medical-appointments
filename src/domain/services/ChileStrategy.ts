import { CountryStrategy } from './CountryStrategy';

export class ChileStrategy implements CountryStrategy {
  async processAppointment(insuredId: string, scheduleId: number): Promise<any> {
    return {
      message: 'Cita procesada para Chile',
      insuredId,
      scheduleId,
    };
  }
}
