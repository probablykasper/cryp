# vidl-web
Cryptocurrency portfolio tracker

# ToDo
- Empty

# Get started
- **CRYP_ENV** environment variable in docker-compose.yml
    - Dev: **dev**
    - Production: **production**
- Fill in your Google API Client ID and Client Secret in web/src/modules/keys.js. To get that:
    1. Go to the [APIs section of GCP](https://console.cloud.google.com/apis/credentials) and create a project, then select it.
    2. Click "Create credentials" and "OAuth client ID".
    3. The Application type should be Web application. Now add your Authorized redirect URIs. Add "http://localhost/auth/google/callback" for local development and add another one for production, replacing "localhost" with your own domain name.
    4. Press "Create", and you'll be presented with your client ID and secret.

    Your keys.js file should have this format:
    ```javascript
    module.exports = {
        google: {
            clientID: "",
            clientSecret: ""
        }
    }
    ```
