import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { Providers } from '@/components/providers/Providers';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useSession } from '@/hooks/useSession';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { sessionAvailable }= useSession()

  return (
    
    <Providers >
<GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>

        <Stack.Protected guard={!sessionAvailable}  >
          <Stack.Screen name='login' />
        </Stack.Protected>
        <Stack.Protected guard={sessionAvailable}  >
          <Stack.Screen name='index' />
        </Stack.Protected>

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </GluestackUIProvider>
    </Providers>
    
  
  );
}
