import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventScreen from '../screens/eventScreen';
import SearchScreen from '../screens/searchScreen';
import FavoriteScreeen from '../screens/favoriteScreeen';
import ProfileScreen from '../screens/profileScreen';

const Tab = createBottomTabNavigator();

// ✅ Move this outside to avoid ESLint warning
const getScreenOptions = ({ route }) => ({
  tabBarActiveTintColor: '#2196f3',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    switch (route.name) {
      case 'Search':
        iconName = focused ? 'search' : 'search-outline';
        break;
      case 'Events':
        iconName = focused ? 'calendar' : 'calendar-outline';
        break;
      case 'Favorite':
        iconName = focused ? 'heart' : 'heart-outline';
        break;
      case 'Profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      default:
        iconName = 'ellipse-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Events" screenOptions={getScreenOptions}>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreeen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
