import { CountryStrategy } from './CountryStrategy';

export class PeruStrategy implements CountryStrategy {
  async processAppointment(insuredId: string, scheduleId: number): Promise<any> {
    return {
      message: 'Cita procesada para Perú',
      insuredId,
      scheduleId,
    };
  }
}
