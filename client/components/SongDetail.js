import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import fetchSong from '../queries/fetchSong'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends React.Component {

    render() {
        console.log("song detail props: ", this.props)

        const { song } = this.props.data

        if (!song) { return <div>Loading...</div> }

        return (
            <div style={{ marginTop: "1rem" }}>
                <Link to="/" className="btn waves-light">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }
}

export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail)