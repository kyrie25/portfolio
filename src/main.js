import p5 from "p5";
import "./style.css";

const seedLabel = document.querySelector("#seed-label");
const familyLabel = document.querySelector("#family-label");
const colorLabel = document.querySelector("#color-label");
const sketchRoot = document.querySelector("#sketch");
const motionToggle = document.querySelector("#motion-toggle");
const motionLabel = document.querySelector("#motion-label");
const systemReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let reducedMotionEnabled = systemReducedMotion.matches;
let motionPreferenceOverridden = false;
let requestNewForm = null;

const FORM_FAMILIES = [
  "plume",
  "creature",
  "ray",
  "helix",
  "wave",
  "orbit",
  "bloom",
  "shell",
  "ribbon",
  "vortex",
  "lattice",
  "mobius",
];
const FAMILY_LABELS = {
  plume: "plume",
  creature: "creature",
  ray: "ray",
  helix: "DNA helix",
  wave: "sine field",
  orbit: "orbit",
  bloom: "bloom",
  shell: "shell",
  ribbon: "ribbon",
  vortex: "vortex",
  lattice: "lattice",
  mobius: "mobius",
};
const FAMILY_POINT_RANGES = {
  creature: [8800, 12600],
  helix: [9400, 13200],
  lattice: [9200, 12800],
  ray: [9800, 13800],
  ribbon: [9000, 12600],
  wave: [9000, 13000],
};
const COLOR_MODES = ["solid", "linear", "radial"];
const PALETTES = [
  {
    name: "ember",
    colors: [
      [255, 79, 45],
      [255, 174, 66],
      [255, 239, 199],
    ],
  },
  {
    name: "tide",
    colors: [
      [32, 218, 207],
      [67, 128, 255],
      [214, 252, 255],
    ],
  },
  {
    name: "orchid",
    colors: [
      [255, 76, 157],
      [153, 104, 255],
      [255, 219, 243],
    ],
  },
  {
    name: "acid",
    colors: [
      [180, 255, 55],
      [35, 224, 139],
      [236, 255, 196],
    ],
  },
  {
    name: "solar",
    colors: [
      [255, 210, 48],
      [255, 102, 38],
      [255, 248, 206],
    ],
  },
];
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
const mix = (minimum, maximum, amount) => minimum + (maximum - minimum) * amount;
const rgb = ([red, green, blue]) => `rgb(${red},${green},${blue})`;
const rgba = ([red, green, blue], alpha) => `rgba(${red},${green},${blue},${alpha})`;

function updateMotionControl() {
  motionToggle.setAttribute("aria-pressed", String(reducedMotionEnabled));
  motionLabel.textContent = `Reduced motion / ${reducedMotionEnabled ? "on" : "off"}`;
  document.documentElement.dataset.reducedMotion = String(reducedMotionEnabled);
}

motionToggle.addEventListener("click", () => {
  motionPreferenceOverridden = true;
  reducedMotionEnabled = !reducedMotionEnabled;
  updateMotionControl();
});

systemReducedMotion.addEventListener("change", (event) => {
  if (motionPreferenceOverridden) return;
  reducedMotionEnabled = event.matches;
  updateMotionControl();
});

updateMotionControl();

function mulberry32(seed) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createSeed() {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0];
}

function chooseFamily(seed, previousFamily) {
  const random = mulberry32(seed ^ 0x9e3779b9);
  const choices = FORM_FAMILIES.filter((family) => family !== previousFamily);
  return choices[Math.floor(random() * choices.length)];
}

