import React from 'react';

const Movie = (props) => {
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w200';
    let movieGenres = [];
    
    if (props.genre_ids && props.genres.length) {
        movieGenres = props.genre_ids.map(genreId => props.genres.find(genre => genre.id === genreId).name || '');
    }

    return (
        <div className="column">
            <div className="ui fluid card">
                <div className="image">
                    <img src={`${imgBaseUrl}${props.poster_path}`} alt={ props.title } />
                </div>
                <div className="content">
                    <a className="header" href="/">
                        { props.title.length > 25 ? props.title.slice(0, 25).concat('...') : props.title }
                    </a>
                    <div className="description">{ movieGenres.join(', ') }</div>
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