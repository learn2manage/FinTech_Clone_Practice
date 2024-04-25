import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
//import { Currency } from '@/interfaces/crypto';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const foo = async () => {
      const res = await fetch('/api/listings');
      const data = await res.json();
      console.log('🚀 ~ foo ~ data:', data);
    };
    foo();
  }, []);

  return (
    <View style={{ paddingTop: 200 }}>
      <Text>Crypto Page</Text>
    </View>
  );
};

export default Page;
