import { createReducer, on } from "@ngrx/store";
import { employeeState } from "./Employee.state";
import { addEmployeeSuc, deleteEmployeeSuc, getEmployee, loadEmployeeFail, loadEmployeeSuc, updateEmployeeSuc } from "./Employee.action";

const _employeeReducer = createReducer(employeeState,
    on(loadEmployeeSuc, (state, action) => {
        return {
            ...state,
            list: action.list,
            errorMessage: ''
        }
    }),
    on(loadEmployeeFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMsg
        }
    }),
    on(deleteEmployeeSuc, (state, action) => {
        const _newData = state.list.filter(o => o.id != action.empId)
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    }),

    on(addEmployeeSuc, (state, action) => {
        const _newData = { ...action.data };
        return {
            ...state,
            list: [...state.list, _newData],
            errorMessage: ''
        }
    }),

    on(updateEmployeeSuc, (state, action) => {
        const _newData = state.list.map(o => {
            return o.id === action.data.id ? action.data : o;
        })
        return {
            ...state,
            list: _newData,
            errorMessage: ''
        }
    }),

    on(getEmployee, (state, action) => {
        let _newData = state.list.find(o => o.id === action.empId)
        if (_newData == null) {
            _newData = state.empobj
        }
        return {
            ...state,
            empobj: _newData,
        }
    }),




);

export function employeeReducer(state: any, action: any) {
    return _employeeReducer(state, action);

}