import React, { Component } from 'react';
import financial from 'formulajs/lib/financial';
import PropTypes from 'prop-types';
import validator from 'validator';
import ReactHtmlParser from 'react-html-parser';
import Spiral from './Spiral.js';
import SpiralForm from './SpiralForm.js';
import SpiralLegend from './SpiralLegend.js';
import LoanForm from './LoanForm.js';
import PayoffAmt from './PayoffAmt';
import PayoffSchedule from './PayoffSchedule';

const SpiralHeading = ({strings}) => {
  return (
    <div className="heading">
      <h2>{strings.spiral.title}</h2>
      <p>{strings.spiral.prompt}</p>
    </div>
  );
}

const TimelineHeading = ({getCurrencyFormat, userLoan, strings}) => {
  return (
    <div className="heading">
      <h2>{strings.timeline.title}</h2>
      <p>{ReactHtmlParser(strings.timeline.prompt)}</p>
    </div>
  );
}

const TimelineTable = ({getCurrencyFormat, strings, ...props}) => {
  const totalIntNew =
    props.totalIntNew ?
    getCurrencyFormat(props.totalIntNew, true) :
    // '$' + String((props.totalIntNew).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) :
    null;
  return (
    <table>
      <tbody>
        <tr>
          <td className="th">{strings.fields.payoffDateNew}</td>
          <td className="amt">{props.payoffDateNew}</td>
        </tr>
        <tr>
          <td className="th">{strings.fields.totalIntNew}</td>
          <td className="amt">{totalIntNew}</td>
        </tr>
      </tbody>
    </table>
  );
}

const TimelineLegend = ({strings}) => {
  return (
    <table className="timeline-legend">
      <tbody>
        <tr>
          <td className="th">{strings.fields.principal}</td>
          <td><i className="circle principal-old"></i></td>
          <td><i className="circle principal-new"></i></td>
        </tr>
        <tr>
          <td className="th">{strings.fields.interest}</td>
          <td><i className="circle interest-old"></i></td>
          <td><i className="circle interest-new"></i></td>
        </tr>
      </tbody>
    </table>
  );
}

class DndLoanDebt extends Component {

