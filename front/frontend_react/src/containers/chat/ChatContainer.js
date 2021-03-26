import React, { Component } from 'react';
import Chat from 'components/chat/chat';
//import {connect} from "react-redux";


class ChatContainer extends Component {

    render(){
        const {} = this.props;
        return(
            <Chat/>
                // <Check starttime={starttime} endtime={endtime} language = {language} isNight={isNight} time={time} visible={visible} endTime={endTime}
                //        isGoOff={isGoOff} goto={goto} gooff={gooff} preGoTo={preGoTo} preGoOff={preGoOff} preHoliDay={preHoliDay}
                //        onGoTo={this.handleGoTo} onGoOff={this.handleGoOff} onChangeInput={this.convertState.bind(this)} onHandleState={this.handleState}/>
        );
    }
}
export default ChatContainer;

/*export default connect(
    (state) => ({
        // loginUserNo:state.login.no,
        // goto: state.commute.get("goto"),
        // gooff: state.commute.get("gooff"),
        // preGoTo: state.commute.get("preGoTo"),
        // preGoOff: state.commute.get("preGoOff"),
        // preHoliDay: state.holiday.get("preHoliDay"),
        // no: state.list.get('no'),
        // isGoOff: state.commute.get('isGoOff'),
        // isNight: state.commute.get('isNight'),
        // endTime: state.commute.get('endTime'),
        // time: state.commute.get('time'),
        // cnt : state.commute.get('cnt'),
        // loading: state.pender.pending['commute/GET_END_TIME'],
        // token: state.login.token,
        // language: state.language.language,
        // starttime: state.time.get('starttime'),  
        // endtime: state.time.get('endtime'),
        // searchFromDate: state.list.get('searchFromDate'),
        // searchToDate: state.list.get('searchToDate'),
        // searchState: state.list.get('searchState'),
        // changeView: state.list.get('changeView'),
        // activePage: state.pagination.get('activePage'),
        // totalWorkTime:state.commute.get('totalWorkTime')
    }),
    (dispatch) => ({
        // CommuteActions: bindActionCreators(commuteActions, dispatch),
        // TimeActions: bindActionCreators(timeActions, dispatch),
        // ListActions: bindActionCreators(listActions, dispatch),
        // GetCalList: bindActionCreators(getCalList, dispatch),
        // PaginationActions: bindActionCreators(paginationList, dispatch),
        // StateActions: bindActionCreators(stateActions, dispatch),
        // HoliDayActions: bindActionCreators(holidayActions, dispatch)
    })
)(ChatContainer);*/