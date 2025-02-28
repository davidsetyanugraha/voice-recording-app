import { test, expect, chromium } from "@playwright/test";

// Test the whole fuctionality of the production app
test("App should work correctly", async () => {
  // Launch browser with fake media stream flags
  const browser = await chromium.launch({
    headless: true, // Change to false for debugging
    args: [
      "--use-fake-device-for-media-stream", // Simulate a fake microphone
      "--use-fake-ui-for-media-stream", // Auto-approve microphone access
    ],
  });

  // Create a new browser context with microphone permission
  const context = await browser.newContext({
    permissions: ["microphone"],
  });

  // Create a new page in this context
  const page = await context.newPage();

  // visit page
  await page.goto("https://voice-recording-app-one.vercel.app/");

  // check if the page is loaded
  await expect(
    page.getByText("Press record button below to start recording...")
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Record" })).toBeVisible();

  // Record
  await page.getByRole("button", { name: "Record" }).click();
  await expect(page.getByText("Recording in progress...")).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();

  // Pause
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(
    page.getByText(
      "Press resume button to continue recording or stop button to end recording..."
    )
  ).toBeVisible();

  // Resume
  await page.getByRole("button", { name: "Resume" }).click();
  await expect(page.getByText("Recording in progress...")).toBeVisible();

  // Stop
  await page.getByRole("button", { name: "Stop" }).click();
  await expect(
    page.getByText("Converting voice to transcript...")
  ).toBeVisible();

  // Check if the recording is displayed with the transcript
  await expect(page.getByText("Your last recording:")).toBeVisible();
  await expect(page.getByText("Transcription:")).toBeVisible();
  await expect(page.getByRole("button", { name: "Record" })).toBeVisible();
});
