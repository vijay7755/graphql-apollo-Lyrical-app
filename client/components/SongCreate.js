import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router'
import fetchSongs from './../queries/fetchSongs'

class SongCreate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    onSubmit(event) {
        event.preventDefault()

        console.log("onSubmit: ", this.props)
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query: fetchSongs }]
        }).then(() => {
            hashHistory.push('/')
        })

    }

    render() {
        return (
            <div style={{ marginTop: "1rem" }}>
                <Link to="/" className="btn waves-light">
                    Back
                </Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song title:</label>
                    <input
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title) {
            id
            title
        }
    }
`

export default graphql(mutation)(SongCreate)