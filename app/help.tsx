import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  return (
    <View>
      <Text>Help</Text>
      <Link
        href={'/test/testing'}
        style={[
          defaultStyles.pillButton,
          { flex: 1, backgroundColor: Colors.dark },
        ]}
        asChild>
        <TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: '500',
            }}>
            Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;
