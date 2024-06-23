export interface loginBody {
  username: string
  password: string
}

export interface loginResult {
  code: number,
  data: {
    token?: string,
    message?: string
  }
}

export interface userInfoResult {
  code: number,
  data: {
    checkUser: {
      userId: number,
      avatar: string,
      username: string,
      desc: string,
      roles: string[],
      buttons: string[],
      routes: string[],
      token: string
    }
  }
}
