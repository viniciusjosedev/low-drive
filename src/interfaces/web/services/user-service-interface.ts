export interface UserCreate {
  name: string;
  email: string;
  password: string;
  storage?: number;
  createdAt?: string;
  updatedAt?: string;
}
