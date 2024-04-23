import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import RoundBtn from '@/components/RoundBtn';
import Dropdown from '@/components/Dropdown';
import { useBalanceStore } from '@/store/balance-storage';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { center } from '@shopify/react-native-skia';
import WidgetList from '@/components/SortableList/WidgetList';

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Add money',
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#58d894' }}
      contentContainerStyle={{
        paddingTop: 0,
      }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.balance}>{balance()}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon={'add'} text={'Add Money'} onPress={onAddMoney} />
        <RoundBtn
          icon={'refresh'}
          text={'Exchange'}
          onPress={clearTransactions}
        />
        <RoundBtn icon={'list'} text={'Details'} />
        <Dropdown />
      </View>
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>
            No Transactions yet
          </Text>
        )}
        {transactions.reverse().map((transaction) => (
          <View
            key={transaction.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}>
            <View style={styles.circle}>
              <Ionicons
                name={transaction.amount > 0 ? 'add' : 'remove'}
                size={24}
                color={Colors.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {/* when coding and debug in different machines/devices, the existing 
                 store may have date format incompatible that cause type error,
                 a simple fix is change to toString(), clear trans and apply toLocaleDateString again */}
                {transaction.date.toString()}
                {/* {transaction.date.toLocaleDateString()} */}
              </Text>
            </View>
            <Text>${transaction.amount}</Text>
          </View>
        ))}
      </View>
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
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
    backgroundColor: '#5c8def',
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
