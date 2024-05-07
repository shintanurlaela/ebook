// Card.js
import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div className="col-lg-6 col-sm-12 p-2">
        <div className="card">
          <div className="card-body row">
            <div className="col-5">
              <img
                src={this.props.gambar}
                className="img"
                height="200"
                alt="Cover Buku"
              />
            </div>
            <div className="col-7">
              <h5 className="text-info">{this.props.judul}</h5>
              <h6 className="text-dark">Deskripsi: {this.props.deskripsi}</h6>
              <button
                className="btn btn-sm btn-primary m-1"
                onClick={this.props.onEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger m-1"
                onClick={this.props.onDrop}
              >
                Hapus
              </button>
              <a
                href={this.props.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-success m-1"
              >
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Card;
