let feedback = document.querySelector('.invalid-feedback');
let editForm = document.querySelector('.edit-form')
let editImg = document.querySelector('.edit-img-limit');

editImg.addEventListener('change', validateImageEdit)
editForm.addEventListener('submit', validateImageEdit)

function validateImageEdit(e) {
    e.preventDefault();
    if (editImg.dataset.total > 5) {
        feedback.innerHTML = "Cannot upload more than 5 images"
        e.target.classList.add('is-invalid')
        e.target.classList.remove('is-valid')
        e.target.value = null;
        e.stopPropagation();
    } else if (editImg.files.length == 0) {
        feedback.innerHTML = ""
    } else if (e.target.classList.contains('is-valid')) {
        feedback.remove();
    }
}