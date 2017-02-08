import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  
  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      })

  }
  
  render() {
    const { post } = this.props;
    if(!post) {
      return <div>Loading...</div>
    }
    
    return (
      <div>
        <Link to="/">Back</Link>
        <button 
          onClick={this.onDeleteClick.bind(this)}
          className="btn btn-danger pull-xs-right">Delete</button>
        <h2>{post.title}</h2>
        <h5>Categories: {post.categories}</h5>
        <p>{post.content}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);