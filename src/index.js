import * as Page from './pages/page.js'
import * as Menu from './components/menu/menu.js'
import * as Switcher from './helpers/switcher'
import styles from './index.css'

const wrapper = document.createElement('div')
wrapper.classList.add(styles.wrapper)
document.getElementById('root').appendChild(wrapper)

Menu.render(wrapper)
Switcher.switcher()

window.onpopstate = () => {
  Switcher.switcher()
}
