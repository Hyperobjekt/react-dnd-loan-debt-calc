import React from "react";

const textureOverall =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAByklEQVQ4jT2TQY7dMAxDH2nP9P7H6qbXKdpEZBf2bxAEDmBL9COl379+IiFRaGixtL9YC0QCRQawScggnV/TALTYrNWZTkBMaGlAd/e8t1DSGebdyLezJJkf36A2tBLIbfj7kGDr6xvTgabRZn9BuU+1dlta2s7IllyDJPs22KKrmY1EKqulz8PeQkXYuiwiCfkKJnghC7b2JldkbVKWJV05LQiKhGDSVodU4z5PZxAIbKTOS4t8vgVkvAAkrcUMKdImASr0uTdSE51u9KrIXOxrUaB9H0OxaNsCCCQsEAXUTN+378feHniLZANk6P8D0dqsdU0WsvG6pe9pWrD3f7HHHig2Ni05u8DWZ4Ek6bi4afT9g7QtM6wFkNzYrNXmcMGm0HZOSNnIfV+Q7J6GDRUSmcYn0m11JNssQzrjj+Z05vS8i4t9SO5gFKzj13Hu3PlmG6q9bx4EWh//ctOWdh7WxtJavgCPz21LUzh5VBMa8B3Pft6k72PtL2RK5z1gzgCQMKND5CQ10wTU9ixMq6PTvicP7eRwwoZQdCqeb0LrHpI3FeVUPYYfvhKoz58ecmvhdfy3ToYQdjOdgfZ0+ISn837MR2dUbeAfF4V7meJR864AAAAASUVORK5CYII=";
const textureBlack =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAACY0lEQVQ4jT2UQZIrNwxDAZIt2zOpyv0Pkl1OkmMkmW+7RQJZ9ExWYqlECRQfyD/+/KuSAgjKsPV69eNxwOgRAAIGbJMkcVQagN3tyIyv1z7PsVFJkgamLRkAgGuJCIJBSg7Agu16nw1zxhs9Ez06KjIAkj+PSyb5+2+3lp7PvY2RkywAEbzuXiuj2a2ssDHjjDj32Lb979det8gMyWulheIljpjR3/9sgD3q0efjgCE5gjBlV8WMIxhJGI97RWYY6LbsqlwrPx7HjL6e+71npEzKnrHt13uCrAyAr3fXuUeyDYAkqkLjtbJb35KMozLTAI4KED2+EmId3+ckz9jy7pnROvK2SvK5B/B9pe3dOs/Ze6oiggHgfqvK6HEER57RjM89JB73ujbPPSSDuJT2qFsl+X6ryMjXBjDybZXt9znnnsogSVLyzBi44udzk4yRX++W9Pm5quLiieRt5cdj3W5FgjCIkW37ooaYUZEI8Ndz1znXpwV5UTVStwhW8mxlkoRE2QQjEAQlS957AFRyHZFBAN2yDKDHe4+N48ggSAAmGQBI3FfZsF1HVgaJCMI/eNsAzj3PV49MIDOCLI0ieNxSVzlyE6+zLeyeqrgddSFkY1qfHysCewt0fVcJVsW0zj0cBjnw5aH3bgsZERkzWitJAJRcj3vtCxLbZHyzjguDblkwHBGwM/h8dRCSDddluq9fZ2YE0a21MhzTAyCTNiKiR5fVz7NJ2OhRPN89UhCZvKbHbmWAZI+Jq+HHkXFNlR9746j4HyFqHMF1ZARtPB7HAzjPuVJIrhWfH2vveb36Mvl/GXMF6AW/PCgAAAAASUVORK5CYII=";
const textureWhite =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAACnUlEQVQ4jTXTQXIjRxBDUQBZ1U1SsjULH9tX8YV8BC8UHklDdldVJrygnCfIQPzHv//6EwQMkAQYrdbpzLi+1JyxXeFcxxdctWbst3Z7W/cPRgPQSBrfx9apJim2qytRpsTYlMs5pQ5w3f8F6DXZetN2qXU6C3aOA7b65pwu26umI14p1Uww7AIRfVf0ytVIORcYVETb1/3DmfP+odjAqDXq8z3XQZBNah2AXYzW+kU5HlDABgBS285oiqbWAVMNithe2DaqxXYDWeOcv37WGs02FWbWHLUWJdcimXmiDAAGJKqpdVd5pV2KPeejwXZOkBRJsW95rlqTlbHdnu/UmnDlcY/ra399o8K5xud7e84Ml+3YtspFoP/+h2vVGoSoaNc9xwEuRZDhXDlPVza1bqcLcKrvbB37NbZLjgeyEABQ4/g/gVlzsPXYX6TWtF3yvFOK/Va5qPBa2Ki+o4qKHEetQQkUbJSdy1VStHb9LfplnV9eE0D5fAYAJNsGV81TfYv9luOxHl/qO0FUWtHGz3+gIMDWahx+LoyigmKNpMJ2zrPWgg1T+xWuPH4JEkHX8hq1Fpwgx8d7nkeeR573uNxI1fkAEfuVBADtNwCNEKQag7HFdnEuKATkeMCgmMfdtaCAv/nk8eWctWZjBKOXmmu12xuoWiNzkAECcOUCQcNOKeLyQsW6fzDU8rhDAkUqzwej1ToYATZUgqz1oAIEFVXJcSg67Oh7A78hP1U6J0DAar0WnCv2GyVXuop6wiKjOZdcCRgiSErqO2wUaz6cE3Dstyd9uABUznl82tVefsh2zYEyKSrU95pjjXutARhAHs8EzOjqnRCqol+8RiOg/arYKAFYjy+Q0XdtuzNrHmC4Un0H6Tny/KKaqyj9B8RD8YHcFrG4AAAAAElFTkSuQmCC";
const textureAsian =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAACEUlEQVQ4jUWUTZb0NBAEI6tKPc0buAv3PwEXgmn/VCUL6wM/LbSwJWVGyDr/+hPA4AGw+fV4BoRNN6CvF5lgxmBQ0WMbEBjoJkMRAAMMISQisH3dkhAIIsIeSQoRwkOGsliLCDxIAJmEAIUQAJXgUJa73U2EMhkjyKBbq/R+qUoSxjYSq8hk8HkVFVxw939Z/Tk4LyQk/v5hrb3nKrq5GyCkzOI5RwT2Di5hI0BU0kPIM08CxoS4BxH0TTcS/9cMgrEy9P29u3heWIsMbPfstjeA/VkQDzq5R8ehCN+jDATd2Eh6LSrjickDy94D6bU29lXK3C70bE4eZsL//NDDpids7qbb5wVGAZCyhwgiiATcA4T++CYCrFVEEALTs1WzmfF5i6Dq6Zm1Hqj1lIkhQ5nYVGGzknlQSO8XAxGsxX1vFp7wdTGD7eOk28fp80JwNzOcN2MMK5VBt8/T1wVCUfrtTZV/DviVuZtJJGZsa5oIrns+J93MIPm69Pt30YNaq6hiBmCV7WeuTCIQPq8dbRVjezivcDdtbI4DrPcXoOcIhgfYWJWENpdVWgs7FOHzpNufg3uQFLGvTjefc8ur4Lq3FKuepYt4dCm9Fj10P54r02aDmPYMlShAfA7PqB50Yt+HEEquC5tMRWxsgyqfnwEzhBj751Nk+nPCrfcXPbi3r3fTLT+SDS1muG+Daj2G/wsSmHUs0akQ9wAAAABJRU5ErkJggg==";
const textureHispanic =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3QUIyNkM2QzZDOTExRTk4OThCRTc3MDE5QUYwQzQ5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3QUIyNkM1QzZDOTExRTk4OThCRTc3MDE5QUYwQzQ5IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzMgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InV1aWQ6RkQ1NjQwRjM0RDRBRTAxMUEyNzRBQjEzQjIzODVFMkYiIHN0UmVmOmRvY3VtZW50SUQ9InV1aWQ6RkM1NjQwRjM0RDRBRTAxMUEyNzRBQjEzQjIzODVFMkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4uRNnuAAABI1BMVEXT1tXX2tnW2djU19bS1dTV2NfY2trY29rT1tbR1NPZ3NvX2trV19fQ09LX2dna3NzS1dXc3t7c3t3Q09PW2NjZ29vV19bd39/X2djZ29rU1tbP0tLS1tXR1NTW2Nfa3NvZ3Nzb3d3b3t3T19bb3dzW2dnY29vc3d3d4N/N0dDY2tnf4eHa3d3a3dzV2NjT1dXS1dPO0tDO0tHP0tHg4uLR1dTT1dPR1dPO0dDS1NTW2dfU1tXN0NDc397d3t7g4eHS1NPa29rf4ODP09Hg4ODY3Nvf4eDZ2tre39/P09LN0c/X29rP0tDQ1NPX2tjU19ff4N/Y29nR09PZ29za3dvb3NzU19Xe4ODc3d7R09LW2tnLz87V2dfT1tTT19XZ2tnM0M++clbUAAABWElEQVR42gzBA4JcQRQF0PvK9W227R4zycS2nex/Fck5ONVSRO00D1hmfJT67gU4TLewOZM7Up7aqpprPu7BjxixPdPEMUyU5relIFwWKZMGdWPRCy5EPj3cV4jao0v+nwGhaX3PCiKgCyFhmQuquZA8VQ5H0VnT8lU6CAEmGrzkFGbQ3wefj495JXxLlef+VMVvBkee/wowdoRICMwpiK4YVgdnnLx2sOmVI3Z9bTI2yeEskvC1Q+xk7TwKn7zrdNVNBjeMvzhDjccTYeO3lbozv9Ko8GwXBn/9A8W4k5Qno+IBYUSuYTgUomOavNflbL4ANn8+lUGS5BP73on3kfWJpfDK+fDpw/7MvVefNzt2dvTcdzH6oGkLG7ux1H1usWL3Cf2BVNjOZmGmY9F5U38Mgm/oZ+1ws46XJvJkeup9LeUPgwRGyeVqOn7hdcZp5C7kreifAAMAkK8kbYEw/0MAAAAASUVORK5CYII=";
const textureUser =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAACbUlEQVQ4jT2UQW4jVxBDSVb9ljQOfJUcI9fPUWY2ltX9i8xCRnYFLgrkA0H++/c/ziYl0o5jILHt3etOQNLr9QVAKiTqBZBUUZ1MbDBRgSAYh5SqkRjxHqkA2DtB4QCE5NrfHYBSbABJYpMEQAjIz62OB5BEUgASHPcPzT7j6T4cI7E3ye5FCiQAkLMvAN0HRVGkSNi7KZGqXj7HsdRSBZh9VS+pVKtqdR2Unl9/AtxuH+Pr+fVbx7pX9cxFFsV4EhPodUviOHZs+5q5juPRfUhlj9TtGEBmqg8abAJMTJJk902qbNtzXV8k13ok9uzuo+15RwpAQKo3pJm995lEqqqGSh4Ae78AlBqq7lrX6wmyElBJkkhax2PmOs9nbKl6HZSQAKCkXgB0XWfiqmXPzAkEcBAg1cf9/tdx+0US4LEe3QeQ2VecOE2x+kicRBSAvS/7e617kgDOVK+qnn32uvW6AfE4diMhYLt6BdlzJXk34d2qUlWt2Eb2nByCfPvXeT5BPn59rnX/CU4dx4PS+8vt9vHOCQDBzL7Op20kfRwPBPZQJWnmkmq8SZEkf5R1PEie59Me1apqkP14fJ7n1/P5p+qoXlUVGw6E7lsyMxuIPd23vc/r+q5q9EGgbUt93D7i8QyQqv6/JwDXuts7iTNzvarWWrd4oGp7v9lQFW+98cRkJwEEQurE+3qp1jrupJ5fv7tvjWDPa1+vte6lRSIIAHuqBPI6v+3ddZBSMcm+nlVHkA5ctQKoGgiSt3+qKHlGVK1HMqWW2pkkQAgpwHV9X6/ndX3b9nsVAHt7DOT++FSVPfa8Z6eqSEn1H+pK6p0mPOQKAAAAAElFTkSuQmCC";

