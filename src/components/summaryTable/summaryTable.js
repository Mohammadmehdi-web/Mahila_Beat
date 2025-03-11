import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const SummaryTable = ({totalCount,totalArea}) => {
  const totalActivities = totalCount?.TotalActivities?.[0]?.TotalActivityCount || 0;
  const allComplaints = totalCount?.TotalComplaints?.[0]?.TotalComplaintCount || 0;
  const completedComplaints = totalCount?.TotalCompletedComplaints?.[0]?.TotalCompletedComplaints || 0;
  const samvadCounts = totalCount?.TotalConversations?.[0]?.TotalConversationCount || 0;
  const pendingComplaints = totalCount?.TotalPandingComplaints?.[0]?.TotalPandingComplaints || 0;
  

 console.log(totalActivities, "+", allComplaints,"+",completedComplaints,"+",samvadCounts,"+",pendingComplaints);
 console.log(totalArea);
 
  
  const SUMMARY = [
    { title: "कुल भ्रमण", value:totalActivities},
    { title: "कुल संवाद", value: samvadCounts },
    { title: "कुल शिकायत", value: allComplaints},
    { title: "कुल निस्तारित शिकायत", value: completedComplaints },
    { title: "कुल लंबित शिकायत", value: pendingComplaints },
  ];

  const formattedTotalArea = Array.isArray(totalArea)
  ? totalArea.map((item, index) => ({
      id: index + 1,
      area: item?.BeatAreaName || "अज्ञात क्षेत्र",
      visits: item?.CountActivity || 0,
    }))
  : [];
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
        {formattedTotalArea.length > 0 &&
        formattedTotalArea.map((item, index) => (
          <View key={index} style={[styles.row, index % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
            <Text style={styles.cell}>{item.id}.</Text>
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
