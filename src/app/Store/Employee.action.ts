import { createAction, props } from "@ngrx/store";
import { Employee } from "../model/Employee";

export const LOAD_EMPLOYEE = 'employee getAll'  //action name should be unique value
export const LOAD_EMPLOYEE_SUCCESS = 'employee getAll success'  //action after loading employee data success
export const LOAD_EMPLOYEE_FAIL = 'employee getAll fail'  //action after loading failure
export const DELETE_EMPLOYEE = '[employee] delete'
export const DELETE_EMPLOYEE_SUCCESS = '[employee] delete succ'

export const ADD_EMPLOYEE = '[employee] add'
export const ADD_EMPLOYEE_SUCCESS = '[employee] add succ'


export const UPDATE_EMPLOYEE = '[employee] update'
export const UPDATE_EMPLOYEE_SUCCESS = '[employee] update succ'
export const GET_EMPLOYEE = '[employee] get employee'



// action to load all the employees
export const loadEmployee = createAction(LOAD_EMPLOYEE);

// action to load all the employees successfully
export const loadEmployeeSuc = createAction(LOAD_EMPLOYEE_SUCCESS, props<{ list: Employee[] }>());

// action to load all the employees when failed
export const loadEmployeeFail = createAction(LOAD_EMPLOYEE_FAIL, props<{ errorMsg: string }>());

//action to delete
export const deleteEmployee = createAction(DELETE_EMPLOYEE, props<{ empId: number }>());
// delete employee success
export const deleteEmployeeSuc = createAction(DELETE_EMPLOYEE_SUCCESS, props<{ empId: number }>());


//action to add
export const addEmployee = createAction(ADD_EMPLOYEE, props<{ data: Employee }>());
// add employee success
export const addEmployeeSuc = createAction(ADD_EMPLOYEE_SUCCESS, props<{ data: Employee }>());


//action to update
export const updateEmployee = createAction(UPDATE_EMPLOYEE, props<{ data: Employee }>());
// update employee success
export const updateEmployeeSuc = createAction(UPDATE_EMPLOYEE_SUCCESS, props<{ data: Employee }>());

// get employee
export const getEmployee = createAction(GET_EMPLOYEE, props<{ empId: number }>());

// dummy action empty
export const emptyAction = createAction('empty');
