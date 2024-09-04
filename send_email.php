<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Email parameters
    $to = "contact@anonymous.nl"; // Your email address
    $subject = "New Contact Message from $name";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    // Prepare the email body
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message\n";
    
    // Send the email
    if (mail($to, $subject, $email_body, $headers)) {
        // Redirect to a thank you page
        header('Location: thank_you.html');
        exit;
    } else {
        // If email sending fails, redirect to an error page or show an error message
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    // If the form is not submitted properly, redirect to the contact form page
    header('Location: contact.html');
    exit;
}
?>
