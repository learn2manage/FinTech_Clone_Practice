import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link, router, useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';

const Page = () => {
    const [countryCode, setCountryCode] = useState('+852');
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();
    const { signUp, setActive } = useSignUp();

    const onSignup = async () => {
        const completePhoneNumber = `${countryCode}${phoneNumber}`;

        try {
            await signUp!.create({
                phoneNumber: completePhoneNumber,
            });
            signUp!.preparePhoneNumberVerification();

            router.push({
                pathname: '/verify/[phone]',
                params: { phone: completePhoneNumber },
            });
        } catch (error) {
            console.error('Error signing up:', error);
        }

        /* router.push({
            pathname: '/verify/[phone]',
            params: { phone: completePhoneNumber },
        }); */
    };

    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Let's get started</Text>
            <Text style={defaultStyles.descriptionText}>
                Enter your phone number. We will send you a confirmation code.
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, { flex: 0.5 }]}
                    placeholder="Country Code"
                    placeholderTextColor={Colors.gray}
                    keyboardType="numeric"
                    value={countryCode}
                    onChangeText={setCountryCode}
                />
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Mobile Number"
                    placeholderTextColor={Colors.gray}
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
            <Link href={'/login'} replace asChild>
                <TouchableOpacity>
                    <Text style={defaultStyles.textLink}>
                        Already have an account? Log in
                    </Text>
                </TouchableOpacity>
            </Link>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
                style={[
                    defaultStyles.pillButton,
                    phoneNumber !== '' ? styles.enabled : styles.disabled,
                    { marginBottom: 20 },
                ]}
                onPress={onSignup}>
                <Text style={defaultStyles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 40,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: Colors.lightGray,
        padding: 20,
        borderRadius: 16,
        fontSize: 20,
        marginRight: 10,
    },
    enabled: {
        backgroundColor: Colors.primary,
    },
    disabled: {
        backgroundColor: Colors.primaryMuted,
    },
});

export default Page;
