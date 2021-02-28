import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteTransaction } from "../../actions/projectActions";
import { connect } from "react-redux";

class TransactionItem extends Component {
  deleteBtnClick = () => {
    if (window.confirm("Are you use, you wan to delete this transaction")) {
      this.props.deleteTransaction(
        this.props.walletId,
        this.props.transaction.id
      );
    }
  };
  render() {
    const transaction = this.props.transaction;
    const type = transaction.type === 1 ? "income" : "expense";
    const amountWon = transaction.type === 1 ? "+" : "-";
    const classCss = transaction.type === 1 ? "table-success" : "table-danger";

    return (
      <tr className={classCss}>
        <td>{transaction.transactionDate}</td>
        <td>{transaction.description}</td>
        <td className="text-success">{amountWon + transaction.amount}</td>
        <td>
          <Link
            to={`/transactions/update/${this.props.walletId}/${transaction.id}`}
            className="text-info"
          >
            <i className="fas fa-edit fa-2x"></i>
          </Link>
        </td>
        <td>
          <Link
            to={`/transactions/${this.props.walletId}`}
            className="text-danger"
            onClick={() => this.deleteBtnClick()}
          >
            <i className="fas fa-trash fa-2x"></i>
          </Link>
        </td>
      </tr>
    );
  }
}

export default connect(null, { deleteTransaction })(TransactionItem);
