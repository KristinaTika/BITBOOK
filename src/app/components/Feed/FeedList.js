import React, { Fragment } from 'react';
import { TextPost } from './TextPost';
import { VideoPost } from './VideoPost';
import { ImagePost } from './ImagePost';
import { Loader } from '../../partials/Loader'
import PropTypes from 'prop-types';

export const FeedList = (props) => {

    const { posts } = props;

    return (
        <Fragment>
            <div className='container'>
                {posts.length === 0
                    ? <Loader />
                    : (posts.map((post, i) => {
                        switch (post.type) {
                            case 'text':
                                return <TextPost post={post} key={i} />
                            case 'image':
                                return <ImagePost post={post} key={i} />
                            case 'video':
                                return <VideoPost post={post} key={i} />;
                            default:
                                return <p>not valid type of input</p>
                        }
                    }))}
            </div>
        </Fragment>
    );
};
FeedList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
}