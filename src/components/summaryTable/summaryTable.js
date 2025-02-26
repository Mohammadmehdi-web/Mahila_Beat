import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const DATA = [
  { id: "1", area: "अमर कालोनी", visits: 4 },
  { id: "2", area: "कच्चा एतमादपुर", visits: 3 },
  { id: "3", area: "आगवार", visits: 2 },
  { id: "4", area: "गली गज्जू", visits: 0 },
  { id: "5", area: "ओंकारपुर", visits: 0 },
  { id: "6", area: "गली जस्सा", visits: 0 },
  { id: "7", area: "अमर बिहार कालोनी", visits: 0 },
  // Add more rows to test scroll behavior
];

const SUMMARY = [
  { title: "कुल भ्रमण", value: 9 },
  { title: "कुल संवाद", value: 3 },
  { title: "कुल शिकायत", value: 3 },
  { title: "कुल निस्तारित शिकायत", value: 3 },
  { title: "कुल लंबित शिकायत", value: 2 },
];

const SummaryTable = () => {
  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>क्रम सं०</Text>
        <Text style={styles.headerText}>क्षेत्र का नाम</Text>
        <Text style={styles.headerText}>कुल भ्रमण</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Table Rows */}
        {DATA.map((item, index) => (
          <View key={item.id} style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
            <Text style={styles.cell}>{index + 1}.</Text>
            <Text style={styles.cell}>{item.area}</Text>
            <Text style={styles.cell}>{item.visits}</Text>
          </View>
        ))}

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          {SUMMARY.map((summaryItem, index) => (
            <View key={index} style={styles.summaryItem}>
              <Text style={styles.summaryText}>{summaryItem.title}</Text>
              <Text style={styles.summaryValue}>{summaryItem.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal:"3%"
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#E91E63",
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1, // Makes summary stay at the bottom if rows are few
    paddingBottom: 10, // Prevents summary from touching the bottom
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rowEven: {
    backgroundColor: "#fff",
  },
  rowOdd: {
    backgroundColor: "#FCE4EC",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "#333",
    fontSize: 14,
  },
  summaryContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E91E63",
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E91E63",
  },
  summaryText: {
    color: "#E91E63",
    fontWeight: "bold",
  },
  summaryValue: {
    color: "#E91E63",
    fontWeight: "bold",
  },
});

export default SummaryTable;
