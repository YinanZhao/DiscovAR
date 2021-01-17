'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      rotation: [0, 0, 0],
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onRotate = this._onRotate.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroNode position={[0,-2,-1]} dragType="FixedDistance" onDrag={()=>{}} >
          <Viro3DObject
            source={require('./res/Banana_obj/banana.obj')}
            resources={[require('./res/Banana_obj/banana.jpg'),
                require('./res/Banana_obj/banana.mtl'),
                require('./res/Banana_obj/banana.jpg')]}
            position={[0, 1, 0]}
            scale={[2.5, 2.5, 2.5]}
            type="OBJ" 
            materials = "face"
            rotation = {this.state.rotation}
            onRotate={this._onRotate}
            />
            {/* <ViroAmbientLight color="#FFE135" /> */}
            {/* <ViroBox position={[0, 1, 0]} scale={[0.5, 0.5, 0.5]} materials={["grid"]} /> */}
        </ViroNode>
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        {/* <ViroNode position={[0,-3,0]} dragType="FixedToWorld" onDrag={()=>{}} >
          
        </ViroNode> */}
        {/* <ViroAmbientLight color={"#aaaaaa"} /> */}
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "hihihi World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onRotate(rotateState, rotationFactor, source) {
    if (rotateState == 3) {
      this.setState({
        rotation : [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      });
      return;
    }
  }
  
}


var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/Picture1.jpg'),
  },
  face: {
    diffuseTexture: require('./res/Banana_obj/banana.jpg'),
    lightingModel: "Constant"
  }
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;
