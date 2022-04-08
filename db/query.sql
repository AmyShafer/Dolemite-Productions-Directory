SELECT departments.department_name AS department, roles.role
FROM roles LEFT JOIN employees
ORDER BY employee.last_name;