import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

interface Location {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-edit-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './add-edit-appointment.component.html',
  styleUrl: './add-edit-appointment.component.scss'
})
export class AddEditAppointmentComponent {
  black='#000000';
  crimson='#DC143C';
  orange_red='#FF4500';
  royal_blue='#4169E1';
  indigo='#4B0082';
  goldenrod='rgb(208 175 0)';
  teal='#008080';
  colors = [this.black, this.crimson, this.orange_red, this.royal_blue, this.indigo,this.goldenrod,this.teal];
  selectedColor = '';
  selectedEndTime;
  appointmentForm: FormGroup;
  locations: Location[] = [
    {value: 'director-fffice', viewValue: 'Director Office'},
    {value: 'conference-room', viewValue: 'Conference Room'},
    {value: 'manager-office', viewValue: 'Manager Office'},
    {value: 'hr-office', viewValue: 'HR Office'},
  ];
  constructor(
    public dialogRef: MatDialogRef<AddEditAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      uuid: string;
      date: Date;
      title: string;
      startTime: string;
      endTime: string;
      color: string;
      location: string;
      notes:string;
    },
    private formBuilder: FormBuilder
  ) {
    this.appointmentForm = this.formBuilder.group(
      {
        title: [this.data.title || '', Validators.required],
        color: [this.data.color || '', Validators.required],
        location: [this.data.location || '', Validators.required],
        notes: [this.data.notes || '', Validators.required],
        date: [this.data.date, Validators.required],
        startTime: [this.data.startTime || '', Validators.required],
        endTime: [this.data.endTime || '', Validators.required],
      },
      { validators: this.timeRangeValidator }
    );

    this.appointmentForm.controls['endTime']?.valueChanges.subscribe((value) => {

      if (value === '24:00') {
       
        this.appointmentForm.patchValue({ endTime: '23:59' }, { emitEvent: false });
      }
    });

    this.selectedColor = this.appointmentForm.controls['color'].value;
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.appointmentForm.valid) {
      const data = {
        title: this.appointmentForm.controls['title'].value,
        color: this.appointmentForm.controls['color'].value,
        location: this.appointmentForm.controls['location'].value,
        notes: this.appointmentForm.controls['notes'].value,
        date: this.appointmentForm.controls['date'].value,
        startTime: this.appointmentForm.controls['startTime'].value,
        endTime: this.appointmentForm.controls['endTime'].value,
        uuid: this.data.uuid,
      };

      this.dialogRef.close(data);
    }
  }

  onDeleteClick(): void {
    this.dialogRef.close({ remove: true, uuid: this.data.uuid });
  }

  timeRangeValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(':');
      const [endHours, endMinutes] = endTime.split(':');

      const startDate = new Date();
      startDate.setHours(startHours);
      startDate.setMinutes(startMinutes);

      const endDate = new Date();
      endDate.setHours(endHours);
      endDate.setMinutes(endMinutes);

      if (startDate > endDate) {
        return { timeRangeInvalid: true };
      }
    }
    return null;
  };

  selectColor(color:string) {
    this.selectedColor = color;
  }
}
