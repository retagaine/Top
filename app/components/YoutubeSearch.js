import React, { Component } from 'react';
import YoutubeSearchList from './YoutubeSearchList';

const ipcRenderer = electronRequire('electron').ipcRenderer;
const $ = require('jquery');
const API_KEY = "NO API KEY FOR YOU";

var throttle;
// keeps track of if we have expand-search-list sent
var listLength;

class YoutubeSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			searchResponse: []
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.isSearchVisible) {
			this.setState({
				value: '',
				searchResponse: []
			});
			listLength = null;
		}
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});

		if (throttle) {
			clearTimeout(throttle);
		}
		throttle = setTimeout(() => {
			clearTimeout(throttle);
			$.get('https://www.googleapis.com/youtube/v3/search', {
				q: this.state.value,
				part: 'id,snippet',
				type: 'video',
				key: API_KEY
			}).done((data) => {
				this.setState({
					searchResponse: data.items
				});
				if (!listLength) {
					listLength = data.items.length;
					ipcRenderer.send('expand-search-list', true);
				} else if (data.items.length !== listLength) {
					// change height
				}
			});
		}, 250);
	}

    render() {
        return (
        	<div>
	        	<div id="searchForm" style={{display: (this.props.isSearchVisible) ? 'block' : 'none'}}>
	        		<input id="searchInput" type="text" placeholder="Search for a video..." autoFocus={this.props.isSearchVisible} value={this.state.value} onChange={this.handleChange}/>
	        	</div>
	        	<YoutubeSearchList list={this.state.searchResponse} isListVisible={this.props.isSearchVisible} updateCurrentVideo={this.props.updateCurrentVideo.bind(this)}/>
        	</div>
        );
    }
}

module.exports = YoutubeSearch;