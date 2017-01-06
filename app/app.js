import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import YoutubeSplash from './components/YoutubeSplash';
import YoutubeLowbar from './components/YoutubeLowbar';
import YoutubeEmbed from './components/YoutubeEmbed';

// ?autoplay=1
class YoutubeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVideo: ''
        };
    }

    updateCurrentVideo(url) {
        this.setState({
            currentVideo: 'https://www.youtube.com/embed/' + url + '?autoplay=1'
        });
    }

    render() {
        return (
            <div>
                {this.state.currentVideo.length > 0 ? (
                    <YoutubeEmbed src={this.state.currentVideo} width="560" height="315"/>
                ) : (
                    <YoutubeSplash/>
                )}
                <YoutubeLowbar updateCurrentVideo={this.updateCurrentVideo.bind(this)}/>
            </div>
        );
    }
}

ReactDOM.render(<YoutubeApp/>, document.getElementById('content'));