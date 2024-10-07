export interface CountryStrategy {
    processAppointment(insuredId: string, scheduleId: number): Promise<any>;
  }