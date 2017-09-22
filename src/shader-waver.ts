export const SHADER_WAVE_VERTEX: string =
    "precision highp float;\r\n" +

    "// Attributes\r\n" +
    "attribute vec3 position;\r\n" +
    "attribute vec3 normal;\r\n" +
    "attribute vec2 uv;\r\n" +

    "// Uniforms\r\n" +
    "uniform mat4 worldViewProjection;\r\n" +
    "uniform float time;\r\n" +

    "// Varying\r\n" +
    "varying vec3 vPosition;\r\n" +
    "varying vec3 vNormal;\r\n" +
    "varying vec2 vUV;\r\n" +

    "void main(void) {\r\n" +
    "    vec3 v = position;\r\n" +
    "    v.x += sin(0.2 * position.z + (time)) * 2.0;\r\n" +
    "    \r\n" +
    "    gl_Position = worldViewProjection * vec4(v, 1.0);\r\n" +
    "    \r\n" +
    "    vPosition = position;\r\n" +
    "    vNormal = normal;\r\n" +
    "    vUV = uv;\r\n" +
    "}\r\n";

export const SHADER_WAVE_FRAGMENT: string =
    "precision highp float;\r\n" +
    "// Varying\r\n" +
    "varying vec3 vPosition;\r\n" +
    "varying vec3 vNormal;\r\n" +
    "varying vec2 vUV;\r\n" +

    "// Uniforms\r\n" +
    "uniform mat4 world;\r\n" +

    "// Refs\r\n" +
    "uniform vec3 cameraPosition;\r\n" +
    "uniform sampler2D textureSampler;\r\n" +

    "void main(void) {\r\n" +
    "    vec3 vLightPosition = vec3(0,20,10);\r\n" +
    "    \r\n" +
    "    // World values\r\n" +
    "    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\n" +
    "    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\n" +
    "    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\n" +
    "    \r\n" +
    "    // Light\r\n" +
    "    vec3 lightVectorW = normalize(vLightPosition - vPositionW);\r\n" +
    "    vec3 color = texture2D(textureSampler, vUV).rgb;\r\n" +
    "    \r\n" +
    "    // diffuse\r\n" +
    "    float ndl = max(0., dot(vNormalW, lightVectorW));\r\n" +
    "    \r\n" +
    "    // Specular\r\n" +
    "    vec3 angleW = normalize(viewDirectionW + lightVectorW);\r\n" +
    "    float specComp = max(0., dot(vNormalW, angleW));\r\n" +
    "    specComp = pow(specComp, max(1., 64.)) * 2.;\r\n" +
    "    \r\n" +
    "    gl_FragColor = vec4(color * ndl + vec3(specComp), 1.);\r\n" +
    "}\r\n";


