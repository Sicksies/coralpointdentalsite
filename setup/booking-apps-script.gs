/**
 * Coral Point Dental — booking form receiver (Google Apps Script)
 *
 * Paste this whole file into Extensions → Apps Script in your Google Sheet,
 * set NOTIFY_EMAIL below, then deploy it as a web app. Each booking request
 * from the website is added as a row on the "Bookings" tab and emailed to you.
 */

// Where new booking notifications are sent. Separate several with commas.
const NOTIFY_EMAIL = 'you@example.com';

const SHEET_NAME = 'Bookings';
const HEADERS = ['Submitted', 'First name', 'Last name', 'Phone', 'Email',
                 'Services', 'Preferred times', 'New patient', 'Status'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);

    // Hidden "website" field is only ever filled in by spam bots
    if (data.website) return respond({ ok: true });

    const firstName = clean(data.firstName, 60);
    const lastName  = clean(data.lastName, 60);
    const phone     = clean(data.phone, 30);
    const email     = clean(data.email, 120);
    const services  = cleanList(data.services);
    const times     = cleanList(data.times);
    const newPatient = data.newPatient ? 'Yes' : 'No';

    if (!firstName || !lastName || !phone) {
      return respond({ ok: false, error: 'Missing name or phone.' });
    }

    getSheet().appendRow([new Date()].concat(
      [firstName, lastName, phone, email, services, times, newPatient, 'New'].map(sheetSafe)));

    const body = [
      'New appointment request from the website:',
      '',
      'Name:            ' + firstName + ' ' + lastName,
      'Phone:           ' + phone,
      'Email:           ' + (email || '—'),
      'Services:        ' + (services || '—'),
      'Preferred times: ' + (times || '—'),
      'New patient:     ' + newPatient,
      '',
      'All requests: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    ].join('\n');

    const mail = {
      to: NOTIFY_EMAIL,
      subject: 'New booking request: ' + firstName + ' ' + lastName,
      body: body,
    };
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) mail.replyTo = email;
    MailApp.sendEmail(mail);

    return respond({ ok: true });
  } catch (err) {
    console.error(err);
    return respond({ ok: false, error: 'Server error.' });
  } finally {
    lock.releaseLock();
  }
}

/** Run this once from the editor to approve permissions and test the email. */
function testSetup() {
  doPost({ postData: { contents: JSON.stringify({
    firstName: 'Test', lastName: 'Patient', phone: '305-555-0100',
    email: '', services: ['Cleanings & Prevention'], times: ['Tue AM'], newPatient: true,
  }) } });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

// Stop text like "=SUM(...)" being run as a formula in the sheet
function sheetSafe(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function cleanList(list) {
  if (!Array.isArray(list)) return '';
  return list.slice(0, 20).map(function (v) { return clean(v, 60); }).join(', ');
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
