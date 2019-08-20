import React from 'react';
import ReactEcharts from 'echarts-for-react';

// Base64 image strings for bar colors
const currPrincipalBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAABEUlEQVQokS3QQXIQQQxD0S+5E7gLl+D+VdyHMG2JxcRrl/Us/fn1+3z+fJ6/ksU7klQAutfzISmNkXevEKUlbdvdtceyzwew96E9nqHIp4RWGiEE7b1f9ikgACe3TZu9F5Tdkhdxzg+EkH2QLA00Wc/MHNtNmm2TrH1QEU0sah/bFMAe2cm2IDULFio1uA1U0vN8JQvMfEjQlPfiMz7vHjOf45k5bSjQtpJogCSyLFnSvf9CZc+cUpA9kq1pK02z/v7Xzl4KktDm7j5JC1B72p69t/YbmSzUPqNTml14WwKNbb8Vj7+jd5+2zUumYI81p418gHRbsDwH0aakqaRIoDPzaSut5Ox9Ja+mL1XKrjz/AXht4F5l79hUAAAAAElFTkSuQmCC';

const newPrincipalBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAA/ElEQVQokS2SwW0AQQgDx2YvzaT/BtJVksPOY/NDSDBmhL6/PgEkjZvoDGl3NcOYgOjvi3QQyCRtsdnwPLzbd9kgJCNBrXOgWJJuQcIz9DZdCiU9fV+AqlkE5yCE2rIpaIzU8UFGkFCQuktNAlxCE7Ycm4RdANA5pGwoPAdJ9v8Msj4ebM1g9ffVc+T/BAJmZOsM3KybtkhYSJVkN6G9QIFmDgiBRSFtX0ElrpEWi6qt2WWGAsgCWpDYZaznsGlDcmQ3hWqmIBnaBNSflzG2pCYHS1dTq7ZALgJGbO4BgC+u3FySjXW/giKLzVV5SGrdLaV9l+vyNmxK36X9A2F2szwzIcVHAAAAAElFTkSuQmCC';

const oldIntBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAA6UlEQVQokTWSsXEAQQgDdzn678yJm3HyIAf3nzIgVhr59/sjpjQhoQrI81CFkjALQEqlWw1QJ0l2rSPkGSxKhKpOwvNYAtn1nDxPDFmFHc6RgjQBk0hgJ1kSLCyEhJkwQMGlieeDUxX0NKrvvEjoI+Z5ALtJkuA7iQJAYTETcjWyi0IgZJkhQTjdgNd4lgAB8JCligQCWjbZhE/p/fXFGbsDzCYpEAu0zvVEHQB99xJEq1+xMpcJmUHskw27N/+QRlF2X8mZG2dGslz4hDqNBWDh7cDlCbsg2fd+t9n5nPrlNWxef3g7pP4Dj1O3xyAAwJMAAAAASUVORK5CYII=';

const newIntBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAA60lEQVQokU3RyXEjQQwEwESzh/TfDLm2DkicA7WPHob0QyCAOiv/voQx9An14GIQifHUlyKZNK1LbaBB1Eu+9UELVZNSD8YNWZMhF82DUBSGet50Ii3kkkPvKlxcqpbEnw9MZF/bPwwYcso5KYnaFKac0pScbOrFqaa+5i3OJa2GhNyk2fnYrfy9Iy1trIfJpSanlHoOmhhz2TQ2Wd7beClqk5Z9yC7Rb0pav38zyiGRcwkbH0MbUUMV54JR9Wmu1WPeiWS/q0qrqUo99Ruc6sU1ZZdVPTkogtuoISvv59CrjPwWZvGuYT3g+A8PoZp3xmyQSQAAAABJRU5ErkJggg==';

