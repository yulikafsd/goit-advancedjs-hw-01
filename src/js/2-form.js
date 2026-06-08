'use strict';

let formData = {
    email: '',
    message: '',
};

const refs = {
    formElem: document.querySelector('.feedback-form'),
};

const lsData = localStorage.getItem('feedback-form-state');

if (lsData) {
    formData = JSON.parse(lsData);
    Object.keys(formData).forEach(key => {
        const elem = refs.formElem.elements[key];
        if (elem) {
            elem.value = formData[key] || '';
        }
    });
}

const onChangeHandler = e => {
    const fieldName = e.target.name;
    formData[fieldName] = e.target.value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onSubmitHandler = e => {
    e.preventDefault();

    const isFormEmpty = Object.values(formData).some(value => value === '');

    if (isFormEmpty) {
        alert('Fill please all fields');
        return;
    }

    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    Object.keys(formData).forEach(key => (formData[key] = ''));

    e.currentTarget.reset();
    document.activeElement.blur();
};

refs.formElem.addEventListener('input', onChangeHandler);
refs.formElem.addEventListener('submit', onSubmitHandler);
