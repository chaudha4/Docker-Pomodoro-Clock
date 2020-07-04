class BreakPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", { id: "break-label", className: "grid-item breakLabel" },
      React.createElement("h3", null, "Break Length"),
      React.createElement("i", { id: "break-decrement",
        class: "fas fa-arrow-alt-circle-down",
        onClick: this.props.breakDecrementCB }),

      React.createElement("b", { id: "break-length" }, this.props.breakLength),
      React.createElement("i", { id: "break-increment",
        class: "fas fa-arrow-alt-circle-up",
        onClick: this.props.breakIncrementCB })));



  }}


class SessionPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", { id: "session-label", className: "grid-item sessionLabel" },
      React.createElement("h3", null, "Session Length"),
      React.createElement("i", { id: "session-decrement",
        class: "fas fa-arrow-alt-circle-down",
        onClick: this.props.sessionDecrementCB }),

      React.createElement("b", { id: "session-length" }, this.props.sessionLength),
      React.createElement("i", { id: "session-increment",
        class: "fas fa-arrow-alt-circle-up",
        onClick: this.props.sessionIncrementCB })));



  }}


class TimerPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let titleText = this.props.timerState === TIMER_RUNNING_BREAK ? TIMER_RUNNING_BREAK : TIMER_RUNNING_SESSION;
    let minStr = "0" + this.props.MM;
    let secStr = "0" + this.props.SS;
    return (
      React.createElement("div", { id: "timer-label", className: "grid-item timer" },
      React.createElement("h3", null, titleText),
      React.createElement("i", { id: "time-left" }, minStr.slice(-2), ":", secStr.slice(-2))));


  }}


class TimerControl extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", { id: "start_stop", className: "grid-item start_stop" },
      React.createElement("i", { id: "timer_start",
        class: "fa fa-play",
        onClick: this.props.timerPlay }),

      React.createElement("i", { id: "timer_pause",
        class: "fa fa-pause",
        onClick: this.props.timerPause }),

      React.createElement("i", { id: "reset",
        class: "fa fa-recycle",
        onClick: this.props.timerRefresh })));



  }}
// TimerControl

const TIMER_RUNNING_SESSION = "Session";
const TIMER_RUNNING_BREAK = "Break";

