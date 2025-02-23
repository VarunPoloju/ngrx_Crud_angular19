import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployee } from '../../Store/Employee.action';
import { getEmpList } from '../../Store/Employee.selector';

@Component({
  selector: 'app-employee',
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit, OnDestroy {
  empList: Employee[] = [];
  dataSource !: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'name', 'role', 'doj', 'salary', 'action'];
  subsciption = new Subscription();

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }


  getAllEmployees() {
    this.store.dispatch(loadEmployee())
    this.store.select(getEmpList).subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList)
    })
  }

  addEmployee() {
    this.openPopUp(0)
  }

  editEmployee(empId: number) {
    this.openPopUp(empId)
  }

  deleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(deleteEmployee({empId : empId}))
    }
  }

  openPopUp(epmId: number) {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        'code': epmId,
      }
    }).afterClosed().subscribe(o => {
      this.getAllEmployees();
    })
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

}