function createForm(seed, familyOverride) {
  const random = mulberry32(seed);
  const pick = (minimum, maximum) => mix(minimum, maximum, random());
  const familyRoll = random();
  const family = familyOverride ?? FORM_FAMILIES[Math.floor(familyRoll * FORM_FAMILIES.length)];
  const palette = PALETTES[Math.floor(random() * PALETTES.length)];
  const colorMode = COLOR_MODES[Math.floor(random() * COLOR_MODES.length)];
  const pointRange = FAMILY_POINT_RANGES[family] ?? [8000, 12200];

  return {
    seed,
    family,
    timeStep: family === "creature" ? Math.PI / 108 : Math.PI / 96,
    palette,
    colorMode,
    solidColorIndex: Math.floor(random() * palette.colors.length),
    gradientAngle: pick(-Math.PI, Math.PI),
    pointCount: Math.floor(pick(pointRange[0], pointRange[1])),
    span: pick(38, 53),
    lobes: pick(3.1, 6.1),
    frequency: pick(7.2, 13.8),
    fold: pick(28, 52),
    eScale: pick(5.8, 9.1),
    offset: pick(10.5, 16.2),
    kScale: pick(0.82, 1.35),
    eWeight: pick(0.86, 1.18),
    ripple: pick(6.5, 12.5),
    pulse: pick(0.28, 0.82),
    core: pick(2.8, 5.7),
    qWave: pick(1.5, 3.3),
    qFrequency: pick(2.5, 5.2),
    qDivisor: pick(27, 48),
    qBase: pick(7, 13.5),
    innerFold: pick(5.5, 12),
    twist: pick(1.4, 3.1),
    spin: pick(0.48, 1.18),
    orbit: pick(0.62, 1.35),
    radius: pick(32, 61),
    stretch: pick(25, 43),
    flow: pick(0.72, 1.72),
    breathing: pick(0.035, 0.09),
    phase: pick(-Math.PI, Math.PI),
    phaseTwo: pick(-Math.PI, Math.PI),
    phaseThree: pick(-Math.PI, Math.PI),
    baseRotation: pick(-0.72, 0.72),
    scale: pick(0.82, 1.08),
    pointSize: pick(0.75, 1.28),
    trailAlpha: pick(24, 40),
    mirror: random() > 0.5 ? 1 : -1,
    creatureDensity: pick(650, 900),
    creatureSplit: pick(6.5, 9),
    creatureHeadBase: pick(7.5, 10.5),
    creatureHeadWave: pick(4.5, 7),
    creatureBodyBase: pick(3.2, 5.4),
    creatureBodyWave: pick(0.72, 1.32),
    creatureIndexFlow: pick(0.18, 0.34),
    creatureRadialFlow: pick(1.65, 2.35),
    creatureRadialWave: pick(3.2, 4.8),
    creatureCurl: pick(0.2, 0.31),
    creatureSpin: pick(0.38, 0.62),
    creatureParity: pick(2.5, 3.4),
    creatureLift: pick(7.5, 11.5),
    creatureCenterY: pick(75, 115),
    creatureRadius: pick(68, 92),
    creatureQScale: pick(4.2, 6.2),
    rayLineLength: Math.floor(pick(150, 210)),
    raySpan: pick(112, 158),
    rayLength: pick(185, 250),
    rayWingCurve: pick(24, 52),
    rayFlap: pick(0.65, 1.15),
    rayBodyWave: pick(5, 13),
    rayPhase: pick(-Math.PI, Math.PI),
    formAmplitude: pick(28, 66),
    formDepth: pick(8, 28),
    formFrequency: pick(2.2, 6.8),
    formHeight: pick(220, 320),
    formPetals: Math.floor(pick(4, 10)),
    formTurns: pick(3.8, 8.5),
    formWidth: pick(125, 190),
    helixColumns: Math.floor(pick(34, 58)),
    latticeColumns: Math.floor(pick(92, 138)),
    ribbonColumns: Math.floor(pick(180, 250)),
  };
}

