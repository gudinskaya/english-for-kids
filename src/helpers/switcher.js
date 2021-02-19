import * as Page from '../pages/page'

const pathPart = window.location.href.indexOf('github') !== -1 ? '/gudinskaya-JS2020Q3/english-for-kids' : ''
export const switcher = () => {
  const path = window.location.pathname
  console.log(path)
  switch (true) {
    case path === `${pathPart}/`:
      Page.render()
      break
    default:
      Page.render(`${path.replace(pathPart, '')}`)
      break
  }
}
