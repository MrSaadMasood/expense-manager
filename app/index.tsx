import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/auth/useAuth';
import { Text, View } from 'react-native';


export default function HomeScreen() {

  const logout = useLogout()

  function handleLogout() {
    logout.mutate()
  }

  return (
    <View >
      <Button  onPress={handleLogout} >
        <Text className='  text-black '>Logout</Text>
      </Button>
      <Text>Protected route here</Text></View>
  );
}