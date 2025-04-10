# Database migrations
To migrate changes of a model go to the migrations folder.
Under go to the migrate file associated with the migrations and run node filename.js
ex: node migrateUsers.js and the migrations should be updated in the collection

# Using Mailtrap to reset passwords
To use Mailtrap to receive an email with a confirmation code follow these steps:

1. Go to Mailtrap.io and log in.
2. Choose the inbox you're using under the Email testing tab.
3. Confirm SMTP Settings this can be found in the mail box
    - Host: "sandbox.smtp.mailtrap.io"
    - Port: 2525
    - User & Password: Add the following 2 values to your .env folder:
    EMAIL_USER=(your username for the inbox)
    EMAIL_PASS=(your password for the inbox)

4. Once these are set up the profile should handle the rest of the email
in the handleSubmit function found in ResetPassword.jsx