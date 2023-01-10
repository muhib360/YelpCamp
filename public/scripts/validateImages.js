// let form = document.querySelector('.form')
// let img = document.querySelector('.img-limit');
// let feedback = document.querySelector('.invalid-feedback');
// let validFeedback = document.querySelector('.valid-feedback');
// let editForm = document.querySelector('.edit-form')
// let editImg = document.querySelector('.edit-img-limit');

// if (img) {
//     img.addEventListener('change', validateImage)
//     form.addEventListener('submit', validateImage)
// } else {
//     editImg.addEventListener('input', validateImageEdit)
//     editForm.addEventListener('submit', validateImageEdit)
// }


// function validateImageEdit(e) {
//     let images = parseInt(editImg.dataset.total) + editImg.files.length;
//     if (images > 5) {
//         e.preventDefault();
//         feedback.innerHTML = "Cannot upload more than 5 images"
//         e.target.value = null;
//     }

//     if (e.target.classList.contains('is-invalid')) {
//         e.target.classList.remove('is-valid')
//     } else if (e.target.classList.contains('is-valid')) {
//         e.target.classList.remove('is-invalid')
//     }
// }

// function validateImage(e) {
//     if (img.files.length > 5) {
//         e.preventDefault();
//         feedback.innerHTML = "Cannot upload more than 5 images"
//         e.target.classList.add('is-invalid')
//         e.target.classList.remove('is-valid')
//         e.target.value = null;
//         e.stopPropagation();
//     } else {
//         e.target.classList.add('is-invalid')
//         e.target.classList.remove('is-valid')
//         feedback.innerHTML = ""
//     }

//     if (e.target.classList.contains('is-invalid')) {
//         e.target.classList.remove('is-valid')
//     } else if (e.target.classList.contains('is-valid')) {
//         e.target.classList.remove('is-invalid')
//     }
// }
