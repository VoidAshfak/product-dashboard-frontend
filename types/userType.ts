export interface User {
    id: string;
    email: string;
    role: "admin" | "user";
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface MeResponse {
  user: User | null;
}
