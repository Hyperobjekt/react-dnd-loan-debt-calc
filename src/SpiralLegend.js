import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const SpiralLegend = ({ getCurrencyFormat, loans, strings, colors }) => {

  const userAmt = (loans.user > 0) ? getCurrencyFormat(loans.user, true) : ReactHtmlParser('$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

  return (
    <table className="spiral-legend">
      <tbody>
        <tr>
          <td className="th"><i className="circle overall"></i>{strings.spiral.legend.avgOverall}</td>
          <td className="amt">{getCurrencyFormat(loans.overall, true)}</td>
        </tr>
        <tr>
          <td className="th"><i className="circle black"></i>{strings.spiral.legend.avgBlack}</td>
          <td className="amt">{getCurrencyFormat(loans.black, true)}</td>
        </tr>
        <tr>
          <td className="th"><i className="circle white"></i>{strings.spiral.legend.avgWhite}</td>
          <td className="amt">{getCurrencyFormat(loans.white, true)}</td>
        </tr>
        <tr>
          <td className="th"><i className="circle asian"></i>{strings.spiral.legend.avgAsian}</td>
          <td className="amt">{getCurrencyFormat(loans.asian, true)}</td>
        </tr>
        <tr>
          <td className="th"><i className="circle hispanic"></i>{strings.spiral.legend.avgHispanic}</td>
          <td className="amt">{getCurrencyFormat(loans.hispanic, true)}</td>
        </tr>
        <tr>
          <td className="th"><i className="circle user"></i>{strings.spiral.legend.user}</td>
          <td className="amt">{userAmt}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SpiralLegend;
