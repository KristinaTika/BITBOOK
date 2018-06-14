import React from 'react';
import { Link } from 'react-router-dom';


export const VideoPost = (props) => {
    const { videoUrl, type, id, commentsNum } = props.post


    return (

        <div className='container video-post'>
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-image video-container">
                            <iframe width='100%' src={videoUrl} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                        </div>
                        <div className="card-action">
                            <span><Link to={`/post/${type}/${id}`}>Video Post </Link></span>
                            <Link to="">{commentsNum}Comments</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};