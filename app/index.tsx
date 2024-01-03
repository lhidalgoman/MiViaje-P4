import { View } from "react-native";
import FontLoader from "../components/FontLoader";
import NavigationBar from "../components/NavBar";
import DayList from "../components/DayList";
import NotificationsProvider from "../providers/notifications.provider";
import { ScrollView } from "react-native-gesture-handler";

const HomePage = () => {
  return (
    <NotificationsProvider>
      <View
        style={{
          justifyContent: "center",
          padding: 0,
          backgroundColor: "#e8e3d9",
          width: "100%",
          alignItems: "center",
        }}
      >
        <FontLoader>
          <NavigationBar />
          <DayList />
        </FontLoader>
      </View>
    </NotificationsProvider>
  );
};
export default HomePage;
