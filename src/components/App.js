import React from 'react'

import SearchBar from './SearchBar/SearchBar'
import YouTube from '../api/youtube'
import VideoList from './VideoList/VideoList'
import VideoDetail from './VideoDetail/VideoDetail'

class App extends React.Component {

    state = {
        videos: [],
        selectedVideo: null
    }

    componentDidMount() {
        this.onTermSubmit(process.env.REACT_APP_DEFAULT_SEARCH_TERM)
    }

    onTermSubmit = async (term) => {
        const response = await YouTube.get('/search', {
            params: {
                q: term
            }
        })

        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        this.setState({
            selectedVideo: video
        })
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onTermSubmit={this.onTermSubmit}></SearchBar>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}></VideoDetail>
                        </div>
                        <div className="five wide column">
                            <VideoList
                                onVideoSelect={this.onVideoSelect}
                                videos={this.state.videos}>
                            </VideoList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App