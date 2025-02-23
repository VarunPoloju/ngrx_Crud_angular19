import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Employee } from '../../model/Employee';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addEmployee, getEmployee, updateEmployee } from '../../Store/Employee.action';
import { selectEmployee } from '../../Store/Employee.selector';

@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  title = 'Add Employee';
  dialogData: any;
  isEdit = false

  constructor(private store: Store, private dialog: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl<number | null>(null, Validators.required),
  })


  ngOnInit(): void {
    this.dialogData = this.data;
    if (this.dialogData.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;
      this.store.dispatch(getEmployee({ empId: this.dialogData.code }));
      this.store.select(selectEmployee).subscribe(item => {
        let _data = item;
        if (_data != null) {
          this.empForm.setValue({
            id: _data.id,
            name: _data.name,
            doj: _data.doj,
            role: _data.role,
            salary: _data.salary
          })
        }
      }) 
  }
}
saveEmployee() {
  if (this.empForm.valid) {
    let _data: Employee = {
      id: Number(this.empForm.value.id),
      name: this.empForm.value.name as string,
      doj: new Date(this.empForm.value.doj as Date),
      role: this.empForm.value.role as string,
      salary: Number(this.empForm.value.salary)
    }

    if (!this.isEdit) {
      this.store.dispatch(addEmployee({ data: _data }))
    }
    else {
      this.store.dispatch(updateEmployee({ data: _data }))
    }
    this.closePopUp();
  }
}


closePopUp() {
  this.dialog.close();
}
}