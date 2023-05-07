validationConfig = ({ 
    formsSelector: '.popup__form-element',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disable',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__error_visible'
  }); 


  //Проверяем все поля в форме

  function hasValidInput(inputList){
    return inputList.every((inputElement) => {
        return inputElement.validity.valid;
    });
  };  


// Переключение состояний вкл/выкл у submit

function toggleButtonState(validationConfig, inputList, formSelector){
        const buttonElement = formSelector.querySelector(config.submitButtonSelector);
        if (hasValidInput(inputList)){
            button.classList.add(validationConfig.inactiveButtonClass);
            button.setAttribute('disabled', true);
        } else {
            button.classList.remove(validationConfig.inactiveButtonClass);
            button.removeAttribute('disabled');
        }
      };


// Отображение ошибки валидации

function showInputError(validationConfig, inputElement, inputErrorClass){
    inputElement.classList.add(validationConfig.inputErrorClass);
    inputErrorClass.classList.add(validationConfig.errorClass);
    inputErrorClass.textContent = inputElement.validationMessage;
  };



// Скрываем ошибки валидации

  function hideInputError(validationConfig, inputElement, inputErrorClass){
    inputElement.classList.remove(validationConfig.inputErrorClass);
    inputErrorClass.classList.remove(validationConfig.errorClass);
    inputErrorClass.textContent = '';
  };



// Проверка валидности поля

  function checkInputValidity(validationConfig, inputElement){
    const inputErrorClass = document.querySelector(`#error-${inputElement.id}`);
    if (inputElement.validity.valid) {
        hideInputError(validationConfig, inputElement, inputErrorClass);
    } else {
        showInputError(validationConfig, inputElement, inputErrorClass);
    };
  };


// Добавляем обработчики на все поля

  function setEventListeners(validationConfig, formSelector){
    const inputSelector = formSelector.querySelectorAll(validationConfig.inputSelector);
    const inputList = Array.from(inputSelector);
    toggleButtonState(validationConfig, inputList, formSelector);
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', () => {
            checkInputValidity(validationConfig, inputElement);
            toggleButtonState(validationConfig, inputList, formSelector);
        });
    });
  };


  function enableValidation(validationConfig){
    const formSelector = document.querySelectorAll(validationConfig.formSelector);
    const formList = Array.from(formSelector);
    
    formList.forEach(function(formSelector){
        setEventListeners(validationConfig, formSelector);
    });
  };
  
 