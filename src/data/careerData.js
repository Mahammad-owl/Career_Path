// Riyaz's Personal Career Operating System (COS) Data Core
// Target: GATE ECE 2028 (Primary) & VLSI Design Verification
// Ground Truth: Oct 2026 | RGUKT RK Valley | 2nd Year 1st Sem

export const INITIAL_USER_STATE = {
  profile: {
    name: "Riyaz",
    age: 18,
    degree: "B.Tech in Electronics & Communication Engineering (ECE)",
    college: "RGUKT RK Valley",
    current_semester: "2nd Year, 1st Semester (Sem 2-1)",
    semester_completion: "November 2026",
    graduation_year: 2029,
    current_cgpa: 8.0,
    target_gate: "GATE ECE 2028 (3rd Year Attempt - Feb 2028)",
    contingency_gate: "GATE ECE 2029 (Improvement / Contingency)",
    career_target: "VLSI Design Verification Engineer (RTL/DV)",
    current_date: "2026-10-04",
  },
  active_mode: "normal", // normal | busy | weekend | exam | low_energy | backlog | test_day
  today: {
    date: "2026-10-04",
    mode: "normal",
    gate_minutes_goal: 120,
    gate_minutes_done: 0,
    english_done: false,
    japanese_done: false,
    dv_done: false,
    tasks: [
      { id: "t1", pillar: "GATE", text: "Linear Algebra: Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem", duration: 45, done: false, tag: "Math" },
      { id: "t2", pillar: "GATE", text: "Digital Logic (College Overlap): Solve 8 GATE PYQs on 4:1 & 8:1 MUX", duration: 45, done: false, tag: "DLD / Triple-Value" },
      { id: "t3", pillar: "GATE", text: "Log errors in Error Book & review 3 pending flashcards", duration: 30, done: false, tag: "Review" },
      { id: "t4", pillar: "English", text: "90s Verbal Explanation aloud: 'Why is a Multiplexer considered a universal logic element?'", duration: 10, done: false, tag: "Technical Speech" },
      { id: "t5", pillar: "Japanese", text: "Learn 10 new N5 Vocabulary words + Hiragana 'Sa-Shi-Su-Se-So' stroke drill", duration: 10, done: false, tag: "Daily 10 Words" }
    ]
  },
  streaks: {
    gate_days: 0,
    english_days: 0,
    japanese_days: 0,
    total_hours_studied: 0,
    total_pyqs_solved: 0
  },
  syllabus_completed_ids: [],
  syllabus_in_progress_ids: [],
  topic_pyqs: {},
  error_book: [],
  dv_projects_progress: {},
  daily_notes: ""
};

export const OPERATING_MODALITIES = {
  normal: {
    id: "normal",
    name: "Normal College Day",
    badge: "2.2 Hours Target",
    description: "Standard daily workflow balancing college lectures with steady GATE and micro-language progress.",
    gate_time: "120 mins (40m concept + 60m problems + 20m error log)",
    dv_time: "Optional / Integrated via College DLD",
    english_time: "10 mins (90-sec technical explanation aloud)",
    japanese_time: "10 mins (10 Anki flashcards)",
    color: "emerald"
  },
  busy: {
    id: "busy",
    name: "Busy College Day",
    badge: "1.5 Hours Target",
    description: "Heavy lab or assignment day. Zero video lectures; high-density problem solving and quick maintenance.",
    gate_time: "75 mins (10 targeted PYQs without distraction)",
    dv_time: "Rest",
    english_time: "7 mins (Quick verbal summary on the walk back)",
    japanese_time: "8 mins (10 Anki cards while resting)",
    color: "blue"
  },
  weekend: {
    id: "weekend",
    name: "Weekend / Holiday Deep Dive",
    badge: "4.5 Hours Target",
    description: "Deep, uninterrupted blocks for tough GATE subjects and hands-on VLSI RTL simulation.",
    gate_time: "180 mins (Hard problem sets, multi-concept questions, chapter test)",
    dv_time: "90 mins (Verilog / SystemVerilog coding & Icarus/EDA simulation)",
    english_time: "15 mins (Record a 3-minute technical audio note)",
    japanese_time: "15 mins (Grammar lesson + 15 vocab review)",
    color: "indigo"
  },
  exam: {
    id: "exam",
    name: "College Exam Season",
    badge: "College Priority",
    description: "Semester exams are non-negotiable (8.0+ CGPA required for core VLSI recruiting). Full academic focus.",
    gate_time: "15-20 mins (Formula sheet review only to retain neural links)",
    dv_time: "Paused",
    english_time: "Integrated in college exam writing",
    japanese_time: "10 mins (Streak preservation: 10 quick words)",
    color: "amber"
  },
  low_energy: {
    id: "low_energy",
    name: "Low-Energy / Exhausted Day",
    badge: "Minimum Viable Day (20m)",
    description: "When burnt out, prevent the guilt spiral. Maintain the identity of an unshakeable engineer with zero friction.",
    gate_time: "10 mins (Review 5 past mistakes in the Error Book)",
    dv_time: "Rest",
    english_time: "5 mins (Read one technical summary aloud)",
    japanese_time: "5 mins (5 flashcards)",
    color: "slate"
  },
  backlog: {
    id: "backlog",
    name: "Backlog Triage Day",
    badge: "Catch-up Mode",
    description: "No new theory permitted. Clear pending high-yield problems and re-align the schedule.",
    gate_time: "120 mins (Strictly solving pending high-yield PYQs)",
    dv_time: "Rest",
    english_time: "10 mins",
    japanese_time: "10 mins",
    color: "rose"
  },
  test_day: {
    id: "test_day",
    name: "Subject / Full Mock Day",
    badge: "5 Hours (3h Test + 2h Post-Mortem)",
    description: "Simulated exam conditions followed by a surgical root-cause diagnostic session.",
    gate_time: "180m CBT Mock + 120m In-depth Error Analysis",
    dv_time: "Rest",
    english_time: "Self-critique of test performance in English",
    japanese_time: "10 mins",
    color: "purple"
  }
};

