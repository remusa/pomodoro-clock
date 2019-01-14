import React, { Component } from 'react'
import PropTypes from 'prop-types'

import tomato from '../assets/tomato.svg'
import playIcon from '../assets/play.svg'
// import pauseIcon from '../assets/pause.svg'
// import stopIcon from '../assets/stop.svg'
import repeatIcon from '../assets/repeat.svg'
import upIcon from '../assets/up-arrow.svg'
import downIcon from '../assets/down-arrow.svg'

const Button = props => (
    <button id={props.id} className='button' onClick={props.onClick}>
        <img src={props.icon} alt={props.id} className='icon' />
    </button>
)

Button.propTypes = {
    id: PropTypes.string.isRequired,
}

const Label = props => (
    <div id={props.label} className='container__length__label'>
        <h3>{props.name}</h3>
        <div className='container__length__label__children'>
            {props.children}
        </div>
    </div>
)

Label.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

class PomodoroClock extends Component {
    constructor(props) {
        super(props)

        this.state = this.initialState

        this.handleReset = this.handleReset.bind(this)
        this.playAudio = this.playAudio.bind(this)
        this.beginCountDown = this.beginCountDown.bind(this)
        this.decrementTimer = this.decrementTimer.bind(this)
        this.phaseControl = this.phaseControl.bind(this)
        this.switchTimer = this.switchTimer.bind(this)
        this.clockify = this.clockify.bind(this)
        this.timerControl = this.timerControl.bind(this)
        this.decrementValue = this.decrementValue.bind(this)
        this.incrementValue = this.incrementValue.bind(this)
        this.changeTimer = this.changeTimer.bind(this)
    }

    initialState = {
        breakLength: 5,
        sessionLength: 25,
        timer: 1500, // 25 min
        timerType: 'Session',
        timerState: 'stopped',
        // intervalID: '',
    }

    handleReset() {
        this.setState(this.initialState)

        this.audioBeep.pause()
        this.audioBeep.currentTime = 0

        // if (this.state.intervalID) {
        // this.state.intervalID.cancel()
        clearInterval(this.interval)
        // }
    }

    playAudio() {
        this.audioBeep.play()
    }

    timerControl() {
        // stopped
        if (this.state.timerState === 'stopped') {
            this.beginCountDown()
            this.setState({ timerState: 'running' })
        }
        // running
        else {
            this.setState({ timerState: 'stopped' })
            // this.state.intervalID.cancel()
            clearInterval(this.interval)
        }
    }

    beginCountDown() {
        // setTimeout(() => {
        this.interval = setInterval(() => {
            this.decrementTimer()
            this.phaseControl()
        }, this.state.timer)
    }

    phaseControl() {
        const timer = this.state.timer

        if (timer < 0) {
            if (this.state.timerType === 'Session') {
                // this.state.intervalID.cancel()
                clearInterval(this.interval)
                this.beginCountDown()
                this.switchTimer(this.state.breakLength * 60, 'Break')
            } else {
                // this.state.intervalID.cancel()
                clearInterval(this.interval)
                this.beginCountDown()
                this.switchTimer(this.state.sessionLength * 60, 'Session')
            }

            this.playAudio()
        }
    }

    switchTimer(num, str) {
        this.setState({
            timer: num,
            timerType: str,
        })
    }

    decrementTimer() {
        this.setState({ timer: this.state.timer - 1 })
    }

    clockify() {
        let minutes = Math.floor(this.state.timer / 60)
        let seconds = this.state.timer - minutes * 60

        seconds = seconds < 10 ? `0${seconds}` : seconds
        minutes = minutes < 10 ? `0${minutes}` : minutes

        return `${minutes}:${seconds}`
    }

    decrementValue(e) {
        const [timer, value] = e.target.id.split('-')
        this.changeTimer(timer, value)
    }

    incrementValue(e) {
        const [timer, value] = e.target.id.split('-')
        this.changeTimer(timer, value)
    }

    changeTimer(timer, value) {
        // break timer
        if (timer === 'break') {
            if (value === 'decrement' && this.state.breakLength > 1) {
                this.setState({
                    breakLength: this.state.breakLength - 1,
                })
            } else if (value === 'increment' && this.state.breakLength < 60) {
                this.setState({
                    breakLength: this.state.breakLength + 1,
                })
            }
        }

        // session timer
        else if (timer === 'session') {
            if (value === 'decrement' && this.state.sessionLength > 1) {
                this.setState({
                    sessionLength: this.state.sessionLength - 1,
                    timer: (this.state.sessionLength - 1) * 60,
                })
            } else if (value === 'increment' && this.state.sessionLength < 60) {
                this.setState({
                    sessionLength: this.state.sessionLength + 1,
                    timer: (this.state.sessionLength + 1) * 60,
                })
            }
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='container__header'>
                    <img
                        src={tomato}
                        alt='Pomodoro Clock'
                        className='icon-header'
                    />
                </div>

                <div className='container__length'>
                    <Label label='break-label' name='Break Length'>
                        <Button
                            id='break-decrement'
                            icon={downIcon}
                            onClick={this.decrementValue}
                        />

                        <div id='break-length'>{this.state.breakLength}</div>

                        <Button
                            id='break-increment'
                            icon={upIcon}
                            onClick={this.incrementValue}
                        />
                    </Label>

                    <Label label='session-label' name='Session Length'>
                        <Button
                            id='session-decrement'
                            icon={downIcon}
                            onClick={this.decrementValue}
                        />

                        <div id='session-length'>
                            {this.state.sessionLength}
                        </div>

                        <Button
                            id='session-increment'
                            icon={upIcon}
                            onClick={this.incrementValue}
                        />
                    </Label>
                </div>

                <div className='container__session'>
                    <h3 id='timer-label'>{this.state.timerType}</h3>

                    <div id='time-left'>{this.clockify()}</div>
                </div>

                <div className='container__buttons'>
                    <Button
                        id='start_stop'
                        icon={playIcon}
                        onClick={this.timerControl}
                    />

                    <Button
                        id='reset'
                        icon={repeatIcon}
                        onClick={this.handleReset}
                    />
                </div>

                <audio
                    id='beep'
                    preload='auto'
                    src='https://goo.gl/65cBl1'
                    ref={audio => {
                        this.audioBeep = audio
                    }}
                />
            </div>
        )
    }
}

export default PomodoroClock
