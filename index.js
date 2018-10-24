import React, { Component } from "react";
import PropTypes from "prop-types";

class InfinteScrollReverse extends Component {
  infinteRef = React.createRef();

  state = {
    currentPage: 1,
    scrollPosition: 0,
  };

  componentDidMount() {
    // Obtain data for first load
    // TODO obtain more data to get scroll more area
    this.props.loadMore(this.state.currentPage);
    this.infinteRef.current.addEventListener("scroll", this.loadMore);
  }
  componentWillUnmount() {
    this.infinteRef.current.removeEventListener("scroll", this.loadMore);
  }

  componentDidUpdate(prevProps) {
    // Check childrens update
    if (prevProps.children.length !== this.props.children.length) {
      // Get available top scroll
      const availableScroll = this.infinteRef.current.scrollHeight - this.infinteRef.current.clientHeight;
      // Get motion for first page
      if (this.state.currentPage === 1) {
        // Move data to bottom for getting loadmore area
        if (availableScroll >= 0) {
          this.infinteRef.current.scrollTop = availableScroll;
        }
      } else {
        // Add scroll area for other pages
        if (this.props.hasMore) {
          this.infinteRef.current.scrollTop = this.infinteRef.current.clientHeight;
        }
      }
    }
  }

  loadMore = () => {
    // Handle scroll direction
    if (this.infinteRef.current.scrollTop > this.state.scrollPosition) {
      // Scroll bottom
    } else {
      // Check loadmore scroll area
      if (this.infinteRef.current.scrollTop <= this.props.loadArea && !this.props.isLoading) {
        // Check for available data
        if (this.props.hasMore) {
          // Run data fetching
          const nextPage = this.state.currentPage + 1;
          this.setState({ currentPage: nextPage });
          this.props.loadMore(nextPage);
        }
      }
    }
    // Save event scroll position
    this.setState({ scrollPosition: this.infinteRef.current.scrollTop });
  };

  render() {
    return (
      <div className={this.props.className} ref={this.infinteRef}>
        {this.props.children}
      </div>
    );
  }
}

InfinteScrollReverse.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.array,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  loadArea: PropTypes.number,
};

InfinteScrollReverse.defaultProps = {
  className: "InfinteScrollReverse",
  children: [],
  loadArea: 10,
};

export default InfinteScrollReverse;
