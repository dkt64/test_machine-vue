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
          <v-col cols="4">
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

          <v-col cols="8">
            <v-flex xs12 mb-5>
              <v-layout>
                <Scene @before-render$="beforeRender" v-model="myScene">
                  <Camera type="arcRotate" :radius="100" :target="[0, 5, 0]" v-model="myCamera"></Camera>

                  <HemisphericLight diffuse="#888"></HemisphericLight>

                  <!-- Światło punktowe z żarówką -->
                  <PointLight :position="[0,200,0]" specular="#FFF" diffuse="#FFF" v-model="myLight"></PointLight>
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
                    <Material diffuse="#F00">
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
                    <Cylinder :position="[0, 3, 0]" :scaling="[6, 3, 6]">
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
                      >
                        <Material diffuse="#2FF">
                          <Texture type="diffuse" src="textura.png"></Texture>
                        </Material>
                      </Cylinder>
                      <Box :rotation="[0,0,0]" :position="[0, 13, 0]" :scaling="[3, 10, 2]">
                        <Material diffuse="#2FF">
                          <Texture type="diffuse" src="textura.png"></Texture>
                        </Material>
                      </Box>

                      <!-- Robot - oś 3 -->
                      <Entity v-model="Axis3">
                        <Cylinder
                          :rotation="[Math.PI/2,0,0]"
                          :position="[0, 18, 0]"
                          :scaling="[3.5, 1.5, 3.5]"
                        >
                          <Material diffuse="#2F5">
                            <Texture type="diffuse" src="textura.png"></Texture>
                          </Material>
                        </Cylinder>
                        <Cylinder
                          :rotation="[0,0,0]"
                          :position="[0, 22, 0]"
                          :scaling="[2.2, 4.2, 2.2]"
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
                            :scaling="[2.0, 5, 2.0]"
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
                              :scaling="[2.5, 1, 2.5]"
                            >
                              <Material diffuse="#F0F">
                                <Texture type="diffuse" src="textura.png"></Texture>
                              </Material>
                            </Cylinder>
                            <Box
                              :rotation="[0,0,0]"
                              :position="[0, 32, 0]"
                              :scaling="[1.5, 4, 1.5]"
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
                                :scaling="[2.5, 0.5, 2.5]"
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
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { Vector3 } from "@babylonjs/core/Maths/math";

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
    machine: null,
    myVector2: new Vector3(0, 7, 0),
    myVector3: new Vector3(0, 18, 0),
    myVector4: new Vector3(0, 0, 0),
    myVector5: new Vector3(0, 30, 0),
    myVector6: new Vector3(0, 32, 0),
    Tool: null,
    range1: null,
    range2: null,
    range3: null,
    range4: null,
    range5: null,
    range6: null,
    hand_mode: null,
    myTCP_dst: null,
    myTCP_src: null,
    tcp: new Vector3(0, 3, 0),
    txtTCPx: "X = 0.0",
    txtTCPy: "Y = 0.0",
    txtTCPz: "Z = 0.0",
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
      // this.Tool.setPivotPoint(this.myVector6);

      // TCP
      this.myTCP_dst.position.x = this.myTCP_src.position.x + this.tcp.x;
      this.myTCP_dst.position.y = this.myTCP_src.position.y + this.tcp.y;
      this.myTCP_dst.position.z = this.myTCP_src.position.z + this.tcp.z;

      this.txtTCPx = "X = " + this.myTCP_dst.absolutePosition.x.toFixed(2);
      this.txtTCPy = "Y = " + this.myTCP_dst.absolutePosition.y.toFixed(2);
      this.txtTCPz = "Z = " + this.myTCP_dst.absolutePosition.z.toFixed(2);

      // Obroty
      if (this.hand_mode) {
        this.Axis1.rotation.y = (this.range1 * Math.PI) / 180.0;
        this.Axis2.rotation.z = (this.range2 * Math.PI) / 180.0;
        this.Axis3.rotation.z = (this.range3 * Math.PI) / 180.0;
        this.Axis4.rotation.y = (this.range4 * Math.PI) / 180.0;
        this.Axis5.rotation.z = (this.range5 * Math.PI) / 180.0;
        this.Axis6.rotation.y = (this.range6 * Math.PI) / 180.0;
      } else {
        this.Axis1.rotation.y = (this.range1 * Math.PI) / 180.0;
        this.Axis2.rotation.z = (this.range2 * Math.PI) / 180.0;
        // this.Axis2.rotation.z =
        //   (20 * Math.PI) / 2 + Math.sin(this.time / 500) / 3;

        this.Axis3.rotation.z =
          (this.range3 * Math.PI) / 180.0 + Math.sin(this.time / 400) / 3;

        this.Axis4.rotation.y =
          (this.range4 * Math.PI) / 180.0 + Math.sin(this.time / 300) / 1;

        this.Axis5.rotation.z =
          (this.range5 * Math.PI) / 180.0 + Math.sin(this.time / 200) / 2;

        this.Axis6.rotation.y = (this.range6 * Math.PI) / 180.0;
        // this.Axis6.rotation.y += 0.04;
      }
    }
  }
};
</script>
