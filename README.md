# Voice Recording App

A modern **voice recording and transcription** web application built with **Vite, React, and TypeScript**. This app allows users to record audio and transcribe speech to text.

The application is hosted on Vercel and is accessible at https://voice-recording-app-one.vercel.app/. Automated deployments are configured for the main branch, ensuring that every new commit triggers a fresh deployment.

## Features

✅ Record audio using the browser microphone  
✅ Pause, resume, and stop recordings  
✅ Transcribe audio to text using AI  
✅ Play back the recording  
✅ Offline support and mobile-friendly

## Demo

https://www.loom.com/share/ef6dacbcd4644773840c5b6c633d17e6?sid=f6247511-0a10-412b-84b6-e29adf3c3697

## Running development server locally

Create `.env` file in the root directory :

```
VITE_OPENAI_API_KEY=<open-ai-api-key>
```

---

If you haven't installed PNPM yet, install by:

Using Homebrew (macOS/Linux)

```
brew install pnpm
```

or using curl:

```
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

---

Install dependencies:

```
pnpm install
```

---

Start the Development Server:

```
pnpm dev
```

## Running Tests

To run unit tests:

```
pnpm test
```

To watch changes while testing:

```
pnpm test:watch
```

To run e2e tests against production URL:

```
pnpm test:e2e
```

## Technologies

🖥️ **Frontend**: React, TypeScript, Vite  
🔄 **State Management**: React Hooks  
🎨 **Styling**: TailwindCSS  
🚀 **CI/CD**: Vercel, GitHub Actions  
🧪 **Testing**: Jest, React Testing Library, Playwright
