export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthConfig {
  github: {
    clientId: string;
    clientSecret: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  autoSignIn: boolean;
  maxAge: number;
  updateAge: number;
  trustedOrigins: string[];
}
