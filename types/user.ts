export interface MenuItem {
  name: string
  url: string
  icon: string
  children?: MenuItem[]
}

export interface LoginBody {
  username: string
  password: string
}
