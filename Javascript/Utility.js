const stringifyDate = (date) =>{
    const options ={day:'numeric', month:'short', year:'numeric'};
    const newDate = !date ? "undefined" :new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

function update(node)
{
    let employeeData = empPayrollList.find(empData => empData._id == node.id);
    if(!employeeData){return;} 
    localStorage.setItem('editEmp', JSON.stringify(employeeData));
    window.open(SiteProperties.AddEmployee);
}

function remove(node)
{
    let empData = empPayrollList.find(emp => emp._id == node.id);
    if (!empData)
    return;
    const index = empPayrollList.map(emp => emp._id).indexOf(empData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    createInnerHTML();
    window.location.replace(SiteProperties.HomePage);
}