import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeArea({ children, safeStyle }) {
  return (
    <SafeAreaView style={[styles.container, safeStyle]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    width: '100%'
  },
});
