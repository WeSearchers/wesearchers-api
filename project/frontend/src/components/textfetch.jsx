import React, { Component } from "react";

class TestFetch extends Component {
  state = {
    isLoading: true,
    contacts: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://randomuser.me/api/?results=10&nat=us,dk,fr,gb")
      .then(response => response.json())
      .then(parseJSON =>
        parseJSON.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          gender: `${user.gender}`
        }))
      )
      .then(contacts =>
        this.setState({
          contacts,
          isLoading: false
        })
      )
      .catch(error => console.log("parsing failed", error));
  }

  render() {
    const { isLoading, contacts } = this.state;
    return (
      <div className="col-md-12">
        <div className="section-card">
          {!isLoading && contacts.length > 0
            ? contacts.map(contact => {
                const { name } = contact;
                const { gender } = contact;
                return (
                  <p>
                    {name} {gender}
                  </p>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default TestFetch;
