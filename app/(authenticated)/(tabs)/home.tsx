import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import RoundBtn from '@/components/RoundBtn';
import Dropdown from '@/components/Dropdown';
import { useBalanceStore } from '@/store/balance-storage';

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: 100,
      date: new Date(),
      title: 'Add money',
    });
  };

  return (
    <ScrollView style={{ backgroundColor: '#58d894' }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.balance}>{balance()}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon={'add'} text={'Add Money'} onPress={onAddMoney} />
        <RoundBtn icon={'refresh'} text={'Exchange'} onPress={onAddMoney} />
        <RoundBtn icon={'list'} text={'Details'} onPress={onAddMoney} />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 30,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
