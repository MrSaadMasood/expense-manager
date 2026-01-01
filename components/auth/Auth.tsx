import { Input, InputField } from '@/components/ui/input';
import { useSignIn, useSignUp } from '@/hooks/auth/useAuth';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonText } from '../ui/button';
import { Text } from '../ui/text';


export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signInWithEmail = useSignIn()
  const signUpWithEmail = useSignUp()

  function handleSignIn() {
    signInWithEmail.mutate({ email, password })
  }

  function handleSignUp () {
    signUpWithEmail.mutate({ email, password })
  }


  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
         <Text className="text-typography-500">Email</Text>
          <Input >
            <InputField autoCapitalize='none' placeholder='Email' type={"text"} 
            onChangeText={text => setEmail(text) } />
          </Input>
      </View>
      <View style={styles.verticallySpaced}>
         <Text className="text-typography-500">Password</Text>
          <Input >
            <InputField autoCapitalize='none' placeholder='Password' type={"text"} 
            onChangeText={text => setPassword(text) } />
          </Input>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button onPress={handleSignIn} variant="solid" size="md" action="primary">
          <ButtonText>Sign In</ButtonText>
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button onPress={handleSignUp} variant="solid" size="md" action="primary">
          <ButtonText>Sign up</ButtonText>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})