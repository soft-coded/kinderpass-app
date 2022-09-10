import { collection, addDoc } from "firebase/firestore";

import { db } from ".";
import { EmployeeDetails, MangerDetails } from "../types";

export async function addManager(values: MangerDetails) {
  const docRef = await addDoc(collection(db, "managers"), values);
  return docRef;
}

export async function addEmployee(values: EmployeeDetails) {
  // do not forget to pass the managerEmail along with the values
  const docRef = await addDoc(collection(db, "managers"), values);
  return docRef;
}
