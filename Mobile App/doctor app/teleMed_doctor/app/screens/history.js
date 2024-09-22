import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SafeArea from '../components/safeArea';

export default function History ({ navigation }) {
return (
    <SafeArea>
      <View style={styles.container}>
        <Text>History</Text>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', 
  },
})
