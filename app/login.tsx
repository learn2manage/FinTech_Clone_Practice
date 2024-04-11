import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link, router, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

enum LoginInType {
    Phone,
    Email,
    Google,
    Apple,
}

const Page = () => {
    const [countryCode, setCountryCode] = useState('+852');
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();
    const { signIn } = useSignIn();

    const onLogin = async (type: LoginInType) => {
        if (type === LoginInType.Phone) {
            try {
                const completePhoneNumber = `${countryCode}${phoneNumber}`;
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: completePhoneNumber,
                });

                const firstPhoneFactor: any = supportedFirstFactors.find(
                    (factor: any) => {
                        return factor.strategy === 'phone_code';
                    }
                );
                const { phoneNumberId } = firstPhoneFactor;
                await signIn!.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId,
                });
                router.push({
                    pathname: '/verify/[phone]',
                    params: { phone: completePhoneNumber, signin: 'true' },
                });
            } catch (err) {
                console.log('error', JSON.stringify(err, null, 2));
                if (isClerkAPIResponseError(err)) {
                    if (err.errors[0].code === 'form_identifier_not_found') {
                        Alert.alert('Error', err.errors[0].message);
                    }
                }
            }
        }

        // way to by pass Login logic
        /* try {
            router.push({
                pathname: '/',
            });
        } catch (error) {
            console.log('🚀 ~ file: login.tsx:32 ~ onLogin ~ error:', error);
        } */
    };

    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Welcome back!</Text>
            <Text style={defaultStyles.descriptionText}>
                Enter your phone number associated with your account.
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
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

            <TouchableOpacity
                style={[
                    defaultStyles.pillButton,
                    phoneNumber !== '' ? styles.enabled : styles.disabled,
                    { marginBottom: 20 },
                ]}
                onPress={() => onLogin(LoginInType.Phone)}>
                <Text style={defaultStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                }}>
                <View
                    style={{
                        flex: 1,
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: '#000',
                    }}
                />
                <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
                <View
                    style={{
                        flex: 1,
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: '#000',
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => onLogin(LoginInType.Email)}
                style={[
                    defaultStyles.pillButton,
                    {
                        flexDirection: 'row',
                        gap: 16,
                        marginTop: 20,
                        backgroundColor: '#5fe494',
                    },
                ]}>
                <Ionicons name="mail" size={24} color={'#000'} />
                <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                    Continue with email{' '}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onLogin(LoginInType.Google)}
                style={[
                    defaultStyles.pillButton,
                    {
                        flexDirection: 'row',
                        gap: 16,
                        marginTop: 20,
                        backgroundColor: '#5fe494',
                    },
                ]}>
                <Ionicons name="logo-google" size={24} color={'#000'} />
                <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
                    Continue with Google{' '}
                </Text>
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
