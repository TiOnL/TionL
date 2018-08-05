/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chromosomes/Neural3L.ts":
/*!*************************************!*\
  !*** ./src/chromosomes/Neural3L.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LAYER_DEFAULT_SIZE = 3;
class Neural3L {
    // (x:number)=>{return 1.2*x/(Math.abs(x)+0.5)};
    constructor(options) {
        this.activationFunction = (x) => { return 2 / (1 + Math.exp(-4.9 * x)) - 1; };
        this.inputSize = options["inputSize"] || LAYER_DEFAULT_SIZE;
        this.innerLayerSize = options["innerSize"] || LAYER_DEFAULT_SIZE;
        this.outputSize = options["outputSize"] || LAYER_DEFAULT_SIZE;
        this.inputLayer = new Float32Array(this.inputSize);
        this.innerLayer = new Float32Array(this.innerLayerSize);
        this.outputLayer = new Float32Array(this.outputSize);
        this.M1 = new Array(this.innerLayerSize);
        this.M2 = new Array(this.outputSize);
        for (var i = 0; i < this.innerLayerSize; i++) {
            this.M1[i] = new Float32Array(this.inputSize);
        }
        for (var i = 0; i < this.outputSize; i++) {
            this.M2[i] = new Float32Array(this.innerLayerSize);
        }
    }
    setInput(input) {
        var inputFloat = new Float32Array(input);
        if (inputFloat.length < this.inputSize) {
            this.inputLayer.fill(0);
            this.inputLayer.set(inputFloat);
        }
        else {
            this.inputLayer.set(inputFloat);
        }
    }
    ;
    calculateMatrix(input, output, Matrix) {
        for (let i = 0; i < output.length; i++) {
            var s = 0;
            for (let j = 0; j < input.length; j++) {
                s += input[j] * Matrix[i][j];
            }
            output[i] = this.activationFunction(s);
        }
    }
    process() {
        this.calculateMatrix(this.inputLayer, this.innerLayer, this.M1);
        this.calculateMatrix(this.innerLayer, this.outputLayer, this.M2);
        return this.outputLayer.buffer;
    }
    ;
    randomize() {
        this.iterateData((value) => {
            return Math.random() - 0.5;
        });
        return this;
    }
    mutate(count = 1, power = 0.5) {
        var dataArray = this.getDataAsArray();
        for (var i = 0; i < count; i++) {
            dataArray[Math.floor(Math.random() * dataArray.length)] += Math.random() * power;
        }
        this.setDataFromArray(dataArray);
        return this;
    }
    getDataAsArray() {
        var res = [];
        this.iterateData((value) => {
            res.push(value);
            return value;
        });
        return res;
    }
    setDataFromArray(data) {
        var dataIndex = 0;
        this.iterateData((value) => {
            return data[dataIndex++];
        });
    }
    cross(chromosome) {
        var options = { inputSize: this.inputSize, innerSize: this.innerLayerSize, outputSize: this.outputSize };
        var newChromosome = new Neural3L(options);
        var data1 = this.getDataAsArray();
        var data2 = chromosome.getDataAsArray();
        var crossIndexes = [Math.floor(Math.random() * data1.length),
            Math.floor(Math.random() * data1.length)].sort();
        for (var i = crossIndexes[0]; i < crossIndexes[1]; i++) {
            data1[i] = data2[i];
        }
        newChromosome.setDataFromArray(data1);
        return newChromosome;
    }
    computeDistance(partner) {
        var myData = this.getDataAsArray();
        var partnerData = partner.getDataAsArray();
        if (myData.length != partnerData.length) {
            return 1;
        }
        var differents = 0;
        for (var i = 0; i < myData.length; i++) {
            if (myData[i] != partnerData[i]) {
                differents++;
            }
        }
        return differents / myData.length;
    }
    iterateData(callback) {
        for (var i = 0; i < this.innerLayerSize; i++) {
            for (var j = 0; j < this.M1[i].length; j++) {
                this.M1[i][j] = callback(this.M1[i][j]);
            }
        }
        for (var i = 0; i < this.outputSize; i++) {
            for (var j = 0; j < this.M2[i].length; j++) {
                this.M2[i][j] = callback(this.M2[i][j]);
            }
        }
    }
}
exports.Neural3L = Neural3L;


/***/ }),

/***/ "./src/chromosomes/chromosomes.ts":
/*!****************************************!*\
  !*** ./src/chromosomes/chromosomes.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Neural3L */ "./src/chromosomes/Neural3L.ts"));


