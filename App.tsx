import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import FactorialScreen from './src/screens/FactorialScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <FactorialScreen />
    </SafeAreaProvider>
  );
}
