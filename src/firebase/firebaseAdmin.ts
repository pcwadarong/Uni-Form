import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com', // Firebase 프로젝트의 데이터베이스 URL
  });
}

export { admin };
