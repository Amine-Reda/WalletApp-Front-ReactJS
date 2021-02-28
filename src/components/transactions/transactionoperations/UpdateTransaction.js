import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  getTransaction,
  updateTransaction,
} from "../../../actions/projectActions";

class UpdateTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      amount: "",
      description: "",
      type: 1,
      date: null,
      errors: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const date = new Date(nextProps.transaction.toString());
    console.log(nextProps.transaction);
    if (nextProps.transaction) {
      this.setState({
        id: nextProps.transaction.id,
        amount: nextProps.transaction.amount,
        description: nextProps.transaction.description,
        type: nextProps.transaction.type,
        date: date,
      });
    }
  }

  componentDidMount() {
    this.props.getTransaction(
      this.props.match.params.walletId,
      this.props.match.params.id
    );
    console.log(
      this.props.getTransaction(
        this.props.match.params.walletId,
        this.props.match.params.id
      )
    );
  }

  changeHandler = (event, fieldName, checkbox) => {
    this.setState({
      [fieldName]: checkbox ? event.target.checked : event.target.value,
    });
  };

  submitHandler = (event) => {
    const transactionUpdated = {
      id: this.state.id,
      amount: this.state.amount,
      description: this.state.description,
      type: this.state.type,
      date: this.state.date,
    };
    this.props.updateTransaction(
      this.props.match.params.walletId,
      this.state.id,
      transactionUpdated,
      this.props.history
    );
    event.preventDefault();
  };

  render() {
    let id = this.props.match.params.walletId;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/transactions/${id}`} className="btn btn-light">
                Back to Wallet
              </Link>
              <h4 className="display-4 text-center">Update Transaction</h4>
              <p className="lead text-center">UBL Account</p>
              <form onSubmit={(event) => this.submitHandler(event)}>
                <div className="form-group">
                  <input
                    type="number"
                    min="1"
                    value={this.state.amount}
                    onChange={(event) =>
                      this.changeHandler(event, "amount", false)
                    }
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.name,
                    })}
                    placeholder="Amount"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    value={this.state.description}
                    onChange={(event) =>
                      this.changeHandler(event, "description", false)
                    }
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": this.state.errors.description,
                    })}
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Transaction Type :{" "}
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="income"
                      checked={this.state.type.toString() === "1"}
                      onChange={(event) =>
                        this.changeHandler(event, "type", false)
                      }
                      value="1"
                    />
                    <label className="form-check-label" htmlFor="income">
                      Income
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="expense"
                      checked={this.state.type.toString() === "2"}
                      onChange={(event) =>
                        this.changeHandler(event, "type", false)
                      }
                      value="2"
                    />
                    <label className="form-check-label" htmlFor="expense">
                      Expense
                    </label>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  transaction: state.transaction.transaction,
});

export default connect(mapStateToProps, { getTransaction, updateTransaction })(
  UpdateTransaction
);
