import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarView, IAppointment } from '../Model/IAppointment';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppointmentsService } from '../DataServices/appointments.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddEditAppointmentComponent } from '../add-edit-appointment/add-edit-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../DataServices/snackbar.service';



@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule,MatButtonToggleModule,DragDropModule,MatIconModule,MatButtonModule],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.scss'
})
export class AppointmentsListComponent {
  
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: Date[][] = [];
  monthDays: Date[] = [];
  viewDate: Date = new Date();
  public CalendarView = CalendarView;
  timeSlots: string[] = [];
  currentView: CalendarView = CalendarView.Month;
  appointmentsFromService: IAppointment[] = [];
  appointments: IAppointment[] = [];
  selectedDate: Date | null = null;
  selectedStartTime: string | undefined;


  constructor(public dialog: MatDialog,private appointmentsService:AppointmentsService,private snackBarService:SnackbarService) {

    this.appointments = JSON.parse(localStorage.getItem('appointments') || '[]', (key, value) => {
      return key === 'date' ? new Date(value) : value;
    });

    if (this.appointments.length == 0) {
      this.appointments = this.appointmentsService.appointments;
      localStorage.setItem("appointments",JSON.stringify(this.appointments));
    }

    this.generateView(this.currentView, this.viewDate);
    this.generateTimeSlots();
  }

  generateView(view: CalendarView, date: Date) {

    this.generateMonthView(date);

    switch (view) {
      case CalendarView.Month:
        this.generateMonthView(date);
        break;
    }
    
    switch (view) {
      case CalendarView.Month:
        this.generateMonthView(date);
        break;
      case CalendarView.Week:
        this.generateWeekView(date);
        break;
      case CalendarView.Day:
        this.generateDayView(date);
        break;
      default:
        this.generateMonthView(date);
    }
  }

  generateMonthView(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    
    
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   

    this.weeks = [];
    this.monthDays = [];
    let week: Date[] = [];

    for (let day = start.getDay(); day > 0; day--) {
      const prevDate = new Date(start);
      prevDate.setDate(start.getDate() - day);
      week.push(prevDate);
      this.monthDays.push(prevDate);
    }

    for (let day = 1; day <= end.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      this.monthDays.push(currentDate);
      week.push(currentDate);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    for (let day = 1; this.monthDays.length % 7 !== 0; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      this.monthDays.push(nextDate);
    }

    for (let day = 1; week.length < 7; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      week.push(nextDate);
    }

    if (week.length > 0) {
      this.weeks.push(week);
    }
  }

  generateWeekView(date: Date) {
    const startOfWeek = this.startOfWeek(date);
    this.monthDays = [];

    for (let day = 0; day < 7; day++) {
      const weekDate = new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate() + day,
        0, 0, 0, 0 // ensure time is 00:00:00
      );
      this.monthDays.push(weekDate);  
    }
  }

  generateDayView(date: Date) {
    this.monthDays = [date];
    
  }

  generateTimeSlots() {
    for (let hour = 0; hour <= 24; hour++) {
      let time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      if (hour === 24) {
        time = '23:59';
      }
      this.timeSlots.push(time);
    }
  }

  switchToView(view: CalendarView) {
    this.currentView = view;
    this.generateView(this.currentView, this.viewDate);
  }

  startOfWeek(date: Date): Date {
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const diff = date.getDate() - day;
    return new Date(date.getFullYear(), date.getMonth(), diff, 0, 0, 0, 0);
  }

  isCurrentMonth(date: Date): boolean {
    return (
      date.getMonth() === this.viewDate.getMonth() &&
      date.getFullYear() === this.viewDate.getFullYear()
    );
  }

