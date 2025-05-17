import { User } from "../types/user";

export function isPasswordValid(user: User, password: string): boolean {
  return user.password === password;
}
