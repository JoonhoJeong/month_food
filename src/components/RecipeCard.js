import React from "react";
import "./RecipeCard.css";
import { IMAGE_BASE_URL } from "../Config";
import { Link } from "react-router-dom";

class CardHeader extends React.Component {
  render() {
    const { image } = this.props;
    var style = {
      backgroundImage: "url(" + image + ")",
    };
    return (
      <header style={style} id={image} className="card-header">
        {/* <h4 className="card-header--title">News</h4> */}
      </header>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button className="button button-primary">
        <i className="fa fa-chevron-right"></i> Find out more
      </button>
    );
  }
}

class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <h3>{this.props.title}</h3>

        {/* <p className="body-content">{this.props.text}</p> */}

        {/* <Button /> */}
      </div>
    );
  }
}

function RecipeCard(props) {
  return (
    <Link
      to={`/RecipeDetail/${props.recipe.cntntsNo}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <article className="card">
        <CardHeader
          image={`${IMAGE_BASE_URL}${props.recipe.rtnFileCours}/${props.recipe.rtnStreFileNm}`}
        />
        <CardBody title={props.recipe.fdNm} />
      </article>
    </Link>
  );
}

export default RecipeCard;