  isToday(date: Date): boolean {
    
    const today = new Date();
    
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
      
    );
  }

  updateAppointmentDateFromLsDb(appointmentId: string, newDate: Date): void {
    let appointments: IAppointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    appointments = appointments.map(appointment =>
      appointment.uuid === appointmentId
        ? { ...appointment, date: newDate }  
        : appointment
    );
  
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }

  updateAppointmenStartTimeFromLsDb(appointmentId: string,newStartTime,newEndTime): void {
    
    let appointments: IAppointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');

    appointments = appointments.map(appointment =>
      appointment.uuid === appointmentId
        ? { ...appointment, startTime:newStartTime,endTime:newEndTime }  
        : appointment
    );
  
   
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }

  updateAppointmentFromLsDb(appointmentId: string,updatedFields: Partial<IAppointment>): void {
    
    let appointments: IAppointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');

    appointments = appointments.map(appointment =>
      appointment.uuid === appointmentId
        ? { ...appointment, ...updatedFields }  
        : appointment
    );

    localStorage.setItem('appointments', JSON.stringify(appointments));
  }

  deleteAppointmentFromLsDb(appointmentId: string): void {
    
    const appointments: IAppointment[] = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    const index = appointments.findIndex(appointment => appointment.uuid === appointmentId);
 
  if (index !== -1) {
    appointments.splice(index - 1,1);
  }
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }
  
  drop(event: CdkDragDrop<IAppointment[]>, date: Date, slot?: string) {
    
    const movedAppointment = event.item.data;
 
    this.updateAppointmentDateFromLsDb(movedAppointment.uuid, date);
    
    movedAppointment.date = date;
    
    if (slot) {
         
      const [startHour, startMinute] = movedAppointment.startTime.split(':').map(Number);
      const [endHour, endMinute] = movedAppointment.endTime.split(':').map(Number);
      
      const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
      const [newStartHour, newStartMinute] = slot.split(':').map(Number);
      
      const newEndMinutes = newStartHour * 60 + newStartMinute + durationMinutes;
      let newEndHour = Math.floor(newEndMinutes / 60);
      let newEndMinute = newEndMinutes % 60;
      
      if (newEndHour === 24 && newEndMinute > 0) {
        newEndHour = 23;
        newEndMinute = 59;
      }
      

      if (newEndHour > 23) {
        this.snackBarService.openSnackBar('End time can not be over 23:59');
        newEndHour = 23;
      }
      
      movedAppointment.startTime = `${String(newStartHour).padStart(2, '0')}:${String(newStartMinute).padStart(2, '0')}`;
      movedAppointment.endTime = `${String(newEndHour).padStart(2, '0')}:${String(newEndMinute).padStart(2, '0')}`;
      

       if (movedAppointment.endTime === '24:00') {
           movedAppointment.endTime = '23:59'
      }
      
      
    this.updateAppointmenStartTimeFromLsDb(movedAppointment.uuid, movedAppointment.startTime,movedAppointment.endTime);

    }
  }

  selectDate(date?: Date, startTime?: string) {
    if (date) {
      this.selectedDate = date;
    } else {
      this.selectedDate = new Date();
    }
    this.selectedStartTime = startTime;
    this.openDialog();
  }

  isSelected(date: Date): boolean {
    if (!this.selectedDate) {
      return false;
    }
    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  editAppointment(appointment: IAppointment, event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(AddEditAppointmentComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: appointment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.updateAppointmentFromLsDb(result.uuid,result);
        
        const index = this.appointments.findIndex(
          (appointment) => appointment.uuid === result.uuid
        );
        if (result.remove) {
          this.appointments.splice(index, 1);
          if (this.appointments[index].uuid != undefined) {
            this.deleteAppointmentFromLsDb(this.appointments[index].uuid);  
            }
        } else {
          this.appointments[index] = result;
          if (this.appointments[index].uuid != undefined) {
            this.updateAppointmentFromLsDb(this.appointments[index].uuid,this.appointments[index]);     
          }
          
        }
      }
    });
  }

  getAppointmentsForDateTime(date: Date, timeSlot: string): IAppointment[] {
    const slotHour = parseInt(timeSlot.split(':')[0], 10); // e.g., "12:00" → 12
  
    return this.appointments.filter(appointment => {
      if (!this.isSameDate(appointment.date, date)) return false;
  
      const [startHour, startMin] = appointment.startTime.split(':').map(Number);
      const [endHour, endMin] = appointment.endTime.split(':').map(Number);
  
      const roundedStartHour = startMin >= 30 ? startHour + 1 : startHour;
      const roundedEndHour = endMin >= 30 ? endHour + 1 : endHour;
      const appointmentStart = roundedStartHour;
      const appointmentEnd = roundedEndHour;
  
      return slotHour >= appointmentStart && slotHour <= appointmentEnd;
    });
  }

  // getAppointmentsForDateTime(date: Date, timeSlot: string): IAppointment[] {
  //   const appointmentsForDateTime: IAppointment[] = this.appointments.filter(
  //     (appointment) =>
  //       this.isSameDate(appointment.date, date) &&
  //       appointment.startTime <= timeSlot &&
  //       appointment.endTime >= timeSlot
  //   );
  //   return appointmentsForDateTime;
  // }

  previous() {
    if (this.currentView === 'month') {
      this.viewDate = new Date(
        this.viewDate.setMonth(this.viewDate.getMonth() - 1)
      );
      this.generateMonthView(this.viewDate);
    } else if (this.currentView === 'week') {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() - 7)
      );
      this.generateWeekView(this.viewDate);
    } else {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() - 1)
      );
      this.generateDayView(this.viewDate);
    }
  }

  next() {
    if (this.currentView === 'month') {
      this.viewDate = new Date(
        this.viewDate.setMonth(this.viewDate.getMonth() + 1)
      );
      this.generateMonthView(this.viewDate);
    } else if (this.currentView === 'week') {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() + 7)
      );
      this.generateWeekView(this.viewDate);
    } else {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() + 1)
      );
      this.generateDayView(this.viewDate);
    }
  }

  viewToday(): void {
    this.viewDate = new Date();
    this.generateView(this.currentView, this.viewDate);
  }

  generateUUID(): string {
    let d = new Date().getTime();
    let d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16; 
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  addAppointment(
    date: Date,
    title: string,
    color:string,
    location:string,
    notes:string,
    startTime: string,
    endTime: string
  ) {
    this.appointments.push({
      uuid: this.generateUUID(),
      date,
      title,
      color,
      location,
      notes,
      startTime,
      endTime
    });

    localStorage.setItem("appointments",JSON.stringify(this.appointments));
  }

  deleteAppointment(appointment: IAppointment, event: Event) {
    event.stopPropagation();
    const index = this.appointments.indexOf(appointment);
    if (index > -1) {
      this.appointments.splice(index, 1);
    }
  }

  openDialog(): void {
    
    
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const h = hour < 10 ? `0${hour}` : hour;
    const m = minutes < 10 ? `0${minutes}` : minutes;
    const dialogRef = this.dialog.open(AddEditAppointmentComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: {
        date: this.selectedDate,
        title: '',
        color: '',
        location: '',
        notes: '',
        startTime: this.selectedStartTime || `${h}:${m}`,
        endTime: this.selectedStartTime || `${h}:${m}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      
      if (result) {
        this.addAppointment(
          result.date,
          result.title,
          result.color,
          result.location,
          result.notes,
          result.startTime,
          result.endTime
        );
      }


    });
  }

}