/***/ }),

/***/ "./src/common/CircularList.ts":
/*!************************************!*\
  !*** ./src/common/CircularList.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//I coud not find a good typescript implementation on the npm fo me
class CircularListNode {
    constructor(value, prev, next) {
        this.value = value;
        this.next = next || this;
        this.prev = prev || this;
    }
}
exports.CircularListNode = CircularListNode;
class CircularList {
    constructor() {
        this.size = 0;
    }
    _addAfter(value, prevNode) {
        var nextNode = prevNode.next;
        var newNode = new CircularListNode(value, prevNode, nextNode);
        prevNode.next = newNode;
        nextNode.prev = newNode;
        this.size++;
        this.lastAddedNode = newNode;
    }
    getSize() {
        return this.size;
    }
    getLastAddedNode() {
        return this.lastAddedNode;
    }
    add(value, prevNode) {
        if (this.size > 0 && this.lastAddedNode) { //
            var placeToAddAfter = prevNode || this.lastAddedNode;
            this._addAfter(value, placeToAddAfter);
        }
        else {
            this.lastAddedNode = new CircularListNode(value);
            this.size = 1;
        }
    }
    forEach(func) {
        var startNode = this.lastAddedNode;
        if (!startNode)
            return;
        func(startNode.value);
        var node = startNode.next;
        while (node != startNode) {
            func(node.value);
            node = node.next;
        }
    }
    filterToArray(func) {
        var result = [];
        this.forEach((elem) => {
            if (func(elem)) {
                result.push(elem);
            }
        });
        return result;
    }
    delete(node) {
        this.size--;
        if (this.lastAddedNode === node) {
            this.lastAddedNode = this.lastAddedNode.prev;
        }
        if (this.size > 0) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        else {
            this.lastAddedNode = undefined;
        }
    }
}
exports.CircularList = CircularList;


/***/ }),

/***/ "./src/common/EntityTypes.ts":
/*!***********************************!*\
  !*** ./src/common/EntityTypes.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EntityTypes;
(function (EntityTypes) {
    EntityTypes.UNKNOWN = 0;
    EntityTypes.RABBIT_M = 1;
    EntityTypes.RABBIT_F = 2;
    EntityTypes.FOOD_GRASS = 3;
})(EntityTypes = exports.EntityTypes || (exports.EntityTypes = {}));


/***/ }),

/***/ "./src/common/EventTypes.ts":
/*!**********************************!*\
  !*** ./src/common/EventTypes.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventTypes;
(function (EventTypes) {
    EventTypes.UNKNOWN = 0;
    EventTypes.BTN_RANDOM_SPAWN = 1;
    EventTypes.BTN_DOUBLE_ALIVE = 2;
    EventTypes.CHECKBOX_AUTO_CLONE = 3;
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));


/***/ }),

/***/ "./src/common/SceneObject.ts":
/*!***********************************!*\
  !*** ./src/common/SceneObject.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SceneObject {
    constructor() {
        this.id = 0;
        this.posX = 0;
        this.posY = 0;
        this.type = 0;
    }
}
exports.SceneObject = SceneObject;


/***/ }),

/***/ "./src/common/common.ts":
/*!******************************!*\
  !*** ./src/common/common.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./SceneObject */ "./src/common/SceneObject.ts"));
__export(__webpack_require__(/*! ./CircularList */ "./src/common/CircularList.ts"));
__export(__webpack_require__(/*! ./EntityTypes */ "./src/common/EntityTypes.ts"));


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __webpack_require__(/*! ./ui/Ui */ "./src/ui/Ui.ts");
const World_1 = __webpack_require__(/*! ./world/World */ "./src/world/World.ts");
const EventTypes_1 = __webpack_require__(/*! ./common/EventTypes */ "./src/common/EventTypes.ts");
var ui;
var stats;
var world;
function initialize() {
    //stats
    stats = new Stats();
    document.body.appendChild(stats.dom);
    ui = new Ui_1.Ui(viewport);
    ui.onUiEvent = UiController;
    //editor = new Editor(viewport);
    world = new World_1.World();
    world.load();
    animate();
}
window.onload = initialize;
function animate() {
    requestAnimationFrame(animate);
    //	editor.animate();
    world.tickUpdate();
    ui.update(world);
    stats.update();
}
var UiController = (eventType, payload) => {
    switch (eventType) {
        case EventTypes_1.EventTypes.BTN_RANDOM_SPAWN:
            world.spawnRandom(100);
            break;
        case EventTypes_1.EventTypes.BTN_DOUBLE_ALIVE:
            world.doubleAliveCreatures();
            break;
        case EventTypes_1.EventTypes.CHECKBOX_AUTO_CLONE:
            var autoDoubleLimit = (payload) ? 20 : 0;
            world.setAutoDoubleCreaturesLimit(autoDoubleLimit, autoDoubleLimit * 5);
            break;
        default:
            throw new Error("UiController wrong event type:" + eventType);
            break;
    }
};