function getPlumePoint(form, index, pointCount, time, includeBreath) {
  const progress = index / pointCount;
  const row = progress * form.span;
  const k =
    (form.lobes + Math.cos(index / form.frequency - time * form.flow)) *
    Math.cos(index / form.fold + form.phase);
  const e = row / form.eScale - form.offset;
  const distance =
    Math.hypot(k * form.kScale, e * form.eWeight) +
    Math.sin(e / form.ripple + time * form.pulse) -
    form.core;
  const q =
    form.qWave * Math.sin(k * form.qFrequency + form.phaseTwo) -
    (row / form.qDivisor) *
      k *
      (form.qBase +
        k *
          Math.sin(
            Math.cos(e) * form.innerFold - distance * form.twist + time * form.spin,
          ));
  const angle = distance - time * form.orbit + form.phaseThree;
  const centerY =
    (form.offset - form.span / (2 * form.eScale) - form.core) * form.stretch;
  const breath = includeBreath
    ? 1 + Math.sin(time * 0.72 + progress * 8) * form.breathing
    : 1;

  return {
    x: q + form.radius * Math.cos(angle) * breath,
    y: q * Math.sin(angle) + distance * form.stretch - centerY,
  };
}

function getCreaturePoint(form, index, pointCount, time) {
  const progress = index / pointCount;
  const sourceIndex = progress * 10000;
  const y = sourceIndex / form.creatureDensity;
  const parity = Math.floor(sourceIndex) % 2;
  const headWave = Math.sin((Math.floor(y) ^ 9) + form.phase) * form.creatureHeadWave;
  const amplitude =
    y < form.creatureSplit
      ? form.creatureHeadBase + headWave
      : form.creatureBodyBase + Math.cos(y * form.creatureBodyWave);
  const k = amplitude * Math.cos(sourceIndex + time * form.creatureIndexFlow);
  const e = y / 3 - 13;
  const distance =
    Math.hypot(k, e) +
    Math.cos(e + time * form.creatureRadialFlow + parity * 4 + form.phaseTwo);
  const q =
    (y * k) / form.creatureQScale *
      (2 + Math.sin(distance * 2 + y - time * form.creatureRadialWave)) +
    form.creatureRadius;
  const angle =
    distance * form.creatureCurl -
    time * form.creatureSpin +
    parity * form.creatureParity +
    form.phaseThree;

  return {
    x: q * Math.cos(angle),
    y: q * Math.sin(angle) + distance * form.creatureLift - form.creatureCenterY,
  };
}

function getRayPoint(form, index, pointCount, time) {
  const lineLength = form.rayLineLength;
  const rowCount = Math.max(2, Math.ceil(pointCount / lineLength));
  const longitudinal = clamp(Math.floor(index / lineLength) / (rowCount - 1), 0, 1);
  const lateral = ((index % lineLength) / (lineLength - 1)) * 2 - 1;
  const tailAmount = clamp((longitudinal - 0.72) / 0.28, 0, 1);
  const wingEnvelope =
    Math.pow(Math.sin(Math.PI * longitudinal), 0.68) * (1 - tailAmount);
  const headEnvelope = Math.pow(clamp(1 - longitudinal / 0.16, 0, 1), 2) * 24;
  const flap = Math.sin(
    time * form.rayFlap + longitudinal * 5 + form.rayPhase,
  );
  const bodyEnvelope = Math.sin(longitudinal * Math.PI);
  const x =
    lateral * (form.raySpan * wingEnvelope + headEnvelope) +
    Math.sin(time * 0.55 + longitudinal * 9) * 6 * (1 - Math.abs(lateral));
  const y =
    (longitudinal - 0.42) * form.rayLength +
    tailAmount * form.rayLength * 0.72 +
    lateral * lateral * form.rayWingCurve * flap +
    Math.sin(lateral * Math.PI * 3 + time * 0.6) *
      form.rayBodyWave *
      (1 - Math.abs(lateral)) *
      bodyEnvelope;

  return { x, y };
}

