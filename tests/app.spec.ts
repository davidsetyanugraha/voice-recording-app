import { test, expect, chromium } from "@playwright/test";

const setupNewPage = async () => {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--use-fake-device-for-media-stream",
      "--use-fake-ui-for-media-stream",
    ],
  });

  const context = await browser.newContext({
    permissions: ["microphone"],
  });

  return await context.newPage();
};

// Test the whole fuctionality of the production app
test("App should work correctly", async () => {
  const page = await setupNewPage();
  await page.goto("https://voice-recording-app-one.vercel.app/");

  // verify if the page is loaded
  await expect(
    page.getByText("Press record button below to start recording...")
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Record" })).toBeVisible();

  // Click on the record button should start recording
  await page.getByRole("button", { name: "Record" }).click();
  await expect(page.getByText("Recording in progress...")).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stop" })).toBeVisible();

  // For realistic UX, wait for recording to start for 2 seconds
  await page.waitForTimeout(2000);

  // Click on the pause button should pause the recording
  await page.getByRole("button", { name: "Pause" }).click();
  await expect(
    page.getByText(
      "Press resume button to continue recording or stop button to end recording..."
    )
  ).toBeVisible();

  // Click on the resume button should resume the recording
  await page.getByRole("button", { name: "Resume" }).click();
  await expect(page.getByText("Recording in progress...")).toBeVisible();

  // Click on the stop button should stop the recording
  await page.getByRole("button", { name: "Stop" }).click();
  await expect(
    page.getByText("Converting voice to transcript...")
  ).toBeVisible();

  // Check if the recording is displayed with the transcript
  await expect(page.getByText("Your last recording:")).toBeVisible();
  await expect(page.getByText("Transcription:")).toBeVisible();
  await expect(page.getByRole("button", { name: "Record" })).toBeVisible();
});
