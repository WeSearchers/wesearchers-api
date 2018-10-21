import React, {Component} from "react";
import Request from "../../request"

class Comment extends Component {
    constructor(props){
    super(props);
    this.state = {
      userData: null
    }
  }

  componentDidMount() {
    Request.get("api/user/profile/" + this.props.data.user_id).then(response => {
      response.json().then(userData => {
        this.setState({userData : userData});
      })
    })
  }

  render() {
    return (
        <div className="lastcoments d-flex mb-4 pt-4 bg-light boder-radius-sm">
          <div className="">
            <div className="background-image-profile mr-4 ml-3">
              {this.state.userData !== null ?
                <img src={"data:image/jpeg;base64, " + this.state.userData.image_data} width={"100%"} style={{"clip-path": "circle(50% at center)"}}/> : null
              }
            </div>
          </div>
          <div className="d-flex flex-column">
            <h2>{this.state.userData !== null ?
                    this.state.userData.first_name + " " + this.state.userData.last_name : null
                }
            </h2>
            <p className="font-weight-light mr-5">
                {this.props.data.text}
            </p>
          </div>
        </div>
    )
  }
}

export default Comment;