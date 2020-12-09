import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function InfiniteScrollReverse({ className, isLoading, hasMore, loadArea, loadMore, children }) {
  const infiniteRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Reset default page, if children equals to 0
  useEffect(() => {
    if (children.length === 0) {
      setCurrentPage(1);
    }
  }, [children.length]);

  useEffect(() => {
    let { current: scrollContainer } = infiniteRef;
    function onScroll() {
      // Handle scroll direction
      if (scrollContainer.scrollTop > scrollPosition) {
        // Scroll bottom
      } else {
        // Check load more scroll area
        if (scrollContainer.scrollTop <= loadArea && !isLoading) {
          // Check for available data
          if (hasMore) {
            // Run data fetching
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            loadMore(nextPage);
          }
        }
      }
      // Save event scroll position
      setScrollPosition(scrollContainer.scrollTop);
    }

    scrollContainer.addEventListener("scroll", onScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
    };
  }, [currentPage, hasMore, isLoading, loadArea, loadMore, scrollPosition]);

  useEffect(() => {
    let { current: scrollContainer } = infiniteRef;
    if (children.length) {
      // Get available top scroll
      const availableScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      // Get motion for first page
      if (currentPage === 1) {
        // Move data to bottom for getting load more area
        if (availableScroll >= 0) {
          scrollContainer.scrollTop = availableScroll;
        }
      } else {
        // Add scroll area for other pages
        if (hasMore) {
          scrollContainer.scrollTop = scrollContainer.clientHeight;
        }
      }
    }
  }, [children.length, currentPage, hasMore]);

  return (
    <div className={className} ref={infiniteRef}>
      {children}
    </div>
  );
}

InfiniteScrollReverse.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.array,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  loadArea: PropTypes.number,
};

InfiniteScrollReverse.defaultProps = {
  className: "InfiniteScrollReverse",
  children: [],
  loadArea: 30,
};

export default InfiniteScrollReverse;
