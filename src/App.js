import "./App.css";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { LinearProgress } from "@mui/material";

function App() {
  const [qtype, setQtype] = useState("");
  const [start, setStart] = useState(-1);
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  var [timer, setTimer] = useState(300);

  const [math, setMath] = useState([
    {
      ques: "first president of india",
      option: ["Rajendra Prasad", "Sardar Vallabh Bhai Patel", "Jawahar Lal Nehru", "Sarvapalli Radha Krishnan"],
      ans: 0,
      sel_ans: -1,
    },
    {
      ques: "first prime minister of india",
      option: ["Rajendra Prasad", "Sardar Vallabh Bhai Patel", "Jawahar Lal Nehru", "Sarvapalli Radha Krishnan"],
      ans: 2,
      sel_ans: -1,
    },
    {
      ques: "Capital of India",
      option: ["New Delhi","Delhi","Patliputra", "Kolkata"],
      ans: 0,
      sel_ans: -1,
    },
    {
      ques: "Capital of SriLanka",
      option: ["Dhaka", "Kathmandu", "DC", "Colombo"],
      ans: 3,
      sel_ans: -1,
    },
    {
      ques: "Father of Nation",
      option: ["Mahatma Gandhi", "No one", "Sardar Patel","Savarkar"],
      ans: 1,
      sel_ans: -1,
    },
  ]);

  const seq = [" A ", " B ", " C ", " D "];

  const next_ques = () => {
    if (counter < 4) {
      setCounter(counter + 1);
    }
  };
  const prev_ques = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  const optionClick = (opt, isSelect) => {
    if (isSelect) {
      math[counter].sel_ans = opt;

      setMath([...math]);
    } else {
      math[counter].sel_ans = -1;
      setMath([...math]);
    }
  };

  const startQuiz = (i) => {
    setStart(i);
    setInterval(() => {
      timer = Number(timer) - 1;
      setTimer(timer);
    }, 1000);
  };

  const finish_quiz = () => {
    let t = 0;
    math.map((item) => {
      if (item.ans === item.sel_ans) {
        t += 20;
      } else if (item.sel_ans !== -1) {
        t -= 5;
      }
    });
    setScore(t);
    setStart(0);
  };

  useEffect(() => {
    if (timer === 0) {
      finish_quiz();
    }
  }, [timer]);

  return (
    <div className="App">
      {qtype === "" ? (
        <>
          <div className="qtype">
            <div onClick={() => setQtype("math")}>
              <span>Maths quiz</span>{" "}
              <span>
                <ArrowRightIcon />
              </span>
            </div>
            <div onClick={() => setQtype("english")}>
              <span>English quiz</span>{" "}
              <span>
                <ArrowRightIcon />
              </span>
            </div>
            <div onClick={() => setQtype("gk")}>
              <span>GS quiz</span>{" "}
              <span>
                <ArrowRightIcon />
              </span>
            </div>
          </div>
        </>
      ) : start === -1 ? (
        <div className="info-div">
          <p>No. of questions : 5</p>
          <p>Time given : 5 min</p>
          <p className="scheme">
            Marking Scheme:
            <ul>
              <li>Correct ans = +4</li>
              <li>Incorrect ans = -1</li>
              <li>Unvisited ans = 0</li>
            </ul>
          </p>
          <div className="info-button">
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => startQuiz(1)}
            >
              Start
            </button>
            <button
              style={{ backgroundColor: "grey" }}
              onClick={() => setQtype("")}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : start === 1 ? (
        <>
          <div className="timer">
            <p>
              {Math.floor(Number(timer) / 60)} min {Number(timer) % 60} sec Left
            </p>
          </div>
          <div className="question-div">
            <LinearProgress
              color="success"
              variant="determinate"
              value={counter * 20 + 20}
            />
            <p className="question">
              Ques {counter + 1} {"  :  "} {math[counter].ques}
            </p>
            <div className="options">
              {math[counter].option.map((opt, i) =>
                math[counter].sel_ans === i ? (
                  <p
                    onClick={() => optionClick(i, 0)}
                    className="active-opt"
                    key={i}
                  >
                    {seq[i]} : {opt}
                  </p>
                ) : (
                  <p key={i} onClick={() => optionClick(i, 1)}>
                    {seq[i]} : {opt}
                  </p>
                )
              )}
            </div>
            <div className="opt-btn">
              {counter === 0 ? (
                <button
                  onClick={next_ques}
                  style={{ backgroundColor: "#1877F2" }}
                >
                  Next
                </button>
              ) : counter !== 4 ? (
                <>
                  <button
                    onClick={prev_ques}
                    style={{ backgroundColor: "grey" }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={next_ques}
                    style={{ backgroundColor: "#1877F2" }}
                  >
                    Next
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={prev_ques}
                    style={{ backgroundColor: "grey" }}
                  >
                    Previous
                  </button>
                  <button className="finish_quiz" onClick={finish_quiz}>
                    Finish Quiz
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="res">
          <h1>Your Score</h1>
          <div className="score">
            <span>{score} out of 100</span>
          </div>
          <div className="res-s">
            <h4>Quiz Summary</h4>
            {math.map((item, i) => (
              <div className="res-ques">
                <p>
                  Q:{i + 1} {item.ques}
                </p>
                {item.ans === item.sel_ans ? (
                  <>
                    <p style={{ color: "green" }}>
                      Correct : {item.option[item.ans]}
                    </p>
                  </>
                ) : (
                  <>
                    {item.sel_ans !== -1 ? (
                      <p style={{ color: "red" }}>
                        Your ans : {item.option[item.sel_ans]}
                      </p>
                    ) : (
                      <p style={{ color: "grey" }}>Not Visited</p>
                    )}
                    <p style={{ color: "green" }}>
                      Correct ans :{item.option[item.ans]}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