export const TRIPLE_OVERLAP_MATRIX = [
  {
    topic: "Combinational Circuits (Adders, Multiplexers, Decoders, Encoders, Code Converters)",
    college_course: "Digital Logic Design (Sem 2-1) [Current]",
    gate_relevance: "High (~4-6 Marks)",
    gate_section: "Digital Circuits",
    dv_relevance: "Fundamental: Core building blocks of datapath architectures & control routing",
    overlap_tier: "TRIPLE_VALUE",
    tier_label: "Triple Value (College + GATE + DV)",
    strategy: "Master thoroughly in college lectures; solve all 25 years of GATE PYQs immediately; write synthesizable Verilog modules."
  },
  {
    topic: "Sequential Circuits (Latches, Flip-Flops, Setup/Hold Time, Metastability, Counters)",
    college_course: "Digital Logic Design (Sem 2-1) [Current]",
    gate_relevance: "Critical (~5-7 Marks)",
    gate_section: "Digital Circuits",
    dv_relevance: "Paramount: Clocking, timing closure, setup/hold margin checks, metastability handling",
    overlap_tier: "TRIPLE_VALUE",
    tier_label: "Triple Value (College + GATE + DV)",
    strategy: "Solve every GATE timing violation problem; write behavioral and gate-level Verilog flip-flop testbenches."
  },
  {
    topic: "Finite State Machines (Mealy & Moore Machines, State Diagrams, Transition Tables)",
    college_course: "Digital Logic Design (Sem 2-1) [Current]",
    gate_relevance: "High (~3-5 Marks)",
    gate_section: "Digital Circuits",
    dv_relevance: "Crucial: 90% of verification testbench protocol checkers verify FSM transitions",
    overlap_tier: "TRIPLE_VALUE",
    tier_label: "Triple Value (College + GATE + DV)",
    strategy: "Map FSM state diagrams to 3-always block Verilog and SystemVerilog state assertions."
  },
  {
    topic: "Control Systems (Time Domain, Routh-Hurwitz, Root Locus, Bode, Nyquist, State Space)",
    college_course: "Control Systems (Sem 2-1) [Current]",
    gate_relevance: "Very High (~8-10 Marks)",
    gate_section: "Control Systems",
    dv_relevance: "Low: System-level modeling only (used in mixed-signal/PLL specs)",
    overlap_tier: "GATE_COLLEGE",
    tier_label: "Dual Value (College + GATE)",
    strategy: "Use college class hours to nail concept derivations; aim for 9.0+ college grade while clearing 100% GATE PYQs."
  },
  {
    topic: "Digital Signal Processing (Z-Transform, DFT, FFT, IIR/FIR Filters)",
    college_course: "Digital Signal Processing (Sem 2-1) [Current]",
    gate_relevance: "High (~5-7 Marks in Signals)",
    gate_section: "Networks, Signals and Systems",
    dv_relevance: "Medium: Hardware accelerators for DSP (filters, FFT cores in ASIC/FPGA)",
    overlap_tier: "GATE_COLLEGE",
    tier_label: "Dual Value (College + GATE)",
    strategy: "Deeply master continuous-to-discrete sampling and Z-transform properties for both exams."
  },
  {
    topic: "Linear Algebra (Matrices, Eigenvalues, Determinants, Vector Spaces)",
    college_course: "Engineering Mathematics (Sem 1-1 / 1-2 Foundation)",
    gate_relevance: "Guaranteed (~4-5 Marks)",
    gate_section: "Engineering Mathematics",
    dv_relevance: "Low (General algorithmic logic)",
    overlap_tier: "GATE_CORE",
    tier_label: "GATE Core Yield",
    strategy: "Highest score-per-hour return in GATE. Never drop marks here. Master Cayley-Hamilton and rank theorems."
  },
  {
    topic: "Verilog HDL & SystemVerilog (Syntax, OOP, Assertions, Constrained Randomization)",
    college_course: "DLD Lab / Department Elective",
    gate_relevance: "Nil (Not tested in GATE ECE)",
    gate_section: "N/A",
    dv_relevance: "Primary: The core language of the global Semiconductor & DV industry",
    overlap_tier: "CORE_DV",
    tier_label: "Core DV Track",
    strategy: "Preserve in dedicated weekend 90-minute simulation labs so GATE weekly study rhythm remains unbroken."
  }
];

