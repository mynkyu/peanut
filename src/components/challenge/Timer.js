import React, { Component } from 'react';
import * as event from '../../api/Event';
import * as firebase from 'firebase'

import './Timer.css'

var x
class Timer extends Component {
    constructor() {
        super()
        this.state = {
            days : null,
            hours : null,
            minutes : null,
            seconds : null,
            applyCount : null,
            challengeCount : null,
            isExpired : null
        }
    } 
    componentDidMount() {
        const self = this

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
    
                self.setState({
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
                    self.setState({isExpired : true})  
                    // document.getElementById("demo").innerHTML = "EXPIRED";
                } else {
                    self.setState({isExpired : false})  
                }
            }, 1000);
        })

        const path = 'event/' + event.getEventName()
        firebase.database().ref(path).on('value', function(snapshot) {
            if (snapshot.exists()) {
                self.setState({applyCount : snapshot.val().applyCount}) 
                self.setState({challengeCount : snapshot.val().challengeCount}) 
            } else {
                self.setState({count : 0}) 
            }
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
        const id = this.props.id
        const text = this.props.text

        const days    = this.pad(this.state.days, 2)      
        const hours   = this.pad(this.state.hours, 2)
        const minutes = this.pad(this.state.minutes, 2)
        const seconds = this.pad(this.state.seconds, 2)

        const time = days + " : " + hours + " : " + minutes + " : " + seconds


        var textDiv = <div></div>
        var challengerDiv = <div></div>
        if (text) {
            textDiv = <div><p className="timeLabel">{text}<span className="timeLabelSpan"> {time}</span></p><bar/></div>
            challengerDiv = <div>
                                <bar/> <p className="applyCount" >도전자 수 <span className="applyCountSpan" >{this.state.applyCount} 명</span></p>
                                <bar/> <p className="challengerCount">지원자 수 <span className="challengerCountSpan">{this.state.challengeCount} 명</span></p>
                            </div>
        }
        else{
            textDiv = <p className="timerLabel">{time}</p>
        }

        if (isExpired == null) {
            return <div></div>
        }

        if (isExpired) {
            return <div>콘테스트가 종료 되었습니다</div>
        }

        
        return (
            <div>
                {textDiv}
                {challengerDiv}
            </div>
        );
    }
}

export default Timer;