  constructor(props) {
    super(props);
    this.myBalanceRef = React.createRef();
    this.state = {
      loans: {
        black: 0,
        white: 0,
        asian: 0,
        hispanic: 0,
        overall: 0,
        user: 0
      },
      offsets: {
        black: 0,
        white: 0,
        asian: 0,
        hispanic: 0,
        overall: 0,
        user: 0,
        paid: {
          original: null,
          new: null
        },
        date: {
          original: 0,
          new: 0
        }
      },
      paths: {
        black: 4723.60302734375, // 400,
        white: 4535.5380859375, // 400,
        asian: 4347.5244140625, // 400,
        hispanic: 4159.56982421875, // 400,
        overall: 4911.70556640625, // 400,
        user: 3971.684326171875, // 400,
        payoff: 1000,
        date: 1000
      },
      maximums: {
        loan: null,
        timeline: null,
        paid: null
      },
      loanMax: null, // TODO: MOVE TO MAXIMUMS
      svgClasses: "loading",
      user: {
        loanPrincipalCurr: null,
        loanPrincipalNew: null,
        loanRateCurr: null,
        loanPmtCurr: null,
        loanRateNew: null,
        loanPmtNew: null,
        payoffDateCurr: null,
        payoffDateNew: null,
        totalPaidCurr: null,
        totalPaidNew: null,
        totalIntNew: null,
        totalIntCurr: null,
        nperCurr: null,
        nperNew: null
      },
      validation: {
        loanTotalCurr: {
          value: 0,
          isValid: true,
          message: 'Please enter a number between 0 and 1,000,000.'
        },
        loanTotalCurr2: {
          value: 0,
          isValid: true,
          message: 'Please enter a number between 0 and 1,000,000.'
        },
        loanRateCurr: {
          value: 0,
          isValid: true,
          message: 'Please enter a number between 0 and 20, with up to two decimals.'
        },
        loanPmtCurr: {
          value: 0,
          isValid: true,
          message: 'Please enter a number between 1 and 10000.'
        },
        loanRateNew: {
          value: 0,
          isValid: true,
          message: 'Please enter a number between 0 and 20, with up to two decimals.'
        },
        loanPmtNew: {
          value: 0,
          isValid: true,
          message: 'Please enter a number between 1 and 10000.'
        }
      },
      inputs: {
        loanTotalCurr: {
          focused: false,
          hasValue: false
        },
        loanTotalCurr2: {
          focused: false,
          hasValue: false
        },
        loanRateCurr: {
          focused: false,
          hasValue: false
        },
        loanPmtCurr: {
          focused: false,
          hasValue: false
        },
        loanRateNew: {
          focused: false,
          hasValue: false
        },
        loanPmtNew: {
          focused: false,
          hasValue: false
        }
      },
      timer: null,
      strings: {
        spiral: {
          title: "PAYOFF CALCULATOR",
          prompt: "ENTER YOUR LOAN BALANCE BELOW",
          legend: {
            avgOverall: "AVERAGE OVERALL LOAN DEBT",
            avgBlack: "AVERAGE FOR BLACK BACHELOR'S DEGREE COMPLETERS",
            avgWhite: "AVERAGE FOR WHITE BACHELOR'S DEGREE COMPLETERS",
            avgHispanic: "AVERAGE FOR HISPANIC BACHELOR'S DEGREE COMPLETERS",
            avgAsian: "AVERAGE FOR ASIAN BACHELOR'S DEGREE COMPLETERS",
            user: "YOUR DEBT AMOUNT",
          }
        },
        timeline: {
          title: "REPAYMENT SCHEDULE",
          prompt: 'ENTER YOUR ORIGINAL AND<br>NEW LOAN DETAILS FOR COMPARISON',
        },
        amount: {

        },
        fields: {
          loanBalance: "LOAN BALANCE",
          origInt: "CURRENT INTEREST RATE",
          origPmt: "CURRENT MONTHLY PAYMENT",
          newInt: "NEW INTEREST RATE",
          newPmt: "NEW MONTHLY PAYMENT",
          payoffDateNew: "NEW DATE OF FINAL PAYMENT",
          totalIntNew: "NEW AMOUNT OF INTEREST",
          principal: "PRINCIPAL",
          interest: "INTEREST"
        }
      },
      colors: {
        principalOld: 'red',
        principalNew: 'orange',
        interestOld: 'pink',
        interestNew: 'yellow',
        darkFont: '#000',
        lightFont: '#ccc',
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    console.log('Loan Debt Calculator mounted.');
    // Update loan amounts from props.
    let _loans = {};
    if ((this.props.whiteavg).length > 0) {
      _loans.white = Number(this.props.whiteavg);
    } else {
      console.error('Missing prop: whtloanavg!');
      _loans.white = 0;
    }
    if ((this.props.blackavg).length > 0) {
      _loans.black = Number(this.props.blackavg);
    } else {
      console.error('Missing prop: whtloanavg!');
      _loans.black = 0;
    }
    if ((this.props.overallavg).length > 0) {
      _loans.overall = Number(this.props.overallavg);
    } else {
      console.error('Missing prop: overallavg!');
      _loans.overall = 0;
    }
    // Asian
    if ((this.props.asianavg).length > 0) {
      _loans.asian = Number(this.props.asianavg);
    } else {
      console.error('Missing prop: overallavg!');
      _loans.asian = 0;
    }
    // Hispanic
    if ((this.props.hispanicavg).length > 0) {
      _loans.hispanic = Number(this.props.overallavg);
    } else {
      console.error('Missing prop: overallavg!');
      _loans.hispanic = 0;
    }
    this.setState(({
      loans: _loans
    }), () => {
      // console.log(this.state.loans);
      this.onUpdateState();
    });
    // Timeout to init spiral transitions
    setTimeout(() => {
      this.setState( prevState => ({
        svgClasses: "",
      }));
    }, 1000);
  }

  onUpdateOffsets = (s) => {
    // console.log('onUpdateOffsets');
    const _state = s;
    const _offsets = {};

    // Black student loan path offset
    const black = (Number(_state.loans.black) <= 0) ?
      String(_state.paths.black) :
      String(_state.paths.black - ((_state.loans.black/_state.maximums.loan) * _state.paths.black));
      // console.log(black);
    _offsets.black = black;

    const white = (_state.loans.white <= 0) ?
        String(_state.paths.white) :
        String(_state.paths.white - ((_state.loans.white/_state.maximums.loan) * _state.paths.white));
    _offsets.white = white;

    // Asian
    const asian = (_state.loans.asian <= 0) ?
        String(_state.paths.asian) :
        String(_state.paths.asian - ((_state.loans.asian/_state.maximums.loan) * _state.paths.asian));
    _offsets.asian = asian;

    // Hispanic
    const hispanic = (_state.loans.hispanic <= 0) ?
        String(_state.paths.hispanic) :
        String(_state.paths.hispanic - ((_state.loans.hispanic/_state.maximums.loan) * _state.paths.hispanic));
    _offsets.hispanic = hispanic;

    const overall = (_state.loans.overall <= 0) ?
          String(_state.paths.overall) :
          String(_state.paths.overall - ((_state.loans.overall/_state.maximums.loan) * _state.paths.overall));
          // String((_state.paths.overall - (((_state.maximums.loan - _state.loans.overall)/_state.maximums.loan) * _state.paths.overall)));
    _offsets.overall = overall;

    const isset = _state.loans.user ? _state.loans.user : 0;
    const user = (isset <= 0) ?
      String(_state.paths.user) :
      String(_state.paths.user - ((_state.loans.user/_state.maximums.loan) * _state.paths.user));
    _offsets.user = user;

    // Payoff date original and new
    _offsets.paid = {};
    const _payoffOriginal = (_state.user.totalPaidCurr <= 0) ?
      String(_state.paths.payoff - 8) :
      String(_state.paths.payoff - ((_state.user.totalPaidCurr/_state.maximums.paid) * _state.paths.payoff));
    _offsets.paid.original = _payoffOriginal;

    const _payoffNew = (_state.user.totalPaidNew <= 0) ?
      String(_state.paths.payoff - 8) :
      String(_state.paths.payoff - ((_state.user.totalPaidNew/_state.maximums.paid) * _state.paths.payoff));
    _offsets.paid.new = _payoffNew;

    return _offsets;
  }

  getMaximum = (amts) => {
    // console.log('getMaximum()');
    // console.log(amts);
    let highest = 0;
    amts.forEach((el) => {
      if (highest < el) {
        highest = el;
      }
    });
    return highest;
  }

  onUpdateLoanStats = (loans, user) => {
    // console.log('onUpdateLoanStats');
    // Gather all the data.
    const _loanAmtCurr = loans.user;
    const _loanRateCurr =
      (user.loanRateCurr > 1) ?
      (user.loanRateCurr / 100) :
      user.loanRateCurr;
    const _loanPmtCurr = user.loanPmtCurr;
    const _loanRateNew =
      (user.loanRateNew > 1) ?
      (user.loanRateNew / 100) :
      user.loanRateNew;
    const _loanPmtNew = user.loanPmtNew;
    const _user = user;
    // let _loanPrincipal = null;
    let _currNPER = null;
    let _newNPER = null;
    let _currCUMIPMT = null;
    let _newCUMIPMT = null;
    let _currPayoffDate = null;
    let _newPayoffDate = null;

    // If loan amount, interest rate, and payments
    if ((_loanAmtCurr > 0) && (_loanRateCurr > 0) && (_loanPmtCurr > 0)) {
      // Set current principal value for bar
      _user.loanPrincipalCurr = _loanAmtCurr;

      // Calculate number of payment periods
      // Arguments: (rate/12, payment, presentvalue)
      _currNPER = -Math.round(financial.NPER((_loanRateCurr/12), _loanPmtCurr, _loanAmtCurr, 0, 0));
      _user.nperCurr = _currNPER;

      // Calculate cumipmt
      // Arguments: (rate,nper,presentvalue,start,end,type)
      if (!!_currNPER) {
        _currCUMIPMT = -Math.round(financial.CUMIPMT((_loanRateCurr / 12), _currNPER, _loanAmtCurr, 1, _currNPER, 0));
        _user.totalPaidCurr = _loanAmtCurr + _currCUMIPMT;
      }

      if (!!_currNPER && !!_currCUMIPMT) {
        // Calculate payoff date
        let today = new Date();
        _currPayoffDate = new Date(today.setMonth(today.getMonth() + _currNPER));
        _currPayoffDate = this.onFormatDate(_currPayoffDate);
        // console.log('_currPayoffDate: ' +  _currPayoffDate);
        _user.payoffDateCurr = _currPayoffDate;
        _user.totalIntCurr = _currCUMIPMT;
      }
    } else {
      // console.log('Not enough info to update current loan stats. Exiting.')
      _user.loanPrincipalCurr = null;
      _user.nperCurr = null;
      _user.totalPaidCurr = null;
      _user.payoffDateCurr = null;
      _user.totalIntCurr = null;
    }

    // New loan amounts calculations
    if ((_loanAmtCurr > 0) && (_loanRateNew > 0) && (_loanPmtNew > 0)) {
      // Set new principal value for bar
      _user.loanPrincipalNew = _loanAmtCurr;

      _newNPER = -Math.round(financial.NPER((_loanRateNew/12), _loanPmtNew, _loanAmtCurr, 0, 0));
      _user.nperNew = _newNPER;
      if (!!_newNPER) {
        _newCUMIPMT = -Math.round(financial.CUMIPMT((_loanRateNew / 12), _newNPER, _loanAmtCurr, 1, _newNPER, 0));
        // console.log('_newCUMIPMT: ' +  _newCUMIPMT);
        _user.totalPaidNew = _loanAmtCurr + _newCUMIPMT;
        _user.totalIntNew = _newCUMIPMT;
      }
      if (!!_newNPER && !!_newCUMIPMT) {
        let today = new Date();
        _newPayoffDate = new Date(today.setMonth(today.getMonth() + _newNPER));
        _newPayoffDate = this.onFormatDate(_newPayoffDate);
        // console.log('_newPayoffDate: ' +  _newPayoffDate);
        _user.payoffDateNew = _newPayoffDate;
      }
    } else {
      // console.log('Not enough info to update new loan stats. Resetting.')
      _user.loanPrincipalNew = null;
      _user.nperNew = null;
      _user.totalPaidNew = null;
      _user.totalIntNew = null;
      _user.payoffDateNew = null;
    }
    return _user;
  }

  onUpdateState = () => {
    // console.log('onUpdateState()');
    const _state = this.state;
    // Update user loan stats
    _state.user = this.onUpdateLoanStats(_state.loans, _state.user);
    // Update max loan amounts
    _state.maximums = {};
    _state.maximums.loan = this.getMaximum(Object.values(_state.loans));
    _state.maximums.paid = this.getMaximum([_state.user.totalPaidCurr, _state.user.totalPaidNew]);
    _state.maximums.timeline = this.getMaximum([_state.user.nperCurr, _state.user.nperNew]);
    // Update offsets
    _state.offsets = this.onUpdateOffsets(_state);

    this.setState({
      user: _state.user,
      offsets: _state.offsets,
      maximums: _state.maximums
    });
  }

  onFormatDate = (date) => {
    // console.log('onFormatPayoffDate');
    if (date > Date.now()) {
      const apprevDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
      }).format(date);
      return apprevDate;
    } else {
      return '';
    }
  }