/***/ }),

/***/ "./src/ui/FlyCameraControls.ts":
/*!*************************************!*\
  !*** ./src/ui/FlyCameraControls.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(__webpack_require__(/*! three */ "three"));
class FlyCameraControls {
    constructor(camera, domElement) {
        this.forwardSpeed = 0;
        this.maxForwardSpeed = 0.02;
        this.forwardAcceleration = 0.0002;
        this.cameraDirection = new THREE.Vector3;
        this.mouseLeftPressed = false;
        this.mouseStartX = 0;
        this.mouseStartY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.MOUSE_SENSIVITY = 0.003;
        this.upVector = new THREE.Vector3(0, 0, 1);
        this.onCameraMoved = () => { };
        this.onKeyDown = (event) => {
            this.keysDown.add(event.keyCode);
        };
        this.onKeyUp = (event) => {
            this.keysDown.delete(event.keyCode);
        };
        this.onMouseDown = (event) => {
            if (event.button == 2) {
                this.mouseStartX = event.clientX;
                this.mouseStartY = event.clientY;
                this.mouseX = event.clientX;
                this.mouseY = event.clientY;
                this.mouseLeftPressed = true;
            }
        };
        this.onMouseUp = (event) => {
            if (event.button == 2) {
                this.mouseLeftPressed = false;
            }
        };
        this.onMouseMove = (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        };
        this.onContextMenu = (event) => {
            event.preventDefault();
        };
        this.camera = camera;
        this.domElement = domElement;
        this.keysDown = new Set();
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
        this.domElement.addEventListener('contextmenu', this.onContextMenu, false);
        this.domElement.addEventListener('mousemove', this.onMouseMove, false);
        this.domElement.addEventListener('mousedown', this.onMouseDown, false);
        this.domElement.addEventListener('mouseup', this.onMouseUp, false);
    }
    dispose() {
        window.removeEventListener('keydown', this.onKeyDown, false);
        window.removeEventListener('keyup', this.onKeyUp, false);
        this.domElement.removeEventListener('contextmenu', this.onContextMenu, false);
        this.domElement.removeEventListener('mousedown', this.onMouseMove, false);
        this.domElement.removeEventListener('mousemove', this.onMouseDown, false);
        this.domElement.removeEventListener('mouseup', this.onMouseUp, false);
    }
    tickUpdate(delta) {
        delta = delta || 30;
        //move
        if (this.keysDown.has(87 /* W */)) {
            this.forwardSpeed += this.forwardAcceleration;
        }
        else if (this.keysDown.has(83 /* S */)) {
            this.forwardSpeed -= this.forwardAcceleration;
        }
        else
            this.forwardSpeed = 0;
        this.forwardSpeed = Math.min(this.forwardSpeed, this.maxForwardSpeed);
        this.forwardSpeed = Math.max(this.forwardSpeed, -1 * this.maxForwardSpeed);
        var forward = this.forwardSpeed * delta;
        this.camera.getWorldDirection(this.cameraDirection);
        this.cameraDirection.normalize();
        this.cameraDirection.multiplyScalar(delta * this.forwardSpeed);
        this.camera.position.add(this.cameraDirection);
        if (this.keysDown.has(65 /* A */)) {
            this.camera.rotateOnWorldAxis(this.upVector, 0.01);
        }
        else if (this.keysDown.has(68 /* D */)) {
            this.camera.rotateOnWorldAxis(this.upVector, -0.01);
        }
        if (this.mouseLeftPressed) {
            this.camera.rotateOnWorldAxis(this.upVector, this.MOUSE_SENSIVITY * (this.mouseStartX - this.mouseX));
            this.mouseStartX = this.mouseX;
            this.camera.rotateX(this.MOUSE_SENSIVITY * (this.mouseStartY - this.mouseY));
            this.mouseStartY = this.mouseY;
        }
        if (forward != 0) {
            this.onCameraMoved();
        }
    }
}
exports.FlyCameraControls = FlyCameraControls;


