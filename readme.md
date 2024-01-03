Proyecto de React Native con Notificaciones Push de Firebase
Este proyecto de React Native permite recibir notificaciones push utilizando Firebase Cloud Messaging (FCM). A continuación, se describen los pasos para configurar y ejecutar el proyecto.

Requisitos Previos
Asegúrate de tener Node.js y npm instalados en tu sistema. Además, se requiere un emulador de Android/iOS / web de mozilla firefox para las notificaciones push.

Configuración Inicial
Clona este repositorio a tu sistema local:

git clone https://github.com/tu-usuario/tu-proyecto-react-native.git
Accede al directorio del proyecto:

cd tu-proyecto-react-native
Instala las dependencias del proyecto utilizando npm:

npm install
Instala @react-native-firebase/app y @react-native-firebase/messaging:

npm install @react-native-firebase/app @react-native-firebase/messaging
Instala TypeScript como una dependencia de desarrollo:

npm install typescript --save-dev
Instala otras dependencias necesarias:
npx expo install --fix
npm install react-native-svg
Iniciar el Proyecto
Una vez que hayas configurado las dependencias y el proyecto, puedes iniciar la aplicación de React Native:
npm run start
Notas Importantes
Este proyecto está diseñado para funcionar en Mozilla Firefox o navegadores de Apple, además de aplicaciones ios/android. Algunas funcionalidades pueden no ser compatibles con otros navegadores.

Para revisar en local las notificaciones, puedes probar a lanzar una notificación nueva de prueba desde firebase y revisando que se lanza, mostrandote una notificación.