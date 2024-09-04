# Friendore

Connect with people who share the same interests, passions or goals.

[Landing-page](/landing-page.jpeg)

## Features

- Creating user profile with email/password or google auth
- Admin panel with approval, needs changes and delete profile buttons
- Profile approval stage after signup
- **Connection page** to display people with similar hobbies or goals
- **Friends page** to display people who agreed to connect and share socials
- **Cron job** to find people with similar hobbies or goals for the **Connection page**
- **Cron job** to send emails with expiring connections (2 days before expiration date)
- **Cron job** to send emails with expiring friends (2 days before expiration date)
- Websocket to display notificiations on getting new connections or friends

## Services used for the app

- DB - Mongodb (self hosted)
- LLM - gpt4-o
- sending emails - https://www.brevo.com/

## Expenses:

- hetzner (front/back - €11/m)
- namecheap (domain/ssl - €16/y AND admin@domain.com - €11/y)
- llm (gpt4-o - $5/m)