/***/ }),

/***/ "./src/ui/MainPanel.ts":
/*!*****************************!*\
  !*** ./src/ui/MainPanel.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MainPanel {
    constructor() {
        this.onBtnRandomSpawn = function () { throw new Error("you should override MainPanel.onBtnRandomSpawn()"); };
        this.onBtnDoubleAlive = function () { throw new Error("you should override MainPanel.onBtnRandomSpawn()"); };
        this.onCheckboxAutoCloneChange = function () { throw new Error("you should override MainPanel.onBtnRandomSpawn()"); };
        this.domElement = document.createElement('div');
        this.domElement.innerHTML = `Creatures:<span > - </span>
    <button class = "button1">Spawn random</button>
    <button class = "button2">Double alive</button>
    <input type=checkbox class= "checkbox1"> Auto clone </input>`;
        this.domElement.setAttribute("style", `
          position:fixed;
          bottom:10px;
          left:10px;
          background-color:#AAFFFF;
          padding:5px;
          opacity:0.5`);
        var btnRandomSpawn = this.domElement.querySelector(".button1");
        btnRandomSpawn.onclick = () => { this.onBtnRandomSpawn(); };
        var btnDoubleAlive = this.domElement.querySelector(".button2");
        btnDoubleAlive.onclick = () => { this.onBtnDoubleAlive(); };
        this.creaturesCountSpan = this.domElement.querySelector("span");
        var checkboxAutoClone = this.domElement.querySelector(".checkbox1");
        checkboxAutoClone.onchange = () => { this.onCheckboxAutoCloneChange(checkboxAutoClone.checked); };
    }
    update(creatureCount) {
        this.creaturesCountSpan.innerHTML = String(creatureCount);
    }
}
exports.MainPanel = MainPanel;


/***/ }),

/***/ "./src/ui/SceneManager.ts":
/*!********************************!*\
  !*** ./src/ui/SceneManager.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(__webpack_require__(/*! three */ "three"));
const common_1 = __webpack_require__(/*! ../common/common */ "./src/common/common.ts");
class SceneManager {
    constructor(scene) {
        this.scene = scene;
        this.objectMeshes = new Map();
    }
    updateObjects(objects) {
        var updatedIds = new Set();
        for (var obj of objects) {
            var mesh = this.objectMeshes.get(obj.id);
            if (!mesh) {
                mesh = this.createMesh(obj.type);
                this.objectMeshes.set(obj.id, mesh);
                this.scene.add(mesh);
            }
            mesh.position.x = obj.posX;
            mesh.position.y = obj.posY;
            updatedIds.add(obj.id);
        }
        //delete
        for (var el of this.objectMeshes) {
            if (!updatedIds.has(el[0])) {
                this.scene.remove(el[1]);
                this.objectMeshes.delete(el[0]);
                el[1].geometry.dispose();
                el[1].material.dispose();
            }
        }
    }
    createMesh(objectType) {
        var mesh;
        switch (objectType) {
            case common_1.EntityTypes.RABBIT_F:
                mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshLambertMaterial({
                    color: 0xFF7777
                }));
                break;
            case common_1.EntityTypes.RABBIT_M:
                mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshLambertMaterial({
                    color: 0x115588
                }));
                break;
            case common_1.EntityTypes.FOOD_GRASS:
                mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshLambertMaterial({
                    color: 0x55AA55
                }));
                break;
            default:
                mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshLambertMaterial({
                    color: 0x111111
                }));
                break;
        }
        return mesh;
    }
}
exports.SceneManager = SceneManager;


/***/ }),

/***/ "./src/ui/Ui.ts":
/*!**********************!*\
  !*** ./src/ui/Ui.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const FlyCameraControls_1 = __webpack_require__(/*! ./FlyCameraControls */ "./src/ui/FlyCameraControls.ts");
