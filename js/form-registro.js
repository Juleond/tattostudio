const formulario = document.querySelector('#formRegistro');

// Selección de inputs obligatorios basados en sus ID exactos
const inputNombre = document.querySelector('#name');
const inputUsuario = document.querySelector('#userName');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputConfirmPassword = document.querySelector('#confirmPassword');
const inputBirthdate = document.querySelector('#birthdate');
const inputDispatchAddress = document.querySelector('#dispatchAddress');

formulario.addEventListener('submit', function(event) {
    // Evita que la página se recargue por defecto al enviar el formulario
    event.preventDefault();
    
    let hayErrores = false;

    // ==========================================
    // 1. VALIDACIÓN DE CAMPOS OBLIGATORIOS SIMPLES
    // ==========================================
    
    // Nombre completo
    const feedbackNombre = inputNombre.nextElementSibling;
    if (inputNombre.value.trim() === '') {
        feedbackNombre.classList.add('d-block');
        hayErrores = true;
    } else {
        feedbackNombre.classList.remove('d-block');
    }

    // Nombre de usuario
    const feedbackUsuario = inputUsuario.nextElementSibling;
    if (inputUsuario.value.trim() === '') {
        feedbackUsuario.classList.add('d-block');
        hayErrores = true;
    } else {
        feedbackUsuario.classList.remove('d-block');
    }

    // Email
    const feedbackEmail = inputEmail.nextElementSibling;
    if (inputEmail.value.trim() === '') {
        feedbackEmail.classList.add('d-block');
        hayErrores = true;
    } else {
        feedbackEmail.classList.remove('d-block');
    }

    // ==========================================
    // 2. VALIDACIÓN DE CONTRASEÑA Y FORMATO (Regex)
    // ==========================================
    const patronPass = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{6,18}$/;
    const feedbackPasswordRegex = inputPassword.nextElementSibling.nextElementSibling.nextElementSibling;
    const feedbackPassword = inputPassword.nextElementSibling.nextElementSibling;

    if (inputPassword.value.trim() === '') {
        feedbackPassword.classList.add('d-block');         // Muestra error de campo vacío
        feedbackPasswordRegex.classList.remove('d-block'); // Oculta error de formato
        hayErrores = true;
    } else if (!patronPass.test(inputPassword.value)) {
        feedbackPassword.classList.remove('d-block');      // Oculta error de vacío
        feedbackPasswordRegex.classList.add('d-block');    // Muestra error de formato
        hayErrores = true;
    } else {
        feedbackPassword.classList.remove('d-block');
        feedbackPasswordRegex.classList.remove('d-block');
    }

    // ==========================================
    // 3. VALIDACIÓN DE CONFIRMACIÓN DE CONTRASEÑA
    // ==========================================
    const feedbackConfirmPassword = inputConfirmPassword.nextElementSibling;
    
    if (inputConfirmPassword.value.trim() === '') {
        feedbackConfirmPassword.classList.add('d-block');
        hayErrores = true;
    } else if (inputConfirmPassword.value !== inputPassword.value) {
        // Se corrigió comparando los .value y utilizando un flujo excluyente
        feedbackConfirmPassword.classList.add('d-block');
        hayErrores = true;
    } else {
        feedbackConfirmPassword.classList.remove('d-block');
    }
    
    // ==========================================
    // 4. VALIDACIÓN DE EDAD Y FECHA DE NACIMIENTO
    // ==========================================
    const feedbackBirthdate = inputBirthdate.nextElementSibling;

    if (inputBirthdate.value.trim() === '') {
        feedbackBirthdate.classList.add('d-block');
        hayErrores = true;
    } else {
        // Creamos los objetos de fecha solo si el campo no está vacío
        const birthDate = new Date(inputBirthdate.value);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Ajuste exacto si aún no cumple años en el año actual
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            feedbackBirthdate.classList.add('d-block');
            hayErrores = true;
        } else {
            feedbackBirthdate.classList.remove('d-block');
        }
    }

    // ==========================================
    // 5. EVALUACIÓN FINAL DE ENVÍO
    // ==========================================
    if (!hayErrores) {
        // Estructuramos los datos en un objeto limpio listo para el servidor
        const nuevoUsuario = {
            nombre: inputNombre.value.trim(),
            username: inputUsuario.value.trim(),
            email: inputEmail.value.trim(),
            password: inputPassword.value,
            birthdate: inputBirthdate.value,
            dispatchAddress: inputDispatchAddress.value.trim()
        };

        console.log("¡Formulario validado con éxito! Objeto listo para enviar:", nuevoUsuario);
        // Aquí puedes agregar tu lógica de envío con fetch() en el futuro
    } else {
        console.log("El formulario contiene errores y no se puede enviar.");
    }
});