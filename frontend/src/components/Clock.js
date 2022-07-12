import React from "react"
import dateFormat, { masks } from "dateformat";
import { Menu, Select } from "@mui/material";

// 类组件，也称之为有状态组件
class Clock extends React.Component{			
    constructor(){
        // 使用this前必须调用super()
        super()
        // 定义当前组件的局部状态==> 相当于vue组件中的data
        var timezone = -8; //目标时区时间，东八区
        var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
        var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
        var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
        this.state = {
            time:targetDate.toDateString() + targetDate.getHours().toString() + ":" + targetDate.getMinutes().toString() + "  " 
        }
    }
    
    updateTime(){
        this.interval = setInterval(()=>{
            // 使用setState方法来更新局部数据
            // setState() 传递一个对象 这个对象会和this.state这个对象进行浅合并
            var timezone = -8; //目标时区时间，东八区
            var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
            this.setState({
                time:targetDate.toDateString() + "   " + targetDate.getHours().toString() + ":" + targetDate.getMinutes().toString() + "  " 
            })
        },100)
    }
    componentDidMount(){    // 组件挂载之后==>相当于vue中的 mounted
        this.updateTime()
    }
    componentWillUnmount(){   // 组件即将卸载==>相当于vue中的beforeDestroy 
        //卸载定时器
        clearInterval(this.interval)
    }
    
	//这是react生命周期中的一个钩子函数,这里会进行diff算法和更新虚拟dom
    render(){
        return (
            <fieldset>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    fullWidth
                >
                    
                </Select>
                <div className="main">
                    <h1>{this.state.time}</h1>
                </div>
            </fieldset>
        )
    }
}

// 导出
export default Clock