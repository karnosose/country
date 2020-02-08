import React, { Component } from "react";
import "./Country.css";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

class Country extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      capital: "",
      region: "",
      population: "",
      timezones: "",
      flag: ""
    };
  }

  componentDidMount() {
    const country = this.props.match.params.countryName;
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(res => res.json())
      .then(res => (res[0] ? res[0] : "no data"))
      .then(res => {
        this.setState({
          name: res.name,
          capital: res.capital,
          region: res.region,
          population: res.population,
          timezones: res.timezones,
          flag: res.flag,
          area: res.area
        });
      });
  }

  render() {
    return (
      <Container>
        <Card class="simpleCountryCard">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="flag"
              height="140"
              image={this.state.flag}
              title="flag"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Capital: {this.state.capital}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                population: {this.state.population}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                region: {this.state.region}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                timezones: {this.state.timezones}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                area: {this.state.area}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    );
  }
}

export default Country;
