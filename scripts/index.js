import { initialElements } from "./constants.js"

const popup = document.querySelector('.popup');
const openEditPopupBtn = document.querySelector('.profile__button-edit');

const closePopupBtns = document.querySelectorAll('.popup__close-button');

const editProfilePopup = document.querySelector('.popup_type_edit-userinfo');

const addNewElementBtn = document.querySelector('.profile__button-add');
const popupAddNewElement = document.querySelector('.popup_type_add-elements');

const editProfileFormElement = editProfilePopup.querySelector('.popup__form-element');
//const formEdit = document.querySelector(".popup__form-element_edit");
const formAdd = document.querySelector(".popup__form-element_add");


const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const addImageTitle = document.querySelector('.popup__input_type_photoname');

const addImageLink = document.querySelector('.popup__input_type_photolink');

const addImageForm = popupAddNewElement.querySelector('.popup__form-element');
const buttonElementsSubmit = document.querySelector('.popup__save-button_elements');
const buttonProfileSubmit = document.querySelector('.popup__save-button_profile');

const imageOpenPicture = document.querySelector('.popup__image');
const imageOpenTitle = document.querySelector(".popup__image-title");
const submitImageBtn = document.querySelector('.popup__save-button');

const elementTemplate = document.querySelector('.elements-template');
const elementsContainer = document.querySelector('.elements');

const zoomPopup = document.querySelector('.popup_type_open-image');
const imageZoomPopup = document.querySelector('.popup__image-fullscreen');
const titleZoomPopup = document.querySelector('.popup__image-title');

  // Закрытие на Esc
  function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      const popupOpen = document.querySelector('.popup_opened');
      closePopup(popupOpen);
    }
  };

  // Функция закрытия попапа на оверлей
function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  };
};


//Функции открытия и закрытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
} 

function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }
  

// Закрытие всех попапов
  closePopupBtns.forEach((element) => {
    const popupClose = element.closest('.popup');
    element.addEventListener('click', () => {
      closePopup(popupClose)
    });
  });

 
function handleFormProfileSubmit(evt) { 
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
    nameProfile.textContent = nameInput.value; 
    jobProfile.textContent = jobInput.value; 
    closePopup(editProfilePopup);
} 

//openEditPopupBtn.addEventListener('click', openPopup); 
//closePopupBtns.addEventListener('click', closePopup);
editProfileFormElement.addEventListener('submit', handleFormProfileSubmit);
//formAdd.addEventListener("submit", addImageForm);
//editProfileFormElement.addEventListener("submit", addImageForm);



//  Создание и удаление элементов(карточек) + увеличение фото
const createElementsItem = (elementData) => {
    const clonedElement = elementTemplate.content.querySelector('.elements__item').cloneNode(true);
    const elementsImage = clonedElement.querySelector('.elements__image');
    const elementsTitle = clonedElement.querySelector('.elements__title');
    const elementsDeleteButton = clonedElement.querySelector('.elements__delete');
    const elementsLikeButton = clonedElement.querySelector('.elements__like');
    elementsImage.src = elementData.link;
    elementsImage.alt = elementData.name;
    clonedElement.querySelector('.elements__title').textContent = elementData.name;

    elementsTitle.textContent = elementData.name;

    elementsImage.addEventListener('click', () => {
        imageZoomPopup.src = elementData.link;
        imageZoomPopup.alt = elementData.name;
        titleZoomPopup.textContent =  elementData.name;
        openPopup(zoomPopup);
    });

    const handleLike = () => {
        elementsLikeButton.classList.toggle('elements__like_active');
    };
    const handleDelete = () => {
        clonedElement.remove();
    };

    elementsDeleteButton.addEventListener('click', handleDelete);
    elementsLikeButton.addEventListener('click', handleLike);
    elementsImage.addEventListener('click', () => openPopup(zoomPopup));

    return clonedElement;
};

function renderElement (item) {
    elementsContainer.prepend(item);
}

initialElements.forEach((element) => {
    renderElement(createElementsItem(element));
});



// Добавление новых элементов
addNewElementBtn.addEventListener('click', () => {
    //openElementPopup(popupAddNewElement); // ломает добавление карточек
    openPopup(popupAddNewElement);
  });
  
  addImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const infoPopupAddNewElement = {
        name: addImageTitle.value, 
        link: addImageLink.value};
        renderElement(createElementsItem(infoPopupAddNewElement));
    closePopup(popupAddNewElement);
    evt.target.reset();
  });


  function openElementPopup() { //
    buttonElementsSubmit.classList.add('.popup__save-button_disable');
    buttonElementsSubmit.setAttribute('disabled', true);
  };

  //Попап "Редактировать профиль" 
  openEditPopupBtn.addEventListener('click', () => {
    buttonProfileSubmit.classList.remove('popup__save-button_disable'); //
    buttonProfileSubmit.removeAttribute('disabled');                    //
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    openPopup(editProfilePopup);
  });