export const GATE_SYLLABUS = [
  {
    id: "sec_math",
    name: "Engineering Mathematics",
    weightage: "~13 Marks",
    priority: "High",
    topics: [
      { id: "m1", name: "Linear Algebra (Eigenvalues, System of Equations, Rank, Cayley-Hamilton)", status: "not_started", pyqs_solved: 0, pyqs_target: 70, mastery: 0 },
      { id: "m2", name: "Calculus (Mean Value Theorems, Maxima/Minima, Multiple Integrals, Vector Calculus)", status: "not_started", pyqs_solved: 0, pyqs_target: 85, mastery: 0 },
      { id: "m3", name: "Differential Equations (First order, Higher order linear, Cauchy-Euler, Laplace transform method)", status: "not_started", pyqs_solved: 0, pyqs_target: 60, mastery: 0 },
      { id: "m4", name: "Complex Analysis (Analytic functions, Cauchy-Riemann equations, Residue theorem, Taylor/Laurent)", status: "not_started", pyqs_solved: 0, pyqs_target: 45, mastery: 0 },
      { id: "m5", name: "Probability & Statistics (Random variables, PDF/CDF, Conditional probability, Distributions)", status: "not_started", pyqs_solved: 0, pyqs_target: 75, mastery: 0 }
    ]
  },
  {
    id: "sec_digital",
    name: "Digital Circuits",
    weightage: "~9-11 Marks",
    priority: "High (Triple Overlap ⭐⭐⭐)",
    topics: [
      { id: "d1", name: "Number Systems & Boolean Algebra (K-Maps, Quine-McCluskey, Logic Minimization)", status: "not_started", pyqs_solved: 0, pyqs_target: 50, mastery: 0 },
      { id: "d2", name: "Combinational Circuits (Adders, Subtractors, MUX, Demux, Encoders, Decoders, Hazards)", status: "not_started", pyqs_solved: 0, pyqs_target: 65, mastery: 0 },
      { id: "d3", name: "Sequential Circuits (Latches, Flip-Flops, Setup/Hold Times, Ripple & Synchronous Counters, Registers)", status: "not_started", pyqs_solved: 0, pyqs_target: 80, mastery: 0 },
      { id: "d4", name: "Finite State Machines & Asynchronous Circuits (State Reduction, State Assignment)", status: "not_started", pyqs_solved: 0, pyqs_target: 40, mastery: 0 },
      { id: "d5", name: "Data Converters & Memories (ADC, DAC, ROM, SRAM, DRAM, Flash)", status: "not_started", pyqs_solved: 0, pyqs_target: 35, mastery: 0 },
      { id: "d6", name: "Microprocessor Basics (8085 architecture, memory interfacing, instruction cycles)", status: "not_started", pyqs_solved: 0, pyqs_target: 30, mastery: 0 }
    ]
  },
  {
    id: "sec_control",
    name: "Control Systems",
    weightage: "~8-10 Marks",
    priority: "High (College Sem 2-1 Overlap ⭐⭐)",
    topics: [
      { id: "c1", name: "System Modeling & Transfer Functions (Block Diagram Reduction, Mason's Gain Formula)", status: "not_started", pyqs_solved: 0, pyqs_target: 45, mastery: 0 },
      { id: "c2", name: "Time Domain Analysis (Step/Ramp response, Transient specifications, Steady-state errors)", status: "not_started", pyqs_solved: 0, pyqs_target: 60, mastery: 0 },
      { id: "c3", name: "Stability & Routh-Hurwitz Criterion (Special cases, Auxiliary equations)", status: "not_started", pyqs_solved: 0, pyqs_target: 40, mastery: 0 },
      { id: "c4", name: "Root Locus Technique (Asymptotes, Centroid, Breakaway points, Angle of departure)", status: "not_started", pyqs_solved: 0, pyqs_target: 50, mastery: 0 },
      { id: "c5", name: "Frequency Response (Bode Plot, Gain/Phase Margin, Nyquist Stability Criterion)", status: "not_started", pyqs_solved: 0, pyqs_target: 65, mastery: 0 },
      { id: "c6", name: "Compensators & Controllers (Lead, Lag, Lead-Lag, P, PI, PD, PID)", status: "not_started", pyqs_solved: 0, pyqs_target: 35, mastery: 0 },
      { id: "c7", name: "State Space Analysis (State transition matrix, Controllability, Observability)", status: "not_started", pyqs_solved: 0, pyqs_target: 45, mastery: 0 }
    ]
  },
  {
    id: "sec_networks_signals",
    name: "Networks, Signals & Systems",
    weightage: "~15-18 Marks",
    priority: "Very High (Foundation for all ECE)",
    topics: [
      { id: "ns1", name: "Network Theorems (Thevenin, Norton, Superposition, Maximum Power, Reciprocity)", status: "not_started", pyqs_solved: 0, pyqs_target: 65, mastery: 0 },
      { id: "ns2", name: "Transient & Steady-State Analysis (First & Second order RLC circuits, DC/AC excitation)", status: "not_started", pyqs_solved: 0, pyqs_target: 75, mastery: 0 },
      { id: "ns3", name: "Sinusoidal Steady State & Two-Port Networks (Z, Y, ABCD, h parameters, Resonance)", status: "not_started", pyqs_solved: 0, pyqs_target: 55, mastery: 0 },
      { id: "ns4", name: "Continuous & Discrete Time Signals (Classifications, LTI systems, Impulse response, Convolution)", status: "not_started", pyqs_solved: 0, pyqs_target: 60, mastery: 0 },
      { id: "ns5", name: "Fourier Series & Fourier Transform (Properties, Duality, Parseval theorem, Energy/Power spectral density)", status: "not_started", pyqs_solved: 0, pyqs_target: 70, mastery: 0 },
      { id: "ns6", name: "Laplace Transform & Z-Transform (ROC, Causality, Stability, Inverse transforms)", status: "not_started", pyqs_solved: 0, pyqs_target: 65, mastery: 0 },
      { id: "ns7", name: "Sampling Theorem & Filter Fundamentals (Nyquist rate, Aliasing, Reconstruction)", status: "not_started", pyqs_solved: 0, pyqs_target: 45, mastery: 0 }
    ]
  },
  {
    id: "sec_edc",
    name: "Electronic Devices (EDC)",
    weightage: "~8-10 Marks",
    priority: "High (Core Physics)",
    topics: [
      { id: "ed1", name: "Semiconductor Physics (Energy bands, Carrier concentrations, Drift, Diffusion, Mobility)", status: "not_started", pyqs_solved: 0, pyqs_target: 60, mastery: 0 },
      { id: "ed2", name: "P-N Junction Diode (Built-in potential, Depletion width, I-V characteristics, Junction capacitance)", status: "not_started", pyqs_solved: 0, pyqs_target: 55, mastery: 0 },
      { id: "ed3", name: "Bipolar Junction Transistor (BJT physics, Current gain, Early effect, Breakdown)", status: "not_started", pyqs_solved: 0, pyqs_target: 45, mastery: 0 },
      { id: "ed4", name: "MOS Capacitor & MOSFET (C-V characteristics, Flat-band, Threshold voltage, Body effect, Short-channel effects)", status: "not_started", pyqs_solved: 0, pyqs_target: 70, mastery: 0 },
      { id: "ed5", name: "Special Devices (Zener, Photodiode, Solar cell, Light emitting diode)", status: "not_started", pyqs_solved: 0, pyqs_target: 30, mastery: 0 }
    ]
  },
  {
    id: "sec_analog",
    name: "Analog Circuits",
    weightage: "~9-11 Marks",
    priority: "High",
    topics: [
      { id: "ac1", name: "Diode Circuits (Clippers, Clampers, Rectifiers, Regulators)", status: "not_started", pyqs_solved: 0, pyqs_target: 45, mastery: 0 },
      { id: "ac2", name: "BJT & MOSFET Amplifiers (Biasing, Small signal ac models, Midband gain, Input/Output impedance)", status: "not_started", pyqs_solved: 0, pyqs_target: 75, mastery: 0 },
      { id: "ac3", name: "Frequency Response of Amplifiers (Miller effect, Low/High 3dB cutoffs)", status: "not_started", pyqs_solved: 0, pyqs_target: 40, mastery: 0 },
      { id: "ac4", name: "Operational Amplifiers (Ideal/Non-ideal op-amp, Inverting, Non-inverting, Integrator, Differentiator)", status: "not_started", pyqs_solved: 0, pyqs_target: 80, mastery: 0 },
      { id: "ac5", name: "Feedback Amplifiers & Oscillators (Barkhausen criterion, RC phase shift, Wien bridge, Colpitts)", status: "not_started", pyqs_solved: 0, pyqs_target: 40, mastery: 0 },
      { id: "ac6", name: "Active Filters & Waveform Generators (Schmitt trigger, 555 timer, Precision rectifiers)", status: "not_started", pyqs_solved: 0, pyqs_target: 35, mastery: 0 }
    ]
  },
  {
    id: "sec_communications",
    name: "Communications",
    weightage: "~8-10 Marks",
    priority: "Medium-High",
    topics: [
      { id: "cm1", name: "Random Processes & Noise (Autocorrelation, Power Spectral Density, White Gaussian Noise, Filtered Noise)", status: "not_started", pyqs_solved: 0, pyqs_target: 50, mastery: 0 },
      { id: "cm2", name: "Analog Modulation (AM, DSB-SC, SSB, VSB, FM, PM, Superheterodyne receiver, SNR in AM/FM)", status: "not_started", pyqs_solved: 0, pyqs_target: 55, mastery: 0 },
      { id: "cm3", name: "Digital Transmission (PCM, DPCM, DM, ADM, ISI, Eye diagram, Matched filter)", status: "not_started", pyqs_solved: 0, pyqs_target: 60, mastery: 0 },
      { id: "cm4", name: "Digital Modulation Schemes (BPSK, QPSK, BFSK, QAM, Constellation diagrams, Probability of error)", status: "not_started", pyqs_solved: 0, pyqs_target: 65, mastery: 0 },
      { id: "cm5", name: "Information Theory & Coding (Entropy, Mutual information, Channel capacity, Shannon theorem, Linear block codes)", status: "not_started", pyqs_solved: 0, pyqs_target: 40, mastery: 0 }
    ]
  },
  {
    id: "sec_electromagnetics",
    name: "Electromagnetics (EMFT)",
    weightage: "~7-9 Marks",
    priority: "Medium",
    topics: [
      { id: "em1", name: "Electrostatics & Magnetostatics (Coulomb, Gauss, Biot-Savart, Ampere laws, Boundary conditions)", status: "not_started", pyqs_solved: 0, pyqs_target: 45, mastery: 0 },
      { id: "em2", name: "Maxwell's Equations & Plane Waves (Displacement current, Wave equation, Poynting vector, Polarization)", status: "not_started", pyqs_solved: 0, pyqs_target: 55, mastery: 0 },
      { id: "em3", name: "Transmission Lines (Characteristic impedance, Reflection coefficient, VSWR, Smith Chart, Stub matching)", status: "not_started", pyqs_solved: 0, pyqs_target: 65, mastery: 0 },
      { id: "em4", name: "Waveguides (Rectangular waveguides, TE/TM modes, Cutoff frequency, Dispersion)", status: "not_started", pyqs_solved: 0, pyqs_target: 40, mastery: 0 },
      { id: "em5", name: "Antennas (Dipole, Radiation pattern, Directivity, Gain, Friis transmission formula)", status: "not_started", pyqs_solved: 0, pyqs_target: 35, mastery: 0 }
    ]
  },
  {
    id: "sec_aptitude",
    name: "General Aptitude",
    weightage: "15 Marks (Fixed Official)",
    priority: "High Yield",
    topics: [
      { id: "ga1", name: "Quantitative Aptitude (Ratio, Percentages, Time & Work, Algebra, Geometry)", status: "not_started", pyqs_solved: 0, pyqs_target: 60, mastery: 0 },
      { id: "ga2", name: "Analytical & Spatial Aptitude (Series, Syllogisms, Folding, Paper rotation)", status: "not_started", pyqs_solved: 0, pyqs_target: 40, mastery: 0 },
      { id: "ga3", name: "Verbal Ability (Grammar, Vocabulary, Sentence completion, Reading comprehension)", status: "not_started", pyqs_solved: 0, pyqs_target: 50, mastery: 0 }
    ]
  }
];

