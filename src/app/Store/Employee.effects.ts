import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../services/employee.service";
import { addEmployee, addEmployeeSuc, deleteEmployee, deleteEmployeeSuc, emptyAction, loadEmployee, loadEmployeeFail, loadEmployeeSuc, updateEmployee, updateEmployeeSuc } from "./Employee.action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { Employee } from './../model/Employee';
import { ToastrService } from "ngx-toastr";

@Injectable()

export class empEffect {


    actions$ = inject(Actions)
    empservie = inject(EmployeeService)
    toastr = inject(ToastrService)

    _loadEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEmployee),
            exhaustMap(() =>
                this.empservie.getAll().pipe(
                    map((data: Employee[]) => loadEmployeeSuc({ list: data })
                    ),
                    catchError((err) => of(loadEmployeeFail({ errorMsg: err.message })))
                )
            )
        )
    )



    _deleteEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEmployee),
            switchMap((action) =>
                this.empservie.delete(action.empId).pipe(
                    switchMap((data) => {
                        return of(deleteEmployeeSuc({ empId: action.empId }),
                            this.showAlert('Deleted Successfully.', 'pass')
                        )
                    }
                    ),
                    catchError((err) => of(this.showAlert(err.message, 'fail')))
                )
            )
        )
    )


    _addEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(addEmployee),
            switchMap((action) =>
                this.empservie.create(action.data).pipe(
                    switchMap((data) => {
                        return of(addEmployeeSuc({ data: action.data }),
                            this.showAlert('Created Successfully.', 'pass')
                        )
                    }
                    ),
                    catchError((err) => of(this.showAlert(err.message, 'fail')))
                )
            )
        )
    )



    _updateEmployee = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEmployee),
            switchMap((action) =>
                this.empservie.update(action.data).pipe(
                    switchMap((data) => {
                        return of(updateEmployeeSuc({ data: action.data }),
                            this.showAlert('Updated Successfully.', 'pass')
                        )
                    }
                    ),
                    catchError((err) => of(this.showAlert(err.message, 'fail')))
                )
            )
        )
    )


    showAlert(message: string, response: string) {
        if (response == 'pass') {
            this.toastr.success(message);
        }
        else {
            this.toastr.error(message);
        }
        return emptyAction();
    }
}