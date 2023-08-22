import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}

export async function comparePassword(password, hashedPassword) {
  return compare(password, hashedPassword);
}