import Cards from 'src/cards.js'
import styles from 'src/components/menu/menu.css'
import image from 'src/components/menu/burger.svg'
import * as Switcher from "../../helpers/switcher"

const pathPart = window.location.href.indexOf('github') !== -1 ? '/gudinskaya-JS2020Q3/english-for-kids/' : '/'

const createMenuElems = (menu) => {
  const menuElems = menu
  const mainPage = document.createElement('div')
  menuElems.appendChild(mainPage)
  mainPage.innerText = 'Main Page'
  mainPage.classList.add(styles.menu__elem)
  mainPage.setAttribute('id', '/')

  mainPage.addEventListener('click', () => {
    window.history.pushState({}, '', pathPart)
    Switcher.switcher()
  })

  Cards.titles.forEach((value) => {
    const menuElem = document.createElement('div')
    menuElem.innerText = value.title
    menuElem.classList.add(styles.menu__elem)
    menuElem.setAttribute('id', `${value.id}`)
    menuElems.appendChild(menuElem)

    menuElem.addEventListener('click', () => {
      window.history.pushState({}, '', `${pathPart}${value.id}`)
      Switcher.switcher()
    })
  })
}

const createBurger = (inner, wrapper) => {
  const menuInner = inner
  const menuWrapper = wrapper
  const burgerMenu = document.createElement('button')
  burgerMenu.classList.add(styles.menu__burger)
  const img = document.createElement('img')
  img.setAttribute('src', image)
  img.setAttribute('alt', 'menu')
  img.classList.add(styles.burger__image)
  burgerMenu.appendChild(img)
  burgerMenu.classList.add(styles.burger)

  menuInner.appendChild(burgerMenu)
  burgerMenu.addEventListener('click', () => {
    menuWrapper.classList.toggle(styles.show)
    menuWrapper.classList.toggle(styles.hide)
    burgerMenu.classList.toggle(styles.opened)
    menuWrapper.classList.remove(styles.animation__remove)
  })
}

export const render = (wrapper) => {
  const menuInner = document.createElement('div')
  const menuWrapper = document.createElement('div')
  const menu = document.createElement('nav')
  menu.classList.add(styles.menu)
  menuWrapper.classList.add(styles.menu__wrapper)
  menuWrapper.classList.add(styles.hide)
  menuWrapper.classList.add(styles.animation__remove)

  createMenuElems(menu)
  menuWrapper.appendChild(menu)
  menuInner.appendChild(menuWrapper)
  wrapper.appendChild(menuInner)
  createBurger(menuInner, menuWrapper)
}
