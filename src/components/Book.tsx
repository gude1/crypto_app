import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

interface BookProps {
  price: string;
  amount: string;
}
const Book: React.FC<BookProps> = ({ price = "", amount = "" }) => {
  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text>{price}</Text>
      </View>

      <View style={styles.cell}>
        <Text>{amount}</Text>
      </View>
    </View>
  );
};

export default memo(Book);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    alignItems: "center",
  },
});
