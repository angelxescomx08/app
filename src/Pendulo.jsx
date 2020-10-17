import React from 'react';
import './App.css';

var r1 = 200;
var r2 = 200;

var m1 = 10;
var m2 = 10;

var g = 1;

var px2 = -1;
var py2 = -1;

var canvas
var ctx
var canvas1
var ctx1

class Pendulo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {a1: Math.PI/2, a2: Math.PI/2,a1_v: 0,a2_v: 0,a1_a: 0, a2_a: 0,numero_pendulos: 1

    };
    
  }

  componentDidMount(){
    canvas = document.getElementById("Canvas")
    ctx = canvas.getContext("2d")
    canvas1 = document.getElementById("Canvas1")
    ctx1 = canvas1.getContext("2d")
    ctx1.translate(400,50)
    ctx.translate(350,50)
    this.draw()
  }

  draw(){
    //para el canvas2

    var est = this.state;
    //formulas aceleracion 1
    var num1 = -g*(2*m1+m2)*Math.sin(est.a1);
    var num2 = -m2 * g * Math.sin(est.a1-2*est.a2);
    var num3 = -2 * Math.sin(est.a1-est.a2)*m2;
    var num4 = est.a2_v * est.a2_v * r2 + est.a1_v * est.a1_v * r1* Math.cos(est.a1-est.a2);
    var den = r1 * (2*m1+m2-m2*Math.cos(2*est.a1-2*est.a2))

    est.a1_a = (num1 + num2+ num3 *num4)/den;
    
    //formulas aceleracion 2
    num1 = 2 * Math.sin(est.a1-est.a2)
    num2 = (est.a1_v*est.a1_v*r1*(m1+m2))
    num3 = g * (m1+m2) * Math.cos(est.a1)
    num4 = est.a2_v * est.a2_v * r2 * m2 * Math.cos(est.a1-est.a2)
    den = r2 * (2*m1+m2-m2*Math.cos(2*est.a1-2*est.a2))

    est.a2_a = num1*(num2+num3+num4)/den

    ctx.fillStyle = "#FF0000";
    var x1 = r1 * Math.sin(this.state.a1)
    var y1 = r1 * Math.cos(this.state.a1)
  
    var x2 = x1 + r2 * Math.sin(this.state.a2)
    var y2 = y1 + r2 * Math.cos(this.state.a2)
  
    ctx.fillStyle = "black"
  
    //primera pelota
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(x1,y1)
    ctx.stroke()
  
    ctx.beginPath()
    ctx.ellipse(x1, y1, 10, 10, Math.PI / 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  
    //segunda pelota
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.stroke()
  
    ctx.beginPath()
    ctx.ellipse(x2, y2, 10, 10, Math.PI / 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke() 
    
    this.setState({
      a1_v: est.a1_v*0.996 + est.a1_a,
      a2_v: est.a2_v*0.996 + est.a2_a,
      a1: est.a1 + est.a1_v,
      a2: est.a2 + est.a2_v,
      inicio: 2})
    
    ctx1.beginPath()
    if(px2 != -1){
      ctx1.moveTo(px2,py2)
      ctx1.lineTo(x2,y2)
    }
    ctx1.stroke() 
    
    px2 = x2
    py2 = y2
  }

  ruta(){
    var canvas = document.getElementById("Canvas1")
    var ctx = canvas.getContext("2d")

    ctx.fillStyle = "#FF0000";
    var x1 = r1 * Math.sin(this.state.a1)
    var y1 = r1 * Math.cos(this.state.a1)

    var x2 = x1 + r2 * Math.sin(this.state.a2)
    var y2 = y1 + r2 * Math.cos(this.state.a2)

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2+1, y2+1);
    ctx.stroke();
  }

  clear(){
    ctx.clearRect(-600, -600, 1600, 1600);
  }

  render() {
    return(
      <div>
        <canvas width="800" height="600" id="Canvas" style={{backgroundColor:'grey'}} onMouseMove={() =>{
          this.clear()
          this.draw()
          this.ruta()
        }}></canvas>
        <canvas width="800" height="600" id="Canvas1" style={{backgroundColor:'#76b09c'}}></canvas>
        <br/>
        <p>{this.state.a1}</p>
      </div>
    );
  }
}

export default Pendulo;