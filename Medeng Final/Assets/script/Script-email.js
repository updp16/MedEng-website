
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    let valid = true;

    // Collect form values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Reset error messages
    document.getElementById('first-name-error').style.display = 'none';
    document.getElementById('last-name-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('phone-error').style.display = 'none';
    document.getElementById('message-error').style.display = 'none';

    // Validate each field
    if (!firstName) {
        document.getElementById('first-name-error').style.display = 'block';
        valid = false;
    }
    if (!lastName) {
        document.getElementById('last-name-error').style.display = 'block';
        valid = false;
    }
    if (!email || !email.includes('@')) {
        document.getElementById('email-error').style.display = 'block';
        valid = false;
    }
    if (!phone) {
        document.getElementById('phone-error').style.display = 'block';
        valid = false;
    }
    if (!message) {
        document.getElementById('message-error').style.display = 'block';
        valid = false;
    }

    // If the form is valid, proceed with sending the email
    if (valid) {
        const params = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            message: message,
            to_email: email
        };

        emailjs.send("service_onppsxh", "template_9b66tuj", params)
            .then(function(response) {
                alert('SUCCESS! Email sent to the user.');

                // Clear the form after successful submission
                document.getElementById('contact-form').reset();
            }, function(error) {
                alert('FAILED... ' + JSON.stringify(error));
            });
    }
});