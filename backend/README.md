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
        MAILTRAP_USER=(mailtrap inbox username)
        MAILTRAP_PASS=(mailtrap inbox password)
    
4. Once these are set up the profile should handle the rest of the email
in the handleSubmit function found in ResetPassword.jsx

# Using Gmail to reset passwords
This app is set up for accounts that end in gmail to receive an email in the actual mailbox.
To do this you must set up a "gmail app password" using the following steps.

1. Go to the Google Account page associated with the gmail.
2. Use the search bar and search for App passwords
3. Create a new app password and save this password to use in your .env folder
4. Set up the following variables in your .env folder
        GMAIL_USER=(Gmail to send the code to)
        GMAIL_PASS=(Gmail app password)