const Spiral = ({ ...props }) => {
  return (
    <div className="spiral">
      <svg viewBox="0 0 1038 1085" className={props.svgClasses}>
        <title>Loan Debt Vizualisation</title>
        <desc>
          Spiral-shaped visualization of loan debt by demographic. Shows overall
          averge loan debt for Bachelor's degree completers, as well as
          post-Bachelor's loan debt for black, white, asian, and hispanic
          graduates. These amounts are compared to the user's loan debt.
        </desc>
        <defs>
          <pattern
            id="overallStroke"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
            x="0"
            y="0"
          >
            <image
              xlinkHref={textureOverall}
              x="0"
              y="0"
              width="100"
              height="100"
            />
          </pattern>
          <pattern
            id="blackStroke"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            x="0"
            y="0"
          >
            <image
              xlinkHref={textureBlack}
              x="0"
              y="0"
              width="20"
              height="20"
            />
          </pattern>
          <pattern
            id="whiteStroke"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            x="0"
            y="0"
          >
            <image
              xlinkHref={textureWhite}
              x="0"
              y="0"
              width="20"
              height="20"
            />
          </pattern>
          <pattern
            id="asianStroke"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            x="0"
            y="0"
          >
            <image
              xlinkHref={textureAsian}
              x="0"
              y="0"
              width="20"
              height="20"
            />
          </pattern>
          <pattern
            id="hispanicStroke"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            x="0"
            y="0"
          >
            <image
              xlinkHref={textureHispanic}
              x="0"
              y="0"
              width="20"
              height="20"
            />
          </pattern>
          <pattern
            id="userStroke"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            x="0"
            y="0"
          >
            <image xlinkHref={textureUser} x="0" y="0" width="20" height="20" />
          </pattern>
        </defs>

        <path
          id="overall_avg"
          className="overall-avg"
          strokeDasharray={props.paths.overall}
          strokeDashoffset={props.offsets.overall}
          fill="none"
          d="M479.803 44L617.711 69.1419L770.228 149.83L892.359 274.37L954.885 438.67L973 588.352L915.149 782.471L804.705 929.815L666.213 1015.18L468.116 1045L290.471 994.716L154.316 881.285L69 697.106L80.6871 498.309L154.316 348.627L317.936 239.873L495.58 217.07L666.213 293.081L770.228 438.67L788.343 646.237L666.213 816.968L511.942 865.498L317.936 795.919L232.62 646.237L290.471 466.151L468.116 394.818"
        />

        <path
          id="user_loan_total"
          className="user-loan-total"
          strokeDasharray={props.paths.user}
          strokeDashoffset={props.offsets.user}
          d="M486 116.5L604 138L734.5 207L839 313.5L892.5 454L908 582L858.5 748L764 874L645.5 947L476 972.5L324 929.5L207.5 832.5L134.5 675L144.5 505L207.5 377L347.5 284L499.5 264.5L645.5 329.5L734.5 454L750 631.5L645.5 777.5L513.5 819L347.5 759.5L274.5 631.5L324 477.5L476 416.5"
          fill="none"
          // stroke="#979797"
          // stroke-width="15"
          // stroke-opacity="1"
          // stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default Spiral;
