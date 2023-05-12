import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';

import SavedPosts from './SavedPosts';
import { flushSync } from 'react-dom';
// import Modals here later if you have time

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedPosts: false,
      savedPosts:[],
      filteredPosts: [],
      searched: '',
      //modalState stuff here
    };

    // Modal Stuff here - come back to later
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);

    // Search Functionality:
    this.setSearch = this.setSearch.bind(this);
  };

  async componentDidMount() {
    try{
      let savedPosts = await fetch('/load');
      
      console.log('SAVEDPOSTS post fetch: ', savedPosts);
      savedPosts = await savedPosts.json();

      if(!Array.isArray(savedPosts)) {
        console.log('SAVEDPOSTS IS NOT AN ARRAY! PROBLEM!')
        savedPosts = [];
      };

      return this.setState({
        savedPosts,
        filteredPosts: savedPosts,
        fetchedPosts: true,
      });
      
    } catch (err) {
      console.log('MainContainer.componentDidMount: get savedPosts: ERROR: ', err);
    }
  }

  // SET SEARCH: 
  setSearch(searchInput, subredditInput='Choose Subreddit') {
    console.log('Search Input: ', searchInput);
    console.log('Subreddit Input: ', subredditInput);
    const defaultFilter = 'Choose Subreddit';
    // Filtering the savedPosts array and then saving to filteredPosts array in state. Changing state tied to a component will trigger a re-render!
    this.setState({
      filteredPosts: this.state.savedPosts.filter((post) => {
        // Default: Search = ❌ && Subbreddit = ❌
        if(searchInput === '' && subredditInput === defaultFilter) {
          console.log('Search = ❌ && Subbreddit = ❌');
          return true;} // filteredPost = savedPost

        // Search = ❌ && Subbreddit = ✅
        else if (searchInput === '' && subredditInput !== defaultFilter) {
          if(post.subreddit === subredditInput) {
            console.log('Search = ❌ && Subbreddit = ✅')
            return true} 
        }

        // Search = ✅  && Subbreddit = ❌
        else if(searchInput !== '' && subredditInput === defaultFilter) {
          if (post.title && post.title.toLowerCase().includes(searchInput.toLowerCase())) {
            console.log('Search = ✅  && Subbreddit = ❌')
            return true
          }
        }

        // Search = ✅  && Subbreddit = ✅
        else if(searchInput !== '' && subredditInput === defaultFilter) {
          console.log('Search = ✅  && Subbreddit = ✅')
          if(post.title 
            && post.title.toLowerCase().includes(searchInput.toLowerCase())
            && post.subreddit === subredditInput) {
              console.log('BOTH!');
              return true;
            }
        }
      })
    });
  }
    
  render() {
    // LOADING SCREEN:
    if(!this.state.fetchedPosts) return (
      <div>
        <h1>Reading all that Reddit, please hold...</h1>
      </div>
    );

    const { savedPosts } = this.state;
    const { filteredPosts } = this.state;
    console.log('Filtered Posts!!: ', filteredPosts);

    if(!savedPosts) return null;

    if(!savedPosts.length) return (
      <div>Looks like you don't use Reddit very much... good on you! No saved posts found.</div>
    );

    /* Map over array of saved posts and pass each one into SavedPosts.jsx component. Prop drill down the info and the index (and later the modal if possible)
    When applying a filter -> RENDER THE FILTEREDPOSTS while ALWAYS FILTERING THE SAVEDPOSTS ARRAY array (i.e. you need to filter the full array each time and not the ever decreasing array we're getting after we run 1 filter) -> this is to ensure that when we backspace in the search bar, we continue to live-refresh
    THIS IS AN IMPORTANT STEP!
    */
    const savedPostsArticles = filteredPosts
      .map((post, i) => {
        // Fix the UTC dates here while mapping
        let date = new Date(post.created * 1000);
        post.created = date.toLocaleDateString('en-US');

        // Prepend reddit.com to urls
        post.url = 'http://reddit.com' + post.url;
      return (
        <SavedPosts 
          key={i}
          info={post}
          //openModal={this.openModal}
        />
      );
    });

    // CREATE COMPONENT FOR DROPDOWN:
      // 1st create array of individual subreddits (no duplicated) via this cache and forEach and then .map over that to create the dropdown component. 
    const subredditsCache = {};
    savedPosts.forEach((post) => {
      if(!subredditsCache[post.subreddit]) {subredditsCache[post.subreddit] = 1}
    });
    const subredditList = Object.keys(subredditsCache);
    const dropdownList = subredditList.map((subreddit, i) => {
      return (
        <option key={i} value={subreddit}>
          {subreddit}
        </option>
      )
    })
  
    return (
      <section className="main-section">

        <div className="search-container">
          {/* Come back to this path later!! */}
          {/* <Link to={'/path for the search'}>  */}
          {/* SEARCH FORM: */}
            <form id="search-form">
              <input 
                type="search" id="query" name="q" placeholder="Search..."
                onChange={(e) => this.setSearch(e.target.value)}
              />
            </form>
          {/* </Link> */}
          
          {/* Come back to this path later!! */}
          {/* <Link to={'/path for filter'}> */}
            <select name="dropdown" id="dropdown" onChange={(e) => this.setSearch('', e.target.value)}>
              <option value='Choose Subreddit'>Filter By Subreddit...</option>
              {dropdownList}
            </select>
          {/* </Link> */}
        </div>

        <div className='saved-posts-container'>
          {savedPostsArticles}
        </div>
        
        {/* MORE MODAL STUFF
        {this.state.modalState.open &&
          <DetailsModal
            type={this.state.modalState.type}
            position={this.state.modalState.position}
            id={this.state.modalState.id}
            closeModal={this.closeModal}
          />
        } */}
      </section>
    );
  }
}

export default MainContainer;