export const DV_ROADMAP_STAGES = [
  {
    stage: 1,
    title: "Digital Logic & Hardware Fundamentals",
    timeframe: "Sem 2-1 (Current)",
    status: "in_progress",
    prerequisites: "Basic Boolean Algebra",
    topics: ["Boolean minimization", "Combinational building blocks (MUX, Decoders)", "Flip-flops & Latches", "Setup & Hold times", "Metastability & MTBF", "Clock skew & jitter", "FSM architectures (Moore vs Mealy)"],
    exercises: ["Derive maximum clock frequency for arbitrary sequential pipeline", "Design glitch-free 3-bit Gray code counter", "Draw state transition diagram for 1011 sequence detector"],
    project: "Self-Checking 4-bit ALU with Status Flags",
    exit_criteria: "Can calculate setup/hold slack on paper and model any state machine without hesitation."
  },
  {
    stage: 2,
    title: "Computer Architecture Foundations for RTL",
    timeframe: "Sem 2-1 / Sem 2-2",
    status: "queued",
    prerequisites: "Stage 1",
    topics: ["Von Neumann vs Harvard memory architectures", "Instruction Execution Cycle", "Register Transfer Level (RTL) concept", "Pipelining fundamentals (Fetch, Decode, Execute, Memory, Writeback)", "Pipeline hazards (Structural, Data, Control)", "Memory hierarchy (Registers, Cache, SRAM)"],
    exercises: ["Calculate pipeline throughput and latency with branch penalties", "Design forwarding unit logic for RAW data hazard"],
    project: "RTL Specification Document for 4-Stage Instruction Pipeline",
    exit_criteria: "Understands exactly why hardware verification requires checking cycle-accurate pipeline states."
  },
  {
    stage: 3,
    title: "Verilog HDL for Synthesizable RTL",
    timeframe: "Sem 2-2 (Jan - Mar 2027)",
    status: "queued",
    prerequisites: "Stage 1 & 2",
    topics: ["Verilog Lexical conventions & 4-value logic (0, 1, X, Z)", "Data types: wire, reg, integer, parameter", "Continuous assignment (`assign`) vs Procedural assignment", "Blocking (`=`) vs Non-blocking (`<=`) semantics and race conditions", "FSM modeling using 2-always and 3-always block styles", "Tasks and Functions in Verilog"],
    exercises: ["Implement 8-to-1 Multiplexer using both dataflow and behavioral styles", "Write synthesizable Mealy sequence detector with non-blocking assignments", "Implement edge-detector circuit without glitches"],
    project: "Configurable Linear Feedback Shift Register (LFSR) & Pseudo-Random Generator",
    exit_criteria: "Zero simulation/synthesis mismatch in written RTL; flawless mastery of non-blocking `<=`."
  },
  {
    stage: 4,
    title: "RTL Design Patterns & Memory Architectures",
    timeframe: "Sem 2-2 (Apr - May 2027)",
    status: "queued",
    prerequisites: "Stage 3",
    topics: ["Synchronous vs Asynchronous resets (de-assertion synchronizers)", "Single-port & Dual-port SRAM modeling", "Synchronous FIFO architecture", "Clock Domain Crossing (CDC) principles", "2-Flip-Flop synchronizer & Gray code conversion for pointer crossing", "Asynchronous FIFO depth calculation"],
    exercises: ["Write synthesizable Synchronous FIFO with programmable almost_empty/almost_full flags", "Calculate FIFO depth for burst transfer between unequal clock domains"],
    project: "Dual-Clock Asynchronous FIFO with Gray-Code Read/Write Pointers",
    exit_criteria: "Fully functional asynchronous FIFO passing multi-frequency testbenches."
  },
  {
    stage: 5,
    title: "SystemVerilog for Verification (Data Types & Structure)",
    timeframe: "Sem 3-1 (Jun - Aug 2027)",
    status: "queued",
    prerequisites: "Stage 4",
    topics: ["Why Verilog is insufficient for modern verification", "SV Data types: `logic`, `bit`, `byte`, `int`, `time`", "Dynamic arrays, Associative arrays, and Queues", "User-defined types (`typedef`, `enum`, `struct`)", "Procedural blocks: `always_comb`, `always_ff`, `always_latch`", "Interfaces & Virtual Interfaces", "Clocking blocks and modports for timing closure verification"],
    exercises: ["Write an SV interface with clocking block to eliminate testbench race conditions", "Manage transaction packets using SV queues and associative scoreboards"],
    project: "Interface-Driven Testbench for Dual-Port SRAM",
    exit_criteria: "Can construct race-free interfaces driving DUT pins with calibrated setup/hold skews."
  },
  {
    stage: 6,
    title: "Object-Oriented Programming (OOP) for Verification",
    timeframe: "Sem 3-1 (Sep - Oct 2027)",
    status: "queued",
    prerequisites: "Stage 5",
    topics: ["Classes vs Modules", "Objects, handles, and memory allocation via `new()`", "Constructors & `this` keyword", "Inheritance, `super`, and method overriding", "Virtual methods & Polymorphism in testbenches", "Abstract classes & Pure virtual functions", "Shallow copy vs Deep copy"],
    exercises: ["Build a base transaction class and derive error-injection transactions using polymorphism", "Implement deep copy method for packet structures"],
    project: "Polymorphic Packet Generator for Network Protocol",
    exit_criteria: "Explains dynamic binding and polymorphism fluently in technical English."
  },
  {
    stage: 7,
    title: "Layered Testbench Architecture & Randomization",
    timeframe: "Sem 3-1 (Nov 2027)",
    status: "queued",
    prerequisites: "Stage 6",
    topics: ["Testbench layers: Signal layer, Command layer, Functional layer, Scenario layer", "Generator, Driver, Monitor, Scoreboard, and Environment classes", "Mailboxes and Semaphores for inter-process communication", "`fork...join`, `fork...join_any`, `fork...join_none` threading", "Constrained Random Verification (CRV): `rand`, `randc`, `constraint` blocks", "Weight distributions (`dist`), implication (`->`), `solve...before`"],
    exercises: ["Write constrained random generator generating valid packet sizes between 64 and 1518 bytes", "Build a self-checking scoreboard using SV mailboxes"],
    project: "Layered Constrained-Random Testbench for Synchronous FIFO",
    exit_criteria: "Complete modular testbench capable of generating millions of randomized stimuli automatically."
  },
  {
    stage: 8,
    title: "SystemVerilog Assertions (SVA)",
    timeframe: "Sem 3-2 (Post-GATE 2028: Feb - Mar 2028)",
    status: "queued",
    prerequisites: "Stage 7 + GATE 2028 complete",
    topics: ["Immediate assertions vs Concurrent assertions", "Assertion building blocks: Boolean expressions, Sequences, Properties", "Implication operators: Overlapped (`|->`) vs Non-overlapped (`|=>`)", "Consecutive repetition `[*n]`, non-consecutive `[=n]`, goto `[->n]`", "System functions: `$rose`, `$fell`, `$stable`, `$past`", "Binding assertions to DUT using `bind`"],
    exercises: ["Write SVA property: Whenever `req` goes high, `ack` must assert within 1 to 4 clock cycles", "Write assertion ensuring FIFO write never occurs when `full` is asserted"],
    project: "Comprehensive SVA Checker Suite for Handshake Protocols",
    exit_criteria: "Can write formal assertions preventing every protocol rule violation."
  },
  {
    stage: 9,
    title: "Functional Coverage & Coverage Closure",
    timeframe: "Sem 3-2 (Apr 2028)",
    status: "queued",
    prerequisites: "Stage 8",
    topics: ["Code Coverage (Line, Branch, Condition, FSM, Toggle) vs Functional Coverage", "Covergroups and Coverpoints", "Bins definition: Explicit, Implicit, Default, Illegal, Ignore", "Cross Coverage between control and data signals", "Sampling covergroups on clock edges or events", "Measuring coverage metrics & identifying coverage holes"],
    exercises: ["Define covergroup for 32-bit ALU operation covering all corner-case operands (0, MAX_INT, MIN_INT)", "Perform cross coverage between FIFO occupancy level and read/write requests"],
    project: "Coverage-Driven Verification Report for Asynchronous FIFO (Target: 100% Functional Coverage)",
    exit_criteria: "Can analyze simulation coverage databases and close remaining coverage holes."
  },
  {
    stage: 10,
    title: "Industry Protocols: UART & SPI Verification",
    timeframe: "Sem 3-2 (May 2028)",
    status: "queued",
    prerequisites: "Stage 9",
    topics: ["UART protocol specifications (Start bit, Baud rate, Parity, Stop bit)", "SPI protocol modes (CPOL, CPHA, Master/Slave configuration)", "Writing protocol monitors and reference models", "Injecting corrupted frames (Framing error, Parity error)"],
    exercises: ["Build an autonomous SPI Master VIP driving transactions into an SPI Slave DUT"],
    project: "Full SystemVerilog Verification Environment for Full-Duplex UART Controller",
    exit_criteria: "Complete verification environment running automated regression testing."
  },
  {
    stage: 11,
    title: "ARM AMBA Protocols: APB & AXI4-Lite",
    timeframe: "Sem 4-1 (Jun - Jul 2028)",
    status: "queued",
    prerequisites: "Stage 10",
    topics: ["On-Chip interconnect fundamentals", "ARM AMBA APB (Advanced Peripheral Bus) signals: PCLK, PRESETn, PADDR, PPROT, PSELx, PENABLE, PWRITE, PWDATA, PSTRB, PREADY, PRDATA, PSLVERR", "APB State Machine: IDLE, SETUP, ACCESS", "AXI4-Lite architecture: 5 independent channels (Read Address, Read Data, Write Address, Write Data, Write Response)", "Two-way valid/ready handshake mechanism"],
    exercises: ["Write an APB protocol assertion checker verifying setup-to-access timing and PSLVERR generation", "Simulate simultaneous read/write bursts on AXI4-Lite"],
    project: "APB Protocol-Compliant Verification IP (Master VIP + Monitor + Checker)",
    exit_criteria: "Authoritative knowledge of AMBA bus protocol handshakes and error scenarios."
  },
  {
    stage: 12,
    title: "Universal Verification Methodology (UVM) Core",
    timeframe: "Sem 4-1 (Aug - Sep 2028)",
    status: "queued",
    prerequisites: "Stage 11",
    topics: ["Why UVM is the global industry standard", "UVM class hierarchy (`uvm_object`, `uvm_component`)", "UVM Phases: Build, Connect, End_of_elaboration, Start_of_simulation, Run (pre_reset, reset, post_reset, main, etc.), Extract, Check, Report", "UVM Factory: Registration macros, Object/Component overrides", "UVM Configuration Database (`uvm_config_db`)", "Reporting macros (`uvm_info`, `uvm_warning`, `uvm_error`, `uvm_fatal`) with verbosity control"],
    exercises: ["Build a minimal UVM testbench booting all phases and printing phase execution hierarchy", "Configure driver parameters dynamically using `uvm_config_db`"],
    project: "Minimal UVM Testbench Environment for Register File DUT",
    exit_criteria: "Flawless understanding of UVM phase execution and factory registration."
  },
  {
    stage: 13,
    title: "UVM TLM, Sequences & Scoreboards",
    timeframe: "Sem 4-1 (Oct 2028)",
    status: "queued",
    prerequisites: "Stage 12",
    topics: ["Transaction-Level Modeling (TLM 1.0 & 2.0)", "TLM Ports, Exports, Imps, and Analysis Ports", "UVM Driver (`get_next_item`, `item_done`) and Sequencer handshake", "UVM Sequences: Base sequence, Directed sequence, Virtual sequence, Virtual sequencer", "Building an in-order and out-of-order UVM Scoreboard with predictor"],
    exercises: ["Connect UVM monitor analysis port to UVM scoreboard and coverage subscriber", "Write virtual sequence coordinating multi-interface transaction bursts"],
    project: "UVM Verification Environment for APB-Slave Memory Peripheral",
    exit_criteria: "Can structure end-to-end UVM verification environments from scratch."
  },
  {
    stage: 14,
    title: "Capstone DV Portfolio Project",
    timeframe: "Sem 4-1 / Sem 4-2 (Nov - Dec 2028)",
    status: "queued",
    prerequisites: "Stage 13",
    topics: ["Architecting production-grade verification environments", "DUT selection: AXI-to-APB Bridge OR 4-Port Network Packet Switch", "Test plan authoring: Features, Scenarios, Assertions, Coverage goals", "Automated regression testing scripts (Makefile / Python test runner)", "Bug hunting: Injecting intentional subtle RTL bugs and proving testbench detects them"],
    exercises: ["Achieve 100% functional and code coverage on capstone DUT", "Generate comprehensive HTML verification closure report"],
    project: "CAPSTONE: Complete UVM Verification Environment for AXI-to-APB Bridge with Automated Regression & 100% Coverage Closure",
    exit_criteria: "Project hosted on GitHub with detailed README, verification architecture diagrams, waveforms, and coverage metrics."
  },
  {
    stage: 15,
    title: "Linux, Git, Scripting & Professional DV Toolchains",
    timeframe: "Continuous / Sem 4-2 (Jan 2029)",
    status: "queued",
    prerequisites: "Stage 14",
    topics: ["Linux command line mastery: grep, sed, awk, find, pipes, bash scripting", "Git workflows: Branching, pull requests, semantic commits, tags", "EDA Simulation toolchains (Cadence Xcelium / Synopsys VCS / QuestaSim / open-source Verilator / Icarus)", "Makefile automation for regressions", "Waveform debugging using GTKWave / SimVision"],
    exercises: ["Write bash script to run 50 random seed simulations in parallel and summarize pass/fail counts"],
    project: "Automated Continuous Integration (CI) Pipeline for SystemVerilog Regressions on GitHub",
    exit_criteria: "Independent and fluent in Linux EDA environments."
  },
  {
    stage: 16,
    title: "DV Interview Technical Drills & Resume Architecture",
    timeframe: "Sem 4-2 (Feb - Apr 2029)",
    status: "queued",
    prerequisites: "Stage 15",
    topics: ["Top 100 SystemVerilog & UVM technical interview questions", "Debugging tricky race conditions and assertion failures on whiteboards", "Explaining project architecture clearly in technical English", "Tailored VLSI Design Verification Engineer Resume (Action + Metric + Tech stack)", "LinkedIn presence and reaching out to VLSI verification engineering managers"],
    exercises: ["Deliver 5 mock technical interviews covering OOP, UVM phases, CDC, and SVA", "Complete 20 live paper-coding problems on FIFO and FSM design"],
    project: "Industry-Ready Technical DV Portfolio & Professional Engineering Dossier",
    exit_criteria: "Receives core VLSI Design Verification job/internship offers."
  }
];

