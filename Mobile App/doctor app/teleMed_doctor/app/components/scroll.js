import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function CustomScroll ({ children, scrollStyle,...props }) {
  return (
   <ScrollView style={[styles.scroll, {scrollStyle}]} {...props}>
        {children}
   </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    marginBottom: '20%'
  }
});
