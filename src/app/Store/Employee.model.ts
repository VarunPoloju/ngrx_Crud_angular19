import { Employee } from "../model/Employee";

export interface EmployeeModel {
    list: Employee[],
    errorMessage : string,
    empobj : Employee
}