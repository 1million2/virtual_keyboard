import './style.scss';
import {buttons} from './data'
const container = document.querySelector('#root')
const text = document.querySelector('#text');



class Key {
  constructor(data_code,data_ru,data_en,data_ru_shift,data_en_shift,data_no_type = false,data_content) {
    this.data_code = data_code,
    this.data_ru = data_ru,
    this.data_en = data_en,
    this.data_ru_shift = data_ru_shift,
    this.data_en_shift = data_en_shift,
    this.data_no_type = data_no_type
    this.data_content = data_content
  }
  create (option) {
    const el = document.createElement('div');
    el.setAttribute("data-code",this.data_code);
    el.setAttribute("data-no-type",this.data_no_type);
    if (option === 'Shift') {
      el.innerHTML = this.data_content ? this.data_content: this.data_ru_shift;
    }
     else {
      el.innerHTML = this.data_content ? this.data_content: this.data_ru;
    }
    el.classList.add('btn-body')
    if(this.data_content) {
      el.classList.add('dark')
    }
    if(this.data_code === 'CapsLock' || this.data_code === 'Backspace' || this.data_code === 'Enter' || this.data_code === 'ShiftRight') {
      el.classList.add('large')
    }
    if(this.data_code === 'Tab') {
      el.classList.add('medium')
    }
    if(this.data_code === 'Space') {
      el.classList.add('xl')
    }
    if (this.data_code === 'ShiftLeft') {
      el.classList.add('left-shift')
    }
    return el
  }
}


function createButtons (option) {
  container.innerHTML = ''
  buttons.forEach(item => {
    const node = new Key(item.data_code,item.data_ru,item.data_en,item.data_ru_shift,item.data_en_shift,item.data_no_type,item.data_content);
    container.append(node.create(option))
  })
}

function cursorSetFocus () {
  text.focus()
  text.selectionStart = text.value.length;
}




document.addEventListener('keydown', (e) => {
  e.preventDefault()
  if(document.querySelector(`[data-code=${e.code}]`)){
    const el = document.querySelector(`[data-code=${e.code}]`)
    el.classList.add('active')
    if(el.getAttribute('data-no-type') === 'false') {
      text.innerHTML += el.innerHTML
      cursorSetFocus ()
    }
    // при клике на Backspace стираем последний символ с textarea
    if(e.code === 'Backspace') {
      text.innerHTML = text.innerHTML.slice(0,-1)
      cursorSetFocus ()
    }
    if(e.code === 'Tab') {
      text.innerHTML += '   '
      cursorSetFocus ()
    }
    if(e.code === 'Space') {
      text.innerHTML += ' '
      cursorSetFocus ()
    }
    if(e.code === 'Enter') {
      text.innerHTML += '\n'
      cursorSetFocus ()
    }
    if(e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      createButtons('Shift')
    }
  }
})

document.addEventListener('keyup', (e) => {
  if(document.querySelector(`[data-code=${e.code}]`)) {
    const el = document.querySelector(`[data-code=${e.code}]`)
    el.classList.remove('active')
  }
  if(e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    createButtons()
  }
})

document.addEventListener('mousedown', (e) => {
  if(e.target.classList.contains('btn-body')){
    e.target.classList.add('active')
    if(e.target.getAttribute('data-no-type') === 'false') {
      text.innerHTML += e.target.innerHTML
    }
    // при клике на Backspace стираем последний символ с textarea
    if(e.target.getAttribute('data-code') === 'Backspace') {
      text.innerHTML = text.innerHTML.slice(0,-1)
    }
    if(e.target.getAttribute('data-code') === 'Space') {
      text.innerHTML += ' '
    }
    if(e.target.getAttribute('data-code') === 'Enter') {
      text.innerHTML += '\n'
    }
    if(e.target.getAttribute('data-code') === 'ShiftLeft') {
      createButtons('tab')
    }
  }
})
document.addEventListener('mouseup', (e) => {
  if(e.target.classList.contains('btn-body')){
    e.target.classList.remove('active')
    cursorSetFocus()
  }
  if(e.target.getAttribute('data-code') === 'ShiftLeft') {
    createButtons()
  }
})
createButtons ()