const SceneManager_1 = __webpack_require__(/*! ./SceneManager */ "./src/ui/SceneManager.ts");
const MainPanel_1 = __webpack_require__(/*! ./MainPanel */ "./src/ui/MainPanel.ts");
const EventTypes_1 = __webpack_require__(/*! ../common/EventTypes */ "./src/common/EventTypes.ts");
const THREE = __importStar(__webpack_require__(/*! three */ "three"));
const VISIBLE_DISTANCE = 1000;
class Ui {
    constructor(viewport) {
        this.onUiEvent = function () { throw new Error("you should override Ui.onUiEvent()"); };
        this.viewport = viewport;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.cameraControls = new FlyCameraControls_1.FlyCameraControls(this.camera, viewport);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.sceneManager = new SceneManager_1.SceneManager(this.scene);
        this.mainPanel = new MainPanel_1.MainPanel();
        this.viewport.appendChild(this.renderer.domElement);
        this.viewport.appendChild(this.mainPanel.domElement);
        this.initialize();
    }
    initialize() {
        this.camera.up = new THREE.Vector3(0, 0, 1);
        this.camera.position.set(0, 0, 30);
        this.camera.lookAt(40, 0, 0);
        // lights
        this.scene.add(new THREE.AmbientLight(0x333333));
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 1, 100);
        this.scene.add(light);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        //0 cube
        var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshPhongMaterial({
            color: 0x111155, shininess: 200,
            side: THREE.DoubleSide
        }));
        this.scene.add(cube);
        this.mainPanel.onBtnRandomSpawn = () => this.onUiEvent(EventTypes_1.EventTypes.BTN_RANDOM_SPAWN);
        this.mainPanel.onBtnDoubleAlive = () => this.onUiEvent(EventTypes_1.EventTypes.BTN_DOUBLE_ALIVE);
        this.mainPanel.onCheckboxAutoCloneChange = (val) => this.onUiEvent(EventTypes_1.EventTypes.CHECKBOX_AUTO_CLONE, val);
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    update(world) {
        this.cameraControls.tickUpdate();
        this.sceneManager.updateObjects(world.getSceneObjectsNearXY(this.camera.position.x, this.camera.position.y, VISIBLE_DISTANCE));
        var creatureCount = world.getAliveCreatureCount();
        this.mainPanel.update(creatureCount);
        this.renderer.render(this.scene, this.camera);
    }
}
exports.Ui = Ui;


/***/ }),

/***/ "./src/world/World.ts":
/*!****************************!*\
  !*** ./src/world/World.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const creatures_1 = __webpack_require__(/*! ./creatures/creatures */ "./src/world/creatures/creatures.ts");