export const INITIAL_ERROR_BOOK = [
  {
    id: "ERR-001",
    date: "2026-10-02",
    subject: "Digital Circuits",
    topic: "Ripple Counter Frequency Calculation",
    question_ref: "GATE 2022 Q28",
    question_type: "NAT",
    mistake_category: "Type 2: Formula / Sign Mistake",
    problem_summary: "Calculated maximum frequency of 4-bit ripple counter with t_pd = 15ns and setup time = 5ns.",
    my_wrong_work: "Used f_max = 1 / (t_pd + t_setup) = 1 / 20ns = 50 MHz.",
    correct_solution: "In a ripple counter, delays accumulate across all N stages! Total delay = N * t_pd + t_setup = 4 * 15ns + 5ns = 65ns. f_max = 1 / 65ns = 15.38 MHz.",
    root_cause: "Confused synchronous counter timing with asynchronous ripple counter delay accumulation.",
    corrective_rule: "Always check counter type: Synchronous = single stage delay (t_pd + t_setup); Ripple = N * t_pd + t_setup.",
    spaced_interval_days: [1, 3, 7, 14, 30],
    current_interval_idx: 1,
    next_review_date: "2026-10-05",
    status: "pending_review"
  },
  {
    id: "ERR-002",
    date: "2026-10-03",
    subject: "Engineering Mathematics",
    topic: "Eigenvalues & Cayley-Hamilton Theorem",
    question_ref: "GATE 2024 Q05",
    question_type: "MCQ",
    mistake_category: "Type 4: Question Interpretation / Silly Mistake",
    problem_summary: "Asked for the determinant of matrix A^3 - 2A^2 + I where eigenvalues of A were 1, 2, 3.",
    my_wrong_work: "Calculated eigenvalues for the polynomial correctly (0, 1, 10), but added them instead of multiplying for the determinant.",
    correct_solution: "Determinant of any matrix equals the product of its eigenvalues: Det = 0 * 1 * 10 = 0.",
    root_cause: "Rushed the final step and computed Trace (sum) instead of Determinant (product).",
    corrective_rule: "Before clicking submit: Trace = SUM of eigenvalues; Determinant = PRODUCT of eigenvalues.",
    spaced_interval_days: [1, 3, 7, 14, 30],
    current_interval_idx: 0,
    next_review_date: "2026-10-04",
    status: "pending_review"
  }
];

