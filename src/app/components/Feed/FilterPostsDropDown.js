import "../../../css/feedPage.css";
import React, { Component } from 'react';
import M from "materialize-css";
import PropTypes from 'prop-types';

export class FilterPostsDropDown extends Component {
    constructor(props) {
        super(props);
        this.select = React.createRef();
    }

    componentDidMount = () => {
        M.FormSelect.init(this.select.current);
    }

    componentWillReceiveProps = () => {
        M.FormSelect.init(this.select.current);
    }
    
    render() {
        const { filterPosts, selectedPostFilter } = this.props;
        return (
            <div className="selectFilteredPosts input-field col s12">
                <select onChange={filterPosts} value={selectedPostFilter} ref={this.select} className="#e57373 red lighten-2">
                    <option className="#e57373 red lighten-2" value="allPosts">All Posts</option>
                    <option value="videoUrl">Videos</option>
                    <option value="imageUrl">Images</option>
                    <option value="text">Text</option>
                </select>
            </div>
        )
    };
};
FilterPostsDropDown.propTypes = {
    filterPosts: PropTypes.func.isRequired,
    selectedPostFilter: PropTypes.string.isRequired
}
