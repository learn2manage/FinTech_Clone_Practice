import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Currency } from '@/interfaces/crpyto';

const Page = () => {
    const currencies = useQuery({
        queryKey: ['listings'],
        queryFn: () => fetch('/api/listings').then((res) => res.json()),
    });

    const ids = currencies.data
        ?.map((currency: Currency) => currency.id)
        .join(',');
    console.log('🚀 ~ file: crypto.tsx:17 ~ Page ~ ids:', ids);
    const { data } = useQuery({
        queryKey: ['info', ids],
        queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
        enabled: !!ids,
    });

    return (
        <View style={{ paddingTop: 80 }}>
            {currencies.data?.map((currency: Currency) => (
                <View style={{ flexDirection: 'row' }} key={currency.id}>
                    <Image
                        source={{ uri: data?.[currency.id].logo }}
                        style={{ width: 40, height: 40 }}
                    />
                    <View style={{ flex: 1, gap: 6 }}>
                        <Text style={{ fontWeight: '600', color: Colors.dark }}>
                            {currency.name}
                        </Text>
                        <Text style={{ color: Colors.gray }}>
                            {currency.symbol}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default Page;
