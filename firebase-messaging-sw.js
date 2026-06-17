// Firebase Messaging Service Worker
// هذا الملف لازم يكون في نفس مجلد index.html على GitHub

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBhi-RvSSnFMP_fvTZE7sxV6n-FqGaJpBs",
  authDomain: "software-manager-408c5.firebaseapp.com",
  databaseURL: "https://software-manager-408c5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "software-manager-408c5",
  storageBucket: "software-manager-408c5.firebasestorage.app",
  messagingSenderId: "905460059114",
  appId: "1:905460059114:web:a08a44f61ebb1fc8e24093"
});

var messaging = firebase.messaging();

// استقبال الإشعارات لما التطبيق في الخلفية
messaging.onBackgroundMessage(function(payload) {
  var title = payload.notification.title || 'إدارة السوفتوير';
  var body  = payload.notification.body  || '';
  self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    dir: 'rtl',
    lang: 'ar'
  });
});
