import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { OpaqueColorValue } from "react-native";


// Icon of Home
function tabBarIcon_Home(
  color: string | OpaqueColorValue | undefined, 
  focused: boolean
){
  return (
    <Ionicons
      name={ focused ? 'home-sharp' : 'home-outline' }
      color={ color }
      size={ 24 }
    ></Ionicons>
  )
}

// Icon of About
function tabBarIcon_About(
  color: string | OpaqueColorValue | undefined, 
  focused: boolean
){
  return (
    <Ionicons
      name={ focused ? 'information-circle' : 'information-circle-outline' }
      color={ color }
      size={ 24 }
    ></Ionicons>
  )
}

// Adding bottom tab
export default function TabLayout() {
  return (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#ffd33d",
      headerStyle: {
        backgroundColor: '#25292e',
      },
      headerShadowVisible: false,
      headerTintColor: '#ffffff',
      tabBarStyle: {
        backgroundColor: '#25292e',
      },
    }}
  >
    <Tabs.Screen 
      name="index" 
      options={{ 
        title: "Home",
        tabBarIcon: (({color, focused})=>(tabBarIcon_Home(color, focused)))
      }}
    ></Tabs.Screen>
    <Tabs.Screen 
      name="about" 
      options={{ 
        title: "About",
        tabBarIcon: (({color, focused})=>(tabBarIcon_About(color, focused)))
      }}
    ></Tabs.Screen>
  </Tabs>  
  );
}