const DEFAULT = {
  breakLength: 5,
  sessionLength: 25,
  timerState: TIMER_RUNNING_SESSION,
  timerRunnning: false,
  MM: 25,
  SS: 0,
  timerInstance: null };


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT;

    this.breakDecrementCB = this.breakDecrementCB.bind(this);
    this.breakIncrementCB = this.breakIncrementCB.bind(this);
    this.sessionDecrementCB = this.sessionDecrementCB.bind(this);
    this.sessionIncrementCB = this.sessionIncrementCB.bind(this);

    this.timerPlayCB = this.timerPlayCB.bind(this);
    this.timerPauseCB = this.timerPauseCB.bind(this);
    this.timerRefreshCB = this.timerRefreshCB.bind(this);
    this.timerFunc = this.timerFunc.bind(this);
  }

  breakDecrementCB(id) {
    console.log("Break Decrement pressed - " + this.state.timerState + " - " + this.state.timerRunnning);
    let newVal = this.state.breakLength - 1;
    if (newVal <= 0) {
      return;
    }

    if (this.state.timerRunnning) {
      if (this.state.timerState === TIMER_RUNNING_SESSION) {
        this.setState({ breakLength: newVal });
      } else {
        // Cannot update while my Timer is running
        return;
      }
    } else {
      this.setState({ breakLength: newVal });
      if (this.state.timerState === TIMER_RUNNING_BREAK) {
        this.setState({ SS: 0, MM: newVal });
      }
    }
  } //breakDecrementCB

  breakIncrementCB(id) {
    console.log("Break Increment pressed - " + this.state.timerState + " - " + this.state.timerRunnning);
    let newVal = this.state.breakLength + 1;
    if (newVal > 60) {
      return;
    }

    if (this.state.timerRunnning) {
      if (this.state.timerState === TIMER_RUNNING_SESSION) {
        this.setState({ breakLength: newVal });
      } else {
        // Cannot update while my Timer is running
        return;
      }
    } else {
      this.setState({ breakLength: newVal });
      if (this.state.timerState === TIMER_RUNNING_BREAK) {
        this.setState({ SS: 0, MM: newVal });
      }
    }
  } //breakIncrementCB

  sessionDecrementCB(id) {
    console.log("Session Decrement pressed - " + this.state.timerState + " - " + this.state.timerRunnning);
    let newVal = this.state.sessionLength - 1;
    if (newVal <= 0) {
      return;
    }

    if (this.state.timerRunnning) {
      if (this.state.timerState === TIMER_RUNNING_BREAK) {
        this.setState({ sessionLength: newVal });
      } else {
        // Cannot update while my Timer is running
        return;
      }
    } else {
      this.setState({ sessionLength: newVal });
      if (this.state.timerState === TIMER_RUNNING_SESSION) {
        this.setState({ SS: 0, MM: newVal });
      }
    }
  } //sessionDecrementCB

  sessionIncrementCB(id) {
    console.log("Session Increment pressed - " + this.state.timerState + " - " + this.state.timerRunnning);
    let newVal = this.state.sessionLength + 1;
    if (newVal > 60) {
      return;
    }

    if (this.state.timerRunnning) {
      if (this.state.timerState === TIMER_RUNNING_BREAK) {
        this.setState({ sessionLength: newVal });
      } else {
        // Cannot update while Breat Timer is running
        return;
      }
    } else {
      this.setState({ sessionLength: newVal });
      if (this.state.timerState === TIMER_RUNNING_SESSION) {
        this.setState({ SS: 0, MM: newVal });
      }
    }
  } //sessionIncrementCB

  timerFunc() {
    let sec = this.state.SS;
    let min = this.state.MM;

    this.setState({ timerRunnning: true });

    if (sec == 0 && min == 0) {
      // Reached end of Session or break.
      console.log("Swap Session Break");
      if (this.state.timerState === TIMER_RUNNING_SESSION) {
        this.setState({ timerState: TIMER_RUNNING_BREAK,
          SS: 0,
          MM: this.state.breakLength });

      } else {
        this.setState({ timerState: TIMER_RUNNING_SESSION,
          SS: 0,
          MM: this.state.sessionLength });

      }
      return;
    } // Swap Session Complete

    if (sec > 0) {
      sec = sec - 1;
      this.setState({ SS: sec });
      console.log("timerPlayCB pressed - Decrement Sec " + min + ":" + sec);
    } else {
      min = min - 1;
      sec = 59;
      this.setState({ MM: min,
        SS: sec });


    }
  } //timerFunc

  timerPlayCB(id) {
    console.log("timerPlayCB pressed");
    this.timerFunc();
    let inst = setInterval(this.timerFunc, 1000); //setInterval
    this.setState({ timerInstance: inst });
  } //timerPlayCB


  timerPauseCB(id) {
    //this.setState({value: id});
    console.log("timerPauseCB pressed");
    clearInterval(this.state.timerInstance);
    this.setState({ timerRunnning: false });
  }

  timerRefreshCB(id) {
    //this.setState({value: id});
    console.log("timerRefreshCB pressed");
    clearInterval(this.state.timerInstance);
    this.setState(DEFAULT);
  }

  render() {
    return (
      React.createElement("div", { id: "container", className: "grid-container" },
      React.createElement("div", { id: "title", className: "grid-item title" }, "Pomodoro Clock"),

      React.createElement(BreakPanel, {
        breakLength: this.state.breakLength,
        breakDecrementCB: this.breakDecrementCB,
        breakIncrementCB: this.breakIncrementCB }),

      React.createElement(SessionPanel, {
        sessionLength: this.state.sessionLength,
        sessionDecrementCB: this.sessionDecrementCB,
        sessionIncrementCB: this.sessionIncrementCB }),

      React.createElement(TimerPanel, {
        timerState: this.state.timerState,
        MM: this.state.MM,
        SS: this.state.SS }),

      React.createElement(TimerControl, {
        timerPlay: this.timerPlayCB,
        timerPause: this.timerPauseCB,
        timerRefresh: this.timerRefreshCB })));



  }}



ReactDOM.render(React.createElement(App, null), document.getElementById("root"));