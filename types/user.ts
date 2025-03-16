export interface MenuItem {
  name: string
  url: string
  icon: string
  children?: MenuItem[]
}
