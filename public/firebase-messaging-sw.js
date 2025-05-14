importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCpWosoTpwP4gX6udyVWstNNpt8mzAY_So",
  authDomain: "soufanglobal.firebaseapp.com",
  projectId: "soufanglobal",
  storageBucket: "soufanglobal.firebasestorage.app",
  messagingSenderId: "547523617756",
  appId: "1:547523617756:web:548bffe70420cd17036519",
  measurementId: "G-JXX1H28DF6",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const { title, body } = payload.notification;
  const notificationOptions = {
    body,
    icon: "/icons/icon-512x512.png",
  };

  self.registration.showNotification(title, notificationOptions);
});
