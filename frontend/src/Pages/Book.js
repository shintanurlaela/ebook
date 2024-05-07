import React, { Component } from 'react';
import Card from "../Components/Card";
import axios from "axios";
import { Modal } from "bootstrap";


const baseURL = "http://localhost:5000";
const imageURL = baseURL + "/cover-image/";


class Book extends Component {
  constructor() {
    super();
    this.state = {
      buku: [],
      id_buku: "",
      action: "",
      judul: "",
      deskripsi: "",
      gambar: "",
      link: "",
      selectedItem: null,
      modal: null,
    };
    this.state.filterBuku = this.state.buku;
  }

  // FUNCTION ADD
  Add = () => {
    this.state.modal.show();
    this.setState({
      judul: "",
      deskripsi: "",
      gambar: "",
      link: "",
      action: "insert",
    });
  };

  // FUNCTION EDIT
  Edit = (item) => {
    this.state.modal.show();
    this.setState({
      judul: item.judul,
      deskripsi: item.deskripsi,
      gambar: item.gambar,
      link: item.link,
      action: "update",
      selectedItem: item,
    });
  };

  // FUNCTION SAVE
  Save = async (event) => {
    event.preventDefault();
    const { action, selectedItem, judul, deskripsi, gambar, link } = this.state;

    try {
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('deskripsi', deskripsi);
        formData.append('gambar', gambar);
        formData.append('link', link);

        if (action === 'insert') {
            await axios.post('http://localhost:5000/buku', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else if (action === 'update') {
            await axios.put(`http://localhost:5000/buku/`+selectedItem.id_buku, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        this.getUser();
        this.state.modal.hide();
    } catch (error) {
        console.error('Error:', error);
    }
};


  getUser = () => {
    axios
      .get("http://localhost:5000/buku")
      .then((response) => {
        const buku = response.data.data;
        this.setState({ buku: buku, filterBuku: buku });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // FUNCTION DROP
  Drop = async (item) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      try {
        await axios.delete(`http://localhost:5000/buku/${item.id_buku}`);
        this.getUser();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // FUNCTION SEARCH
  searching = (event) => {
    if (event.keyCode === 13) {
      let keyword = this.state.keyword.toLowerCase();
      let tempBuku = this.state.buku;
      let result = tempBuku.filter((item) => {
        return (
          item.judul.toLowerCase().includes(keyword) ||
          item.deskripsi.toLowerCase().includes(keyword)
        );
      });

      this.setState({ filterBuku: result });
    }
  };

  setUser = () => {
    if (sessionStorage.getItem("user") === null) {
      let prompt = window.prompt("Masukkan Nama Anda", "");
      if (prompt === null || prompt === "") {
        this.setUser();
      } else {
        sessionStorage.setItem("user", prompt);
        this.setState({ user: prompt });
      }
    } else {
      let name = sessionStorage.getItem("user");
      this.setState({ user: name });
    }
  };

  render() {
    return (
      <div className="container">
        <h4 className="text-info my-2">
          <br></br>
          Welcome {this.state.user}
          <br></br>
        </h4>
        <div className="row">
          <input
            type="text"
            className="form-control my-2"
            placeholder="Pencarian"
            value={this.state.keyword}
            onChange={(ev) => this.setState({ keyword: ev.target.value })}
            onKeyUp={(ev) => this.searching(ev)}
          />
          {this.state.filterBuku.map((item, index) => (
            <Card
            key={index}
            judul={item.judul}
            deskripsi={item.deskripsi}
            gambar={"http://localhost:8000/cover-image/" + item.gambar} // Ubah prop gambar menjadi URL gambar
            link={item.link}   // Tambahkan prop link
            onEdit={() => this.Edit(item)}
            onDrop={() => this.Drop(item)}
            />
          ))}
        </div>

        <button className="btn btn-success" onClick={() => this.Add()}>
          Tambah Data
        </button>

        <div className="modal" id="modal_buku">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">Form Buku</div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.Save(ev)}>
                  Judul Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.judul}
                    onChange={(ev) => this.setState({ judul: ev.target.value })}
                    required
                  />
                  Deskripsi Buku
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.deskripsi}
                    onChange={(ev) =>
                      this.setState({ deskripsi: ev.target.value })
                    }
                    required
                  />
                  Gambar Buku
                  <input
                    type="url"
                    className="form-control mb-2"
                    value={this.state.gambar}
                    onChange={(ev) => this.setState({ gambar: ev.target.value })}
                    required
                  />
                  Link Buku
                  <input
                    type="url"
                    className="form-control mb-2"
                    value={this.state.link}
                    onChange={(ev) => this.setState({ link: ev.target.value })}
                    required
                  />
                  <button className="btn btn-info btn-block" type="submit">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.setUser();
    this.getUser();
    // Initialize Bootstrap modal
    const modal = new Modal(document.getElementById('modal_buku'));
    this.setState({ modal: modal });
  }
}

export default Book;

