import React, { Component } from 'react';

const $ = require('jquery');

class YoutubeEmbed extends Component {
	constructor(props) {
		super(props);
		this.suppressClicks = this.suppressClicks.bind(this);
	}

	suppressClicks() {
		console.log($("iframe").contents().find("a"));
		// suppress window creation in iframe
		$("iframe").contents().find("a").on('click', (e) => { 
			console.log(e);
			e.preventDefault();
		});
	}

    render() {
        return (
        	<iframe onLoad={this.suppressClicks} frameBorder="0" allowFullScreen {...this.props}/>
        );
    }
}

module.exports = YoutubeEmbed;