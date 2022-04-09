SELECT departments.department_name AS department, roles.role
FROM roles LEFT JOIN employees
ON roles.department_id = departments_id
ORDER BY employee.last_name;