const common_1 = __webpack_require__(/*! ../common/common */ "./src/common/common.ts");
const chromosomes_1 = __webpack_require__(/*! ../chromosomes/chromosomes */ "./src/chromosomes/chromosomes.ts");
const IdFactory_1 = __webpack_require__(/*! ./idfactory/IdFactory */ "./src/world/idfactory/IdFactory.ts");
class World {
    constructor() {
        this.processCreaturesQuotaPerTick = 0.3;
        this.tickNumber = 0;
        this.autoCloneCreaturesStartLimit = 0;
        this.autoCloneCreaturesStopLimit = 0;
        this.maxItemsCount = 1000;
        this.creatures = new common_1.CircularList();
        this.items = new Array();
        this.idFactory = new IdFactory_1.IdFactory();
    }
    tickUpdate() {
        this.processCreatures();
        if (this.getAliveCreatureCount() > 0 &&
            this.getAliveCreatureCount() < this.autoCloneCreaturesStartLimit) {
            while (this.getAliveCreatureCount() < this.autoCloneCreaturesStopLimit) {
                this.doubleAliveCreatures();
            }
        }
        if (this.tickNumber % 3 === 0 && this.items.length <= this.maxItemsCount) {
            var grassFood = {
                id: this.idFactory.generateId(),
                type: common_1.EntityTypes.FOOD_GRASS,
                posX: Math.random() * 50,
                posY: Math.random() * 50
            };
            this.items.push(grassFood);
        }
        this.tickNumber++;
    }
    getSceneObjectsNearXY(x, y, distance) {
        var entities = this.getNearEntities(x, y, distance);
        return entities.map(entity => {
            return { id: entity.id, posX: entity.posX, posY: entity.posY, type: entity.type };
        });
    }
    load() {
        for (var i = 0; i < 1; i++) {
            var grassFood = {
                id: this.idFactory.generateId(),
                type: common_1.EntityTypes.FOOD_GRASS,
                posX: Math.random() * 50,
                posY: Math.random() * 50
            };
            this.items.push(grassFood);
        }
    }
    spawnRandom(quantity) {
        for (var i = 0; i < quantity; i++) {
            var creature = new creatures_1.Rabbit(Math.round(Math.random()), () => this.idFactory.generateId(), (options) => new chromosomes_1.Neural3L(options).randomize());
            creature.posX = Math.random() * 50;
            creature.posY = Math.random() * 50;
            this.addCreature(creature);
        }
    }
    doubleAliveCreatures() {
        var newCreatures = [];
        this.creatures.forEach((creature) => {
            newCreatures.push(creature.clone(1, 0.1));
        });
        for (var creature of newCreatures) {
            creature.posX = Math.random() * 50;
            creature.posY = Math.random() * 50;
            this.addCreature(creature);
        }
    }
    getAliveCreatureCount() {
        return this.creatures.getSize();
    }
    setAutoDoubleCreaturesLimit(low, high) {
        this.autoCloneCreaturesStartLimit = low;
        this.autoCloneCreaturesStopLimit = high;
    }
    processCreatures() {
        var currentNode = this.currentCreatureNode || this.creatures.getLastAddedNode();
        if (currentNode) {
            var processCount = Math.ceil(this.creatures.getSize() * this.processCreaturesQuotaPerTick);
            for (var i = 0; i < processCount; i++) {
                var creature = currentNode.value;
                var nearEntities = this.getNearEntities(creature.posX, creature.posY, creature.visionRadius, creature);
                creature.process(nearEntities);
                if (!creature.isAlive) {
                    this.creatures.delete(currentNode);
                }
                currentNode = currentNode.next;
            }
            if (this.creatures.getSize() === 0) {
                this.currentCreatureNode = undefined;
            }
            else {
                this.currentCreatureNode = currentNode;
            }
        }
    }
    getNearEntities(x, y, distance, excludeEntity) {
        var distance2 = distance * distance;
        var distanceFilter = function name(value) {
            var dx = value.posX - x;
            var dy = value.posY - y;
            return ((dx * dx + dy * dy <= distance2) && (excludeEntity != value));
        };
        var result = this.creatures.filterToArray(distanceFilter);
        var nearItems = this.items.filter(distanceFilter);
        result = result.concat(nearItems);
        return result;
    }
    deleteItem(entity) {
        var foundIndex = this.items.findIndex((el) => (el.id === entity.id));
        if (foundIndex < 0) {
            throw new Error("deleteItem: item not found " + JSON.stringify(entity));
        }
        this.items[foundIndex] = this.items[this.items.length - 1];
        this.items.pop();
    }
    addCreature(creature) {
        creature.onCreatureMade = this.addCreature.bind(this);
        creature.onObjectPickup = this.deleteItem.bind(this);
        this.creatures.add(creature);
    }
}
exports.World = World;


/***/ }),

/***/ "./src/world/creatures/Creature.ts":
/*!*****************************************!*\
  !*** ./src/world/creatures/Creature.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(/*! ../../common/common */ "./src/common/common.ts");
class Creature {
    constructor() {
        this.id = 0;
        this.type = common_1.EntityTypes.UNKNOWN;
        this.posX = 0;
        this.posY = 0;
        this.visionRadius = 10;
        this.actRadius = 1;
        this.isAlive = true;
        this.onObjectPickup = function (entity) { throw new Error("You should override onObjectPickup()"); };
        this.onCreatureMade = function (creature) { throw new Error("You should override onCreatureMade()"); };
    }
    process(nearEntities) {
    }
    onCoition(partner) {
    }
    setIdOnce(id) {
        if (id) {
            throw new Error("You can not set ID twice");
        }
    }
    getId() {
        return this.id;
    }
    clone(mutationCount, mutationPower) {
        return new Creature();
    }
}
exports.Creature = Creature;


/***/ }),

/***/ "./src/world/creatures/Rabbit.ts":
/*!***************************************!*\
  !*** ./src/world/creatures/Rabbit.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Creature_1 = __webpack_require__(/*! ./Creature */ "./src/world/creatures/Creature.ts");
