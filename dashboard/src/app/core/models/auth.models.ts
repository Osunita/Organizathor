export interface AuthResponse { token: string; email: string; id: number; refreshToken?: string; }
export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { email: string; password: string; }
export interface User { id: string | number; email: string; name?: string; }
