#pragma once
#include "GraphicsPipeline.h"

class DrawCall {
public:
  VkBuffer positionBuffer;
  VkBuffer normalBuffer;
  uint32_t vertexCount;
  
  VkDescriptorSet descriptorSets[GraphicsPipeline::swapchainSize];
  VkBuffer        descriptorBuffers[GraphicsPipeline::swapchainSize];
  VkDeviceMemory  descriptorBuffersMemory[GraphicsPipeline::swapchainSize];
  
  // Auto-make normals based on positions
  DrawCall(const GraphicsPipeline *pipeline, const vector<vec3> &vertices);
  
  // Pass normals in explicitly
  DrawCall(const GraphicsPipeline *pipeline, const vector<vec3> &positions, const vector<vec3> &normals);
  
  ~DrawCall();

private:
  const GraphicsFoundation *foundation = nullptr;
  const GraphicsPipeline *pipeline = nullptr;
  VkDeviceMemory positionBufferMemory;
  VkDeviceMemory normalBufferMemory;
  
  void initCommon(const GraphicsPipeline *pipeline, const vector<vec3> &positions, const vector<vec3> &normals);
  
  void createVec3Buffer(const vector<vec3> &vec3s, VkBuffer *bufferOut, VkDeviceMemory *memoryOut) const;
};




