import React, { Component } from 'react'
import './App.css'

import scale from './assets/radaltback.png'
import cover from './assets/radaltcover.png'
import needle from './assets/radaltneedle.png'
import bugImg from './assets/bug.png'
import flagImg from './assets/radaltflag.png'

export default class App extends Component {
	state = {
		bug: 0,
		altitude: 0,
		hasPower: true,
		powerOffAltitude: 0,
		isAltitudeGreaterThanBugAndHasPower: false,
		isLightON: false,
	}

	altitudeOnChange = event => {
		const val = parseInt(event.target.value)
		const isLightON =
			(this.state.isAltitudeGreaterThanBugAndHasPower ||
				this.state.isLightON) &&
			val < this.state.bug
		const isAltitudeGreaterThanBugAndHasPower =
			val >= this.state.bug && this.state.hasPower
		this.setState({
			altitude: val,
			isAltitudeGreaterThanBugAndHasPower,
			isLightON,
		})
	}

	bugOnChange = event => {
		const val = parseInt(event.target.value)
		this.setState({
			bug: val,
			isAltitudeGreaterThanBugAndHasPower:
				this.state.hasPower && this.state.altitude >= val,
			isLightON: this.state.isLightON && this.state.altitude < val,
		})
	}

	hasPowerOnChange = () => {
		let isAltitudeGreaterThanBugAndHasPower =
			this.state.isAltitudeGreaterThanBugAndHasPower
		if (this.state.hasPower) {
			isAltitudeGreaterThanBugAndHasPower = false
		} else {
			isAltitudeGreaterThanBugAndHasPower = this.state.altitude >= this.state.bug
		}

		this.setState({
			hasPower: !this.state.hasPower,
			powerOffAltitude: this.state.altitude,
			isAltitudeGreaterThanBugAndHasPower,
			isLightON: false,
		})
	}

	getDegree = val => {
		if (val <= 500) return '' + (val * 180) / 500
		return '' + (180 + ((val - 500) * 90) / 1000)
	}

	render() {
		const { altitude, bug, hasPower, powerOffAltitude, isLightON } = this.state
		return (
			<div>
				<h1>Radar Altimeter</h1>
				<div className='meter'>
					<img src={scale} alt='' />
					<img src={cover} alt='' />
					<img
						src={needle}
						alt=''
						style={{
							transform:
								'rotate(' +
								(hasPower
									? this.getDegree(altitude)
									: this.getDegree(powerOffAltitude)) +
								'deg)',
						}}
					/>
					<img
						src={bugImg}
						alt=''
						style={{ transform: 'rotate(' + this.getDegree(bug) + 'deg)' }}
					/>
					<img
						src={flagImg}
						alt=''
						style={{ display: !hasPower ? 'block' : 'none' }}></img>
					<div
						className='light'
						style={{
							backgroundColor: isLightON ? 'red' : 'white',
						}}></div>
				</div>
				<div className='inputs'>
					<label htmlFor='altitude'>altitude</label>
					<input
						type='range'
						max='1500'
						min='0'
						id='altitude'
						step='1'
						value={altitude}
						onChange={this.altitudeOnChange}></input>
					<span>{altitude}</span>
					<br />
					<label htmlFor='bug'>bug &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
					<input
						type='range'
						max='1500'
						min='0'
						id='bug'
						step='1'
						value={bug}
						onChange={this.bugOnChange}></input>
					<span>{bug}</span>
					<br />
					<label htmlFor='hasPower'>hasPower</label>
					<input
						type='checkbox'
						name='hasPower'
						id='hasPower'
						onChange={this.hasPowerOnChange}
						checked={hasPower ? true : false}
					/>
				</div>
			</div>
		)
	}
}
