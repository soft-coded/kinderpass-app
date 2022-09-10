import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";

import { authClient } from "./";
import { MangerDetails } from "../types";
import { addManager } from "./db";

export async function loginManager(email: string, password: string) {
  await setPersistence(authClient, browserLocalPersistence);
  return await signInWithEmailAndPassword(authClient, email, password);
}

export async function signupManger(values: MangerDetails) {
  await setPersistence(authClient, browserLocalPersistence);
  const user = await createUserWithEmailAndPassword(
    authClient,
    values.email,
    values.password!
  );

  delete values.password;
  await addManager(values);
  return user;
}

export async function logout() {
  await signOut(authClient);
}
