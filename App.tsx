// https://reactnavigation.org/docs/hello-react-navigation?config=static#creating-a-native-stack-navigator

import * as React from 'react';
import {View, Text} from 'react-native';
import {
  createStaticNavigation,
  StackActions,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useLayoutEffect} from 'react';

function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // works fine
    navigation.navigate('Home');

    // (method) setOptions(options: Partial<{}>): void
    navigation.setOptions({});

    // Property 'replace' does not exist on type 'Omit<NavigationProp<RootParamList>, "getState"> & { getState(): Readonly<{ key: string; index: number; routeNames: string[]; history?: unknown[] | undefined; routes: NavigationRoute<...>[]; type: string; stale: false; }> | undefined; }'.
    navigation.replace();

    // no typecheck here
    navigation.dispatch(StackActions.popTo('123'));
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
