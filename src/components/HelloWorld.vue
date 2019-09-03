<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-layout>
      </v-flex>

      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="3">
            <p class="text-left">TCP position:</p>
            <p class="text-left">{{txtTCPx}}</p>
            <p class="text-left">{{txtTCPy}}</p>
            <p class="text-left">{{txtTCPz}}</p>

            <!-- Slidery do zmiany pozycji osi -->
            <v-switch v-model="hand_mode" class="ma-2" label="Hand mode"></v-switch>
            <v-spacer></v-spacer>
            <v-flex xs12 mb-10>
              <v-slider
                class="mt-10 mx-auto"
                v-model="range1"
                label="Axis 1"
                thumb-label="always"
                :max="180"
                :min="-180"
                hide-details
              ></v-slider>
              <v-slider
                class="mt-10 mx-auto"
                v-model="range2"
                label="Axis 2"
                thumb-label="always"
                :max="90"
                :min="-90"
                hide-details
              ></v-slider>
              <v-slider
                class="mt-10 mx-auto"
                v-model="range3"
                label="Axis 3"
                thumb-label="always"
                :max="120"
                :min="-120"
                hide-details
              ></v-slider>
              <v-slider
                class="mt-10 mx-auto"
                v-model="range4"
                label="Axis 4"
                thumb-label="always"
                :max="180"
                :min="-180"
                hide-details
              ></v-slider>
              <v-slider
                class="mt-10 mx-auto"
                v-model="range5"
                label="Axis 5"
                thumb-label="always"
                :max="120"
                :min="-120"
                hide-details
              ></v-slider>
              <v-slider
                class="mt-10 mx-auto"
                v-model="range6"
                label="Axis 6"
                thumb-label="always"
                :max="180"
                :min="-180"
                hide-details
              ></v-slider>
            </v-flex>
          </v-col>

          <v-col cols="9">
            <v-flex xs12 mb-5>
              <v-layout>
                <Scene @before-render$="beforeRender" v-model="myScene">
                  <Camera
                    type="arcRotate"
                    :alpha="Math.PI*5/4"
                    :beta="Math.PI/3"
                    :radius="100"
                    :target="[0, 10, 0]"
                    v-model="myCamera"
                  ></Camera>

                  <HemisphericLight diffuse="#888"></HemisphericLight>

                  <!-- Światło punktowe z żarówką -->
                  <PointLight
                    :position="[0,200,0]"
                    specular="#FFF"
                    diffuse="#FFF"
                    v-model="myLight"
                  ></PointLight>
                  <Sphere :position="[0, 200, 0]" :scaling="[3, 3, 3]">
                    <Material specular="#FFF" diffuse="#FFF"></Material>
                  </Sphere>

                  <!-- Podłoga -->
                  <Plane
                    :height="2"
                    :width="1"
                    :rotation="[Math.PI/2,0,0]"
                    :position="[0, 0, 0]"
                    :scaling="[100, 100, 100]"
                  >
                    <Material diffuse="#AAA">
                      <Texture type="ambient" src="textura.png" v-model="myTexture"></Texture>
                    </Material>
                  </Plane>

                  <!-- Robot - podstawa -->
                  <Cylinder :position="[0, 1, 0]" :scaling="[10, 2, 10]">
                    <Material diffuse="#FFF">
                      <Texture type="diffuse" src="textura.png"></Texture>
                    </Material>
                  </Cylinder>
                  <Box :position="[5, 1, 0]" :scaling="[2, 3.8, 5]">
                    <Material diffuse="#FFF">
                      <Texture type="diffuse" src="textura.png"></Texture>
                    </Material>
                  </Box>

                  <!-- Robot - oś 1 -->
                  <Entity v-model="Axis1">
                    <Cylinder :position="[0, 3, 0]" :scaling="[6, 3, 6]" v-model="A1pos">
                      <Material diffuse="#FFF">
                        <Texture type="diffuse" src="textura.png"></Texture>
                      </Material>
                    </Cylinder>

                    <!-- Robot - oś 2 -->
                    <Entity v-model="Axis2">
                      <Cylinder
                        :rotation="[Math.PI/2,0,0]"
                        :position="[0, 7, 0]"
                        :scaling="[4, 2, 4]"
                        v-model="A2pos"
                      >
                        <Material diffuse="#2FF">
                          <Texture type="diffuse" src="textura.png"></Texture>
                        </Material>
                      </Cylinder>
                      <Box :rotation="[0,0,0]" :position="[0, 13, 0]" :scaling="[2.5, 10, 1.5]">
                        <Material diffuse="#2FF">
                          <Texture type="diffuse" src="textura.png"></Texture>
                        </Material>
                      </Box>

                      <!-- Robot - oś 3 -->
                      <Entity v-model="Axis3">
                        <Cylinder
                          :rotation="[Math.PI/2,0,0]"
                          :position="[0, 18, 0]"
                          :scaling="[3.2, 1.2, 3.2]"
                          v-model="A3pos"
                        >
                          <Material diffuse="#2F5">
                            <Texture type="diffuse" src="textura.png"></Texture>
                          </Material>
                        </Cylinder>
                        <Cylinder
                          :rotation="[0,0,0]"
                          :position="[0, 22, 0]"
                          :scaling="[2.0, 4.2, 2.0]"
                        >
                          <Material diffuse="#2F5">
                            <Texture type="diffuse" src="textura.png"></Texture>
                          </Material>
                        </Cylinder>

                        <!-- Robot - oś 4 -->
                        <Entity v-model="Axis4">
                          <Cylinder
                            :rotation="[0,Math.PI/2,0]"
                            :position="[0, 25, 0]"
                            :scaling="[1.8, 5, 1.8]"
                            v-model="A4pos"
                          >
                            <Material diffuse="#F52">
                              <Texture type="diffuse" src="textura.png"></Texture>
                            </Material>
                          </Cylinder>

                          <!-- Robot - oś 5 -->
                          <Entity v-model="Axis5">
                            <Cylinder
                              :rotation="[Math.PI/2,0,0]"
                              :position="[0, 30, 0]"
                              :scaling="[2.5, 0.9, 2.5]"
                              v-model="A5pos"
                            >
                              <Material diffuse="#F0F">
                                <Texture type="diffuse" src="textura.png"></Texture>
                              </Material>
                            </Cylinder>
                            <Box
                              :rotation="[0,0,0]"
                              :position="[0, 32, 0]"
                              :scaling="[1.2, 4, 1.2]"
                            >
                              <Material diffuse="#F0F">
                                <Texture type="diffuse" src="textura.png"></Texture>
                              </Material>
                            </Box>

                            <!-- Robot - oś 6 -->
                            <Entity v-model="Axis6">
                              <Cylinder
                                :rotation="[0,Math.PI/2,0]"
                                :position="[0, 34, 0]"
                                :scaling="[2.0, 0.5, 2.0]"
                                v-model="A6pos"
                              >
                                <Material diffuse="#FFF">
                                  <Texture type="diffuse" src="textura.png"></Texture>
                                </Material>
                              </Cylinder>

                              <!-- Narzędzie -->
                              <Entity v-model="Tool">
                                <Box
                                  :rotation="[0,0,0]"
                                  :position="[-2, 36, 0]"
                                  :scaling="[0.5, 3, 1]"
                                >
                                  <Material diffuse="#F00"></Material>
                                </Box>
                                <Box
                                  :rotation="[0,0,0]"
                                  :position="[2, 36, 0]"
                                  :scaling="[0.5, 3, 1]"
                                >
                                  <Material diffuse="#F00"></Material>
                                </Box>
                                <Box
                                  :rotation="[0,0,Math.PI/2]"
                                  :position="[0, 34.5, 0]"
                                  :scaling="[0.5, 4.5, 1]"
                                  v-model="myTCP_src"
                                >
                                  <Material diffuse="#F00"></Material>
                                </Box>
                                <!-- Robot - punkt TCP -->
                                <Sphere :scaling="[1, 1, 1]" v-model="myTCP_dst">
                                  <Material specular="#FFF" diffuse="#FFF"></Material>
                                </Sphere>
                              </Entity>
                            </Entity>
                          </Entity>
                        </Entity>
                      </Entity>
                    </Entity>
                  </Entity>
                </Scene>
              </v-layout>
            </v-flex>
            <p class="text-left">{{angles_calculated_txt}}</p>
            <p class="text-left">{{axis3_from_model_txt}}</p>
            <p class="text-left">{{axis4_from_model_txt}}</p>
            <p class="text-left">{{axis5_from_model_txt}}</p>
            <p class="text-left">{{axis6_from_model_txt}}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from "axios";

