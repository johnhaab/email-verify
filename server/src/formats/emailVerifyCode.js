const emailVerifyCode = (code) => {
  return `
        <!DOCTYPE html>
        <html>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>Your code:</h1>
                </div>
                <div class="email-body">
                  <p>${code}</p>
                </div>
                <div class="email-footer">
                  <p>ENTER THIS CODE ON THE "ENTER CODE" PAGE</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;
};

module.exports = emailVerifyCode;
