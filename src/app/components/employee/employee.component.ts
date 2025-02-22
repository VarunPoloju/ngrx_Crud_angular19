import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  constructor(private dialog: MatDialog, private empservice: EmployeeService) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }


  getAllEmployees() {
    let sub = this.empservice.getAll().subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList)
    });
    this.subsciption.add(sub);
  }

  addEmployee() {
    this.openPopUp(0)
  }

  editEmployee(empId: number) {
    this.openPopUp(empId)
  }

  deleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      let sub = this.empservice.delete(empId).subscribe(data => {
        this.getAllEmployees();
      });
      this.subsciption.add(sub);
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
