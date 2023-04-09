const openPopupBtn = document.querySelector('.profile__button-edit_popup_opened');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-button');

function openPopup(){
    popup.classList.add('popup_opened');
}

function closePopup(evt){
    const isOverlay = evt.target.classList.contains('popup'); //проверка (true - на оверлей, false - на ост поля)
    const isCloseBtn = evt.target.classList.contains('popup__close-button'); //проверка (true - на кнопку закрытия, false - на ост поля)
    const isSubmitBtn = evt.target.classList.contains('popup__save-button');
    //console.log(isCloseBtn);

    if (isSubmitBtn || isCloseBtn){
        popup.classList.remove('popup_opened');
    }
}

openPopupBtn.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);

//функция редактирования данных (имя и описание)
const nameInput = document.querySelector('.popup__input_name');
const descInput = document.querySelector('.popup__input_description');
const nameProfile = document.querySelector('.profile__title');
const descProfile = document.querySelector('.profile__subtitle');
const inputSet = document.querySelector('.popup__set');

//nameInput.value = nameProfile.textContent;
//descInput.value = descProfile.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    descProfile.textContent = descInput.value;
    closePopup();
}


openPopupBtn.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup); 
inputSet.addEventListener('submit', handleFormSubmit);