const PayoffAmt = ({ getCurrencyFormat, principal, offsets, paths, user, colors}) => {

  let principalCurrBg = new Image();
  principalCurrBg.src = currPrincipalBg;

  let principalNewBg = new Image();
  principalNewBg.src = newPrincipalBg;

  let intCurrBg = new Image();
  intCurrBg.src = oldIntBg;

  let intNewBg = new Image();
  intNewBg.src = newIntBg;

  const options = {
    id: 'payoffAmt',
    show: false,
    animation: true,
    title: {
      show: (user.deviceWidth <= 460) ? true : false,
      text: "CURRENT AND NEW TOTAL PAYMENTS",
      textStyle: {
        fontFamily: 'Vasarely',
        fontSize: 16,
        color: '#000',
      },
      top: 0,
    },
    tooltip : {
        trigger: 'axis',
        show: (user.deviceWidth >= 461) ? true : false,
        axisPointer : {
          type : 'none'
        },
        padding: [6, 10],
        formatter: (params) => {
          // console.log('tooltip params');
          // console.log(params);
          if (params[0].data.value || params[1].data.value) {
            // console.log('params exist');
            return '<strong>' + params[0].axisValueLabel + '</strong><br>&nbsp;' +
              // params[0].marker + '&nbsp;' +
              (!!params[0].data.value ?
                getCurrencyFormat(params[0].data.value, true) :
                '$0' ) +
              ' PRINCIPAL<br>&nbsp;' +
              // params[1].marker + '&nbsp;' +
              (!!params[1].data.value ?
                getCurrencyFormat(params[1].data.value, true) :
                '$0' ) +
              ' INTEREST';
          } else {
            return '';
          }
        },
        textStyle: {
          fontFamily: 'Vasarely',
          fontSize: 16,
          color: '#000',

        },
        backgroundColor: '#FFEBAE',
        borderColor: '#000',
        borderWidth: 1,
        extraCssText: 'border-radius:0;'
    },
    legend: {
        data: ['CURRENT TOTAL PAYMENTS', 'NEW TOTAL PAYMENTS']
    },
    grid: {
      left: 0,
      top: (user.deviceWidth >= 461) ? 20 : 40,
      width: '100%',
      height: (user.deviceWidth >= 461) ? 70 : 120,
      containLabel: true
    },
    xAxis:  {
        type: 'value',
        show: false
    },
    yAxis: {
        type: 'category',
        data: ['NEW TOTAL PAYMENTS', 'CURRENT TOTAL PAYMENTS'],
        show: (user.deviceWidth >= 461) ? true : false,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false,
          alignWithLabel: true,
        },
        axisLabel: {
          show: (user.deviceWidth >= 461) ? true : false,
          fontFamily: 'Vasarely',
          fontSize: 18,
          verticalAlign: 'middle',
          padding: [0, 0, 5, 0],
        }
    },
    barWidth: 10,
    // barGap: '1%',
    series: [
      {
        type: 'bar',
        stack: 'yes',
        data: [
          { // New principal
            value: user.loanPrincipalNew, // principal,
            itemStyle: {
              // color: colors.principalNew,
              color: {
                image: principalNewBg,
                repeat: 'repeat'
              },
            },
            label: {
              borderColor: 'transparent',
              normal: {
                color: colors.darkFont,
                fontFamily: 'Vasarely',
                fontSize: 16,
                show: true,
                position: 'bottom',
                padding: 0,
                formatter: (el) => {
                  // console.log(el.value);
                  if (el.value >= 1) {
                    return getCurrencyFormat(el.value, true);
                  } else {
                    return '';
                  }
                }
              }
            }
          }, // end new principal.
          { // Old principal
            value: user.loanPrincipalCurr, // principal,
            itemStyle: {
              // color: colors.principalOld,
              color: {
                image: principalCurrBg, // principalCurrBg,
                repeat: 'repeat'
              },
            },
            label: {
              // value: totalPaidCurr,
              borderColor: 'transparent',
              normal: {
                color: colors.darkFont,
                fontFamily: 'Vasarely',
                fontSize: 16,
                show: true,
                position: 'top', // 'insideBottomRight',
                padding: 0,
                formatter: (el) => {
                  // console.log(el.value);
                  if (el.value >= 1) {
                    return getCurrencyFormat(el.value, true);
                  } else {
                    return '';
                  }
                }
              },
            }
          } // End old principal
        ],
      },
      {// Begin interest
        type: 'bar',
        stack: 'yes',
        data: [{ // New interest
          value: user.totalIntNew,
          itemStyle: {
            // color: colors.interestNew,
            color: {
              image: intNewBg,
              repeat: 'repeat'
            },
          },
          label: {
            borderColor: 'transparent',
            normal: {
              show: true,
              color: colors.darkFont,
              fontFamily: 'Vasarely',
              fontSize: 16,
              position: 'bottom', // 'insideTopRight',
              padding: 0,
              formatter: (el) => {
                // console.log(el.value);
                if (el.value >= 1) {
                  return getCurrencyFormat(el.value, true);
                } else {
                  return '';
                }
              }
            }
          },
        }, // end new interest
        { // Old interest
          value: user.totalIntCurr,
          itemStyle: {
            // color: colors.interestOld,
            color: {
              image: intCurrBg,
              repeat: 'repeat'
            },
          },
          label: {
            borderColor: 'transparent',
            normal: {
              color: colors.darkFont,
              fontFamily: 'Vasarely',
              fontSize: 16,
              show: true,
              position: 'top',
              padding: 0,
              formatter: (el) => {
                // console.log(el.value);
                if (el.value >= 1) {
                  return getCurrencyFormat(el.value, true);
                } else {
                  return '';
                }
              }
            }
          },
        }// end old interest
      ],
    }, // End interest
    ]
  };

  // opts={{renderer: 'svg'}}
  const height = (user.deviceWidth >= 461) ? '100px' : '140px';
  return (
    <div className="payoff-amt-parent">
      <ReactEcharts
        option={options}
        style={{height: height, width: '100%'}}
      />
    </div>
  );
}

export default PayoffAmt;