export const JAPANESE_CORE_VOCABULARY = [
  { id: "jp1", kanji: "私", kana: "わたし", romaji: "watashi", meaning: "I / Me", category: "Pronoun", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp2", kanji: "学生", kana: "がくせい", romaji: "gakusei", meaning: "Student", category: "Nouns", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp3", kanji: "先生", kana: "せんせい", romaji: "sensei", meaning: "Teacher / Professor", category: "Nouns", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp4", kanji: "本", kana: "ほん", romaji: "hon", meaning: "Book", category: "Objects", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp5", kanji: "日本", kana: "にほん", romaji: "nihon", meaning: "Japan", category: "Places", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp6", kanji: "日本語", kana: "にほんご", romaji: "nihongo", meaning: "Japanese language", category: "Language", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp7", kanji: "一", kana: "いち", romaji: "ichi", meaning: "One (1)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp8", kanji: "二", kana: "に", romaji: "ni", meaning: "Two (2)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp9", kanji: "三", kana: "さん", romaji: "san", meaning: "Three (3)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp10", kanji: "四", kana: "よん / し", romaji: "yon / shi", meaning: "Four (4)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp11", kanji: "五", kana: "ご", romaji: "go", meaning: "Five (5)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp12", kanji: "六", kana: "ろく", romaji: "roku", meaning: "Six (6)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp13", kanji: "七", kana: "なな / しち", romaji: "nana / shichi", meaning: "Seven (7)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp14", kanji: "八", kana: "はち", romaji: "hachi", meaning: "Eight (8)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp15", kanji: "九", kana: "きゅう / く", romaji: "kyuu / ku", meaning: "Nine (9)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp16", kanji: "十", kana: "じゅう", romaji: "juu", meaning: "Ten (10)", category: "Numbers", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp17", kanji: "日", kana: "ひ / にち", romaji: "hi / nichi", meaning: "Sun / Day", category: "Time / Nature", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp18", kanji: "月", kana: "つき / げつ", romaji: "tsuki / getsu", meaning: "Moon / Month", category: "Time / Nature", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp19", kanji: "火", kana: "ひ / か", romaji: "hi / ka", meaning: "Fire", category: "Elements", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp20", kanji: "水", kana: "みず / すい", romaji: "mizu / sui", meaning: "Water", category: "Elements", level: "N5", learned_date: "2026-10-04", mastered: false },
  // Target: 800 words for N5
  { id: "jp21", kanji: "今日", kana: "きょう", romaji: "kyou", meaning: "Today", category: "Time", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp22", kanji: "明日", kana: "あした", romaji: "ashita", meaning: "Tomorrow", category: "Time", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp23", kanji: "昨日", kana: "きのう", romaji: "kinou", meaning: "Yesterday", category: "Time", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp24", kanji: "時間", kana: "じかん", romaji: "jikan", meaning: "Time / Hours", category: "Time", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp25", kanji: "何", kana: "なに / なん", romaji: "nani / nan", meaning: "What", category: "Question", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp26", kanji: "友だち", kana: "ともだち", romaji: "tomodachi", meaning: "Friend", category: "People", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp27", kanji: "行く", kana: "いく", romaji: "iku", meaning: "To go", category: "Verbs", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp28", kanji: "来る", kana: "くる", romaji: "kuru", meaning: "To come", category: "Verbs", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp29", kanji: "食べる", kana: "たべる", romaji: "taberu", meaning: "To eat", category: "Verbs", level: "N5", learned_date: "2026-10-04", mastered: false },
  { id: "jp30", kanji: "勉強", kana: "べんきょう", romaji: "benkyou", meaning: "Study", category: "Action", level: "N5", learned_date: "2026-10-04", mastered: false }
];

