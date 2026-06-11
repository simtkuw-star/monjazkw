# Firestore Security Rules

انسخي هذه القواعد في:

Firebase Console -> Firestore Database -> Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{section}/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /publicShares/{userId} {
      allow read: if resource.data.active == true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

هذه القواعد تعني:

- بيانات كل مستخدم الخاصة داخل `users` لا يراها إلا صاحب الحساب.
- صفحة المشاركة العامة تقرأ فقط من `publicShares`.
- إذا عطلت المشاركة من الإعدادات، يصبح الرابط العام غير متاح.
