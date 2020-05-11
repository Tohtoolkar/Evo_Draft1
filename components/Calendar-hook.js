/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {View, 
        Text, 
        StyleSheet, 
        FlatList, 
        Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function Calendar() {
    const [dateContext, setDateContext] = useState(moment());

    const [screenData, setScreenData] = useState(Dimensions.get('screen'));
    useEffect(() => {
          setScreenData(screenData => screenData || '350px');
    });
    
    const weekdaysShort = moment.weekdaysShort();

    const year = () => {
        return dateContext.format('Y');
    };
    const month = () => {
        return dateContext.format('MMMM');
    };
    const daysInMonth = () => {
        return dateContext.daysInMonth();
    };
    const currentDate = () => {
        return dateContext.get('date');
    };
    const currentDay = () => {
        return dateContext.format('D');
    };

    const firstDayOfMonth = () => {
        let firstDay = moment(dateContext).startOf("month").format("d");
        return firstDay;
    };

    const formatData = (dataList, numColumns) => {
        let totalRows = Math.floor(dataList.length / numColumns)
        let totalLastRows = dataList.length - (totalRows * numColumns)

        while(totalRows !== 0 && totalLastRows !== numColumns ) {
            dataList.push(" ")
            totalLastRows++
        }
        return dataList
    }

    const calendar = ({item, index}) =>{
        return (
          <View key={index} 
            style={{
            borderWidth:0.5, 
            borderColor:'#DADADA',    
            width:59,
            height:70, 
            alignItems: 'flex-end',
            justifyContent:'flex-start' ,
            padding:5,
            backgroundColor:'white' }}>
            <Text style={{color:'#DADADA'}} >{item}</Text>
          </View>
        )
    }

    const MonthYearNav = () => {
        return(
          <View style={{justifyContent:'center', paddingRight:4 }} >
            <Text style={styles.monthText} >
            {month()} &nbsp;
            {year()}
            </Text>
          </View>
        )
    }

    const see = () => {
        
    }

    const nextMonth = () =>{
        let dateObject = Object.assign({}, dateContext);
        dateObject = moment(dateObject).add(1, "month");
        setDateContext(dateObject)
    }

    const prevMonth = () =>{
        let dateObject = Object.assign({}, dateContext);
        dateObject = moment(dateObject).subtract(1, "month");
        setDateContext(dateObject)
    }


    const weekdays = weekdaysShort.map((day, index) => {
        return (
            <View style={{flex:1, width:55, alignItems:'center', margin:1 }}>
                <Text key={day}
                style={{
                    color: index == 0 ? 'red':'#000',
                    fontWeight: index == 0 ? 'bold' : index == 6? 'bold':'normal'
                }}
                >{day}</Text>
            </View> )});

    const blankSlots = [];
    for (let i = 0; i < firstDayOfMonth(); i++ ) {
        blankSlots.push(
            <Text style={{color:'white'}} >b</Text>
        );
    }
    
    var d = new Date();
    var n = d.getMonth();
    const daysInMonthSlots = [];
        for (let d = 1; d <= daysInMonth(); d++) {
            daysInMonthSlots.push(
            <Text key={d}
            style={{
                color: d==currentDate() && dateContext.format('M') == n+1 ? 'red': '#666',
                fontSize: d == currentDay() && dateContext.format('M') == n+1  ? 15 :13,
                fontWeight: d== currentDay() && dateContext.format('M') == n+1  ? 'bold' :'normal'
            }}
            >{d == currentDay() && dateContext.format('M') == n+1 ? <Text>Today</Text>: d }</Text>
            );
        }
        
    const totalSlots = [ ...blankSlots, ...daysInMonthSlots, ];
           
          
    return (
        <View>
            <View style={styles.viewBlock1}>
                <Button type='clear' icon={<Icon name="chevron-left" size={15} color="red"/>}
                    iconRight
                    onPress = {() => prevMonth()}/>
                <MonthYearNav />
                <Button type='clear' icon={<Icon name="chevron-right" size={15} color="red"/>}
                    iconRight
                    onPress = {() => nextMonth() }/>
            </View>
            
            <View style={{alignItems:'center'}} >
                <FlatList 
                    data={weekdays}
                    renderItem={({item})=> <View>{item}</View> }
                    keyExtractor={item => weekdays}
                    numColumns='7'/>
                <FlatList 
                    data={formatData(totalSlots, 7)}
                    renderItem={calendar}
                    keyExtractor={item => totalSlots}
                    numColumns ='7'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    calendarBlock: {
      flexDirection: 'row',
      justifyContent:'space-between',
      backgroundColor:'skyblue'
  
    },
    viewBlock1: {
        alignItems:'center', 
        flexDirection:'row', 
        justifyContent:'center',
        alignContent: 'space-around', 
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 1,
        width: 400,
        borderRadius: 7,
        margin: 5,
    },
    monthText:{
      fontSize:20, 
      paddingBottom:8, 
      color:'black',
      fontWeight:'bold',
      paddingTop: 5  
    }
  });
  