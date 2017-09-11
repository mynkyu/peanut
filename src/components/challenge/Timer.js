import React, { Component } from 'react';
import * as event from '../../api/Event';

var x
class Timer extends Component {
    constructor() {
        super()
        this.state = {
            days : null,
            hours : null,
            minutes : null,
            seconds : null,
            isExpired : null
        }
    } 
    componentDidMount() {
        const instance = this

        event.getEventInfo().then((response) => {
            const info = response.data
            
            //const dueTime = new Date("Sep 11, 2017 12:04:00").getTime();
            const dueTime = info.dueTime
            const serverTime = info.currTime
            const deviceDate = new Date()
            const deviceTime = deviceDate.getTime()
            const timeGap = serverTime - deviceTime
        
            // Update the count down every 1 second
            x = setInterval(function() {
                // Find the distance between now an the count down date
                const date = new Date()
                const now = date.getTime() + timeGap
                const distance = dueTime - now;
        
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                instance.setState({
                    days : days,
                    hours : hours,
                    minutes : minutes,
                    seconds : seconds
                })
                
                // // Display the result in the element with id="demo"
                // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
                // + minutes + "m " + seconds + "s ";
        
                // If the count down is finished, write some text 
                if (distance < 0) {
                    clearInterval(x)
                    instance.setState({isExpired : true})  
                    // document.getElementById("demo").innerHTML = "EXPIRED";
                } else {
                    instance.setState({isExpired : false})  
                }
            }, 1000);
        })
    }

    componentWillUnmount() {
        clearInterval(x)
    }

    pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    
    render() {
        const isExpired = this.state.isExpired

        if (isExpired == null) {
            return <div></div>
        }

        if (isExpired) {
            return <div>콘테스트가 종료 되었습니다</div>
        }

        const days    = this.pad(this.state.days, 2)      
        const hours   = this.pad(this.state.hours, 2)
        const minutes = this.pad(this.state.minutes, 2)
        const seconds = this.pad(this.state.seconds, 2)

        const time = days + " : " + hours + " : " + minutes + " : " + seconds
        return (
            <div>
                {time}
            </div>
        );
    }
}

export default Timer;