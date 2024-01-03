importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

// Esto tienes que meterlo a mano. no puedes importar el environment. se podria hacer algo, pero me da pereza XD
firebase.initializeApp({
  apiKey: "AIzaSyB4rqztaiHd9-9I9cYdkkIP8tkwFHG5ipQ",
  authDomain: "miviajep2.firebaseapp.com",
  projectId: "miviajep2",
  storageBucket: "miviajep2.appspot.com",
  messagingSenderId: "767542129819",
  appId: "1:767542129819:web:531c6e4b2340131a75c23e",
  measurementId: "G-72MLM376HD"
});

const messaging = firebase.messaging();
const channel = new BroadcastChannel("sw-messages");

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // TODO: aqui puedes tunear la notifacion si lo necesitas
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
  // Pasamos el contenido de la notification al cliente
  channel.postMessage(payload);
});