export const ENGLISH_VERBAL_PROMPTS = [
  {
    id: "eng1",
    pillar: "Digital Logic / DV",
    prompt: "Explain the difference between a Mealy machine and a Moore machine in under 90 seconds. Focus on clock latency and output glitch susceptibility.",
    key_terms: ["state-dependent", "input-dependent", "combinational output", "registered output", "glitch susceptibility"],
    sample_answer_bullet: "A Moore machine outputs depend purely on the present state flip-flops, meaning outputs change synchronously with clock edges and are inherently glitch-free. A Mealy machine outputs depend on both the present state and immediate primary inputs. Because inputs can fluctuate asynchronously between clock edges, Mealy outputs can produce false glitches unless registered."
  },
  {
    id: "eng2",
    pillar: "GATE / Circuits",
    prompt: "Why does a reverse-biased P-N junction act as a voltage-variable capacitor (Varactor Diode)?",
    key_terms: ["depletion layer", "dielectric", "mobile carriers", "reverse bias voltage", "junction capacitance"],
    sample_answer_bullet: "Under reverse bias, external potential pulls majority carriers further away from the metallurgical junction, widening the carrier-depleted region. This depleted zone acts as an electrical insulator or dielectric, while the heavily doped quasi-neutral p and n regions act as conductive parallel plates. As reverse voltage increases, the depletion width expands, causing the junction capacitance C_j to decrease inversely."
  },
  {
    id: "eng3",
    pillar: "VLSI / Timing",
    prompt: "What is setup time violation, and why can it NOT be resolved simply by decreasing the clock frequency?",
    key_terms: ["propagation delay", "clock period", "hold time", "combinational path", "critical path"],
    sample_answer_bullet: "Setup time is the minimum duration the data signal must remain stable before the active clock edge arrives. Setup violations occur when the combinational path delay plus flip-flop propagation delay exceeds the clock period minus setup time. Decreasing clock frequency DOES fix setup violations because it widens the clock period T. However, HOLD time violations cannot be fixed by changing clock frequency because hold time depends strictly on the minimum data path delay relative to clock skew!"
  },
  {
    id: "eng4",
    pillar: "Control Systems",
    prompt: "Explain the intuitive physical meaning of Gain Margin and Phase Margin on a Bode plot.",
    key_terms: ["gain crossover frequency", "phase crossover frequency", "closed-loop stability", "open-loop transfer function"],
    sample_answer_bullet: "Gain Margin represents how much additional open-loop gain can be tolerated before the system becomes unstable when the phase lag reaches 180 degrees. Phase Margin represents how much additional phase delay the system can tolerate at unity gain before oscillating. Both measure the safety buffer against instability."
  }
];

export const INITIAL_DV_PROJECTS = [
  {
    id: "proj_1",
    level: "Beginner",
    title: "Self-Checking 4-bit ALU & Status Register",
    tech: "Verilog HDL + Basic Testbench",
    timing: "Sem 2-1 (Nov 2026)",
    deliverables: ["Synthesizable RTL ALU", "Automated self-checking testbench", "Edge case assertion of overflow flag"],
    status: "not_started",
    repo_url: "",
    notes: "Core building block of RTL architecture."
  },
  {
    id: "proj_2",
    level: "Intermediate 1",
    title: "Dual-Clock Asynchronous FIFO with Gray Pointers",
    tech: "Verilog / SystemVerilog + CDC Synchronizers",
    timing: "Sem 2-2 (May 2027)",
    deliverables: ["2-FF Gray code pointer synchronization", "Full/Empty condition boundary checks", "Multi-frequency clock domain simulation"],
    status: "not_started",
    repo_url: "",
    notes: "Top interview topic: Clock Domain Crossing (CDC)."
  },
  {
    id: "proj_3",
    level: "Intermediate 2",
    title: "Configurable Full-Duplex UART with Constrained Random Testbench",
    tech: "SystemVerilog OOP + Mailboxes + Scoreboard",
    timing: "Sem 3-1 (Oct 2027)",
    deliverables: ["Layered testbench (Driver, Monitor, Scoreboard)", "Parity & Framing error injection", "Randomized baud rate generator"],
    status: "not_started",
    repo_url: "",
    notes: "Transition from pure RTL to OOP Verification."
  },
  {
    id: "proj_4",
    level: "Advanced",
    title: "ARM AMBA APB Master & Slave Verification IP (VIP)",
    tech: "SystemVerilog + SVA Assertions + Functional Coverage",
    timing: "Sem 3-2 (Post-GATE 2028: Apr 2028)",
    deliverables: ["Full APB state machine protocol checker", "Concurrent SVA assertions for PSLVERR & PENABLE timing", "100% Functional & Code Coverage Report"],
    status: "not_started",
    repo_url: "",
    notes: "Standard industry protocol; demonstrates SystemVerilog Assertions."
  },
  {
    id: "proj_5",
    level: "Capstone",
    title: "Full UVM Verification Environment for AXI-to-APB Bridge",
    tech: "UVM 1.2 + Virtual Sequencers + TLM Scoreboard + CI Regressions",
    timing: "Sem 4-1 (Nov 2028)",
    deliverables: ["UVM Agent hierarchy (AXI Master agent + APB Slave agent)", "Automated Makefile regression scripts", "GitHub portfolio dossier with waveforms & bug detection logs"],
    status: "not_started",
    repo_url: "",
    notes: "Golden ticket project for Qualcomm, Intel, NVIDIA, Synopsys."
  }
];

