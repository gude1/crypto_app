import { View, StyleSheet, Text } from "react-native";

interface TableProps {
  data: string[][];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <View>
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} style={styles.cell}>
              <Text style={styles.tableText}>{cell}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
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

  tableText: {
    color: "black",
  },
});

export default Table;
