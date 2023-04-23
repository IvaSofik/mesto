import { initialElements } from "./constants.js"

const popup = document.querySelector('.popup');
const openEditPopupBtn = document.querySelector('.profile__button-edit');

const closePopupBtn = document.querySelectorAll('.popup__close-button');

const editProfilePopup = document.querySelector('.popup_type_edit-userinfo');

const addNewElementBtn = document.querySelector('.profile__button-add');
const popupAddNewElement = document.querySelector('.popup_type_add-elements');

const formElement = document.querySelector('.popup__form-element');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const addImageTitle = document.querySelector('.popup__input_type_photoname');

const addImageLink = document.querySelector('.popup__input_type_photolink');

const addImageForm = document.querySelector('.popup__form-element');

const imageOpenPicture = document.querySelector('.popup__image');
const imageOpenTitle = document.querySelector(".popup__image-title");
const submitImageBtn = document.querySelector('.popup__save-button');

const elementsTemplate = document.querySelector('.elements-template');
const elementsContainer = document.querySelector('.elements');

const zoomPopup = document.querySelector('.popup_type_open-image');
const imageZoomPopup = document.querySelector('.popup__image-fullscreen');
const titleZoomPopup = document.querySelector('.popup__image-title');



//Функции открытия и закрытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
} 

function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

// Закрытие всех попапов
  closePopupBtn.forEach((element) => {
    const popupClose = element.closest('.popup');
    element.addEventListener('click', () => {
      closePopup(popupClose)
    });
  });

//Попап "Редактировать профиль"

  openEditPopupBtn.addEventListener('click', () => {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(editProfilePopup);
  });

function handleFormSubmit(evt) { 
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
    nameProfile.textContent = nameInput.value; 
    jobProfile.textContent = jobInput.value; 
    closePopup(editProfilePopup);
} 

openEditPopupBtn.addEventListener('click', openPopup); 
//closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


//  Создание и удаление элементов(карточек) + увеличение фото
const createElementsItem = (ElementsData) => {
    const clonedElements = elementsTemplate.content.querySelector('.elements__item').cloneNode(true);
    const elementsImage = clonedElements.querySelector('.elements__image');
    const elementsTitle = clonedElements.querySelector('.elements__title');
    const elementsDeleteButton = clonedElements.querySelector('.elements__delete');
    const elementsLikeButton = clonedElements.querySelector('.elements__like');
    elementsImage.src = ElementsData.link;
    elementsImage.alt = ElementsData.name;
    clonedElements.querySelector('.elements__title').textContent = ElementsData.name;

    elementsTitle.textContent = ElementsData.name;

    elementsImage.addEventListener('click', () => {
        imageZoomPopup.src = ElementsData.link;
        imageZoomPopup.alt = ElementsData.name;
        titleZoomPopup.textContent =  ElementsData.name;
        openPopup(zoomPopup);
    });

    const handleLike = () => {
        elementsLikeButton.classList.toggle('elements__like');
    };
    const handleDelete = () => {
        clonedElements.remove();
    };

    elementsDeleteButton.addEventListener('click', handleDelete);
    elementsLikeButton.addEventListener('click', handleLike);
    elementsImage.addEventListener('click', () => openPopup(zoomPopup));

    return clonedElements;
};

function renderElement (item) {
    elementsContainer.prepend(item);
}

initialElements.forEach((element) => {
    renderElement(createElementsItem(element));
});


// Добавление новых элементов
addNewElementBtn.addEventListener('click', () => {
    openPopup(popupAddNewElement);
  });
  
  addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const infoPopupAddNewElement = {
        name: addImageTitle.value, 
        link: addImageLink.value};
    elementsContainer.prepend(createElementsItem(infoPopupAddNewElement));
    closePopup(popupAddNewElement);
    evt.target.reset();
  });