const common_1 = __webpack_require__(/*! ../../common/common */ "./src/common/common.ts");
const CHROMOSOME_INPUT_LENGHT = 100;
const MAX_VISIBLE_OBJECTS_COUNT = 10;
const MAX_AGE = 500;
const MIN_SEX_AGE = 60;
const MAX_SPEED = 0.5;
const MAX_HP = 50;
const MAX_FILL = 50;
const MAX_GESTATION_TIME = 50;
const VISION_RADIUS = 20;
const GRASS_FILL_POINTS = 25;
const CHROMOSOME_OUTPUT_LENGTH = 21;
class Rabbit extends Creature_1.Creature {
    constructor(sex, idFactoryMethod, chromosomeFactory) {
        super();
        this.age = 0;
        this.attackPower = 1;
        this.defence = 1;
        this.gestationTime = 0;
        this.recurrentValue = 0;
        this.idFactoryMethod = idFactoryMethod;
        this.id = idFactoryMethod();
        this.chromosome = chromosomeFactory({
            inputSize: CHROMOSOME_INPUT_LENGHT,
            innerSize: CHROMOSOME_OUTPUT_LENGTH,
            outputSize: CHROMOSOME_OUTPUT_LENGTH
        });
        this.type = (sex) ? common_1.EntityTypes.RABBIT_M : common_1.EntityTypes.RABBIT_F;
        this.healthPoints = MAX_HP;
        this.fill = MAX_FILL;
        this.visionRadius = VISION_RADIUS;
        this.chromosomeInput = new Float32Array(CHROMOSOME_INPUT_LENGHT);
    }
    onSexRequest(from) {
        if (from.type === common_1.EntityTypes.RABBIT_F ||
            from.type === common_1.EntityTypes.RABBIT_M) {
            this.sexRequestedPartner = from;
        }
    }
    onCoition(partner) {
        if (partner.type === common_1.EntityTypes.RABBIT_M &&
            this.type === common_1.EntityTypes.RABBIT_F &&
            (!this.gestationChromosome) && this.age >= MIN_SEX_AGE) {
            this.gestationChromosome = this.chromosome.cross(partner.chromosome);
            this.gestationChromosome.mutate();
            this.gestationTime = 0;
        }
    }
    clone(mutationCount, mutationPower) {
        var newChromosome = this.chromosome.cross(this.chromosome);
        if (mutationCount) {
            newChromosome.mutate(mutationCount, mutationPower);
        }
        var newRabbit = new Rabbit(Math.round(Math.random()), this.idFactoryMethod, () => { return newChromosome; });
        newRabbit.posX = this.posX;
        newRabbit.posY = this.posY;
        return newRabbit;
    }
    process(nearEntities) {
        this.age++;
        this.fill--;
        if (this.fill <= 0) {
            this.healthPoints--;
            this.fill = 0;
        }
        else if (this.fill >= MAX_FILL / 2) {
            this.healthPoints++;
        }
        if (this.age > MAX_AGE || this.healthPoints <= 0) {
            this.die();
            return;
        }
        if (this.gestationChromosome && (this.gestationTime++) > MAX_GESTATION_TIME) {
            var newRabbitChromosome = this.gestationChromosome;
            this.gestationChromosome = undefined;
            var newRabbit = new Rabbit(Math.round(Math.random()), this.idFactoryMethod, () => { return newRabbitChromosome; });
            newRabbit.posX = this.posX;
            newRabbit.posY = this.posY;
            this.onCreatureMade(newRabbit);
        }
        nearEntities.sort((a, b) => {
            var adx = this.posX - a.posX;
            var ady = this.posY - a.posY;
            var bdx = this.posX - b.posX;
            var bdy = this.posY - b.posY;
            return (adx * adx + ady * ady) - (bdx * bdx + bdy * bdy);
        });
        this.prepareInputs(nearEntities);
        this.chromosome.setInput(this.chromosomeInput.buffer, 0);
        var outputBuffer = this.chromosome.process();
        var output = new Float32Array(outputBuffer);
        var moveX = output[0];
        var moveY = output[1];
        this.recurrentValue = output[2];
        var operation = findMaxElementIndex(output, 3, 10) - 3;
        var param = findMaxElementIndex(output, 11, CHROMOSOME_OUTPUT_LENGTH - 1) - 11;
        this.processOperation(operation, param, nearEntities);
        this.move(moveX, moveY);
    }
    prepareInputs(nearEntities) {
        const RECORD_SIZE = 8;
        this.chromosomeInput.fill(0);
        var entitiesToInput = Math.min(MAX_VISIBLE_OBJECTS_COUNT, nearEntities.length);
        for (var i = 0; i < entitiesToInput; i++) {
            this.chromosomeInput[i * RECORD_SIZE] = nearEntities[i].type & 1;
            this.chromosomeInput[i * RECORD_SIZE + 1] = nearEntities[i].type & 2;
            this.chromosomeInput[i * RECORD_SIZE + 2] = nearEntities[i].type & 4;
            this.chromosomeInput[i * RECORD_SIZE + 3] = nearEntities[i].type & 8;
            this.chromosomeInput[i * RECORD_SIZE + 4] = (nearEntities[i].posX - this.posX) / this.visionRadius;
            this.chromosomeInput[i * RECORD_SIZE + 5] = (nearEntities[i].posY - this.posY) / this.visionRadius;
            this.chromosomeInput[i * RECORD_SIZE + 6] = (nearEntities[i].age || 0) / MAX_AGE;
            this.chromosomeInput[i * RECORD_SIZE + 7] = (nearEntities[i].isGestiation) ?
                +nearEntities[i].isGestiation() : 0;
        }
        var positionAfterObjects = MAX_VISIBLE_OBJECTS_COUNT * RECORD_SIZE;
        this.chromosomeInput[positionAfterObjects] = this.healthPoints / MAX_HP;
        this.chromosomeInput[positionAfterObjects + 1] = this.age / MAX_AGE;
        this.chromosomeInput[positionAfterObjects + 2] = this.fill / MAX_FILL;
        this.chromosomeInput[positionAfterObjects + 3] = (this.type === common_1.EntityTypes.RABBIT_M) ? 1 : 0;
        this.chromosomeInput[positionAfterObjects + 4] = (this.gestationChromosome) ? 1 : 0;
        this.chromosomeInput[positionAfterObjects + 5] = this.gestationTime / MAX_GESTATION_TIME;
        this.chromosomeInput[positionAfterObjects + 6] = this.recurrentValue;
    }
    processOperation(operation, param, nearEntities) {
        switch (operation) {
            case 1:
                if (nearEntities[param]) {
                    this.EatObject(nearEntities[param]);
                }
                break;
            case 2:
                if (nearEntities[param]) {
                    this.doSexRequest(nearEntities[param]);
                }
                break;
            case 3:
                this.approveSexRequest();
                break;
            default:
                break;
        }
    }
    EatObject(object) {
        if (object.type === common_1.EntityTypes.FOOD_GRASS &&
            this.getDistanceTo(object) <= this.actRadius) {
            this.fill = Math.max(this.fill + GRASS_FILL_POINTS, MAX_FILL);
            this.onObjectPickup(object);
        }
    }
    die() {
        this.isAlive = false;
        //TODO drop items
    }
    move(x, y) {
        var speed = Math.hypot(x, y);
        if (speed > MAX_SPEED) {
            x /= (speed / MAX_SPEED);
            y /= (speed / MAX_SPEED);
        }
        this.posX += x;
        this.posY += y;
    }
    doSexRequest(object) {
        if (object instanceof Rabbit
            && this.getDistanceTo(object) <= this.actRadius
            && this.age >= MIN_SEX_AGE) {
            object.onSexRequest(this);
        }
    }
    approveSexRequest() {
        if (this.sexRequestedPartner &&
            this.getDistanceTo(this.sexRequestedPartner) < this.actRadius) {
            this.onCoition(this.sexRequestedPartner);
            this.sexRequestedPartner.onCoition(this);
        }
    }
    getDistanceTo(entity) {
        return Math.hypot(this.posX - entity.posX, this.posY - entity.posY);
    }
    isGestiation() {
        return this.gestationChromosome ? true : false;
    }
}
exports.Rabbit = Rabbit;
function findMaxElementIndex(array, fromIndex, toIndex) {
    var maxIndex = fromIndex;
    for (var i = fromIndex + 1; i <= toIndex; i++) {
        if (array[i] > array[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}


/***/ }),

/***/ "./src/world/creatures/creatures.ts":
/*!******************************************!*\
  !*** ./src/world/creatures/creatures.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Creature */ "./src/world/creatures/Creature.ts"));
__export(__webpack_require__(/*! ./Rabbit */ "./src/world/creatures/Rabbit.ts"));


/***/ }),

/***/ "./src/world/idfactory/IdFactory.ts":
/*!******************************************!*\
  !*** ./src/world/idfactory/IdFactory.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class IdFactory {
    constructor() {
        this.lastId = 0;
    }
    generateId() {
        this.lastId = (this.lastId + 1) % 0x100000000;
        return this.lastId;
    }
}
exports.IdFactory = IdFactory;


/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map