function getHelixPoint(form, index, pointCount, time) {
  const strandPointCount = Math.floor(pointCount * 0.62);
  const isStrand = index < strandPointCount;
  const localIndex = isStrand ? index : index - strandPointCount;
  const columns = form.helixColumns;
  const rows = Math.max(2, Math.ceil((pointCount - strandPointCount) / columns));
  const progress = isStrand
    ? clamp(Math.floor(localIndex / 2) / (strandPointCount / 2 - 1), 0, 1)
    : clamp(Math.floor(localIndex / columns) / (rows - 1), 0, 1);
  const lateral = isStrand ? localIndex % 2 : (localIndex % columns) / (columns - 1);
  const angle = progress * Math.PI * 2 * form.formTurns + time * 0.42 + form.phase;
  const left = Math.cos(angle) * form.formWidth * 0.58;
  const right = Math.cos(angle + Math.PI) * form.formWidth * 0.58;
  const depth = Math.sin(angle) * form.formDepth;

  return {
    x: mix(left, right, lateral),
    y: (progress - 0.5) * form.formHeight + depth * 0.34,
  };
}

function getWavePoint(form, index, pointCount, time) {
  const columns = 180;
  const rows = Math.max(2, Math.ceil(pointCount / columns));
  const u = (index % columns) / (columns - 1);
  const v = clamp(Math.floor(index / columns) / (rows - 1), 0, 1);
  const phase = u * Math.PI * 2 * form.formFrequency + time * 0.68 + form.phase;

  return {
    x:
      (u - 0.5) * form.formWidth * 2 +
      Math.sin(v * Math.PI * 3 + time * 0.32) * form.formDepth,
    y:
      (v - 0.5) * form.formHeight * 0.72 +
      Math.sin(phase + v * 4) * form.formAmplitude * 0.72 +
      Math.cos(v * Math.PI * 4 - time * 0.46) * 9,
  };
}

function getOrbitPoint(form, index, pointCount, time) {
  const pointsPerRing = 360;
  const ringCount = Math.max(2, Math.ceil(pointCount / pointsPerRing));
  const ring = Math.floor(index / pointsPerRing);
  const theta = ((index % pointsPerRing) / pointsPerRing) * Math.PI * 2;
  const radius = ((ring + 1) / (ringCount + 1)) * form.formWidth;
  const wobble =
    Math.sin(theta * form.formFrequency + time * 0.72 + ring * 0.36) *
    form.formAmplitude *
    0.16;
  const angle = theta + time * 0.16 * (ring % 2 ? -1 : 1);

  return {
    x: (radius + wobble) * Math.cos(angle),
    y: (radius + wobble) * Math.sin(angle) * 0.68,
  };
}

function getBloomPoint(form, index, pointCount, time) {
  const progress = index / pointCount;
  const theta = index * 2.3999632297 + time * 0.12 + form.phase;
  const petal = 0.7 + Math.sin(theta * form.formPetals + time * 0.54) * 0.3;
  const radius = Math.sqrt(progress) * form.formWidth * petal;

  return {
    x: radius * Math.cos(theta),
    y: radius * Math.sin(theta) * 0.9,
  };
}

function getShellPoint(form, index, pointCount, time) {
  const progress = index / pointCount;
  const theta = progress * Math.PI * 2 * form.formTurns + time * 0.1 + form.phase;
  const thickness = ((index % 37) / 36 - 0.5) * form.formDepth;
  const radius = 8 + progress * form.formWidth;

  return {
    x: (radius + thickness) * Math.cos(theta),
    y:
      (radius * 0.72 + thickness) * Math.sin(theta) +
      Math.sin(progress * Math.PI * 6 - time * 0.35) * 8,
  };
}

function getRibbonPoint(form, index, pointCount, time) {
  const columns = form.ribbonColumns;
  const rows = Math.max(2, Math.ceil(pointCount / columns));
  const u = (index % columns) / (columns - 1);
  const v = clamp(Math.floor(index / columns) / (rows - 1), 0, 1) * 2 - 1;
  const center = Math.sin(u * Math.PI * 2 * form.formFrequency + time * 0.58) * form.formAmplitude;
  const twist = u * Math.PI * 2 * form.formTurns + time * 0.42;

  return {
    x: (u - 0.5) * form.formWidth * 2 + v * form.formDepth * Math.sin(twist),
    y: center + v * 52 * Math.cos(twist),
  };
}

