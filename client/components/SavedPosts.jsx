import React, { Component } from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

console.log('In the SAVEDPOSTS Component');

class SavedPosts extends Component {
    // const SavedPosts = ({
    //   info, //openModal
    // }) => { 
    //   // Destructuring the pieces of state prop-drilled down into this component -> Should be every relevant piece of data we queried from our DB via Reddit
    //   const {
    //     subreddit, title, author, num_comments, created_utc
    //   } = info;
    
  render() {
    // console.log('YOOO');
    // console.log(this.props.info);
    let { author, created, post_id, score, subreddit, text, thumbnail, title, link_title, url } = this.props.info;
    // Need to massage the data a bit:
    if(!title) { title = link_title; };
    if(!thumbnail) { thumbnail = 'self';};

    return (
      <article className='saved-post-article'>
        <div className='post-container'>
          
          <div className='thumbnail'>
            <img src={thumbnail} onError={ (event) => {event.target.src = 'https://cdn.dribbble.com/users/272472/screenshots/4587973/reddit_logo_animation.gif', event.target.style="height:6em; width:auto; border:1px dashed salmon"} }/>
          </div>

          <div className='center-container'>
            <div className='title-container'>
              <a href={url}>{title}</a>
              <FAIcon icon={faStar} />
            </div>

            <div className='subtitle-container'>
              <p>
                <span className='subreddit'>{subreddit}</span> &#xb7; 
                <span className='post-details'> &nbsp; Posted by u/{author}  {created}</span>
              </p>
            </div>
          </div>

          {/* <div classame='favorite'>
            <span>FAVORITE HERE!</span>
          </div> */}
        </div>
      </article>
    );
  }
  
}

export default SavedPosts;