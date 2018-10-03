import React, { Component } from "react";

class User extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="col-md-12 user-network">
          <div className="section-user-network">
            {/* jmmonteiro (recapitular o que disse na page profileNetwork.js) colocar nome do tipo de user do fetch */}

            <div className="section-card network-advisor">
              Nome do Tipo de Orientador 1
            </div>
            <div className="network-user-info">
              <div className="photo" />
              <div className="section-card institution">
                Universidade de Coimbra
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default User;
