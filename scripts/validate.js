import { validationConfig } from "./constants.js";

//Проверяем все поля в форме

function areAllInputsValid(inputList) {
    return inputList.every((inputElement) => {
        return inputElement.validity.valid;
    });
}

// Переключение состояний вкл/выкл у submit

function toggleButton(validationConfig, inputList, formSelector) {
    const buttonElement = formSelector.querySelector(validationConfig.submitButtonSelector);
    function enableButton() {
        buttonElement.removeAttribute("disabled");
    }
    function disableButton() {
        buttonElement.setAttribute("disabled", true);
    }
    if (areAllInputsValid(inputList)) {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        enableButton();
    } else {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        disableButton();
    }
}

// Отображение ошибки валидации

function showInputError(validationConfig, inputElement, inputError) {
    inputElement.classList.add(validationConfig.inputError);
    inputError.classList.add(validationConfig.errorClass);
    inputError.textContent = inputElement.validationMessage;
}

// Скрываем ошибки валидации

function hideInputError(validationConfig, inputElement, inputError) {
    inputElement.classList.remove(validationConfig.inputError);
    inputError.classList.remove(validationConfig.errorClass);
    inputError.textContent = "";
}

// Проверка валидности поля

function checkInputValidity(validationConfig, inputElement) {
    const inputError = document.querySelector(`#error-${inputElement.id}`);
    if (inputElement.validity.valid) {
        hideInputError(validationConfig, inputElement, inputError);
    } else {
        showInputError(validationConfig, inputElement, inputError);
    }
}

// Добавляем обработчики на все поля

function setEventListeners(validationConfig, formSelector) {
    const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
    //const inputSelector = formSelector.querySelectorAll(validationConfig.inputSelector);
    //const inputList = Array.from(inputSelector);

    toggleButton(validationConfig, inputList, formSelector);
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener("input", () => {
            checkInputValidity(validationConfig, inputElement);
            toggleButton(validationConfig, inputList, formSelector);
        });
    });
}

function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    //const formSelector = document.querySelectorAll(validationConfig.formSelector);
    //const formList = Array.from(formSelector);

    formList.forEach(function (formSelector) {
        setEventListeners(validationConfig, formSelector);
    });
}

enableValidation(validationConfig);