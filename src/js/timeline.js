/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-console */

export default class Timeline {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.message = null;
    this.formInput = null;
    this.modalInput = null;
    this.addMessage = this.addMessage.bind(this);
  }

  static get markup() {
    return `
      <div class="container-tl">
      <div class="list"></div>
      <div class="input-form">
      <form class="form">
        <input class="form-input" name="input" type="text">
        <div class="icon-audio"></div>
        <div class="icon-video"></div>
      </form>
      </div>
      </div> 
      `;
  }

  static get containerTl() {
    return '.container-tl';
  }

  static get list() {
    return '.list';
  }

  static get formInput() {
    return '.form-input';
  }

  static get form() {
    return '.form';
  }

  bindToDOM() {
    this.parentEl.innerHTML = Timeline.markup;
    this.containerTl = this.parentEl.querySelector(Timeline.containerTl);
    this.list = this.parentEl.querySelector(Timeline.list);
    this.form = this.parentEl.querySelector(Timeline.form);
    this.formInput = this.parentEl.querySelector(Timeline.formInput);
    this.form.addEventListener('submit', this.addMessage);
  }

  addMessage(event) {
    event.preventDefault();
    this.elem = document.createElement('div');
    this.elem.classList.add('message');
    this.list.appendChild(this.elem);
    this.letter = document.createElement('div');
    this.letter.classList.add('letter');
    this.elem.appendChild(this.letter);
    this.letter.textContent = event.target.input.value;
    this.data = document.createElement('div');
    this.data.classList.add('data');
    this.data.textContent = `${new Date().toLocaleString()}`;
    this.elem.appendChild(this.data);
    this.location = document.createElement('div');
    this.location.classList.add('location');
    this.getLocation();
    this.resetInput();
  }

  resetInput() {
    this.formInput.value = '';
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.showCoordinate(latitude.toFixed(4), longitude.toFixed(4));
        },
        (error) => {
          this.showModal();
          console.error(error);
        },
      );
    }
  }

  showCoordinate(latitude, longitude) {
    this.location.textContent = `[${latitude}, ${longitude}]`;
    this.elem.insertAdjacentElement('beforeEnd', this.location);
    this.locationIcon = document.createElement('div');
    this.locationIcon.classList.add('locationIcon');
    // this.elem.appendChild(this.locationIcon);
    this.location.insertAdjacentElement('afterEnd', this.locationIcon);
  }

  showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-text">Что-то пошло не так  
        <p>Извините, но мы не можем определить ваше местоположение, 
        пожалуйста, дайте нам разрешение на использование геолокации, 
        либо введите координаты вручную.
        </p>
        <p class="instruction">Широта и долгота через запятую</p>
        <form class="modal-form">
          <input class="modal-input" name="modal" type="text">
          <div class="buttons">
          <button type="reset" class="cancel">Отмена</button>
          <button type="submit" class="submit">OK</button>
          </div>
        </form>
        </div>
      `;
    this.parentEl.appendChild(modal);
    const modalInput = this.parentEl.querySelector('.modal-input');
    console.log(modalInput);
    this.parentEl.querySelector('.modal-form').addEventListener('reset', (event) => {
      event.preventDefault();
      this.hideModal();
    });
    this.parentEl.querySelector('.modal-form').addEventListener('submit', (event) => {
      event.preventDefault();

      let value = this.checkValidity(event.target.modal.value);
      console.log(value);
      if (value) {
        value = value[0].split(',');
        const latitude = value[0].trim();
        const longitude = value[1].trim();

        this.hideModal();
        this.showCoordinate(latitude, longitude);
      } else {
        alert('Неверный формат данных');
      }
    });
  }

  hideModal() {
    this.parentEl.querySelector('.modal').remove();
    this.resetInput();
  }
/* eslint-disable */
  checkValidity(string) {
    return string.match(/^\[?\d+\.\d+,\s?\-?\d+\.\d+\]?$/gm);
  }
}