  validateInputs = (target) => {
    // console.log('validateInputs() for ' + target.name);
    let isValid = false;
    let isEmpty = false;
    // Case to see which input has changed
    switch (target.name) {
      case 'loanTotalCurr':
      case 'loanTotalCurr2':
        // console.log('validating loanTotalCurr');
        isEmpty = validator.isEmpty(target.value);
        isValid = validator.isFloat(
          target.value,
          {
            min: 0,
            max: 1000000,
            allow_leading_zeroes: true
          }
        );
        if (isEmpty) {
          return true;
        } else {
          return isValid;
        }
      case 'loanRateCurr':
      case 'loanRateNew':
        // console.log('validating currLoanAmt');
        isEmpty = validator.isEmpty(target.value);
        isValid = validator.isFloat(
          target.value,
          {
            min: 0,
            max: 20,
            allow_leading_zeroes: true
          }
        );
        if (isEmpty) {
          return true;
        } else {
          return isValid;
        }
      case 'loanPmtCurr':
      case 'loanPmtNew':
        isEmpty = validator.isEmpty(target.value);
        isValid = validator.isFloat(
          target.value,
          {
            min: 1,
            max: 10000,
            allow_leading_zeroes: false
          }
        );
        if (isEmpty) {
          return true;
        } else {
          return isValid;
        }
      default:
        isEmpty = validator.isEmpty(target.value);
        isValid = validator.isFloat(target.value);
        if (isEmpty) {
          return true;
        } else {
          return isValid;
        }
    }
  }

