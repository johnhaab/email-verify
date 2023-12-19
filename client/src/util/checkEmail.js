/**
 * Simple function to check if a string is a valid email address.
 *
 * @param {string} inputText - The email that will be checked.
 */

export default function checkEmail(inputText) {
  // Define a regular expression pattern for email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Return true if the email matches the pattern, false otherwise
  return emailPattern.test(inputText);
}