function getVortexPoint(form, index, pointCount, time) {
  const progress = index / pointCount;
  const arm = index % 4;
  const theta =
    progress * Math.PI * 2 * form.formTurns +
    arm * (Math.PI / 2) +
    time * 0.38 +
    form.phase;
  const radius = 7 + progress * form.formWidth;

  return {
    x: radius * Math.cos(theta) + Math.sin(progress * 38 + time) * 5,
    y: radius * Math.sin(theta) * 0.84,
  };
}

function getLatticePoint(form, index, pointCount, time) {
  const columns = form.latticeColumns;
  const rows = Math.max(2, Math.ceil(pointCount / columns));
  const u = (index % columns) / (columns - 1);
  const v = clamp(Math.floor(index / columns) / (rows - 1), 0, 1);

  return {
    x:
      (u - 0.5) * form.formWidth * 2 +
      Math.sin(v * Math.PI * 2 * form.formFrequency + time * 0.46) *
        form.formAmplitude *
        0.34,
    y:
      (v - 0.5) * form.formHeight +
      Math.cos(u * Math.PI * 2 * form.formFrequency - time * 0.52) *
        form.formAmplitude *
        0.34,
  };
}

function getMobiusPoint(form, index, pointCount, time) {
  const columns = 220;
  const rows = Math.max(2, Math.ceil(pointCount / columns));
  const u = ((index % columns) / (columns - 1)) * Math.PI * 2;
  const v = (clamp(Math.floor(index / columns) / (rows - 1), 0, 1) * 2 - 1) * 48;
  const angle = u + time * 0.13 + form.phase;
  const radius = form.formWidth * 0.58 + v * Math.cos(u / 2);

  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle) * 0.78 + v * Math.sin(u / 2) * 0.62,
  };
}

function getFormPoint(form, index, pointCount, time, includeBreath = true) {
  switch (form.family) {
    case "creature":
      return getCreaturePoint(form, index, pointCount, time);
    case "ray":
      return getRayPoint(form, index, pointCount, time);
    case "helix":
      return getHelixPoint(form, index, pointCount, time);
    case "wave":
      return getWavePoint(form, index, pointCount, time);
    case "orbit":
      return getOrbitPoint(form, index, pointCount, time);
    case "bloom":
      return getBloomPoint(form, index, pointCount, time);
    case "shell":
      return getShellPoint(form, index, pointCount, time);
    case "ribbon":
      return getRibbonPoint(form, index, pointCount, time);
    case "vortex":
      return getVortexPoint(form, index, pointCount, time);
    case "lattice":
      return getLatticePoint(form, index, pointCount, time);
    case "mobius":
      return getMobiusPoint(form, index, pointCount, time);
    default:
      return getPlumePoint(form, index, pointCount, time, includeBreath);
  }
}

function installCanvasControls(canvas) {
  canvas.style.touchAction = "none";
  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    requestNewForm?.();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.code !== "Space" && event.code !== "Enter") return;
  event.preventDefault();
  requestNewForm?.();
});