  onSubmit = (e) => {
    // if (e.keyCode === 13) {
      console.log('hit enter');
      e.preventDefault();
      return false;
    // }
  };

  handleInputChange(event) {
    // console.log('handleInputChange');
    const target = event.target;
    const name = target.name;
    const hasValue =  (event.target.value !== '') ? true : false;
    const _inputs = this.state.inputs;
    _inputs[target.name].hasValue = hasValue;
    let isValid = false;
    isValid = this.validateInputs(target);
    const _validation = this.state.validation;
    if (!!isValid) {
      // console.log('is valid');
      _validation[name].value = Number(target.value);
      _validation[name].isValid = isValid;
      this.setState({
        validation: _validation,
        inputs: _inputs
      });
      clearTimeout(this.state.timer);
      this.setState({
        timer: setTimeout(() => {
          this.onInputUpdateUserState(target.name, Number(target.value))
        }, 500)
      });
    } else {
      // console.log('not valid');
      clearTimeout(this.state.timer);
      _validation[name].value = null;
      _validation[name].isValid = isValid;
      this.setState({
        validation: _validation,
        inputs: _inputs
      });
      this.onInputUpdateUserState(target.name, null)
    }
  }

  onInputUpdateUserState = (node, val) => {
    // console.log('onInputUpdateUserState()');
    // If updating current loan amt, separate thing.
    if (node === 'loanTotalCurr' || node === 'loanTotalCurr2') {
      let _loans = this.state.loans;
      _loans.user = val;
      this.setState({
        loans: _loans
      }, () => { this.onUpdateState() });
    } else {
      let _user = this.state.user;
      _user[node] = val;
      this.setState({
        user: _user
      }, () => { this.onUpdateState() });
    }
  }

