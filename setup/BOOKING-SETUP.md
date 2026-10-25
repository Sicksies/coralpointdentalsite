# Connecting the booking form to Google Sheets + email

When someone submits the booking form, the site sends the request to a small
Google Apps Script attached to your Google Sheet. The script adds a row to the
**Bookings** tab and emails you the details. It's free and needs no server.

## 1. Create the sheet and script

1. Make a new Google Sheet (for example, "Coral Point Bookings") in the Google
   account that should receive the requests.
2. In the sheet, open **Extensions → Apps Script**.
3. Delete what's in the editor, paste in all of `booking-apps-script.gs`, and
   change `NOTIFY_EMAIL` to the address that should get the emails.
4. Click **Save**.

## 2. Approve it and send a test

1. In the function dropdown at the top, pick **testSetup** and click **Run**.
2. Google asks you to authorize. Choose your account. If it says "Google hasn't
   verified this app," click **Advanced → Go to (project name)**. That's
   normal for your own scripts.
3. Check that a **Bookings** tab appeared with a "Test Patient" row and that
   the email arrived. Delete the test row afterwards.

## 3. Publish it as a web app

1. Click **Deploy → New deployment**, then the gear icon → **Web app**.
2. Set **Execute as: Me** and **Who has access: Anyone**. ("Anyone" only lets
   the form send requests in; it doesn't share your sheet.)
3. Click **Deploy** and copy the **Web app URL** (ends in `/exec`).

## 4. Connect the website

In `script.js`, find this line and paste the URL between the quotes:

```js
const BOOKING_URL = '';
```

Until this is set, the form tells visitors online booking isn't connected yet
and to call the office.

## If you change the script later

Changes don't go live until you redeploy: **Deploy → Manage deployments →
edit (pencil) → Version: New version → Deploy**. The URL stays the same.

## Using the sheet

Each row has a **Status** column that starts as "New". Change it to
"Called", "Booked", etc. as you follow up.
