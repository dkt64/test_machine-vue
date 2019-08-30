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

      <v-flex xs12 mb-5>
        <v-layout>
          <Scene @before-render$="beforeRender" v-model="myScene">
            <PointLight :position="[-20,0,0]" specular="#FFF" diffuse="#FFF" v-model="myLight"></PointLight>
            <HemisphericLight diffuse="#888"></HemisphericLight>
            <Camera type="arcRotate" :radius="50" :target="[0, 0, 0]" v-model="myCamera"></Camera>
            <Box :position="[0, 0, 0]" :scaling="[5, 5, 5]" v-model="myBox">
              <Material diffuse="#00F"></Material>
            </Box>
            <Sphere :position="[-20, 0, 0]" :scaling="[1, 1, 1]" v-model="mySphere">
              <Material specular="FFF" diffuse="#FF0"></Material>
            </Sphere>
            <Plane
              :height="2"
              :width="1"
              :rotation="[360/Math.PI,0,0]"
              :position="[0, -10, 0]"
              :scaling="[1000, 1000, 1000]"
              v-model="myPlane"
            >
              <Material diffuse="#F00">
                <Texture
                  type="ambient"
                  src="https://www.babylonjs-playground.com/textures/grass.png"
                  v-model="myTexture"
                ></Texture>
              </Material>
            </Plane>
          </Scene>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    time: performance.now(),
    myScene: null,
    myCamera: null,
    myBox: null,
    myLight: null,
    myAnim: null,
    mySphere: null,
    myPlane: null,
    myTexture: null,
    machine: null,
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

    // eslint-disable-next-line
    console.log(this.myCamera);

    axios
      .get("http://localhost:8090/")
      .then(response => (this.machine = response.data));

    axios.post("http://localhost:8090/", this.time);

    // eslint-disable-next-line
    console.log("Data posted:");
    // eslint-disable-next-line
    console.log(this.machine);
  },
  watch: {
    myScene() {
      // myScene is now available from the component
      // do something with it here or call a method to use it from here
    },
    myBox() {
      // myBox is now available from the component
      // do something with it here or call a method to use it from here
    },
    myLight() {
      // myBox is now available from the component
      // do something with it here or call a method to use it from here
    },
    myAnim() {
      // myBox is now available from the component
      // do something with it here or call a method to use it from here
    }
  },
  methods: {
    beforeRender() {
      this.time = performance.now();

      this.myBox.rotation.x += Math.PI / 100;
      this.myBox.rotation.y += Math.PI / 120;
      this.myBox.rotation.z += Math.PI / 150;
    }
  }
};
</script>
