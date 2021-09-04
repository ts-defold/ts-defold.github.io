window.$_codepad_$ = {
  // Callbacks
  onReady: function(scenes) {
    const scenesObj = JSON.parse(unescape(scenes));
    window.$_codepad_$.data.scenes = scenesObj;
    window.$_codepad_$.data.scene = scenesObj[0].id;
    window.$_codepad_$.params.changeScene = true;
  },
  onGraph: function(graph) { 
    const graphObj = JSON.parse(unescape(graph));
    window.$_codepad_$.data.graph = graphObj;
    console.log(graphObj);
  },

  onLog: function(text) { console.log("onLog", text); },
  onEngineInfo: function(info) { console.log("onEngineInfo", info); },
  
  // Actions
  setScene: function(scene) {
    window.$_codepad_$.data.scene = scene;
    window.$_codepad_$.params.changeScene = true;
  },

  setCode: function(code) {
    if (code) {
      let isInit = window.$_codepad_$.data.code[0] === "";
      window.$_codepad_$.data.code = ["0", code];
      window.$_codepad_$.params[isInit ? "restart" : "reload"] = true;
    }
  },

  reload: function() {
    window.$_codepad_$.params.reload = true;
  },

  restart: function() {
    window.$_codepad_$.params.restart = true;
  },

  ready: function() {
    window.$_codepad_$.params.ready = true;
  },
  
  // Runtime flags polled by defold engine
  params: {
    ready: true,
    restart: false,
    reload: false,
    changeScene: false,
  },

  // Runtime data shared between defold engine and javascript
  data: {
    scene: 0,
    scenes: [],
    code: ["", ""],
    graph: {},
  }
};