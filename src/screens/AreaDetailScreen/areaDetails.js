import React from 'react'
import { StyleSheet, View } from 'react-native'

import Header from '../../components/header/header'
import SummaryTable from '../../components/summaryTable/summaryTable'

const AreaDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Header 
        title="महिला बीट" 
        onMenuPress={() => console.log("Menu Pressed")}
        onProfilePress={() => console.log("Profile Pressed")}
      />
        <SummaryTable />
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        gap:10
    }
})

export default AreaDetails