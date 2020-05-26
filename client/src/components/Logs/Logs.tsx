import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';

import { getStore } from '../../store/configureStore';
import { IOtherLog } from '../../types/otherLog.type';
import {didNotStartLoading, isLoading, IValueState} from '../../util/valueState'
import { otherLogsActions } from '../../sagas/otherLogs';

import styles from './Logs.module.scss'


interface IPropsFromStore {
	otherLogs: IOtherLog[] | IValueState;
}

interface IDispatchProps {
	getOtherLogs: () => void;
}

type IProps = IPropsFromStore & IDispatchProps
const mapStateToProps = ():IPropsFromStore => ({
	otherLogs: getStore().otherLogs
});
const mapDispatchToProps = (dispatch:Dispatch):IDispatchProps => ({
	getOtherLogs: () => dispatch(otherLogsActions.get.run())
});


class Logs extends Component<IProps, any > {
	
	render() {
		const {otherLogs, getOtherLogs } = this.props
		debugger;
		if(didNotStartLoading(otherLogs) ){
			getOtherLogs()
			return  <h1>Start Loading</h1>
		}
		if(isLoading(otherLogs)){
			return  <h1>Loading</h1>
		}
		else{
			return (
				<>
					<div className={styles.logs}>
						<h1>Other Logs</h1>
					</div>
				</>
			);
		}
	
	}
}
export default connect<IPropsFromStore, IDispatchProps, any, any>(mapStateToProps, mapDispatchToProps)(Logs);
