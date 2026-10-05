import type { Project } from "@/lib/projects";

const REPO = "https://github.com/jonnyterrero/Intro-to-Mech-Design";

export const roboticArm: Project = {
  slug: "robotic-pick-place-arm",
  name: "Colour-Sorting Robotic Arm",
  tagline:
    "Arduino firmware for a 4-servo arm: runtime colour classification, an FSM controller, and a closed-form inverse-kinematics solver.",
  division: "engineering",
  priority: "featured",
  status: "Completed",
  statusNote: "Course project · functional demo",
  role: "2-person team — I wrote all firmware; partner built the mechanism",
  timeline: "Spring 2026",
  stack: ["Arduino Uno (C/C++)", "Servo control", "Colour sensing (LDR + RGB LED)", "Ultrasonic ranging", "Finite state machine", "Inverse kinematics"],
  liveUrl: null,
  repoUrl: REPO,
  extraLinks: [
    { label: "Final ball-sort firmware", href: `${REPO}/tree/main/final_project_final_code` },
    { label: "IK pick-and-place firmware (v4)", href: `${REPO}/tree/main/robotic-arm/Robotic%20arm%20collection/v4_ik_pick_and_place` },
  ],
  summary:
    "Reads a ball’s colour, decides where it goes at runtime, and places it — the destination isn’t scripted in advance, so a misclassification produces a confident wrong placement rather than a visible failure. That makes the classifier the part that has to be measured.",
  accentColor: "blue",
  capabilityDetails: {
    "biomedical-embedded": "Servo control, photoresistor colour sensing, and ultrasonic ranging on an Arduino Uno.",
    "core-engineering": "FSM sequencing with explicit error states; closed-form 2-link IK with workspace rejection.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "The brief specified behaviour only: sense a ball’s colour, pick it, and place it in the matching location. Three separate engineering problems sit under that:",
      },
      {
        type: "list",
        items: [
          "Motion — reach a target with a multi-joint arm, either by replaying calibrated poses or by solving inverse kinematics.",
          "Perception-conditioned decisions — the destination is chosen at runtime from a sensed colour, so classification errors fail silently.",
          "Failure handling — a missed or misaligned object has to become a defined state, not an undefined continuation.",
        ],
      },
    ],
    requirements: [
      {
        type: "table",
        columns: ["#", "Requirement", "Acceptance criterion", "Status"],
        rows: [
          ["R0", "Functional", "Sorts balls to the correct location in the course demo", "Met"],
          ["R1", "Colour classification", "Confusion matrix per colour, under build lighting and altered lighting", "Not yet measured"],
          ["R2", "End-to-end sort", "Success rate over consecutive cycles, with failures broken down by mode", "Not yet measured"],
          ["R3", "IK accuracy", "End-effector error against commanded targets across the workspace", "Not yet measured"],
          ["R4", "Repeatability", "Spread over repeated returns to one pose", "Not yet measured"],
        ],
      },
    ],
    architecture: [
      {
        type: "diagram",
        caption: "Joint actuation is open-loop: servos are commanded to an angle and report nothing back.",
        text: `┌──────────────────┐  ┌──────────────────┐
│ COLOUR SENSOR    │  │ ULTRASONIC       │
│ photoresistor    │  │ trigger / echo   │
│ under R / G / B  │  │ range during a   │
│ LED illumination │  │ base sweep       │
└────────┬─────────┘  └────────┬─────────┘
         └──────────┬──────────┘
          ┌─────────▼──────────────────────┐
          │ ARDUINO UNO                    │
          │ ┌────────────────────────────┐ │
          │ │ FSM — sequencing, error    │ │
          │ │ states, serial calibration │ │
          │ └─────────────┬──────────────┘ │
          │ ┌─────────────▼──────────────┐ │
          │ │ MOTION                     │ │
          │ │ calibrated poses (EEPROM)  │ │
          │ │ or closed-form IK (v4)     │ │
          │ └─────────────┬──────────────┘ │
          └───────────────┼────────────────┘
                 ┌────────▼────────┐   ┌───────────────┐
                 │ 4 SERVOS        │   │ 74HC595 →     │
                 │ base · forearm  │   │ colour letter │
                 │ wrist · gripper │   │ display       │
                 └─────────────────┘   └───────────────┘`,
      },
      {
        type: "p",
        text: "Handoff-controller FSM states, from the firmware: SCAN → DETECT → PICKUP → COLOR_SENSE → GRAB → CARRY → DELIVER → DROP → RESET.",
      },
    ],
    decisions: [
      {
        type: "decision",
        title: "Nearest-reference colour classification",
        chosen:
          "Read the photoresistor under red, green, and blue illumination in turn, then classify by minimum squared Euclidean distance to reference readings calibrated per session (four ball colours plus “empty”). A colour is accepted only after three consecutive matching reads.",
        alternative: "Fixed thresholds on individual channels.",
        tradeoff:
          "Per-session calibration absorbs some lighting drift and the stability requirement rejects transients. Cost: the references are only valid under the lighting they were taken in, and a wrong match still drives a confident placement.",
      },
      {
        type: "decision",
        title: "Finite state machine instead of a scripted sequence",
        chosen: "Every step — scan, detect, pick, sense, carry, deliver, drop, reset — is an explicit state.",
        tradeoff:
          "A missed object becomes a transition with a defined exit instead of an undefined continuation. Cost: more structure up front, and states multiply if every edge case gets its own.",
      },
      {
        type: "decision",
        title: "Closed-form inverse kinematics with workspace rejection",
        chosen:
          "Given a polar target (reach, height, optional approach angle): when the approach angle is specified, subtract the wrist link to find the wrist point; otherwise solve the 2-link arm by the law of cosines. Targets outside the reachable annulus or below the table are rejected before any servo is commanded.",
        alternative: "Replay joint angles taught for each location.",
        tradeoff:
          "IK makes targets relocatable without re-teaching. Taught poses are simpler and need no link-length calibration — so the final sort build used calibrated poses stored in EEPROM, and IK lives in the v4 pick-and-place firmware.",
      },
      {
        type: "decision",
        title: "Open-loop servo positioning",
        chosen: "Commanded joint angles with no position feedback.",
        tradeoff:
          "No encoder wiring or counting on an AVR that is already busy. Cost: the controller can’t detect a stalled, obstructed, or slipped joint, so accuracy has to be measured rather than assumed.",
      },
    ],
    scope: [
      {
        type: "p",
        text: "Two-person team, Intro to Mechatronic Design. The brief specified required behaviour only, with no starter code. I owned all firmware and chose the approach: the FSM, the colour classifier, and the IK solver. My partner handled mechanical construction; we shared wiring, and split the schematics.",
      },
    ],
    implementation: [
      {
        type: "list",
        items: [
          "Hardware: Arduino Uno, 4 hobby servos, photoresistor with an RGB LED, ultrasonic ranger, 74HC595 shift register driving a display.",
          "Final ball-sort firmware: a user-entered target sequence (Y/G/R/B), a serial calibration menu for colours and arm poses, poses persisted to EEPROM, and colour strings in PROGMEM to save SRAM.",
          "Object finding (handoff controller): the base sweeps in fixed steps; an object is accepted only when consecutive ultrasonic hits form a run within a set width window, and the arm turns to the closest return.",
          "IK (v4 firmware): wrist-point and law-of-cosines solutions with workspace limits, and a flag to fall back to the earlier pose-based behaviour.",
          "Iteration history in the repo: joystick and potentiometer teleoperation → taught-pose pick-and-place (v3) → IK (v4) → integrated colour sort.",
        ],
      },
    ],
    verification: [
      {
        type: "p",
        text: "The integrated system met the course demo: it sorted balls to the correct locations.",
      },
      {
        type: "pending",
        text: "Quantitative results aren’t measured yet. Planned, in order: a colour confusion matrix (20 trials per colour) under build lighting and again under altered lighting; 50-cycle end-to-end sort success with a failure breakdown by mode; IK positional error at 10 workspace targets; and repeatability over 20 returns to one pose.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "The IK solver’s link lengths are still placeholders in the committed v4 firmware. Uncalibrated link lengths bias every solution — one reason the final demo ran on calibrated poses.",
          "Servo jitter needed a dedicated revision (the “no jitters” sketch) and smoothed servo moves.",
          "The firmware uses blocking delays between moves, so sensors aren’t polled mid-motion. A non-blocking millis() scheduler is the fix.",
        ],
      },
    ],
    limitations: [
      {
        type: "list",
        items: [
          "Open-loop joints: no position feedback, so missed or stalled moves go undetected.",
          "Colour classification depends on the lighting at calibration, and a misclassification is a silent failure.",
          "Ultrasonic ranging has a wide beam with no lateral localisation, and a minimum range of a few centimetres.",
          "No grasp confirmation — no force, tactile, or current sensing.",
          "Structured environment only: fixed locations and known ball geometry.",
          "Not safety-engineered for operating near people: no force limiting and no emergency stop. Demonstrated under supervision in a course setting.",
        ],
      },
    ],
  },
};
