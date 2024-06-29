export interface loginBody {
  username: string
  password: string
}

//定义全部接口返回数据都有的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface loginResult extends ResponseData{
  data: {
    token?: string,
    message?: string
  }
}

export interface userInfoResult extends ResponseData {
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
