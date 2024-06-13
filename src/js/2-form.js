const STORAGE_KEY = "feedback-form-state";
const formData = {
    email: '',
    message: ''
};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', e => {
    e.preventDefault();
    const userFormData = new FormData(form)
    const email = userFormData.get('email')
    const message = userFormData.get('message')
    formData.email = email;
    formData.message = message;
    saveToLS(STORAGE_KEY, formData);
});

window.addEventListener('DOMContentLoaded', e => {
    const dataLS = loadFromLS(STORAGE_KEY)
    form.elements.email.value = dataLS?.email || ''
    form.elements.message.value = dataLS?.message || ''
})

form.addEventListener('submit', e => {
    e.preventDefault()
    if (form.email.value === '' || form.message.value === '') {
    alert('Fill please all fields');
    return;
  }
    const userFormData = new FormData(form)
    const email = userFormData.get('email')
    const message = userFormData.get('message')
    formData.email = email
    formData.message = message
    console.log(formData);
    form.reset()
    localStorage.removeItem(STORAGE_KEY)
});



function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
    const jsonValue = localStorage.getItem(key)
    try {
        const data = JSON.parse(jsonValue)
        return data
    } catch (error) {
        console.log(error);
    }
}