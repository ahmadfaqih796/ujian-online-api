SELECT role,
   SUM(1) AS total
FROM users
GROUP BY role;