// types/auth.ts

export type OAuthUser = {
    id: string;
  name: string;
  email: string;
  image: string;
  role: string;
 
}

export type Credentials = {
    email : string,
    password : string

}

export type OAuthAccount = {
  id : string;
  userId: string;
  provider: string;
  type: string;
  access_token: string;
  id_token: string | null;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  refresh_token?: string;
  [key: string]: any; // For other optional fields
};

export type GitHubProfile = {
  login: string;
  id: number;
  avatar_url: string;
  url?: string;
  html_url?: string;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  twitter_username?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: any; // GitHub returns a lot more fields
};
