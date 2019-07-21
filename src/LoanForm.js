import React from 'react';
import classNames from 'classnames';

const LoanForm = ({ getCurrencyFormat, handleInputChange, onFocus, onBlur, userLoan, strings, inputs, ...props }) => {
  // Set up classes for validation feedback.
  const amtGroupClass = classNames('form-group amtGroupClass',
    {
      'has-error': !props.loanTotalCurr2.isValid,
      'has-focus': inputs.loanTotalCurr2.focused,
      'has-value': inputs.loanTotalCurr2.hasValue,
      'twin-has-value': inputs.loanTotalCurr.hasValue
    }
  );
  const rateGroupClass = classNames('form-group',
    {
      'has-error': !props.loanRateCurr.isValid,
      'has-focus': inputs.loanRateCurr.focused,
      'has-value': inputs.loanRateCurr.hasValue,
    }
  );
  const pmtGroupClass = classNames('form-group',
    {
      'has-error': !props.loanPmtCurr.isValid,
      'has-focus': inputs.loanPmtCurr.focused,
      'has-value': inputs.loanPmtCurr.hasValue,
     }
  );

  const newRateGroupClass = classNames('form-group',
    {
      'has-error': !props.loanRateNew.isValid,
      'has-focus': inputs.loanRateNew.focused,
      'has-value': inputs.loanRateNew.hasValue,
    }
  );
  const newPmtGroupClass = classNames('form-group',
    {
      'has-error': !props.loanPmtNew.isValid,
      'has-focus': inputs.loanPmtNew.focused,
      'has-value': inputs.loanPmtNew.hasValue,
     }
  );

  const currDisplay = userLoan ? getCurrencyFormat(userLoan, false) : strings.fields.loanBalance;

  const loanRateCurrPlaceholder =
    inputs.loanRateCurr.focused ?
    '' :
    strings.fields.origInt;

  const loanPmtCurrPlaceholder =
    inputs.loanPmtCurr.focused ?
    '' :
    strings.fields.origPmt;

  const loanRateNewPlaceholder=
    inputs.loanRateNew.focused ?
    '' :
    strings.fields.newInt;

  const loanPmtNewPlaceholder =
    inputs.loanPmtNew.focused ?
    '' :
    strings.fields.newPmt;

  const clearInput = (e) => {
    // console.log('clear input');
    const input = e.target.parentNode.getElementsByTagName('input')[0];
    input.value = '';
    var event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    });
    input.dispatchEvent(event);
  }

  return (
    <div className="row timeline-form">
      <div className="offset-2 col-8 offset-sm-3 col-sm-6 col-md-4 offset-md-1">
        <form noValidate>
          {/* Begin principal input */}
          <div className={amtGroupClass}>
            <label>{strings.fields.loanBalance}</label>
            <span className="symbol-wrapper currency">
              <span className="amount">{currDisplay}</span>
              <input
                type="number"
                id="loan_amt_curr2"
                name="loanTotalCurr2"
                autoComplete="off"
                className="loanTotalCurr2"
                maxLength="7"
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                aria-label={'Enter ' + strings.fields.loanBalance}
                onInput={(e) => handleInputChange(e)}
                />
            </span>
            <i
              className="clear"
              onClick={(e) => {clearInput(e)}}></i>
            <div className="invalid-feedback">
              {props.loanTotalCurr.message}
            </div>
          </div>
          {/* End principal input */}
        </form>
      </div>
      <div className="offset-2 col-8 offset-sm-3 col-sm-6 col-md-4 offset-md-1">
        {/* Placeholder */}
      </div>
      <div className="offset-2 col-8 offset-sm-3 col-sm-6 col-md-4 offset-md-1 orig-loan-details">
        <form>
          {/* Begin current interest input */}
          <div className={rateGroupClass}>
            <label>{strings.fields.origInt}</label>
            <span className="symbol-wrapper percent">
              <input
                id="int_rt_curr"
                name="loanRateCurr"
                type="number"
                maxLength="6"
                autoComplete="off"
                className="loanRateCurr"
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                aria-label={'Enter ' + strings.fields.origInt}
                placeholder={loanRateCurrPlaceholder}
                onInput={(e) => handleInputChange(e)}
                />
            </span>
            <i
              className="clear"
              onClick={(e) => {clearInput(e)}}></i>
            <div className="invalid-feedback">
              {props.loanRateCurr.message}
            </div>
          </div>
          {/* End current interest input */}
          <div className={pmtGroupClass}>
            <label>{strings.fields.origPmt}</label>
            <span className="symbol-wrapper currency">
              <input
                id="mo_pmt_curr"
                name="loanPmtCurr"
                type="number"
                maxLength="5"
                autoComplete="off"
                className="loanPmtCurr"
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                aria-label={'Enter ' + strings.fields.origPmt}
                placeholder={loanPmtCurrPlaceholder}
                onInput={(e) => handleInputChange(e)}
                />
            </span>
            <i
              className="clear"
              onClick={(e) => {clearInput(e)}}></i>
            <div className="invalid-feedback">
              {props.loanPmtCurr.message}
            </div>
          </div>
        </form>
      </div>
      <div className="offset-2 col-8 offset-sm-3 col-sm-6 col-md-4 offset-md-1 orig-loan-details">
        <form>
          <div className={newRateGroupClass}>
            <label>{strings.fields.newInt}</label>
            <span className="symbol-wrapper percent">
              <input
                id="int_rt_new"
                name="loanRateNew"
                className="loanRateNew"
                type="number"
                maxLength="6"
                autoComplete="off"
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                aria-label={'Enter ' + strings.fields.newInt}
                placeholder={loanRateNewPlaceholder}
                onInput={(e) => handleInputChange(e)}
                />
            </span>
            <i
              className="clear"
              onClick={(e) => {clearInput(e)}}></i>
            <div className="invalid-feedback">
              {props.loanRateNew.message}
            </div>
          </div>
          <div className={newPmtGroupClass}>
            <label>{strings.fields.newPmt}</label>
            <span className="symbol-wrapper currency">
              <input
                id="mo_pmt_new"
                name="loanPmtNew"
                type="number"
                className="loanPmtNew"
                maxLength="5"
                autoComplete="off"
                onFocus={(e) => onFocus(e)}
                onBlur={(e) => onBlur(e)}
                aria-label={'Enter ' + strings.fields.newPmt}
                placeholder={loanPmtNewPlaceholder}
                onInput={(e) => handleInputChange(e)}
                />
            </span>
            <i
              className="clear"
              onClick={(e) => {clearInput(e)}}></i>
            <div className="invalid-feedback">
              {props.loanPmtNew.message}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoanForm;
