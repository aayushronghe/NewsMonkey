import React, { Component } from "react";

export class NewsItem extends Component {
  
  render() {
    let { title, description, imageUrl,newsUrl,author,date,source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="badge text-bg-Light my-2" style={{width:'50%',color:'black',fontSize:"1rem"}}>{source}</span>
          <img src={!imageUrl?"https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unkonwn"} on {date?new Date(date).toGMTString():"NaN"}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
