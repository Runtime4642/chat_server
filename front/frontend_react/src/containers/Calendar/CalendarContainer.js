import React, { Component } from 'react';
import Calendar from 'components/Calendar/Calendar';
import { connect } from 'react-redux';
import * as calendarActions from 'store/modules/Calendar';
import { bindActionCreators } from 'redux';


class CalendarContainer extends Component {


    saveData = ({no,startDate,endDate,location}) => {
        const {CalendarActions,} = this.props;

        CalendarActions.saveData({no,startDate,endDate,location});
    }

    componentWillMount(){
        const {CalendarActions} = this.props;

        CalendarActions.getData(new Date().toISOString().slice(0,7).replace("-",""));
    }
    render(){
        const {data,CalendarActions} = this.props;
        return(
            <Calendar data={data} CalendarActions={CalendarActions}/>
                // <Check starttime={starttime} endtime={endtime} language = {language} isNight={isNight} time={time} visible={visible} endTime={endTime}
                //        isGoOff={isGoOff} goto={goto} gooff={gooff} preGoTo={preGoTo} preGoOff={preGoOff} preHoliDay={preHoliDay}
                //        onGoTo={this.handleGoTo} onGoOff={this.handleGoOff} onChangeInput={this.convertState.bind(this)} onHandleState={this.handleState}/>
        );
    }
}


export default connect(
    (state) => ({
        data : state.calendar.get("data")
    }),
    (dispatch) => ({
        CalendarActions : bindActionCreators(calendarActions, dispatch)
    })
)(CalendarContainer);