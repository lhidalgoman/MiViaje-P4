import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp, vapidKey } from "../firebaseConfig";
import { useEffect } from "react";
//Instala las dependencias de npm para que esté ok la config y los imports
const listenEventsFromSW = () => {
  const channel = new BroadcastChannel("sw-messages");
  channel.addEventListener("message", (event) => {
    //   // TODO: aqui ya haz lo que necesites con la info de la notification
    console.log("Received in client!", event.data);
  });
};

const requestPermission = async (): Promise<boolean> => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
    return true;
  }

  // TODO: avisa al usuario de que no hay permisos para mostrar notificaciones

  return false;
};

const initFirebaseNotifications = async () => {
  const permission = await requestPermission();

  if (!permission) {
    return;
  }

  const messaging = getMessaging(firebaseApp);
  const token = await getToken(messaging, {
    vapidKey: vapidKey,
  });

  console.log("token", token);

  listenEventsFromSW();
};

export default function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("REACT NATIVE P4 NOTIFICATIONS OK");
    initFirebaseNotifications();
  }, []);

  return <>{children}</>;
}
