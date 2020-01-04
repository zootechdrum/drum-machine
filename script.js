const bankOne = [
{
  name: "kick_n_Hat",
  key: "Q",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

{
  name: "Heater-1",
  key: "W",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

{
  name: "Heater-2",
  key: "E",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

{
  name: "Heater-3",
  key: "A",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  name: "Heater-4_1",
  key: "S",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

{
  name: "Heater-6",
  key: "D",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

{
  name: "Dsc_Oh",
  key: "Z",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

{
  name: "Cev_H2",
  key: "X",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },

{
  name: "RP4_KICK_1",
  key: "C",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" }];



const bankTwo = [
{
  name: "Chord_3",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },

{
  name: "Chord_1",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },

{
  name: "Chord_2",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },

{
  name: "Give_us_a_light",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },

{
  name: "Dry_Ohh",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },

{
  name: "Bld_H1",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },

{
  name: "punchy_kick_1",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },

{
  name: "side_stick_1",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },

{
  name: "Brk_Snr",
  sound: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }];


// ‘https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3 ’


class DrumMachine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      power: false,
      display: 'Turn the Power On',
      volume: 0.4,
      bank: true };


    this.playSound = this.playSound.bind(this);
    this.keyPlaySound = this.keyPlaySound.bind(this);
    this.onOrOff = this.onOrOff.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changeBank = this.changeBank.bind(this);

  }




  //the below function is for playing the audio. 
  playSound(event) {
    if (this.state.power === true) {
      const sound = event.target.lastChild; //Grabs the last element in the Drum component which is the audio element.
      sound.parentElement.style.backgroundColor = "#51FF53";
      sound.volume = this.state.volume;
      setTimeout(() => {sound.parentElement.style.backgroundColor = '#A6FF51';}, 100);
      sound.currentTime = 0;
      sound.play(); // plays the actual event after it has been clicked. 
      //Below changes the display. 
      this.setState({
        display: event.target.id });

    };
  }

  keyPlaySound(event) {
    const audioRec = document.getElementById(event.key.toUpperCase());
    if (audioRec !== null) {//If any of the keys that are pressed matches a div I.D proceed to second step
      audioRec.parentElement.click(); // gets the parent element of audioRec which will be the Drum <input>.
    };
  }

  //Should toggle the Drum Machine between Power on and Power off.
  onOrOff() {
    if (this.state.power) {
      this.setState({
        power: !this.state.power,
        display: "OFF" });

    } else {
      this.setState({
        display: "Initializing..." });

      //Below gives the illusion of a boot-up process when drum pad is powerd on.
      setTimeout(function () {
        this.setState({
          power: !this.state.power,
          display: "ON" });

      }.bind(this), 1000);
    }
  }

  //Below function should control the volume
  changeVolume(event) {
    this.setState({
      volume: event.target.value });

  }
  changeBank(event) {
    this.setState({
      bank: !this.state.bank });

  }



  componentDidMount() {
    document.addEventListener("keydown", this.keyPlaySound);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPlaySound);
  }

  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", null,
      React.createElement(Display, { power: this.state.power, disp: this.state.display })),

      React.createElement("div", null,
      React.createElement(Bank, { switchBank: this.state.bank, changeUrl: this.changeBank })),

      React.createElement("div", { id: "pads" },
      bankOne.map((word, index) => React.createElement(Drum, { clicker: this.playSound, uniId: this.state.bank ? bankOne[index].name : bankTwo[index].name, kyPress: bankOne[index].key, sound: this.state.bank ? bankOne[index].sound : bankTwo[index].sound }))),

      React.createElement("div", { id: "bottomControl" },
      React.createElement("div", { class: "footerControl" },
      React.createElement(Switch, { setPower: this.onOrOff, power: this.state.power }),
      React.createElement("span", { class: "caption" }, "Power")),

      React.createElement("div", { class: "footerControl" },
      React.createElement(Volume, { vol: this.state.volume, change: this.changeVolume }),
      React.createElement("span", { class: "caption" }, "Volume")))));





  }}

//On or Off button on the bottom of the screen
function Switch(props) {
  return (
    React.createElement("button", { id: "power", onClick: props.setPower },
    props.power ? "OFF" : "ON"));


}
//Displays Power on Or Off on the display.
function Display(props) {
  return (
    React.createElement("div", { id: "display" }, props.disp));


}

function Bank(props) {
  return (
    React.createElement("div", { id: "bankContainer" },
    React.createElement("button", { id: "bank", onClick: props.changeUrl }, props.switchBank ? 'Bank One' : "Bank Two")));


}

//plays sound and created Div for each element. 
function Drum(props) {
  return (
    React.createElement("div", { className: "drum-pad", id: props.uniId, onClick: props.clicker },
    props.kyPress,
    React.createElement("audio", { id: props.kyPress, src: props.sound })));


}

function Volume(props) {
  return (
    React.createElement("input", { id: "vol", type: "range", id: "vol", max: "1", min: "0", step: "0.01", value: props.vol, onChange: props.change }));

}


ReactDOM.render(
React.createElement(DrumMachine, null), document.getElementById('root'));