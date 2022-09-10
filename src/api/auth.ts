import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { authClient } from "./";
import { MangerDetails } from "../types";
import { addManager } from "./db";

export async function loginManager(email: string, password: string) {
  const response = await signInWithEmailAndPassword(
    authClient,
    email,
    password
  );
  return response;
}

export async function signupManger(values: MangerDetails) {
  const response = await createUserWithEmailAndPassword(
    authClient,
    values.email,
    values.password
  );

  await addManager(values);
  return response;
}
