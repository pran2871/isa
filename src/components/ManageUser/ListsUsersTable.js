// import './css/jquery.dataTables.css'
// import React, { Component } from 'react'
// import $ from 'jquery'
// import dt from 'datatables.net'
// $.DataTable = dt

// class Tbl extends Component {
//     componentDidMount() {
//         this.$el = $(this.el)
//         this.$el.DataTable = dt
//         this.$el.DataTable({
//                 data: this.props.data,
//                 columns: [
//                     { title: "Name" },
//                     { title: "Email ID" },
//                     { title: "Role" },
//                     { title: "Organization" },
//                     { title: "Created Date" }
//                 ]
//             }
//         )
//     }
//     componentWillUnmount() {
//         // this.$el.DataTable.destroy(true)
//     }
//     render() {
//         return <div>
//             <table className="display" width="100%" ref={el => this.el = el}>
//             </table>
//         </div>
//     }
// }

// export default Tbl;