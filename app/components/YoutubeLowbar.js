import React, { Component } from 'react';
import YoutubeSearch from './YoutubeSearch';

const ipcRenderer = electronRequire('electron').ipcRenderer;

class YoutubeLowbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSearchVisible: false
		};
		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	handleSearchClick() {
		this.setState(prevState => ({
			isSearchVisible: !prevState.isSearchVisible
		}));

		// expands if true, compresses if false
		ipcRenderer.send('expand-search-bar', !this.state.isSearchVisible);
	}

	// add a playlist feature later
    render() {
        return (
        	<div>
	        	<div id="lowbar">
	        		<span className="float-right"><a href="#" onClick={this.handleSearchClick}>{(this.state.isSearchVisible ? 'HIDE' : 'SHOW')} SEARCH</a></span>
	        	</div>
	        	<div id="search">
	        		<YoutubeSearch isSearchVisible={this.state.isSearchVisible} updateCurrentVideo={this.props.updateCurrentVideo.bind(this)}/>
	        	</div>
        	</div>
        );
    }
}

module.exports = YoutubeLowbar;