  getCurrencyFormat = (val, hasCurrency) => {
    let curr = '';
    if (!!hasCurrency) {
      curr = '$';
    }
    if (!!val) {
      return curr + String(Math.round(val)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return curr;
    }
  }

  onFocus = (event) => {
    // console.log('onFocus');
    // console.log(event);
    let _inputs = this.state.inputs;
    _inputs[event.target.name].focused = true;
    this.setState({
      inputs: _inputs,
    });
    if (event.target.name === 'loanTotalCurr' || event.target.name === 'loanTotalCurr2') {
      if (this.state.loans.user > 0) {
        event.target.value = this.state.loans.user;
      }
    }
  }

  onBlur = (event) => {
    // console.log('onBlur');
    // console.log(event);
    let _inputs = this.state.inputs;
    _inputs[event.target.name].focused = false;
    if (event.target.value === '' || event.target.value === 0) {
      _inputs[event.target.name].hasValue = false;
    }
    this.setState({
      inputs: _inputs,
    });
    if (event.target.name === 'loanTotalCurr' || event.target.name === 'loanTotalCurr2') {
      event.target.value = '';
    }
  }

  render() {
    return(
      <div className="react-loan-debt-viz">
        <div className="row">
          <div className="offset-1 col-md-5 col-10 current-loan-heading current-loan-details">
            <SpiralHeading
              strings={this.state.strings}
            />
            <SpiralForm
              onSubmit={this.onSubmit}
              getCurrencyFormat={this.getCurrencyFormat}
              handleInputChange={this.handleInputChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              myBalanceRef={this.myBalanceRef}
              userLoan={this.state.loans.user}
              strings={this.state.strings}
              inputs={this.state.inputs}
              {...this.state.validation}
            />
            <SpiralLegend
              getCurrencyFormat={this.getCurrencyFormat}
              loans={this.state.loans}
              strings={this.state.strings}
              colors={this.state.colors}
            />
          </div>
          <div className="offset-1 col-10 offset-sm-1 col-sm-10 offset-md-0 col-md-5">
           <Spiral
             {...this.state}
           />
         </div>
        </div>
        <div className="row timeline-heading">
          <div className="offset-1 col-10">
            <TimelineHeading
              getCurrencyFormat={this.getCurrencyFormat}
              userLoan={this.state.loans.user}
              strings={this.state.strings}
            />
          </div>
        </div>
        <LoanForm
          onSubmit={this.onSubmit}
          getCurrencyFormat={this.getCurrencyFormat}
          handleInputChange={this.handleInputChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          userLoan={this.state.loans.user}
          strings={this.state.strings}
          inputs={this.state.inputs}
          {...this.state.validation}
        />
        <div className="row timeline-table-legend">
          <div className="col offset-1 col-10 col-md-6">
            <TimelineTable
              getCurrencyFormat={this.getCurrencyFormat}
              strings={this.state.strings}
              {...this.state.user} />
          </div>
          <div className="col offset-md-1 col-md-4 col-10 offset-1">
            <TimelineLegend
              strings={this.state.strings}
              colors={this.state.colors}
            />
          </div>
        </div>
        <div className="row payoff-amount payoff">
          <div className="offset-1 col-10 col-md-9">
            <PayoffSchedule
              offsets={this.state.offsets}
              paths={this.state.paths}
              user={this.state.user}
              colors={this.state.colors} />
          </div>
        </div>
        <div className="row payoff-timeline payoff">
          <div className="offset-1 col-10 col-md-9">
            <PayoffAmt
              getCurrencyFormat={this.getCurrencyFormat}
              principal={this.state.loans.user}
              offsets={this.state.offsets}
              paths={this.state.paths}
              user={this.state.user}
              colors={this.state.colors} />
          </div>
        </div>
      </div>
    );
  }
}

DndLoanDebt.propTypes = {
  whiteavg: PropTypes.string,
  blackavg: PropTypes.string,
  asianavg: PropTypes.string,
  hispanicavg: PropTypes.string,
  overallloanavg: PropTypes.string,
}

export default DndLoanDebt;
