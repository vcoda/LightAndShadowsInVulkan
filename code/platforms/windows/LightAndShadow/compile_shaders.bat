
"../VulkanSDK 1.1.121.2/Bin/glslc.exe" ../../../glsl/basic.vert -o ../x64/Debug/assets/basic_vert.spv
IF %ERRORLEVEL% NEQ 0 (pause)

"../VulkanSDK 1.1.121.2/Bin/glslc.exe" ../../../glsl/basic.frag -o ../x64/Debug/assets/basic_frag.spv
IF %ERRORLEVEL% NEQ 0 (pause)
