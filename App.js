import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStaticNavigation, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeScreen = () => {
  const navigation = useNavigation();
  // 복잡한 구조인 경우에만 필요하다.
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style = {{fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
      <Button
        title="상세 화면으로 이동"
        onPress={() => {
          // 네비게이션을 통해 Detail 화면으로 이동
          navigation.navigate('Detail');
        }}
      />
    </View>
  );
}

const DetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style = {{fontSize: 40, fontWeight: "bold" }}>상세 화면</Text>
      <Button
        title="홈으로 이동"
        onPress={() => {
          // 네비게이션을 통해 Detail 화면으로 이동
          navigation.push('Detail');
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
