let empPayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.name-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeeModel()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const date = document.querySelector('#date');
    date.addEventListener('input', function(){
        let startDate = document.getElementById('day').value + document.getElementById('month').value + document.getElementById('year').value;
        try {
            (new EmployeeModel()).startDate = new Date(Date.parse(startDate));
            setTextValue('.date-error', "");
        }
        catch (e)
        {
            setTextValue('.date-error', e);
        }
    });
    checkForUpdate();
});

function save()
{
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
}

function createEmployeePayroll()
{
    let employeePayrollData = new EmployeeModel();
    employeePayrollData._id = document.getElementById("id").value;
    employeePayrollData._name = document.getElementById("name").value;
    employeePayrollData._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData._department = getSelectedValues('[name=department]');
    employeePayrollData._salary = document.getElementById("salary").value;
    employeePayrollData._note = document.getElementById("notes").value;
    let date = document.getElementById("day").value + document.getElementById("month").value + document.getElementById("year").value;
    employeePayrollData._startDate = new Date(Date.parse(date));
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item =>{
        if(item.checked)
        {
            selectedItems.push(item.value);
        }
    });
    return selectedItems;
}
// Saving Employee model to local storage.

 function createAndUpdateStorage(employeePayrollData) 
 {
     let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList)
    {
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollData._id);
        if(!empPayrollData)
        {
            employeePayrollList.push(employeePayrollData);
        }
        else
        {
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayroll(empPayrollData._id));
        }
    }
    else 
    {
        employeePayrollList = [employeePayrollData];
    }
     alert(employeePayrollList.toString());
     localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
 }
 function setForm()
{
    setValue('#id', empPayrollObj._id);
    setValue('#name', empPayrollObj._name);
    setSelectedValues('[name=profile]', empPayrollObj._profilePic);
    setSelectedValues('[name=gender]', empPayrollObj._gender);
    setSelectedValues('[name=department]', empPayrollObj._department);
    setValue('#salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary)
    setValue('#notes', empPayrollObj._note);
    let date = stringifyDate(empPayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);   
}

// UC5:- Ability to reset the form on clicking reset  
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2022');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => { item.checked = false; });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setSelectedValues = (propertyValue, value) =>
{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value))
        {
            if (value.includes(item.value))
            {
                item.checked = true;
            }
        }
        else if (item.value == value)
            item.checked = true;
    });
}
function checkForUpdate()
{
    const empJSON = localStorage.getItem('editEmp');
    isUpdate = empJSON ? true : false;
    if (!isUpdate)
    return;
    empPayrollObj = JSON.parse(empJSON);
    setForm();
}