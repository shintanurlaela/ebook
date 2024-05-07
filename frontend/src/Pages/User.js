import React, { Component } from "react";
import { Modal } from "bootstrap";
import axios from "axios";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      username: "",
      password: "",
      role: "",
      search: "",
      modal: null,
    };
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Add = () => {
    this.state.modal.show();
    // mengosongkan isi variabel nip, nama, dan alamat
    // set action menjadi "insert"
    this.setState({
      id: "",
      nama_user: "",
      username: "",
      password: "",
      action: "insert",
    });
  };

  Edit = (item) => {
    this.setState({
      id_user: item.id_user,
      nama_user: item.nama_user,
      username: item.username,
      password: item.password,
      role: item.role,
      action: "update",
    });
    this.state.modal.show();
  };

  getUser = () => {
    axios
      .get("http://localhost:5000/user")
      .then((response) => {
        // Mengakses data pengguna dari response
        const users = response.data.data;
        // Mengupdate state user dengan data pengguna
        this.setState({ user: users });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  findUser = (event) => {
    if (event.key === "Enter") {
      // Periksa apakah tombol yang ditekan adalah Enter
      let url = "http://localhost:5000/user";

      // Menyiapkan data pencarian
      let searchData = {
        keyword: this.state.search, // Menggunakan nilai pencarian dari state
      };

      // Mengirim permintaan POST ke API untuk mencari pengguna berdasarkan keyword
      axios
        .post(url + "/find", searchData)
        .then((response) => {
          // Mengupdate state user dengan data pengguna yang ditemukan
          this.setState({ user: response.data.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  saveUser = (event) => {
    event.preventDefault();

    let url = "";
    let method = ""; // Tambahkan variabel untuk menyimpan metode HTTP (PUT atau PATCH) yang akan digunakan

    // Tentukan URL dan metode HTTP berdasarkan action (insert atau update)
    if (this.state.action === "insert") {
      url = "http://localhost:5000/user/save";
      method = "POST";
    } else if (this.state.action === "update") {
      url = "http://localhost:5000/user/" + this.state.id_user;
      method = "PUT"; // Jika ingin mengubah data, gunakan metode PUT
    }

    let form = {
      nama_user: this.state.nama_user,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };

    // Menggunakan axios untuk mengirim permintaan ke backend
    axios({
      method: method,
      url: url,
      data: form,
    })
      .then((response) => {
        // Jika proses simpan berhasil, memanggil data yang terbaru
        this.getUser();
        window.alert(response.data.message); // Menampilkan pesan sukses kepada pengguna
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Terjadi kesalahan saat menyimpan data pengguna"); // Menampilkan pesan error kepada pengguna
      })
      .finally(() => {
        // Menutup form modal
        if (this.state.modal) {
          this.state.modal.hide();
        }
      });
  };

  Drop = (id_user) => {
    let url = "http://localhost:5000/user/" + id_user;
    // memanggil url API untuk menghapus data pada database
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      axios
        .delete(url)
        .then((response) => {
          // jika proses hapus data berhasil, memanggil data yang terbaru
          this.getUser();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.setState({
      modal: new Modal(document.getElementById("modal_user")),
    });
    this.getUser(); // Fetch user data
  }

  render() {
    return (
      <div className="m-3 card">
        <div className="card-header bg-info text-white">Data User</div>
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-2"
            name="search"
            value={this.state.search}
            onChange={this.bind}
            onKeyUp={this.findUser}
            placeholder="Pencarian..."
          />

          {/* TABLE PEGAWAI */}
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nama User</th>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {this.state.user.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_user}</td>
                    <td>{item.nama_user}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.role}</td>
                    <td>
                      <button className="btn btn-sm btn-info m-1"
                        onClick={() => this.Edit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger m-1"
                        onClick={() => this.Drop(item.id_user)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button className="btn btn-success" onClick={() => this.Add()}>
            Tambah Data
          </button>

          {/* MODAL FORM PEGAWAI */}
          <div className="modal fade" id="modal_user">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">Form User</div>
                <div className="modal-body">
                  <form onSubmit={(ev) => this.saveUser(ev)}>
                    {/* Id
                    <input
                      type="number"
                      name="id"
                      value={this.state.id}
                      onChange={this.bind}
                      className="form-control"j
                      required
                    /> */}
                    Nama
                    <input
                      type="text"
                      name="nama_user"
                      value={this.state.nama_user}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Username
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Password
                    <input
                      type="text"
                      name="password"
                      value={this.state.password}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    Role
                    <input
                      type="text"
                      name="role"
                      value={this.state.role}
                      onChange={this.bind}
                      className="form-control"
                      required
                    />
                    {/* Alamat
                    <input
                      type="text"
                      name="alamat"
                      value={this.state.alamat}
                      onChange={this.bind}
                      className="form-control"
                      required
                    /> */}
                    <div className="modal-footer">
                    <button className="btn btn-sm btn-success" type="submit">
                      Simpan
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // componentDidMount() {
  //   this.setState({
  //     modal: Modal.getOrCreateInstance('#modal_pegawai')
  //   });
  //   this.getPegawai();
  // }

}

export default User;
