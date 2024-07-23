import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string, url: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Next-Auth - please confirm your email',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    <meta http-equiv="refresh" content="5;url=https://yourwebsite.com/dashboard">
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            text-align: center;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #4CAF50;
        }
        p {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Confirmation!</h1>
        <p>Thank you for registering in our product.</p>
        <p>Please confirm email by <a href="http://localhost:3000/${url}/?token=${token}">click here</a>.</p>
    </div>
</body>
</html>
`
    })
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Next-Auth - please confirm your email',
        html: `<p>Your 2FA toke is ${token}</p>`
    })
}