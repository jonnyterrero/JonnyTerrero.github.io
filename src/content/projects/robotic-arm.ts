import type { Project } from "@/lib/projects";

const REPO = "https://github.com/jonnyterrero/Intro-to-Mech-Design";

export const roboticArm: Project = {
  slug: "robotic-pick-place-arm",
  name: "Robotic Pick-and-Place Arm",
  tagline:
    "Arduino firmware for a 4-servo arm: colour sorting, handing an object to the arm, a proximity safety stop, and a closed-form inverse-kinematics solver.",
  division: "engineering",
  priority: "featured",
  status: "Completed",
  statusNote: "Course project · functional demo",
  role: "2-person team — I wrote all firmware; partner built the mechanism",
  timeline: "Spring 2026",
  stack: ["Arduino Uno (C/C++)", "Servo control", "Colour sensing (LDR + RGB LED)", "Ultrasonic ranging (median + EMA)", "Finite state machine", "Inverse kinematics"],
  liveUrl: null,
  repoUrl: REPO,
  extraLinks: [
    { label: "Handover FSM firmware", href: `${REPO}/tree/main/final-project/final_project_v1/robotic_arm_fsm` },
    { label: "Colour-sort firmware", href: `${REPO}/tree/main/final_project_final_code` },
    { label: "IK pick-and-place firmware (v4)", href: `${REPO}/tree/main/robotic-arm/Robotic%20arm%20collection/v4_ik_pick_and_place` },
  ],
  summary:
    "Two behaviours from one arm. In colour sorting, it reads a ball’s colour and decides at runtime where it goes, so a misclassification produces a confident wrong placement rather than a visible failure. In handover, a person presents an object, the arm takes it, and a proximity override stops all motion if anything comes too close.",
  accentColor: "blue",
  capabilityDetails: {
    "biomedical-embedded": "Servo control, photoresistor colour sensing, and ultrasonic ranging on an Arduino Uno.",
    "core-engineering": "FSM sequencing with explicit error states, a proximity safety override, and closed-form 2-link IK.",
  },
  caseStudy: {
    problem: [
      {
        type: "p",
        text: "The brief specified behaviour only: sort balls by colour into matching locations, and take an object handed over by a person. Four separate engineering problems sit under that:",
      },
      {
        type: "list",
        items: [
          "Motion — reach a target with a multi-joint arm, either by replaying calibrated poses or by solving inverse kinematics.",
          "Perception-conditioned decisions — the destination is chosen at runtime from a sensed colour, so classification errors fail silently.",
          "Failure handling — a missed or slipped object has to become a defined state, not an undefined continuation.",
          "Working near a person — a hand in the workspace must stop the arm, not be grabbed or struck.",
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
          ["R5", "Handover", "Success rate taking objects presented at varied positions", "Not yet measured"],
          ["R6", "Proximity stop", "STOP_HAND triggers every time something enters < 8 cm in a non-holding state", "Not yet measured"],
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
        type: "diagram",
        caption: "Handover build, from the firmware. Holding states are excluded from STOP_HAND so the object being carried can’t trigger it.",
        text: `           LED command
  IDLE ───────────────▶ SCAN ──┐
    ▲                          │ object held 8–15 cm away
    │ cycle done               ▼
  RETURN_HOME ◀─ RELEASE ◀─ MOVE_TO_DROP ◀─ LIFT ◀─ GRAB ◀─ APPROACH
                                                     ▲
                                  grip check failed ─┘ (retry ≤ 2)

  any non-holding state ── distance < 8 cm ──▶ STOP_HAND
  STOP_HAND ── path clear (> 15 cm) ──▶ IDLE`,
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
        title: "A proximity safety override in the handover build",
        chosen:
          "From any state that isn’t holding an object, a filtered ultrasonic distance under 8 cm forces STOP_HAND. The arm resumes only once the path is clear beyond 15 cm.",
        alternative: "Rely on the operator to keep clear.",
        tradeoff:
          "The gap between the stop and resume thresholds prevents chatter at the boundary, and excluding holding states stops the carried object from triggering it. Cost: it is one ultrasonic sensor with a wide beam — a software stop, not a safety-rated function.",
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
          "Handover build: triggered by a debounced LED command input; ultrasonic readings smoothed with a 5-sample median and an exponential moving average; non-blocking millis() scheduling for sensing, stepping, and display; incremental servo stepping; a grip check after LIFT with up to two retries; FSM state and distance shown on a 74HC595-driven 4-digit display; servos on a separate 5–6 V supply with shared ground.",
          "Object finding (handoff controller): the base sweeps in fixed steps; an object is accepted only when consecutive ultrasonic hits form a run within a set width window, and the arm turns to the closest return.",
          "IK (v4 firmware): wrist-point and law-of-cosines solutions with workspace limits, and a flag to fall back to the earlier pose-based behaviour.",
          "Iteration history in the repo: joystick and potentiometer teleoperation → taught-pose pick-and-place (v3) → IK (v4) → integrated colour sort.",
        ],
      },
    ],
    verification: [
      {
        type: "p",
        text: "Both behaviours worked in the course demo: balls were sorted to the correct locations, and handed-over objects were taken and placed.",
      },
      {
        type: "pending",
        text: "Quantitative results aren’t measured yet. Planned, in order: a colour confusion matrix (20 trials per colour) under build lighting and again under altered lighting; 50-cycle end-to-end sort success with a failure breakdown by mode; IK positional error at 10 workspace targets; repeatability over 20 returns to one pose; 20 handover attempts at varied hand positions; and a STOP_HAND trigger test at the 8 cm threshold.",
      },
    ],
    failures: [
      {
        type: "list",
        items: [
          "The IK solver’s link lengths are still placeholders in the committed v4 firmware. Uncalibrated link lengths bias every solution — one reason the final demo ran on calibrated poses.",
          "Servo jitter needed a dedicated revision (the “no jitters” sketch) and smoothed servo moves.",
          "The colour-sort build still uses blocking delays between moves, so sensors aren’t polled mid-motion. The handover build moved to a non-blocking millis() loop for exactly that reason — it has to see a hand arrive during a move.",
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
          "Not safety-engineered for operating near people. STOP_HAND is a software stop on one ultrasonic sensor, and it is disabled while holding an object. There is no force limiting and no hardware emergency stop. Demonstrated under supervision in a course setting.",
        ],
      },
    ],
  },
};
