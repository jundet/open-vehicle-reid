import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai-experiment-conv',
  templateUrl: './conv.component.html',
})
export class AiExperimentConvComponent implements OnInit {

  constructor() {}
  inputvalue: string;
  padding: string;
  dilation = '1,1,1';
  kernelSize: string;
  stride: string;
  DOut: string;
  HOut: string;
  WOut: string;
  ngOnInit() {}
  compute = function() {
    const inputvalues = this.inputvalue.toString().split(',');
    const paddings = this.padding.toString().split(',');
    const dilations = this.dilation.toString().split(',');
    const kernelSizes = this.kernelSize.toString().split(',');
    const strides = this.stride.toString().split(',');

    function getint(stringvalue) {
      const intvalue = [];
      for (const intValue of stringvalue) {
        intvalue.push(parseInt(intValue));
      }
      if (intvalue.length < inputvalues.length) {
        const x = intvalue[0];
        for (let j = 0; j < inputvalues.length - intvalue.length + 1; j++) {
          intvalue.push(x);
        }
      }
      return intvalue;
    }

    this.inputvalue = getint(inputvalues);
    this.padding = getint(paddings);
    this.dilation = getint(dilations);
    this.kernelSize = getint(kernelSizes);
    this.stride = getint(strides);
    console.log(this.kernelSize);
    function getOutValue(x: any, px: any, dx: any, kx: any, sx: any) {
      x = (x + 2 * px - dx * (kx - 1) - 1) / sx + 1;
      x = Math.floor(x);
      return x;
    }
    if (this.inputvalue.length === 3) {
      this.DOut = getOutValue(
        this.inputvalue[0],
        this.padding[0],
        this.dilation[0],
        this.kernelSize[0],
        this.stride[0],
      );
      this.HOut = getOutValue(
        this.inputvalue[1],
        this.padding[1],
        this.dilation[1],
        this.kernelSize[1],
        this.stride[1],
      );
      this.WOut = getOutValue(
        this.inputvalue[2],
        this.padding[2],
        this.dilation[2],
        this.kernelSize[2],
        this.stride[2],
      );
    } else if (this.inputvalue.length === 2) {
      this.HOut = getOutValue(
        this.inputvalue[0],
        this.padding[0],
        this.dilation[0],
        this.kernelSize[0],
        this.stride[0],
      );
      this.WOut = getOutValue(
        this.inputvalue[1],
        this.padding[1],
        this.dilation[1],
        this.kernelSize[1],
        this.stride[1],
      );
    }
  };

  next = function() {
    this.inputvalue = this.DOut + ',' + this.HOut + ',' + this.WOut;
  };
  reset = function() {
    this.inputvalue = '';
    this.padding = '';
    this.dilation = '1,1,1';
    this.kernelSize = '';
    this.stride = '';
    this.DOut = '';
    this.HOut = '';
    this.WOut = '';
  };
}
