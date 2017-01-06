import React, { Component } from 'react';

const ipcRenderer = electronRequire('electron').ipcRenderer;

class YoutubeSearchList extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.isListVisible && this.props.list.length > 0) {
			ipcRenderer.send('expand-search-list', false);
		}
	}

    render() {
    	var searchList = (this.props.list).map((result, index) => {
    		return (
    			<div className="searchResult" key={index}>
    				<a href="#" onClick={this.props.updateCurrentVideo.bind(this, result.id.videoId)}>
    					<img src={result.snippet.thumbnails.default.url}/>
    				</a>
    				<div className="searchResultTitle">
    					<a href="#" onClick={this.props.updateCurrentVideo.bind(this, result.id.videoId)}>
    					{result.snippet.title}
    					</a>
    				</div>
    				<div className="searchResultChannel">{result.snippet.channelTitle}</div>
    			</div>
    		);
		});

        return (
        	<div id="searchList" style={{display: (this.props.isListVisible) ? 'block' : 'none'}}>
        		{searchList}
        	</div>
        );
    }
}

module.exports = YoutubeSearchList;