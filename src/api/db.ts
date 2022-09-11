import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from ".";
import { EmployeeDetails, MangerDetails } from "../types";

export async function addManager(values: MangerDetails) {
  // firebase automatically checks if the email is already registered or not
  return await setDoc(doc(db, "managers", values.email!), values);
}

export async function addEmployee(values: EmployeeDetails) {
  // do not forget to pass the managerEmail along with the values
  const docRef = doc(db, "employees", values.empId!);
  // if an employee is already registered with the given employee ID, throw an error
  if ((await getDoc(docRef)).exists())
    throw new Error("An employee already exists with the given ID");

  return await setDoc(docRef, values);
}

export async function getEmployees(managerEmail: string) {
  const q = query(
    collection(db, "employees"),
    where("managerEmail", "==", managerEmail)
  );

  const res: EmployeeDetails[] = [];
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    res.push(doc.data());
  });

  return res;
}

export async function deleteEmployee(documentId: string) {
  await deleteDoc(doc(db, "employees", documentId));
}

export async function updateEmployee(values: EmployeeDetails) {
  // do not forget to pass the managerEmail along with the values
  return await setDoc(doc(db, "employees", values.empId!), values);
}
