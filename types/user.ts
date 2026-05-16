export interface User {
  _id?: string;
  profilePicture: string | null;
  username: string;
  name: string;
  audioActive: boolean;
  rankingActive: boolean;
};

export interface TokenPayload {
  user: {
    username: string;
    name: string;
    type: "parent" | "child";
  }
};