import { Vector3 } from "@babylonjs/core/Maths/math";
// import { Curve3 } from "@babylonjs/core/Maths/math";

const Kinematics = require("kinematics").default;
//import { Kinematics } from "kinematics";

let geometry = [
  [0, 8, 0], // V0: 1x 1y
  [0, 10, 0], // V1: 10y
  [7, 0, 0], // V2: 5x
  [5, 0, 0], // V3: 3x
  [0, -4, 0] // V4: -3y
];

const RobotKin = new Kinematics(geometry);

export default {
  data: () => ({
    time: performance.now(),
    myScene: null,
    myCamera: null,
    myLight: null,
    myTexture: null,
    Axis1: null,
    Axis2: null,
    Axis3: null,
    Axis4: null,
    Axis5: null,
    Axis6: null,
    A1: null,
    A2: null,
    A3: null,
    A4: null,
    A5: null,
    A6: null,
    A1pos: null,
    A2pos: null,
    A3pos: null,
    A4pos: null,
    A5pos: null,
    A6pos: null,
    axis3_from_model_txt: null,
    axis4_from_model_txt: null,
    axis5_from_model_txt: null,
    axis6_from_model_txt: null,
    machine: null,
    myVector2: new Vector3(0, 7, 0),
    myVector3: new Vector3(0, 18, 0),
    myVector4: new Vector3(0, 0, 0),
    myVector5: new Vector3(0, 30, 0),
    myVector6: new Vector3(0, 32, 0),
    Tool: null,
    range1: null,
    range2: 20,
    range3: 90,
    range4: null,
    range5: null,
    range6: null,
    hand_mode: null,
    myTCP_dst: null,
    myTCP_src: null,
    tcp: new Vector3(0, 0, 0),
    txtTCPx: "X = 0.0",
    txtTCPy: "Y = 0.0",
    txtTCPz: "Z = 0.0",
    angles_calculated_txt: null,
    importantLinks: [
      {
        text: "DTP",
        href: "https://dtpoland.com"
      },
      {
        text: "Vue-BabylonJS",
        href: "https://vue-babylonjs.com/#/home"
      },
      {
        text: "Vuetify",
        href: "https://vuetifyjs.com/en/getting-started/quick-start"
      }
    ]
  }),
  created() {
    // eslint-disable-next-line
    console.log("Scene created...");

    let angles = [1.57, 1.2, 0.1, 0.3, 2.2, 1.1];
    let pose = RobotKin.forward(...angles)[5];

    // eslint-disable-next-line
    console.log("pose = " + pose);

    // axios
    //   .get("http://localhost:8090/")
    //   .then(response => (this.machine = response.data));

    // axios.post("http://localhost:8090/", this.time);

    // // eslint-disable-next-line
    // console.log("Data posted:");
    // // eslint-disable-next-line
    // console.log(this.machine);
  },
  // watch: {
  //   myScene() {
  //     // myScene is now available from the component
  //     // do something with it here or call a method to use it from here
  //   },
  //   myAnim() {
  //     // myBox is now available from the component
  //     // do something with it here or call a method to use it from here
  //   }
  // },
  methods: {
    beforeRender() {
      this.time = performance.now();

      // Powiązanie osi robota
      this.Axis2.setPivotPoint(this.myVector2);
      this.Axis3.setPivotPoint(this.myVector3);
      this.Axis4.setPivotPoint(this.myVector4);
      this.Axis5.setPivotPoint(this.myVector5);
      this.Axis6.setPivotPoint(this.myVector6);

      this.axis3_from_model_txt = "A3pos";
      this.axis3_from_model_txt +=
        " X[" + this.A3pos.absolutePosition.x.toFixed(2) + "]";
      this.axis3_from_model_txt +=
        " Y[" + this.A3pos.absolutePosition.y.toFixed(2) + "]";
      this.axis3_from_model_txt +=
        " Z[" + this.A3pos.absolutePosition.z.toFixed(2) + "]";

      this.axis4_from_model_txt = "A4pos";
      this.axis4_from_model_txt +=
        " X[" + this.A4pos.absolutePosition.x.toFixed(2) + "]";
      this.axis4_from_model_txt +=
        " Y[" + this.A4pos.absolutePosition.y.toFixed(2) + "]";
      this.axis4_from_model_txt +=
        " Z[" + this.A4pos.absolutePosition.z.toFixed(2) + "]";

      this.axis5_from_model_txt = "A5pos";
      this.axis5_from_model_txt +=
        " X[" + this.A5pos.absolutePosition.x.toFixed(2) + "]";
      this.axis5_from_model_txt +=
        " Y[" + this.A5pos.absolutePosition.y.toFixed(2) + "]";
      this.axis5_from_model_txt +=
        " Z[" + this.A5pos.absolutePosition.z.toFixed(2) + "]";

      this.axis6_from_model_txt = "A6pos";
      this.axis6_from_model_txt +=
        " X[" + this.A6pos.absolutePosition.x.toFixed(2) + "]";
      this.axis6_from_model_txt +=
        " Y[" + this.A6pos.absolutePosition.y.toFixed(2) + "]";
      this.axis6_from_model_txt +=
        " Z[" + this.A6pos.absolutePosition.z.toFixed(2) + "]";

      // TCP
      this.myTCP_dst.position.x = this.myTCP_src.position.x + this.tcp.x;
      this.myTCP_dst.position.z = this.myTCP_src.position.y + this.tcp.z;
      this.myTCP_dst.position.y = this.myTCP_src.position.z + this.tcp.y;

      // Obroty
      if (this.hand_mode) {
        this.A1 = (this.range1 * Math.PI) / 180.0;
        this.A2 = (this.range2 * Math.PI) / 180.0;
        this.A3 = (this.range3 * Math.PI) / 180.0;
        this.A4 = (this.range4 * Math.PI) / 180.0;
        this.A5 = (this.range5 * Math.PI) / 180.0;
        this.A6 = (this.range6 * Math.PI) / 180.0;
      } else {
        this.A1 = (this.range1 * Math.PI) / 180.0;
        this.A2 = (this.range2 * Math.PI) / 180.0;

        this.A3 =
          (this.range3 * Math.PI) / 180.0 + Math.sin(this.time / 400) / 3;

        this.A4 =
          (this.range4 * Math.PI) / 180.0 + Math.sin(this.time / 300) / 1;

        this.A5 =
          (this.range5 * Math.PI) / 180.0 + Math.sin(this.time / 200) / 2;

        this.A6 = (this.range6 * Math.PI) / 180.0;
      }

      // Przedstawienie pozycji
      let angles = [this.A1, this.A2, this.A3, this.A4, this.A4, this.A5];
      let pose = RobotKin.forward(...angles)[5];

      this.txtTCPx =
        "Xr = " +
        this.myTCP_dst.absolutePosition.x.toFixed(2) +
        ", Xc = " +
        pose[0].toFixed(2);

      this.txtTCPy =
        "Yr = " +
        this.myTCP_dst.absolutePosition.y.toFixed(2) +
        ", Yc = " +
        pose[1].toFixed(2);

      this.txtTCPz =
        "Zr = " +
        this.myTCP_dst.absolutePosition.z.toFixed(2) +
        ", Zc = " +
        pose[2].toFixed(2);

      // Przedstawienie obliczonych wartości dla osi
      let angles_calculated = RobotKin.inverse(
        this.myTCP_dst.absolutePosition.x,
        this.myTCP_dst.absolutePosition.y,
        this.myTCP_dst.absolutePosition.z,
        0,
        0,
        0
      );

      this.angles_calculated_txt =
        "Calculated inverse geometry for axes - A1: " +
        angles_calculated[0].toFixed(2) +
        ", A2: " +
        angles_calculated[1].toFixed(2) +
        ", A3: " +
        angles_calculated[2].toFixed(2) +
        ", A4: " +
        angles_calculated[3].toFixed(2) +
        ", A5: " +
        angles_calculated[4].toFixed(2) +
        ", A6: " +
        angles_calculated[5].toFixed(2);

      // Obroty - wizualizacja - dodanie kąta
      this.Axis1.rotation.y = this.A1;
      this.Axis2.rotation.z = this.A2;
      this.Axis3.rotation.z = this.A3 + Math.PI / 2;
      this.Axis4.rotation.y = this.A4;
      this.Axis5.rotation.z = this.A5 + Math.PI / 2;
      this.Axis6.rotation.y = this.A6;
    }
  }
};
</script>
