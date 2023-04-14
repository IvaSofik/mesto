let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__button-edit');
let closePopupBtn = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form-element');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
} 

function closePopup() {
    popup.classList.remove('popup_opened');
  }

function handleFormSubmit(evt) { 
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
    nameProfile.textContent = nameInput.value; 
    jobProfile.textContent = jobInput.value; 
    closePopup();
} 

openPopupBtn.addEventListener('click', openPopup); 
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);