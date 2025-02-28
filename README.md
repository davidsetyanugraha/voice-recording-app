# Voice Recording App

A modern **voice recording and transcription** web application built with **Vite, React, and TypeScript**. This app allows users to record audio and transcribe speech to text.

The application is hosted on Vercel and is accessible at https://voice-recording-app-one.vercel.app/. Automated deployments are configured for the main branch, ensuring that every new commit triggers a fresh deployment.

## Features

✅ Record audio using the browser microphone  
✅ Pause, resume, and stop recordings  
✅ Transcribe audio to text using AI  
✅ Play back previous recording  
✅ Mobile-friendly and fast performance

## Running development server locally

### Environment variable

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

To run all tests:

```
pnpm test
```

To watch changes while testing:

```
pnpm test:watch
```

## Technologies

🖥️ **Frontend**: React, TypeScript, Vite  
🔄 **State Management**: React Hooks  
🎨 **Styling**: TailwindCSS  
🚀 **CI/CD**: GitHub Pages, GitHub Actions  
🧪 **Testing**: Jest, React Testing Library
