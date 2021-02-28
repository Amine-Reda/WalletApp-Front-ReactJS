import React, { Component } from "react";
import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import { connect } from "react-redux";
import { getTransactions } from "../../actions/projectActions";

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalTransaction: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions) {
      let total = 0;
      for (let i = 0; i < nextProps.transactions.length; i++) {
        if (nextProps.transactions[i].type === 1) {
          total += nextProps.transactions[i].amount;
        } else {
          total -= nextProps.transactions[i].amount;
        }
      }
      this.setState({ totalTransaction: total });
    }
  }

  componentDidMount() {
    this.props.getTransactions(this.props.match.params.id);
  }

  render() {
    const transactions = this.props.transactions;
    let id = this.props.match.params.id;
    const transactionComponent = transactions.map((transaction) => (
      <TransactionItem
        key={transaction.id}
        transaction={transaction}
        walletId={id}
      />
    ));

    return (
      <div className="container">
        <Link to="/dashboard" className="btn btn-default btn-lg mb-3">
          Back
        </Link>
        <Link
          to={`/transactions/add/${id}`}
          className="btn btn-info btn-lg mb-3"
        >
          <i className="fas fa-plus-circle"> Record new Transaction</i>
        </Link>
        <br />
        <div className="card text-center">
          <div className="card-header bg-success text-white">
            <h4>UBL Account Balance</h4>
            <h1>Rs. {this.state.totalTransaction}</h1>
          </div>
        </div>
        <hr />

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th colSpan="2"></th>
            </tr>
          </thead>
          <tbody>{transactionComponent}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
});
export default connect(mapStateToProps, { getTransactions })(Transaction);
