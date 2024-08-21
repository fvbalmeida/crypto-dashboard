export class CustomRequest extends Request {
  user: {
    id: number;
    username: string;
  };
}

export class LoginResponse {
  access_token: string;
}
