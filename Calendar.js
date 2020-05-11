/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import moment from 'moment';
import {View, 
        Text, 
        StyleSheet, 
        FlatList, 
        TouchableOpacity,
        ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';




const dataList =[{key:'2'},{key:'3'}]
class Calendar extends Component {
  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false,
  };

  constructor(props) {
    super(props);
    this.width = props.width || '350px';
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.months();


  year = () => {
    return this.state.dateContext.format('Y');
  };
  month = () => {
    return this.state.dateContext.format('MMMM');
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  currentDate = () => {
    return this.state.dateContext.get('date');
  };
  currentDay = () => {
    return this.state.dateContext.format('D');
  };

  firstDayOfMonth = () => {
    let a = this.state.dateContext;
    let firstDay = moment(a).startOf("month").format("d");
    return firstDay;
  };

  formatData = (dataList, numColumns) => {
    const totalRows = Math.floor(dataList.length / numColumns)
    let totalLastRows = dataList.length - (totalRows * numColumns)

    while(totalRows !== 0 && totalLastRows !== numColumns ) {
      dataList.push(" ")
      totalLastRows++
    }
    return dataList
  }

  carlendar = ({item, index}) =>{
    return (
      <TouchableOpacity>
      <View key={index} 
      style={{
      borderWidth:0.5, 
      borderColor:'#DADADA',    
      width:59,
      height:70, 
      alignItems: 'flex-end',
      justifyContent:'flex-start' ,
      padding:5,
      backgroundColor:'red'
      
      }}>
        <Text style={{color:'#DADADA'}} >{item}</Text>
      </View>
      </TouchableOpacity>
    )
  }




  MonthNav = () => {
    return(
      <View style={{justifyContent:'center', paddingRight:4 }} >
        <Text style={styles.monthText} >
        {this.month()}
        </Text>
      </View>
    )
  }

  setMonth = month => {
    let monthNo = this.months.indexOf(month);
    let dateObject = Object.assign({}, this.state.dateContext );
    dateObject = moment(dateObject).set("month", monthNo);
    this.setState({
      dateContext: dateObject
    });
  };

  nextMonth = () =>{
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "month");
    this.setState({
      dateContext: dateContext
    });
  }

  prevMonth = () =>{
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "month");
    this.setState({
      dateContext: dateContext
    });

  }


  
  

  render() {


    let weekdays = this.weekdaysShort.map((day, index) => {
      return <View style={{
        flex:1,
        
        width:55, 
        alignItems:'center',
        margin:1 }} >
        <Text 
        key={day}
        style={{
          color: index == 0 ? 'red':'#000',
          fontWeight: index == 0 ? 'bold' : index == 6? 'bold':'normal'
        }}
        >{day}</Text>
        </View>;
    });
/*
    let monthList = this.months.map(m =>{
      return <View style={{
      flex:1,width:'auto',height:15, 
      backgroundColor:'white',
      alignItems:'center',margin:1 }} 
      >
      <TouchableOpacity onPress={e => {
        this.setMonth(m)
      }} >
      <Text key={m}>{m}</Text>
      </TouchableOpacity  >
      </View>;
    });
*/
    let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++ ) {
            blanks.push(
              <Text style={{color:'white'}} >b</Text>
            );
        }
        var d = new Date();
        var n = d.getMonth();

    let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
        
        daysInMonth.push(
           <Text key={d}
            style={{
              color: d==this.currentDate() && this.state.dateContext.format('M') == n+1 ? 'red': '#666',
              fontSize: d == this.currentDay() && this.state.dateContext.format('M') == n+1  ? 15 :13,
              fontWeight: d== this.currentDay() && this.state.dateContext.format('M') == n+1  ? 'bold' :'normal'
            }}
           >{d == this.currentDay() && this.state.dateContext.format('M') == n+1 ? <Text>Today</Text>: d }</Text>
        );
        }
        totalSlots = [ ...blanks, ...daysInMonth, ];
       
      
    return (
      <View>
          <View style={{
            alignItems:'center', 
            flexDirection:'row', 
            justifyContent:'center',
            alignContent: 'space-around', 
            borderColor: 'grey',
            borderWidth:0.5,
            borderRadius:1,
            width:400,
            borderRadius:7,
            margin:5,

            }} >
          
          <Button
          type='clear' 
          icon={
            <Icon
              name="chevron-left"
              size={15}
              color="red"
            />
          }
          iconRight
          onPress = {() => this.prevMonth()
           }
          />
            
             <this.MonthNav />
             <Text style={styles.monthText} ><this.year/></Text>
             
          <Button
          type='clear'
          icon={
            <Icon
              name="chevron-right"
              size={15}
              color="red"
            />
          }
          iconRight
          onPress = {() => this.nextMonth() }
          />
          </View>
          
          <View style={{alignItems:'center'}} >
          <FlatList 
          data={weekdays}
          renderItem={({item})=> <View>{item}</View> }
          keyExtractor={item => weekdays}
          numColumns='7'
          />
          
          <FlatList 
          data={this.formatData(totalSlots, 7)}
          renderItem={this.carlendar}
          keyExtractor={item => totalSlots}
          numColumns ='7'
          />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  carlendarBlock: {

    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor:'skyblue'

  },
  monthText:{
    fontSize:20, 
    paddingBottom:8, 
    color:'black',
    fontWeight:'bold',
    paddingTop: 5  
  }
});

export default Calendar;