const sketch = (p) => {
  const background = [5, 5, 5];
  let form = createForm(createSeed());
  let animationTime = 0;
  let hardClear = true;
  let canvas;

  function setForm(seed = createSeed(), familyOverride) {
    const family = familyOverride ?? chooseFamily(seed, form.family);
    form = createForm(seed, family);
    animationTime = 0;
    hardClear = true;
    seedLabel.textContent = seed.toString(16).toUpperCase().padStart(8, "0");
    familyLabel.textContent = FAMILY_LABELS[form.family];
    colorLabel.textContent = `${form.palette.name} / ${form.colorMode}`;
    document.documentElement.style.setProperty("--accent", rgb(form.palette.colors[0]));
    document.documentElement.style.setProperty("--accent-two", rgb(form.palette.colors[1]));
    document.documentElement.dataset.formFamily = form.family;
    document.documentElement.dataset.colorMode = form.colorMode;
  }

  function getPointBudget() {
    const areaFactor = clamp((p.width * p.height) / (1440 * 900), 0.52, 1.15);
    return Math.floor(form.pointCount * areaFactor);
  }

  function fadeFrame(context) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalCompositeOperation = "source-over";
    context.fillStyle = hardClear
      ? `rgb(${background.join(",")})`
      : `rgba(${background.join(",")},${form.trailAlpha / 255})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
    hardClear = false;
  }

  function drawPoints(context) {
    const pointCount = getPointBudget();
    const size = Math.min(p.width, p.height);
    const familyScale =
      form.family === "ray"
        ? 0.88
        : form.family === "creature"
          ? 0.94
          : form.family === "wave" || form.family === "lattice"
            ? 0.82
            : form.family === "helix" || form.family === "ribbon"
              ? 0.9
              : 1;
    const logicalScale = (size / 470) * form.scale * familyScale;

    p.push();
    p.translate(p.width * 0.5, p.height * 0.5);
    p.rotate(form.baseRotation);
    p.scale(logicalScale * form.mirror, logicalScale);

    context.globalCompositeOperation = "lighter";
    context.lineCap = "round";
    context.lineWidth = Math.max(0.42, form.pointSize / logicalScale);

    const gradientRadius = 185;
    let primaryStroke;

    if (form.colorMode === "linear") {
      const x = Math.cos(form.gradientAngle) * gradientRadius;
      const y = Math.sin(form.gradientAngle) * gradientRadius;
      primaryStroke = context.createLinearGradient(-x, -y, x, y);
      form.palette.colors.forEach((color, index) => {
        primaryStroke.addColorStop(index / (form.palette.colors.length - 1), rgba(color, 0.62));
      });
    } else if (form.colorMode === "radial") {
      primaryStroke = context.createRadialGradient(0, 0, 10, 0, 0, gradientRadius);
      form.palette.colors.forEach((color, index) => {
        primaryStroke.addColorStop(index / (form.palette.colors.length - 1), rgba(color, 0.62));
      });
    } else {
      primaryStroke = rgba(form.palette.colors[form.solidColorIndex], 0.66);
    }

    context.strokeStyle = primaryStroke;
    context.beginPath();

    for (let index = 0; index < pointCount; index += 1) {
      const { x, y } = getFormPoint(form, index, pointCount, animationTime);
      context.moveTo(x, y);
      context.lineTo(x + 0.001, y + 0.001);
    }

    context.stroke();

    const glowColor =
      form.colorMode === "solid"
        ? form.palette.colors[form.solidColorIndex]
        : form.palette.colors[1];
    context.strokeStyle = rgba(glowColor, 0.3);
    context.lineWidth *= 1.5;
    context.beginPath();

    for (let index = 0; index < pointCount; index += 17) {
      const { x, y } = getFormPoint(form, index, pointCount, animationTime, false);
      context.moveTo(x, y);
      context.lineTo(x + 0.001, y + 0.001);
    }

    context.stroke();
    p.pop();
  }

  p.setup = () => {
    p.pixelDensity(Math.min(window.devicePixelRatio || 1, 1.5));
    canvas = p.createCanvas(window.innerWidth, window.innerHeight).elt;
    p.frameRate(60);
    installCanvasControls(canvas);
    requestNewForm = setForm;
    setForm(form.seed, form.family);
  };

  p.draw = () => {
    animationTime += reducedMotionEnabled ? form.timeStep * 0.24 : form.timeStep;

    const context = p.drawingContext;
    fadeFrame(context);
    drawPoints(context);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    hardClear = true;
  };
};

new p5(sketch, sketchRoot);
