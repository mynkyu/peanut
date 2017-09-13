import axios from 'axios';

const eventName = "bogum"
const eventWeek = "9월 3주차"

export function getEventName() {
    return eventName
}

export function getEventWeek() {
    return eventWeek
}

export function getEventInfo() {
    return axios.get('https://us-central1-peanut-5b51b.cloudfunctions.net/getEventInfo')
}

export var getDDay = function () {
    return new Promise(function (resolve, reject) {
        getEventInfo().then((info) => {
            const data = info.data
            const timeDiff = Math.abs(data.dueTime - data.currTime);
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            resolve(diffDays);
        })
    });
};