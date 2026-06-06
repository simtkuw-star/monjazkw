# Firestore Security Rules

انسخي هذه القواعد في Firebase:

Firestore Database -> Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{section}/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

هذه القواعد تجعل كل مستخدم يرى ويحفظ بياناته فقط، وتسمح بأقسام منظمة مثل:

- `profile`
- `achievements`
- `calendarEvents`
- `private` للبيانات القديمة أثناء النقل فقط
