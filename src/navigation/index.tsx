import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./RootStackNavigator";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
