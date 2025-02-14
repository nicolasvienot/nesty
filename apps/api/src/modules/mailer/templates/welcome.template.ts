export interface WelcomeTemplateData {
  name: string;
  loginUrl: string;
}

export default function ({ name, loginUrl }: WelcomeTemplateData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Nesty</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            text-align: center;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            font-weight: 700;
          }
          p {
            color: #555;
            font-weight: 400;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 20px 0;
            background: #007bff;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            font-size: 16px;
            transition: background 0.3s ease-in-out;
          }
          .button:hover {
            background: #0056b3;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Welcome to Nesty, ${name}! 🎉</h1>
          <p>We're thrilled to have you join our community!</p>
          
          <p>Here’s what you can do to get started:</p>
          <ul>
            <li>Complete your profile</li>
            <li>Create your first project</li>
            <li>Connect with other members</li>
          </ul>

          <a href="${loginUrl}" class="button">Get Started</a>

          <p>If you have any questions, our support team is here to help.</p>
          
          <p class="footer">This email was sent because you signed up for Nesty.</p>
        </div>
      </body>
    </html>
  `;
}
