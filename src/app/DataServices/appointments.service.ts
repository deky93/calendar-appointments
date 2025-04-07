import { Injectable } from '@angular/core';
import { IAppointment } from '../Model/IAppointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointments: IAppointment[] = [
    {
      uuid: '00000000-0000-0000-0000-000000000001',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Meeting with Sam',
      color: '#000000',
      location:'',
      notes:'',
      startTime: '09:00',
      endTime: '10:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000002',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
      title: 'Meeting with Dejan',
      color: '#DC143C',
      location:'',
      notes:'',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000003',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
      title: 'Project Deadline',
      color: '#FF4500',
      location:'',
      notes:'',
      startTime: '15:00',
      endTime: '16:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000004',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Client 1',
      color: '#4169E1',
      location:'',
      notes:'',
      startTime: '10:00',
      endTime: '11:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000005',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      ),
      title: 'Team Meeting',
      color: '#4B0082',
      location:'',
      notes:'',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000006',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Client 2',
      color: 'rgb(208 175 0)',
      location:'',
      notes:'',
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000006',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Client 5',
      color: '#FF4500',
      location:'',
      notes:'',
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000006',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      title: 'Client 6',
      color: '#4B0082',
      location:'',
      notes:'',
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000007',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 4
      ),
      title: 'Client Call',
      color: '#008080',
      location:'',
      notes:'',
      startTime: '09:30',
      endTime: '10:30',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000008',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 8),
      title: 'Hr Meeting',
      color: '#000000',
      location:'',
      notes:'',
      startTime: '17:00',
      endTime: '18:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000009',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1
      ),
      title: 'Client 3',
      color: '#DC143C',
      location:'',
      notes:'',
      startTime: '11:30',
      endTime: '12:30',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000a',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 2
      ),
      title: 'Team Building',
      color: '#FF4500',
      location:'',
      notes:'',
      startTime: '19:00',
      endTime: '21:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000b',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 11),
      title: 'Conference',
      color: '#4169E1',
      location:'',
      notes:'',
      startTime: '13:00',
      endTime: '14:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000c',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
      title: 'Project Issues',
      color: '#4B0082',
      location:'',
      notes:'',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000d',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 13),
      title: 'Meeting with Director',
      color: 'rgb(208 175 0)',
      location:'',
      notes:'',
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000e',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 2
      ),
      title: 'Networking Event',
      color: '#008080',
      location:'',
      notes:'',
      startTime: '18:00',
      endTime: '20:00',
    },
    {
      uuid: '00000000-0000-0000-0000-00000000000f',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
      title: 'Client 4',
      color: '#000000',
      location:'',
      notes:'',
      startTime: '07:00',
      endTime: '08:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000010',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
      title: 'Strategy Meeting',
      color: '#DC143C',
      location:'',
      notes:'',
      startTime: '10:00',
      endTime: '11:30',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000011',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 17),
      title: 'Call with Investor',
      color: '#FF4500',
      location:'',
      notes:'',
      startTime: '14:00',
      endTime: '15:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000012',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
      title: 'Team Lunch',
      color: '#4169E1',
      location:'',
      notes:'',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000013',
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 3
      ),
      title: 'Managers Meeting',
      color: '#4B0082',
      location:'',
      notes:'',
      startTime: '16:00',
      endTime: '17:00',
    },
    {
      uuid: '00000000-0000-0000-0000-000000000014',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      title: 'Board Meeting',
      color: 'rgb(208 175 0)',
      location:'',
      notes:'',
      startTime: '11:00',
      endTime: '12:00',
    },
  ];

}
