import cards from 'src/cards.js'
import { render as renderCard } from '@components/card/card.js'
import styles from 'src/pages/page.css'

import bgToysImg from '@images/bg/teddy_bear.svg'
import bgCatImg from '@images/bg/cat.svg'

const createCards = (wrapper, category) => {
  if (!category) {
    cards.titles.forEach((value, idx) => {
      renderCard(value.title, 0, cards.words[idx][idx].image, 0, wrapper, 0)

    })
  } else {
    let idx = 0
    cards.titles.forEach((value, i) => {
      if(value.title === category) {
        idx = i
      }
    })
     cards.titles.indexOf(category)
    cards.words[idx].forEach((value) => {
      renderCard(value.word, value.translation, value.image, value.audioSrc, wrapper, category)
    })
  }
}

export const render = (categoryPath) => {
  const oldContent = document.getElementById('pageWrapper')
  if (oldContent) {
    oldContent.remove()
  }
  const switchBtnWrapper = document.createElement('div')
  switchBtnWrapper.classList.add(styles.switch__wrapper)
  const switchBtn = document.createElement('div')
  switchBtn.classList.add(styles.switch__button)
  const switchCircle = document.createElement('div')
  switchCircle.classList.add(styles.switch__circle)
  const playMode = document.createElement('div')
  playMode.classList.add(styles.switch__text_play)
  const trainMode = document.createElement('div')
  trainMode.classList.add(styles.switch__text_train)

  playMode.innerText = 'Play'
  trainMode.innerText = 'Train'

  switchBtnWrapper.appendChild(switchBtn)
  switchBtn.appendChild(switchCircle)
  switchBtn.appendChild(playMode)
  switchBtn.appendChild(trainMode)

  const pageWrapper = document.createElement('div')
  pageWrapper.setAttribute('id', 'pageWrapper')
  pageWrapper.classList.add(styles.page_wrapper)
  const text = document.createElement('div')
  text.classList.add(styles.text)
  const wrapper = document.createElement('div')
  wrapper.classList.add(styles.wrapper)

  const bgToys = document.createElement('img')
  bgToys.src = bgToysImg
  bgToys.classList.add(styles.bgToys)

  const bgCat = document.createElement('img')
  bgCat.src = bgCatImg
  bgCat.classList.add(styles.bgCat)

  pageWrapper.appendChild(switchBtnWrapper)
  pageWrapper.appendChild(text)
  pageWrapper.appendChild(bgToys)
  wrapper.appendChild(bgCat)
  pageWrapper.appendChild(wrapper)
  document.getElementById('root').appendChild(pageWrapper)

  switchBtnWrapper.addEventListener('click', () => {
    switchBtnWrapper.classList.toggle(styles.switch__wrapper_active)
  })

  if (categoryPath) {
    cards.titles.forEach((value) => {
      if (`/${value.id}` === categoryPath) {
        text.innerText = value.title
        createCards(wrapper, value.title)
      }
    })
  } else {
    text.innerText = 'Main Page'
    createCards(wrapper, 0)
  }
}

export const update = () => {

}
