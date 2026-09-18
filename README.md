# Nuzio AI — Full Stack Assignment

Nuzio AI is a personalized audio-news onboarding experience built from the provided Figma design.

The project implements the onboarding flow using a React + Vite frontend and an Express + MongoDB backend, with Google authentication and persistent user preferences.

---

## ✨ Features

- Figma-based responsive onboarding UI
- Language selection
- Google authentication
- JWT-based authentication using HTTP-only cookies
- MongoDB user persistence
- Profession selection
- Multi-select niche preferences
- Narrator voice selection
- Brief length selection
- Daily delivery time selection
- Notification preferences
- Persisted onboarding state
- Resumable onboarding flow
- Final "All Set" profile summary
- Protected backend APIs
- Production frontend/backend deployment support

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS
- Fontsource
  - Hanken Grotesk
  - Instrument Serif
  - Geist Mono
- `@react-oauth/google`

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Google OAuth / Google Identity
- HTTP-only cookies
- CORS

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure

```text
Nuzio_Assignment/
│
├── Frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── components/
│       │   │   └── onboarding/
│       │   │       ├── OnboardingFrame.jsx
│       │   │       ├── ChoiceChip.jsx
│       │   │       ├── VoiceCard.jsx
│       │   │       ├── OptionButton.jsx
│       │   │       ├── TimePicker.jsx
│       │   │       ├── NotificationPreview.jsx
│       │   │       ├── NotificationItem.jsx
│       │   │       └── ProfileSummary.jsx
│       │   │
│       │   ├── pages/
│       │   │   ├── Language.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Profession.jsx
│       │   │   ├── Niches.jsx
│       │   │   ├── Voice.jsx
│       │   │   ├── Time.jsx
│       │   │   ├── Notifications.jsx
│       │   │   ├── AllSet.jsx
│       │   │   └── Home.jsx
│       │   │
│       │   ├── api/
│       │   ├── utils/
│       │   ├── App.jsx
│       │   └── main.jsx
│       │
│       ├── .env.example
│       └── package.json
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   └── server.js
    │
    ├── .env.example
    └── package.json
