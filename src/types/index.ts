export interface MangerDetails {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: string;
  company: string;
}

export interface EmployeeDetails {
  documentId?: string;
  empId?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  dateOfBirth?: string;
  mobileNumber?: string;
  city?: string;
  managerEmail?: string;
}
