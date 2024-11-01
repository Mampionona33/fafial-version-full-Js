interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

interface Permission {
  id: number;
  action: string; // Ex: "read", "write", "delete", etc.
  resource: string; // Ex: "Post", "User", "Product", etc.
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  roleId?: number;
}
