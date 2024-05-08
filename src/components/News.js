import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "cricket",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  Capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  constructor(props) {
    super();
    this.state = { articles: [], loading: false, page: 1, totalArticles: 0 };
    document.title = `NewsMonkey - ${this.Capitalize(props.category)}`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.API}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.API}&page=${this.state.page+1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({page:this.state.page+1})
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3 ">
        <h1 className="text-center" style={{ margin: "70px 0px 30px 0px" }}>
          NewsMonkey: Top {this.Capitalize(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length<=this.state.totalArticles}
          loader={<Spinner/>}
        >
        <div className="container row">
          {this.state.articles.map((element, index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
