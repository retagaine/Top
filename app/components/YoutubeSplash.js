import React, { Component } from 'react';

class YoutubeSplash extends Component {
	constructor(props) {
		super(props);
	}

    render() {
        return (
        	<div id="splash">
        		Welcome. To get started, click SHOW SEARCH and search for a video.
        	</div>
        );
    }
}

module.exports = YoutubeSplash;