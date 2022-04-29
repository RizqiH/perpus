import React from "react";

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [], //local
      user: "", //session
      total: 0, //dapat dari hasil perhitungan
    };
  }
  getUser = () => {
    let userName = sessionStorage.getItem("user");
    this.setState({
      user: userName,
    });
  };

  getCart = () => {
    let tempCart = [];
    let totalHarga = 0;
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"));
    }
    tempCart.map((item) => {
      return (totalHarga = totalHarga + item.harga * item.jumlahBeli);
    });
    this.setState({
      cart: tempCart,
      total: totalHarga,
    });
  };
  OnDrop = () => {
    if (window.confirm("Apakah anda yakin hapus semua data ini?")){
      let tempCart = []
      if (localStorage.getItem("cart") !== null){
        localStorage.removeItem("cart")
      }
      this.setState({
        cart: tempCart,
        total: 0,
      });
    }
  }
  componentDidMount = () => {
    this.getUser()
    this.getCart()
}
  render(){  
    return (  
      <div className="container">
      <div className="card col-12 mt-2">
          <div className="card-header bg-primary text-white">
              <h4>Data Keranjang Belanja</h4>
          </div>

          <div className="card-body">
              <h5 className="text-primary">
                  Nama User: { this.state.user }
              </h5>

              <table className="table table-bordered">
                  <thead>
                      <tr>
                          <th>Judul Buku</th>
                          <th>Harga</th>
                          <th>Qty</th>
                          <th>Total</th>
                      </tr>
                  </thead>

                  <tbody>
                      { this.state.cart.map( (item, index) => (
                          <tr key={index}>
                              <td>{item.judul}</td>
                              <td>Rp {item.harga}</td>
                              <td>{item.jumlahBeli}</td>
                              <td>
                                  Rp { item.harga * item.jumlahBeli }
                              </td>
                          </tr>
                      ) ) }
                  </tbody>
              </table>
              <button className="btn btn-danger m-1" onClick={this.OnDrop}>Hapus</button>
              <h5 className="text-info">
                  Total Harga: Rp {this.state.total}
              </h5>
          </div>
      </div>
  </div>

    );  
  }  
}