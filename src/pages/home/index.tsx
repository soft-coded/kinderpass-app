import { useEffect, useState } from "react";

import "./homepage.css";
import EmployeeCard from "../../components/employee-card";
import { useAppSelector } from "../../store";
import { getEmployees } from "../../api/db";

export default function HomePage() {
  const { isAuthenticated: isAuthed, email: managerEmail } = useAppSelector(
    (state) => state.auth
  );
  const [employees, setEmployees] = useState<null | any[]>(null);

  useEffect(() => {
    if (!isAuthed) return;

    async function populateEmployees() {
      setEmployees(await getEmployees(managerEmail!));
    }
    populateEmployees();
  }, [isAuthed, managerEmail]);

  return (
    <div className="homepage container">
      {isAuthed ? (
        employees == null ? (
          <h3 className="centered">Loading...</h3>
        ) : employees.length === 0 ? (
          <h3 className="centered">You have not added any employees yet</h3>
        ) : (
          <div className="employees">
            {employees.map((emp) => (
              <EmployeeCard key={emp.empId} {...emp} />
            ))}
          </div>
        )
      ) : (
        <h2 className="unauthed centered">
          Log in or sign up to manage employee data
        </h2>
      )}
    </div>
  );
}
