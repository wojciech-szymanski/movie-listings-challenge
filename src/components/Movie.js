import React from 'react';

const Movie = (props) => {
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w200';

    return  (
        <div className="column">
            <div className="ui fluid card">
                <div className="image">
                    <img src={`${imgBaseUrl}${props.poster_path}`} alt={ props.title } />
                </div>
                <div className="content">
                    <a className="header" href="/">{ props.title }</a>
                    <div className="description">{ props.overview }</div>
                </div>
                <div className="extra content">
                    <span className="right floated star">
                        { Math.round(props.vote_average * 10 ) / 10 } rating
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Movie;