export const GATE_FORMULA_VAULT = [
  {
    id: "f_math",
    subject: "Engineering Mathematics",
    icon: "Calculator",
    color: "amber",
    cards: [
      {
        title: "Eigenvalues & Cayley-Hamilton Properties",
        key_formula: "Sum(λi) = Trace(A)  |  Prod(λi) = Det(A)  |  P(A) = 0",
        explanation: "1. For any matrix A, the sum of eigenvalues always equals the trace (sum of diagonal elements).\n2. The product of eigenvalues equals det(A). If det(A) = 0, at least one eigenvalue is 0.\n3. Eigenvalues of A^k are λi^k. Eigenvalues of A^-1 are 1/λi.\n4. Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation: |A - λI| = 0 => P(A) = 0. Use this to quickly compute A^-1 or high powers A^k.",
        traps: "TRAP: Do not compute characteristic polynomial for triangular/diagonal matrices—their eigenvalues are simply the diagonal entries!"
      },
      {
        title: "System of Linear Equations (AX = B)",
        key_formula: "Unique: Rank(A) = Rank(A|B) = n  |  Infinite: Rank < n  |  No Solution: Rank(A) != Rank(A|B)",
        explanation: "For n variables:\n- Consistent with Unique Solution: Rank(A) = Rank([A|B]) = n\n- Consistent with Infinitely Many Solutions: Rank(A) = Rank([A|B]) = r < n (number of free parameters = n - r)\n- Inconsistent (No Solution): Rank(A) < Rank([A|B])\n- Homogeneous (AX = 0): Always consistent! Unique trivial solution if Rank(A) = n; Non-trivial solutions if Det(A) = 0 (Rank < n).",
        traps: "TRAP: In homogeneous systems, 'no solution' is impossible—zero vector is always a solution."
      },
      {
        title: "Cauchy-Riemann Equations & Residues",
        key_formula: "ux = vy,  uy = -vx  |  Residue(z0) = lim[z->z0] (z - z0) f(z)",
        explanation: "A complex function f(z) = u(x,y) + i*v(x,y) is analytic if and only if partial derivatives are continuous and satisfy:\n∂u/∂x = ∂v/∂y  and  ∂u/∂y = -∂v/∂x.\nFor a simple pole at z = z0: Res[f(z), z0] = lim(z->z0) (z - z0)*f(z).\nContour Integral: ∮ f(z) dz = 2πi * Σ Res.",
        traps: "TRAP: Watch the sign in ∂u/∂y = -∂v/∂x. For poles of order m, remember the (1/(m-1)!) factor!"
      }
    ]
  },
  {
    id: "f_digital",
    subject: "Digital Circuits",
    icon: "Cpu",
    color: "indigo",
    cards: [
      {
        title: "Setup & Hold Time Violation Equations",
        key_formula: "Tclk >= Tcq + Tcomb + Tsetup - Tskew  |  Thold <= Tcq + Tcomb_min + Tskew",
        explanation: "1. Setup Constraint (Max Delay): Data must arrive at least Tsetup before the clock edge.\nTclk >= Tcq(max) + Tcomb(max) + Tsetup - Tskew (where positive skew helps setup).\n2. Hold Constraint (Min Delay): Data must not change for Thold after the clock edge.\nTcq(min) + Tcomb(min) >= Thold + Tskew (independent of clock frequency Tclk!).",
        traps: "FATAL GATE TRAP: Decreasing clock frequency fixes SETUP violations, but CANNOT fix HOLD violations!"
      },
      {
        title: "Ripple vs Synchronous Counter Frequency",
        key_formula: "Ripple: fmax = 1 / (N * t_pd + t_setup)  |  Sync: fmax = 1 / (t_pd + t_comb + t_setup)",
        explanation: "In an N-bit ripple (asynchronous) counter, each flip-flop clock is triggered by the previous flip-flop output. Hence, delays accumulate across all N stages:\nTotal Delay = N * t_pd + t_setup => f_max = 1 / (N * t_pd + t_setup).\nIn a synchronous counter, all flip-flops clock simultaneously, so delay is only one flip-flop propagation delay plus combinational logic: f_max = 1 / (t_pd + t_comb + t_setup).",
        traps: "TRAP: Check whether the question states 'ripple' or 'synchronous'. Delays only multiply by N in ripple counters!"
      },
      {
        title: "Multiplexer Universal Sizing Rule",
        key_formula: "n variables implemented with 2^(n-1):1 MUX",
        explanation: "To implement an n-variable boolean function with a 2^(n-1)-to-1 MUX:\n1. Connect (n - 1) variables to the select lines.\n2. The remaining 1 variable (or 0, 1, or complement) forms the data inputs (I0, I1, ...).\n3. To implement an n-variable function with a 2^(n-2):1 MUX, an additional inverter or external gate is required.",
        traps: "TRAP: Keep variable order strict! Select lines S1, S0 must correspond to MSB/LSB consistently."
      }
    ]
  },
  {
    id: "f_control",
    subject: "Control Systems",
    icon: "Target",
    color: "emerald",
    cards: [
      {
        title: "Standard Second-Order System Dynamics",
        key_formula: "T(s) = ωn^2 / (s^2 + 2ζωn s + ωn^2)  |  %Mp = exp(-πζ / sqrt(1-ζ^2)) * 100",
        explanation: "For damping ratio ζ:\n- Undamped: ζ = 0 (pure oscillation on jω axis)\n- Underdamped: 0 < ζ < 1 (decaying oscillations, complex conjugate poles)\n- Critically Damped: ζ = 1 (fastest response without overshoot, real equal poles)\n- Overdamped: ζ > 1 (slow sluggish response, two distinct real poles)\nSettling Time:\nts (2% band) = 4 / (ζ * ωn)\nts (5% band) = 3 / (ζ * ωn)\nPeak Time: tp = π / (ωn * sqrt(1 - ζ^2))",
        traps: "TRAP: Peak overshoot %Mp depends SOLELY on damping ratio ζ, completely independent of natural frequency ωn!"
      },
      {
        title: "Routh-Hurwitz Stability Criteria",
        key_formula: "Number of sign changes in 1st column = Number of Right-Half Plane (RHP) poles",
        explanation: "1. For stability, all coefficients of characteristic equation must be positive, and all elements in the first column of the Routh array must have the same sign.\n2. Row of zeros indicates symmetric roots about origin (pairs of jω poles or complex quads). Form auxiliary polynomial A(s) from previous row and differentiate dA(s)/ds to continue.",
        traps: "TRAP: A row of all zeros does NOT immediately mean the system is stable—it often indicates marginal stability or jω axis poles."
      }
    ]
  },
  {
    id: "f_networks",
    subject: "Network Theory",
    icon: "Zap",
    color: "sky",
    cards: [
      {
        title: "Maximum Power Transfer Theorem",
        key_formula: "DC: RL = Rth (Pmax = Vth^2 / 4Rth)  |  AC: ZL = Zth* (Pmax = Vth^2 / 4Rth)",
        explanation: "1. DC Circuits: Maximum power transferred to load resistor RL when RL = Rth. Maximum power = Vth^2 / (4 * Rth). Efficiency at max power is exactly 50%!\n2. AC with variable complex load ZL = RL + jXL: Maximum power when ZL = Zth* (conjugate: RL = Rth and XL = -Xth).\n3. AC with purely resistive load RL: RL = |Zth| = sqrt(Rth^2 + Xth^2).",
        traps: "TRAP: If RL is variable and XL is fixed, ZL is NOT simply Zth*. Check whether only RL or both RL and XL can vary!"
      },
      {
        title: "Two-Port Network Parameter Matrix Rules",
        key_formula: "Reciprocity: Z12=Z21 | Y12=Y21 | AD-BC=1 | h12=-h21",
        explanation: "Symmetry Conditions:\n- Z-parameters: Z11 = Z22\n- Y-parameters: Y11 = Y22\n- ABCD-parameters: A = D\n- h-parameters: h11*h22 - h12*h21 = 1 (Δh = 1)\nReciprocity Conditions:\n- Z: Z12 = Z21\n- Y: Y12 = Y21\n- ABCD: AD - BC = 1\n- h: h12 = -h21",
        traps: "TRAP: Note the negative sign in h-parameter reciprocity: h12 = -h21!"
      }
    ]
  }
];

export const BACKLOG_RECOVERY_STRATEGIES = [
  {
    duration: "1 Day Lost",
    title: "Sunday Buffer Absorption",
    rule: "NEVER add extra hours to Monday-Friday. Maintain your 2-hour rhythm without guilt.",
    action_plan: "Absorb the missed 2 hours during the scheduled Sunday revision block (allocated for buffer). Do not sacrifice sleep or regular college attendance."
  },
  {
    duration: "3 Days Lost (Minor Illness / College Submissions)",
    title: "Surgical High-Yield Triage",
    rule: "Freeze new theoretical deep-dives. Solve only top 15 core PYQs.",
    action_plan: "1. For the topic missed, skip reading textbooks line-by-line.\n2. Directly review the formula/summary cheat sheet.\n3. Solve 15 high-weightage GATE PYQs.\n4. Log mistakes into the Error Book.\n5. Rejoin the current active calendar immediately."
  },
  {
    duration: "1 - 2 Weeks Lost (Mid-term Exams / Severe Disruption)",
    title: "Macro Re-alignment Protocol",
    rule: "Do NOT drag a dead calendar. Re-anchor to the present date.",
    action_plan: "1. Triage all pending topics into Category A (High Yield: Eigenvalues, Op-Amps, State Machines, Transfer Functions) and Category B (Low Yield: Special Diodes, Obscure Network Theorems).\n2. Allocate 1 weekend to cover Category A topics at high speed.\n3. Move Category B to the end-of-semester vacation buffer.\n4. Reset your daily streak and restart from today."
  },
  {
    duration: "College Semester Finals (3-4 Weeks)",
    title: "Exam Ramp & GPA Shield",
    rule: "College CGPA (8.0+) is a hard gate for tier-1 semiconductor companies (Intel, Qualcomm, NVIDIA, Synopsys). Zero guilt.",
    action_plan: "1. Shift 90% of study time to college semester preparation.\n2. Keep GATE on a 15-minute formula recall loop.\n3. Japanese: 10 words/day streak saver (takes 7 minutes).\n4. After finals end: Take a 2-day recovery rest, then launch into vacation deep-work mode."
  }
];
