import React, { Component } from "react";
import './App.css';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";

import ErrorBoundary from "../components/ErrorBoundary";

export interface IRobot {
  name: string;
  id: number;
  email: string;
}

interface IAppProps {

}

interface IAppState {
  robots: Array<IRobot>;
  searchField: string;
}

export default class App extends Component<IAppProps, IAppState> {
  constructor() {
    super(props));

    this.state = {
      robots: [],
      searchfield: "",
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      return response.json();
    })
    .then(users => {
      this.setState({ robots: users })
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  render() {
    const { robots, searchfield } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    if (!robots.length) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="tc">
          <h1 className="f2">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>

          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }


  }
};
