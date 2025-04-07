export interface IAppointment {
    uuid?: string;
    date: Date;
    title: string;
    startTime: string;
    endTime: string;
    color?: string;
    location:string,
    notes:string
}

export enum CalendarView {
    Month = 'month',
    Week = 'week',
    Day = 'day',
  }
