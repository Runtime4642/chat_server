import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Calendar, Badge,ConfigProvider,Modal ,Input,TimePicker,Alert  } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import './Calendar.css'
import moment from 'moment';
import { ConsoleSqlOutlined } from '@ant-design/icons';

class CalendarClass extends Component {

  constructor(props, context) {
    super(props);

    // this.showModal = this.showModal.bind(this);

   this.state = {
    visible:false,
    startTime:null,
    endTime:null,
    location:null,
    no:null,
    date:null,
    currentMonth : new Date().toISOString().slice(5,7)
    }
}


 getListData = (value,data) => {
  let listData=[];
  
  if(data && data.length > 0 )
  data.forEach((item)=>{
    var month="";
    var day ="";
    
    if( item.startDate.slice(5,6) === "0")
         month= item.startDate.slice(6,7)
    else
          month = item.startDate.slice(5,7)

      if( item.startDate.slice(8,9) === "0")
          day= item.startDate.slice(9,10)
     else
          day = item.startDate.slice(8,10)     

           
    if(value.month() == month-1 && value.date()==day)
    { 
      var startTime=""
      var endTime=""
          if(item.startDate && item.startDate.length>12)
          startTime=item.startDate.slice(11,16);
            if(item.endDate && item.endDate.length>12)
            endTime=item.endDate.slice(11,16); 
      listData.push({type:'success',content:item.location,data:{item}})
      listData.push({type:'success',content:startTime+"~"+endTime})
    }
  })


  return listData || [];
}

 dateCellRender=(value,data) => {
 const listData = this.getListData(value,data);


 

  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

startTimeChange=(value)=>{
  this.setState(
    {
      startTime:value
    }
  )

}

endTimeChange=(value)=>{
  console.log("ennTIme")
  console.log(value)
  this.setState(
    {
      endTime:value
    }
  )
}

saveData=(value) => {
  console.log("onSelect");
 console.log(value);

}


 hideModal = () => {
  //visible=false;
  this.setState({
    visible: false,
  });
};


 showModal = (value,mode,data,CalendarActions) => {
    //달력 날짜를 클릭해서 모달을 띄울경우
  if(this.state.currentMonth == value.month()+1){
  this.setState({
    visible:true,
    location:null,
    startTime:null,
    endTime:null
  })
   let list = this.getListData(value,data);

   this.setState({
    date : value
   })

   if(list && list.length>1){
    let splitData = list[1].content.split("~");
    this.setState({
      startTime:moment(splitData[0],"HH:mm"),
      endTime:moment(splitData[1],"HH:mm"),
      location: list[0].content,
      no : list[0].data.item.no
    })
   }


  }
  //달력 달을 변경시
  else{
    let mon = value.month()+1;
    if("0"+mon==mon)
    CalendarActions.getData(value.year()+"0"+mon);
    else
    {
     CalendarActions.getData(value.year()+mon);
    }
    this.setState({
      currentMonth:value.month()+1
    })
  }

};
okClick=(CalendarActions)=>{
  let startDate;
  let endDate;
  debugger
  if(this.state.date && this.state.date._isAMomentObject){
    if(this.state.startTime&&this.state.startTime._isAMomentObject)
    {
      startDate=this.state.date.format("YYYY-MM-DD")+" "+this.state.startTime.format("HH:mm:ss")
    }
    if(this.state.endTime&& this.state.endTime._isAMomentObject)
    {
      endDate=this.state.date.format("YYYY-MM-DD")+" "+this.state.endTime.format("HH:mm:ss")
    }
    CalendarActions.saveData(this.state.no,startDate,endDate,this.state.location)
    .then(function (response) {
      if(response.status == 200)
      {
        alert('저장성공');
        console.log(response)
        CalendarActions.getData(response.data.slice(0,7).replace("-",""));

      }else{
        alert('저장실패');
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  } else {
    alert("시간이 입력되지 않았습니다")
  }

    // let mon = value.month()+1;
    // if("0"+mon==mon)
    // CalendarActions.getData(value.year()+"0"+mon);
    // else
    // {
    //  CalendarActions.getData(value.year()+mon);
    // }
 

  // CalendarActions.getData(new Date().toISOString().slice(0,7).replace("-",""));
  this.setState({
    visible:false
  })
}

locationChange = (value,data) => {

  this.setState({
    location:value.target.value
  })
  //  let list = this.getListData(value,data);
  //  if(list && list.length>1){
  //   let splitData = list[1].content.split("~");
  //   this.setState({
  //     startTime:moment(splitData[0],"HH:mm"),
  //     endTime:moment(splitData[1],"HH:mm"),
  //     location: list[0].content,
  //     no : list[0].data.item.no,
  //     date:value
  //   })
  //  }

};



  render() {
    const{data,CalendarActions} = this.props;


    return(
        <div>
          <Calendar dateCellRender={(value)=>this.dateCellRender(value,data)} onSelect={(value,mode)=>this.showModal(value,mode,data,CalendarActions)}/>
          <Modal
            title="Modal"
            visible={this.state.visible}
            onCancel={()=>{this.hideModal()}}
            onOk={()=>{this.okClick(CalendarActions)}}
            okText="적용"
            cancelText="닫기"
          ><Input placeholder="Basic usage" value={this.state.location}  onChange={(value)=>this.locationChange(value)}/>
          <TimePicker  defaultValu={moment("00:00","HH:mm")} format={"HH:mm"} value={this.state.startTime} onChange={(value)=>this.startTimeChange(value)} allowClear={"true"}/>~
          <TimePicker   defaultValu={moment("00:00","HH:mm")} format={"HH:mm"} value={this.state.endTime}  onChange={(value)=>this.endTimeChange(value)} allowClear={"true"}/>
          </Modal>
          {/* <Alert message="저장성공" type="success" showIcon={this.state.visibleSuccessAlert} banner={false} />
          <Alert message="에러" type="error" showIcon={this.state.visibleSuccessAlert} banner/> */}
        </div>
  
    );
  };
}

export default CalendarClass;