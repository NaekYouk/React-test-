import React, { PureComponent } from 'react';
import './App.css';

export class Item extends PureComponent {
    render() {
        const { data } = this.props; 
        return (
            <div className="item">
                {data.thumbnail !== "self" ? <img src={data.thumbnail} alt="" /> : <img src="https://placehold.it/120/100" alt="" />}
                <p className="title">{data.title}</p>
                <p className="comments">Number of comments: {data.num_comments}</p>
                <a className="link" href={`https://www.reddit.com/${data.permalink}`} target="_blank" rel="noopener noreferrer">link</a>
            </div>
        );
    }
}
