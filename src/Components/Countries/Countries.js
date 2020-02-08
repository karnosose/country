import React from "react";
import Input from "../Input/Input";
import Country from "../Country/Country";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";

import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import "./country.css";

export default class Countries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEmpty: false,
      isLoading: false,
      errorText: "",
      countries: []
    };
  }

  componentDidMount() {
    this.fetchCountries();
  }

  fetchCountries = (countryName = "") => {
    this.setState({ isLoading: true });

    let url = countryName
      ? `https://restcountries.eu/rest/v2/name/${countryName}`
      : "https://restcountries.eu/rest/v2/all";
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.status === 404) {
          throw new Error("No Data");
        }
        return res;
      })
      .then(res =>
        this.setState({
          countries: res,
          isEmpty: res.length === 0,
          isLoading: false,
          errorText: ""
        })
      )
      .catch(err =>
        this.setState({
          isLoading: false,
          errorText: err.message,
          countries: []
        })
      );
  };

  searchCountry = countryName => {
    this.fetchCountries(countryName);
  };

  countryDetails = e => {
    this.setState({ country: e.target.value });
  };

  render() {
    const { isEmpty, isLoading, errorText, countries } = this.state;

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div>
              <Input onInputClick={this.searchCountry} />
              <Container className="cardContainer">
                {errorText ? (
                  <p>{errorText}</p>
                ) : isEmpty ? (
                  <p>No Data</p>
                ) : isLoading ? (
                  <p>Loading ...</p>
                ) : (
                  countries.map((country, idx) => (
                    console.log(idx),
                    <Card className="countryCard">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="flag"
                          height="140"
                          image={country.flag}
                          title="flag"
                        />
                        <CardContent className="countryContent">
                          <Typography
                            className="countryDetails"
                            color="textSecondary"
                            gutterBottom
                          >
                            <p key={idx}>country: {country.name}</p>
                          </Typography>
                          <Typography
                            className="countryDetails"
                            color="textSecondary"
                            gutterBottom
                          >
                            <p key={country.population}>
                              population: {country.population}
                            </p>
                          </Typography>
                          <Typography
                            className="countryDetails"
                            color="textSecondary"
                            gutterBottom
                          >
                            <p key={country.capital}>
                              capital: {country.capital}
                            </p>
                          </Typography>
                        </CardContent>
                      </CardActionArea>

                      <CardActions>
                        <Button onClick={this.countryDetails} size="small">
                          <Link
                            className="learnMore"
                            value={country.name}
                            to={country.name}
                          >
                            learn more about {country.name}{" "}
                          </Link>
                        </Button>
                      </CardActions>
                    </Card>
                  ))
                )}
              </Container>
            </div>
          </Route>

          <Route path="/:countryName" component={Country} />
        </Switch>
      </Router>
    );
  }
}
