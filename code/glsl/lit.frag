#version 450

layout(location = 0) in vec3 fragmentColor;
layout(location = 1) in vec4 vertWorldPos;
layout(location = 2) in vec3 lightSourcePos;

layout(location = 0) out vec4 outColor;

layout(set = 0, binding = 0) uniform LightViewMatrix {
  mat4 value;
} lightViewMatrix;

layout(set = 1, binding = 0) uniform LightProjMatrix {
  mat4 value;
} lightProjMatrix;

layout(set = 4, binding = 0) uniform sampler2D shadowMap;

float getLightTravelDistance() {
  vec4 vertLightProjPos = lightProjMatrix.value * lightViewMatrix.value * vertWorldPos;
  
  // This is the perspective division that transforms projection space into normalised device space.
  vec3 normalisedDevicePos = vertLightProjPos.xyz / vertLightProjPos.w;
  
  // Change the bounds from [-0.5,+0.5] to [0,1].
  vec2 texCoord = vec2(normalisedDevicePos.x, normalisedDevicePos.y) * 0.5 + 0.5;
  
  // Only the R value is used because the other components are only used for debugging.
  return texture(shadowMap, texCoord).r;
}

void main() {
  outColor = vec4(fragmentColor, 1);
  
  // Attenuate the fragment color if it is in shadow
  float vertToLightSourceDistance = length(lightSourcePos - vertWorldPos.xyz);
  float nearlyZero = 0.01; // This is necessary due to floating point inaccuracy
  if (vertToLightSourceDistance - getLightTravelDistance() > nearlyZero) {
    outColor.xyz *= 0.5;
  }
}






