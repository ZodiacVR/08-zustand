export interface User {
    id: string;
    email: string;
    username: string;
    avatar: string;
  }
  export type UpdateUserPayload = {
    username?: string;
    email?: string;
    avatar?: string;
  };
  
  export interface AuthData {
    email: string;
    password: string;
  }
  export type CheckSessionResponse = {
    success: boolean;
  };
  export type ServerBoolResponse = {
    success: boolean
  }