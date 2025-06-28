(function () {
    'use strict';

    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                form.classList.remove('was-validated'); 
                
                let isFormValid = true; 

                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    isFormValid = false;
                } 
                
                if (isFormValid && !customValidateForm()) { 
                    event.preventDefault();
                    event.stopPropagation();
                    isFormValid = false;
                }

                if (!isFormValid) {
                    form.classList.add('was-validated'); 
                } else {
                    event.preventDefault(); 
                    event.stopPropagation(); 

                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();

                    form.reset(); 
                }

            }, false);
        });

    function customValidateForm() {
        let isValid = true; 

        const cardNumberInput = $('#tarjeta');
        const cardNumber = cardNumberInput.val().replace(/\s/g, ''); 
        const cardNumberPattern = /^\d{16}$/; 
        if (!cardNumberPattern.test(cardNumber)) {
            cardNumberInput.removeClass('is-valid').addClass('is-invalid');
            cardNumberInput.next('.invalid-feedback').text('El número de tarjeta debe tener 16 dígitos.');
            isValid = false;
        } else {
            cardNumberInput.removeClass('is-invalid').addClass('is-valid');
        }

        const cvvInput = $('#cvv');
        const cvv = cvvInput.val();
        const cvvPattern = /^\d{3,4}$/; 
        if (!cvvPattern.test(cvv)) {
            cvvInput.removeClass('is-valid').addClass('is-invalid');
            cvvInput.next('.invalid-feedback').text('El CVV debe tener 3 o 4 dígitos.');
            isValid = false;
        } else {
            cvvInput.removeClass('is-invalid').addClass('is-valid');
        }
        
        const horaInput = $('#hora');
        const selectedDateTime = new Date(horaInput.val());
        const now = new Date();
        now.setSeconds(0); 
        now.setMilliseconds(0); 

        if (isNaN(selectedDateTime.getTime()) || selectedDateTime <= now) {
            horaInput.removeClass('is-valid').addClass('is-invalid');
            horaInput.next('.invalid-feedback').text('La fecha y hora de la cita deben ser en el futuro.');
            isValid = false;
        } else {
            horaInput.removeClass('is-invalid').addClass('is-valid');
        }

        return isValid;
    }

    $('input, select, textarea').on('focus', function() {
        $(this).addClass('focused-field');
    }).on('blur', function() {
        $(this).removeClass('focused-field');
    });

    $('#tarjeta').on('input', function() {
        let value = $(this).val().replace(/\D/g, ''); 
        if (value.length <= 16) { 
            value = value.replace(/(\d{4})(?=\d)/g, '$1 '); 
        }
        $(this).val(value.trim()); 
    });

    $('#successModal').on('hidden.bs.modal', function () {
    });

})();