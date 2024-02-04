import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";

export type RootStackParamList = {
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={Home} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
