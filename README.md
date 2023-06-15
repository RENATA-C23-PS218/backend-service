This is the API service using Express JS and Cloud SQL to store the data. <br>

This service contains a few modules such as:

- Auth
  - Register
  - Login
  - OTP Verification
  - Forgot Password
- User
  - Profiles Identity
  - Scan Histories
- Plantation List
  - List of Plantation Data
  - Plantation Details

We also use another service to handle the information on growing plants that uses PaLM 2 LLM in [Growing Plants Service](https://github.com/RENATA-C23-PS218/growing-plants-service/) using Flask<br>

The API documentation can be accessed at [Renata Swagger API Documentation](https://renata-app.xyz/api/docs) <br>

This service is deployed on [Google Cloud Platform](https://cloud.google.com/) using Google Kubernetes Engine with Kustomize Tools<br>

---

RENATA (Rekomendasi Tumbuhan dan Tanah) is an application to provide recommendations for plants that are suitable for growing on certain soils. Our application works by scanning photo uploaded or taken by the user, then it will identify what soil is. After that, our application will show plant recommendations suitable for the soil.

## Developed By

| Student ID  | Name                                                         | Learning Path      |
| ----------- | ------------------------------------------------------------ | ------------------ |
| M151DSY3273 | [Indah Sitoresmi Hardyningseti](https://github.com/indahsh)  | Machine Learning   |
| M322DSX2541 | [Sinaga, Yohanes Fransisko](https://github.com/Yohanes-arch) | Machine Learning   |
| C368DSX3066 | [Gede Rico Wijaya](https://github.com/gricowijaya)           | Cloud Computing    |
| C368DSX2798 | [Wayan Deden Setyawan](https://github.com/yandens)           | Cloud Computing    |
| A155DSX2428 | [Audi Hagi](https://github.com/AudiHagi)                     | Mobile Development |
| A237DSY1694 | [Hayatun Nisa](https://github.com/niichaa03)                 | Mobile Development |
