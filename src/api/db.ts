import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { db } from ".";
import { EmployeeDetails, MangerDetails } from "../types";

export async function addManager(values: MangerDetails) {
  const docRef = await addDoc(collection(db, "managers"), values);
  return docRef;
}

export async function addEmployee(values: EmployeeDetails) {
  // do not forget to pass the managerEmail along with the values
  const docRef = await addDoc(collection(db, "employees"), values);
  return docRef;
}

export async function getEmployees(managerEmail: string) {
  const q = query(
    collection(db, "employees"),
    where("managerEmail", "==", managerEmail)
  );

  const res: any = [];
  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    res.push({ ...doc.data(), documentId: doc.id });
  });

  return res;
}

export async function deleteEmployee(documentId: string) {
  await deleteDoc(doc(db, "employees", documentId));
}
