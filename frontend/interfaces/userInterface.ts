export interface UserInterface {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  roleId: number | string | null;
}
