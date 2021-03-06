!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.StereoAnalyserNode=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

/**
 *  StereoAnalyserImpl
 *  +----------------------------+
 *  | ChannelSplitterNode(inlet) |
 *  +----------------------------+
 *    |                    |
 *  +-----------------+  +-----------------+
 *  | AnalyserNode(L) |  | AnalyserNode(R) |
 *  +-----------------+  +-----------------+
 *    |                    |
 *  +---------------------------+
 *  | ChannelMergerNode(outlet) |
 *  +---------------------------+
 */
function StereoAnalyserImpl(audioContext) {
  this.audioContext = audioContext;
  this.inlet = audioContext.createChannelSplitter(2);
  this.L = audioContext.createAnalyser();
  this.R = audioContext.createAnalyser();
  this.outlet = audioContext.createChannelMerger(2);

  this.inlet.channelCount = 2;
  this.inlet.channelCountMode = "explicit";

  this.inlet.connect(this.L, 0, 0);
  this.inlet.connect(this.R, 1, 0);
  this.L.connect(this.outlet, 0, 0);
  this.R.connect(this.outlet, 0, 1);
}

StereoAnalyserImpl.prototype.getFFTSize = function() {
  return this.L.fftSize;
};

StereoAnalyserImpl.prototype.setFFTSize = function(value) {
  this.L.fftSize = this.R.fftSize = value;
};

StereoAnalyserImpl.prototype.getFrequencyBinCount = function() {
  return this.L.frequencyBinCount;
};

StereoAnalyserImpl.prototype.getMinDecibels = function() {
  return this.L.minDecibels;
};

StereoAnalyserImpl.prototype.setMinDecibels = function(value) {
  this.L.minDecibels = this.R.minDecibels = value;
};

StereoAnalyserImpl.prototype.getMaxDecibels = function() {
  return this.L.maxDecibels;
};

StereoAnalyserImpl.prototype.setMaxDecibels = function(value) {
  this.L.maxDecibels = this.R.maxDecibels = value;
};

StereoAnalyserImpl.prototype.getSmoothingTimeConstant = function() {
  return this.L.smoothingTimeConstant;
};

StereoAnalyserImpl.prototype.setSmoothingTimeConstant = function(value) {
  this.L.smoothingTimeConstant = this.R.smoothingTimeConstant = value;
};

StereoAnalyserImpl.prototype.getFloatFrequencyData = function(arrayL, arrayR) {
  this.L.getFloatFrequencyData(arrayL);
  this.R.getFloatFrequencyData(arrayR);
};

StereoAnalyserImpl.prototype.getByteFrequencyData = function(arrayL, arrayR) {
  this.L.getByteFrequencyData(arrayL);
  this.R.getByteFrequencyData(arrayR);
};

StereoAnalyserImpl.prototype.getFloatTimeDomainData = function(arrayL, arrayR) {
  this.L.getFloatTimeDomainData(arrayL);
  this.R.getFloatTimeDomainData(arrayR);
};

StereoAnalyserImpl.prototype.getByteTimeDomainData = function(arrayL, arrayR) {
  this.L.getByteTimeDomainData(arrayL);
  this.R.getByteTimeDomainData(arrayR);
};

StereoAnalyserImpl.prototype.connect = function(destination) {
  global.AudioNode.prototype.connect.call(this.outlet, destination);
};

StereoAnalyserImpl.prototype.disconnect = function() {
  global.AudioNode.prototype.disconnect.call(this.outlet);
};

module.exports = StereoAnalyserImpl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
"use strict";

var StereoAnalyserImpl = require("./stereo-analyser-impl");

function StereoAnalyserNode(audioContext) {
  var impl = new StereoAnalyserImpl(audioContext);

  Object.defineProperties(impl.inlet, {
    fftSize: {
      set: function(value) {
        impl.setFFTSize(value);
      },
      get: function() {
        return impl.getFFTSize();
      },
      enumerable: true
    },
    frequencyBinCount: {
      get: function() {
        return impl.getFrequencyBinCount();
      },
      enumerable: true
    },
    minDecibels: {
      set: function(value) {
        impl.setMinDecibels(value);
      },
      get: function() {
        return impl.getMinDecibels();
      },
      enumerable: true
    },
    maxDecibels: {
      set: function(value) {
        impl.setMaxDecibels(value);
      },
      get: function() {
        return impl.getMaxDecibels();
      },
      enumerable: true
    },
    smoothingTimeConstant: {
      set: function(value) {
        impl.setSmoothingTimeConstant(value);
      },
      get: function() {
        return impl.getSmoothingTimeConstant();
      },
      enumerable: true
    },
    connect: {
      value: function(destination) {
        return impl.connect(destination);
      }
    },
    disconnect: {
      value: function() {
        return impl.disconnect();
      }
    },
    getFloatFrequencyData: {
      value: function(arrayL, arrayR) {
        return impl.getFloatFrequencyData(arrayL, arrayR);
      }
    },
    getByteFrequencyData: {
      value: function(arrayL, arrayR) {
        return impl.getByteFrequencyData(arrayL, arrayR);
      }
    },
    getFloatTimeDomainData: {
      value: function(arrayL, arrayR) {
        return impl.getFloatTimeDomainData(arrayL, arrayR);
      }
    },
    getByteTimeDomainData: {
      value: function(arrayL, arrayR) {
        return impl.getByteTimeDomainData(arrayL, arrayR);
      }
    }
  });

  return impl.inlet;
}

module.exports = StereoAnalyserNode;

},{"./stereo-analyser-impl":1}]},{},[2])(2)
});