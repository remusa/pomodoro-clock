import React, { Component } from 'react'

import playIcon from '../assets/play.svg'
import pauseIcon from '../assets/pause.svg'
import repeatIcon from '../assets/repeat.svg'
import stopIcon from '../assets/stop.svg'
import upIcon from '../assets/up-arrow.svg'
import downIcon from '../assets/down-arrow.svg'

class PomodoroClock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='container'>
                <h1>Pomodoro Clock</h1>

                <div className='container__length'>
                    <div
                        id='break-label'
                        className='container__length__left'>
                        <h2>Break Length</h2>
                        <div id='break-length'>5</div>
                    </div>
                    <div
                        id='session-label'
                        className='container__length__right'>
                        <h2>Session Length</h2>
                        <div id='session-length'>25</div>
                    </div>
                </div>

                <div className='container__session'>
                    <h2 id="timer-label">Session</h2>
                    <div id="time-left">25:00</div>
                </div>

                <div className='container__buttons'>
                    <button id="start_stop" className='button' >
                        <img src={playIcon}></img>
                        <img src={pauseIcon}></img>
                    </button>
                    <button id="reset" className='button' ><img src={stopIcon}></img></button>
                </div>
            </div>
        )
    }
}

export default PomodoroClock
