SELECT employees AS allEmployeeInfo, roles.role_title,  department.department_name, roles.role_salary, employees.manager_id
FROM roles LEFT JOIN employees
ON roles.department_id = departments_id
ORDER BY employee.last_name;

