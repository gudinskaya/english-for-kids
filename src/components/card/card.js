import buttonImage from 'src/img/rotate.svg'
import cards from 'src/cards.js'
import styles from 'src/components/card/card.css'
import * as Swither from '../../helpers/switcher'

const pathPart = window.location.href.indexOf('github') !== -1 ? '/gudinskaya-JS2020Q3/english-for-kids/' : '/'

export const render = (word, translation, image, audioSrc, destinationWrapper, category) => {
  // create frontside
  const audio = document.createElement('audio')
  const wrapper = document.createElement('div')
  const card = document.createElement('div')
  const cardImage = document.createElement('img')
  const textBtnWrapper = document.createElement('div')
  const text = document.createElement('div')

  wrapper.classList.add(styles.wrapper)

  card.classList.add(styles.card)
  cardImage.classList.add(styles.image)
  textBtnWrapper.classList.add(styles.text_button__wrapper)
  text.classList.add(styles.text)

  cardImage.setAttribute('src', image)
  audio.setAttribute('src', audioSrc)
  audio.style.display = 'none'

  wrapper.appendChild(card)
  card.appendChild(cardImage)
  card.appendChild(textBtnWrapper)
  textBtnWrapper.appendChild(text)
  card.appendChild(audio)

  // create backside
  const cardBack = document.createElement('div')
  const cardBackImage = document.createElement('img')
  const translationWrapper = document.createElement('div')
  const translationText = document.createElement('div')

  cardBack.classList.add(styles.card, styles.cardBack)
  cardBackImage.classList.add(styles.image)
  translationWrapper.classList.add(styles.text_button__wrapper)
  translationText.classList.add(styles.text)

  cardBackImage.setAttribute('src', `${pathPart}${image}`)

  wrapper.appendChild(cardBack)
  cardBack.appendChild(cardBackImage)
  translationWrapper.appendChild(translationText)
  cardBack.appendChild(translationWrapper)

  destinationWrapper.appendChild(wrapper)

  if (translation) {
    const rotateCardBtn = document.createElement('button')
    const buttonImg = document.createElement('img')

    rotateCardBtn.classList.add(styles.button)
    text.innerText = word
    translationText.innerText = translation
    buttonImg.setAttribute('src', buttonImage)
    rotateCardBtn.appendChild(buttonImg)
    textBtnWrapper.appendChild(rotateCardBtn)

    card.addEventListener('click', () => {
      audio.play()
    })
    rotateCardBtn.addEventListener('click', () => {
      wrapper.classList.add(styles.rotated)
    })
    wrapper.addEventListener('mouseleave', () => {
      wrapper.classList.remove(styles.rotated)
    })
  } else {
    text.innerText = word
    let categoryPath = ''
    cards.titles.forEach((value) => {
      if (value.title === word) {
        categoryPath = value.id
      }
    })
    card.addEventListener('click', (e) => {
      window.history.pushState({}, '', `${pathPart}${categoryPath}`)
      Swither.switcher()
    })
  }
}
