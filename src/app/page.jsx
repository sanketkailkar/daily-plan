"use client"
import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const checklistItems = [
  { id: "wake", icon: "☀️", label: "Wake Up", sub: "500 mL water + sunlight", category: "morning" },
  { id: "breathing", icon: "🌬️", label: "Breathing Routine", sub: "10 min breathwork", category: "morning" },
  { id: "snack_pre_cardio", icon: "🍌", label: "Pre-Cardio Snack", sub: "Banana / dates / apple", category: "food" },
  { id: "cardio", icon: "🏃‍♀️", label: "Morning Cardio", sub: "90 min interval walk/jog", category: "exercise" },
  { id: "breakfast", icon: "🍽️", label: "Breakfast", sub: "High protein meal", category: "food" },
  { id: "preworkout", icon: "☕", label: "Pre-Workout Snack", sub: "Coffee/tea + carbs", category: "food" },
  { id: "gym", icon: "💪", label: "Gym Session", sub: "9:00–10:30 AM", category: "exercise" },
  { id: "postworkout", icon: "🥤", label: "Post-Workout Protein", sub: "Whey / soy / yogurt", category: "food" },
  { id: "midday_snack", icon: "🥗", label: "Midday Protein Snack", sub: "Sprouts / chana / tofu", category: "food" },
  { id: "lunch", icon: "🍛", label: "Lunch", sub: "Balanced macro meal", category: "food" },
  { id: "hydration", icon: "💧", label: "Hydration Goal", sub: "3–3.5 L water", category: "health" },
  { id: "evening_snack", icon: "🥕", label: "Evening Snack", sub: "Makhana / buttermilk / hummus", category: "food" },
  { id: "steps", icon: "👟", label: "Step Goal", sub: "8,000–12,000 steps", category: "exercise" },
  { id: "dinner", icon: "🌙", label: "Dinner", sub: "Light protein meal", category: "food" },
  { id: "supplements", icon: "💊", label: "Supplements", sub: "D3, B12, Iron, Omega-3, Creatine", category: "health" },
  { id: "bedtime_drink", icon: "🍵", label: "Bedtime Drink", sub: "Turmeric milk / chamomile", category: "food" },
  { id: "sleep", icon: "😴", label: "Sleep by 10:30 PM", sub: "7–8 hrs rest", category: "health" },
];

const schedule = [
  { time: "5:00 AM", label: "Wake Up", icon: "☀️", category: "morning", details: ["500 mL water", "Fresh air / sunlight exposure"] },
  { time: "5:05–5:15 AM", label: "Breathing Routine", icon: "🌬️", category: "morning", details: ["Diaphragmatic Breathing — 3 min", "Box Breathing — 2 min", "Anulom Vilom — 3 min", "Thoracic Mobility + Deep Breathing — 2 min"] },
  { time: "5:15–5:25 AM", label: "Pre-Cardio Snack", icon: "🍌", category: "food", options: ["Banana + 5 almonds", "2 dates + 1 tsp peanut butter", "1 apple"] },
  { time: "5:30–7:00 AM", label: "Morning Cardio", icon: "🏃‍♀️", category: "exercise", details: ["10 min brisk walk warm-up", "2 min jog + 3 min walk — repeat 8–10 rounds", "10 min cool-down walk"] },
  { time: "7:00 AM", label: "Breakfast", icon: "🍽️", category: "food", options: ["2 Besan Chilla + 100g Paneer", "Greek Yogurt + Chia Seeds + Fruit", "3 Moong Dal Chilla + Hung Curd"] },
  { time: "8:30 AM", label: "Pre-Workout", icon: "☕", category: "food", options: ["Black Coffee + Banana", "Green Tea + 2 Dates", "Fruit Bowl"] },
  { time: "9:00–10:30 AM", label: "Gym", icon: "💪", category: "exercise", gym: true },
  { time: "10:30 AM", label: "Post-Workout", icon: "🥤", category: "food", options: ["Whey Protein + Fruit", "Soy Protein Smoothie", "Greek Yogurt + Fruit"] },
  { time: "1:00 PM", label: "Midday Protein Snack", icon: "🥗", category: "food", options: ["Sprout Chaat", "Roasted Chana + Buttermilk", "Tofu Salad"] },
  { time: "3:00–5:00 PM", label: "Lunch", icon: "🍛", category: "food", options: ["2 Rotis + Soy Chunk Curry + Salad", "Brown Rice + Rajma + Curd", "Quinoa Khichdi + Paneer Tikka + Vegetables"] },
  { time: "6:30 PM", label: "Evening Snack", icon: "🥕", category: "food", options: ["Roasted Makhana", "Protein Buttermilk", "Hummus + Carrot/Cucumber"] },
  { time: "10:00 PM", label: "Dinner", icon: "🌙", category: "food", options: ["Tofu Stir Fry + Vegetables", "Paneer Bhurji + Salad", "Dal + Vegetables + 1 Roti"] },
  { time: "10:30 PM", label: "Bedtime Drink", icon: "🍵", category: "food", options: ["Turmeric Milk", "Unsweetened Soy Milk", "Chamomile Tea"] },
];

const gymDays = {
  Monday: {
    label: "Lower Body + Glutes", icon: "🦵", color: "#f4a261", exercises: [
      { name: "Barbell / Goblet Squat", sets: "4", reps: "12–15", note: "Focus on depth and glute engagement" },
      { name: "Romanian Deadlift", sets: "3", reps: "12", note: "Slow eccentric, feel the hamstrings stretch" },
      { name: "Hip Thrust (Barbell or Bodyweight)", sets: "4", reps: "15–20", note: "Squeeze at the top for 1 sec" },
      { name: "Sumo Deadlift", sets: "3", reps: "10–12", note: "Wide stance, toes pointed out" },
      { name: "Leg Press", sets: "3", reps: "15", note: "High foot placement for glute focus" },
      { name: "Cable Kickback", sets: "3", reps: "15 each side", note: "Keep core stable" },
      { name: "Calf Raises", sets: "3", reps: "20", note: "Full range of motion" },
    ]
  },
  Tuesday: {
    label: "Upper Body Push", icon: "🏋️", color: "#e63946", exercises: [
      { name: "Incline Dumbbell Press", sets: "4", reps: "10–12", note: "30–45° incline for upper chest" },
      { name: "Flat Bench Press / Machine Press", sets: "3", reps: "10–12", note: "Control the descent" },
      { name: "Overhead Dumbbell Press", sets: "3", reps: "12", note: "Seated or standing" },
      { name: "Lateral Raises", sets: "3", reps: "15", note: "Light weight, strict form" },
      { name: "Cable Chest Fly", sets: "3", reps: "15", note: "Full stretch at the bottom" },
      { name: "Tricep Pushdown (Rope)", sets: "3", reps: "15", note: "Elbows tucked, full extension" },
      { name: "Overhead Tricep Extension", sets: "3", reps: "12", note: "Dumbbell or cable" },
    ]
  },
  Wednesday: {
    label: "Back + Pull", icon: "🔙", color: "#457b9d", exercises: [
      { name: "Lat Pulldown", sets: "4", reps: "12", note: "Wide grip, pull to upper chest" },
      { name: "Seated Cable Row", sets: "3", reps: "12", note: "Retract scapula fully" },
      { name: "Single-Arm Dumbbell Row", sets: "3", reps: "12 each side", note: "Full range, no twisting" },
      { name: "Face Pulls", sets: "3", reps: "15", note: "Great for rear delts and posture" },
      { name: "Assisted Pull-Up / Negative Pull-Up", sets: "3", reps: "8–10", note: "Slow descent = more gains" },
      { name: "Dumbbell Bicep Curl", sets: "3", reps: "12", note: "Alternate or simultaneous" },
      { name: "Hammer Curl", sets: "3", reps: "12", note: "Builds brachialis and forearm" },
    ]
  },
  Thursday: {
    label: "Rest / Active Recovery", icon: "😴", color: "#6b7280", rest: true, exercises: [
      { name: "Light Walk (20–30 min)", sets: "—", reps: "—", note: "Keep it easy, enjoy it" },
      { name: "Full Body Stretching", sets: "—", reps: "10–15 min", note: "Hip flexors, hamstrings, chest" },
      { name: "Foam Rolling", sets: "—", reps: "10 min", note: "Focus on sore muscle groups" },
      { name: "Deep Breathing / Meditation", sets: "—", reps: "10 min", note: "Reduce cortisol, aid recovery" },
    ]
  },
  Friday: {
    label: "Lower Body Strength", icon: "💪", color: "#2a9d8f", exercises: [
      { name: "Conventional Deadlift", sets: "4", reps: "8–10", note: "Heavier than Monday — focus on strength" },
      { name: "Leg Press", sets: "4", reps: "10–12", note: "Quad-focused, moderate foot placement" },
      { name: "Walking Lunges", sets: "3", reps: "12 each leg", note: "Dumbbells or bodyweight" },
      { name: "Leg Curl (Lying or Seated)", sets: "3", reps: "12–15", note: "Slow and controlled" },
      { name: "Bulgarian Split Squat", sets: "3", reps: "10 each leg", note: "Rear foot elevated" },
      { name: "Glute Bridge", sets: "3", reps: "20", note: "Bodyweight or banded" },
      { name: "Seated Calf Raise", sets: "3", reps: "20", note: "Pause at top and bottom" },
    ]
  },
  Saturday: {
    label: "Full Body + Conditioning", icon: "🔥", color: "#f59e0b", exercises: [
      { name: "Kettlebell Swing", sets: "4", reps: "20", note: "Hip hinge power movement" },
      { name: "Push-Up Variations", sets: "3", reps: "15–20", note: "Wide / narrow / diamond" },
      { name: "Dumbbell Squat to Press", sets: "3", reps: "12", note: "Compound — legs + shoulders" },
      { name: "TRX / Inverted Row", sets: "3", reps: "12", note: "Or use a barbell at hip height" },
      { name: "Plank to Shoulder Tap", sets: "3", reps: "20 taps", note: "Core stability + anti-rotation" },
      { name: "Jump Squat / Box Step-Up", sets: "3", reps: "15", note: "Conditioning finisher" },
      { name: "Battle Ropes / Burpees", sets: "3", reps: "30 sec", note: "All-out effort, rest 30 sec" },
    ]
  },
  Sunday: {
    label: "Rest", icon: "🌿", color: "#6b7280", rest: true, exercises: [
      { name: "Complete Rest", sets: "—", reps: "—", note: "Let your body fully recover" },
      { name: "Gentle Yoga (optional)", sets: "—", reps: "20–30 min", note: "Flexibility and mind-body balance" },
      { name: "Weekly Check-In", sets: "—", reps: "—", note: "Weight, waist, hips, progress photos" },
    ]
  },
};

const macros = [
  { label: "Calories", value: "1700–1800", unit: "kcal", color: "#f4a261", pct: 85 },
  { label: "Protein", value: "120–130", unit: "g", color: "#e63946", pct: 90 },
  { label: "Carbs", value: "150–170", unit: "g", color: "#457b9d", pct: 75 },
  { label: "Fat", value: "50–60", unit: "g", color: "#2a9d8f", pct: 55 },
  { label: "Fiber", value: "30–40", unit: "g", color: "#a8dadc", pct: 50 },
];

const hydration = [
  { time: "5:00 AM", amount: "500 mL" },
  { time: "During Cardio", amount: "500 mL" },
  { time: "Morning", amount: "500 mL" },
  { time: "Work Hours", amount: "1–1.2 L" },
  { time: "Evening", amount: "500–700 mL" },
  { time: "Dinner", amount: "300 mL" },
];

const supplements = ["Vitamin D3", "Vitamin B12", "Iron", "Omega-3", "Creatine Monohydrate (3–5 g/day)", "Whey / Soy Isolate"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const catDot = { morning: "#f59e0b", food: "#10b981", exercise: "#ef4444", health: "#a78bfa" };

function toDateKey(date) {
  return date.toISOString().split("T")[0];
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export default function Home() {

  const today = toDateKey(new Date());
  const [tab, setTab] = useState("checklist");
  const [activeDay, setActiveDay] = useState("Monday");
  const [expanded, setExpanded] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);

  // checklist: { "2025-06-01": { wake: true, cardio: false, ... } }
  const [checklist, setChecklist] = useState({});

  // periods: [{ start: "2025-06-01", end: "2025-06-05" }]
  const [periods, setPeriods] = useState([]);
  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");
  const [showPeriodForm, setShowPeriodForm] = useState(false);

  const dateChecks = checklist[selectedDate] || {};
  const checked = checklistItems.filter(i => dateChecks[i.id]).length;
  const total = checklistItems.length;
  const pct = Math.round((checked / total) * 100);

  const toggleCheck = (id) => {
    setChecklist(prev => ({
      ...prev,
      [selectedDate]: { ...(prev[selectedDate] || {}), [id]: !(prev[selectedDate]?.[id]) }
    }));
  };

  // period helpers
  const isPeriodDay = (dateStr) => periods.some(p => dateStr >= p.start && dateStr <= (p.end || p.start));
  const onPeriodDay = isPeriodDay(selectedDate);

  const savePeriod = () => {
    if (!periodStart) return;
    setPeriods(prev => [...prev, { start: periodStart, end: periodEnd || periodStart }]);
    setPeriodStart(""); setPeriodEnd(""); setShowPeriodForm(false);
  };

  // streak calculation
  const getStreak = () => {
    let streak = 0;
    let d = new Date();
    while (true) {
      const key = toDateKey(d);
      const dayChecks = checklist[key] || {};
      const dayPct = checklistItems.filter(i => dayChecks[i.id]).length / total;
      if (dayPct >= 0.5) { streak++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return streak;
  };

  // last 7 days for progress chart
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = toDateKey(d);
    const dayChecks = checklist[key] || {};
    const donePct = Math.round((checklistItems.filter(x => dayChecks[x.id]).length / total) * 100);
    return { key, label: d.toLocaleDateString("en-IN", { weekday: "short" }), pct: donePct };
  });

  const pctColor = pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#e63946";


  return (
    <div style={{ minHeight: "100vh", background: "#0f0f13", fontFamily: "'Georgia','Times New Roman',serif", color: "#f5f0e8", paddingBottom: 60 }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)", padding: "36px 24px 28px", textAlign: "center", borderBottom: "1px solid #ffffff10", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%,#e63946,transparent 60%)", opacity: 0.07 }} />
        <p style={{ margin: "0 0 6px", fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#e63946" }}>Your Daily Blueprint</p>
        <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 400, letterSpacing: 1 }}>Wellness Schedule</h1>
        <p style={{ margin: "0 0 16px", color: "#a09880", fontSize: 12, letterSpacing: 1 }}>73 kg → 55 kg · 0.5–0.8 kg/week</p>
        <div style={{ display: "inline-flex", gap: 14, background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 40, padding: "7px 20px", fontSize: 11, color: "#d4cfc7", flexWrap: "wrap", justifyContent: "center" }}>
          <span>🎯 <strong style={{ color: "#f5f0e8" }}>−18 kg</strong> goal</span>
          <span style={{ color: "#ffffff20" }}>|</span>
          <span>😴 <strong style={{ color: "#f5f0e8" }}>10:30 PM</strong> sleep</span>
          <span style={{ color: "#ffffff20" }}>|</span>
          <span>👟 <strong style={{ color: "#f5f0e8" }}>8–12k</strong> steps</span>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", background: "#17171d", borderBottom: "1px solid #ffffff10", overflowX: "auto" }}>
        {[{ id: "checklist", label: "Checklist" }, { id: "schedule", label: "Schedule" }, { id: "gym", label: "Gym Plan" }, { id: "nutrition", label: "Nutrition" }, { id: "hydration", label: "Hydration" }, { id: "progress", label: "Progress" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "13px 16px", fontSize: 12, letterSpacing: 1, color: tab === t.id ? "#e63946" : "#7a756e", borderBottom: tab === t.id ? "2px solid #e63946" : "2px solid transparent", whiteSpace: "nowrap", fontFamily: "inherit", transition: "color 0.2s" }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px" }}>

        {/* ── CHECKLIST TAB ── */}
        {tab === "checklist" && (
          <div>
            {/* Date picker */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, background: "#17171d", border: "1px solid #ffffff0a", borderRadius: 12, padding: "12px 16px" }}>
              <span style={{ fontSize: 16 }}>📅</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "#7a756e", letterSpacing: 1, marginBottom: 2 }}>SELECTED DATE</div>
                <div style={{ fontSize: 13, color: "#f5f0e8" }}>{formatDate(selectedDate)}{selectedDate === today ? <span style={{ marginLeft: 8, fontSize: 10, color: "#10b981", background: "#10b98120", borderRadius: 10, padding: "2px 8px" }}>TODAY</span> : null}</div>
              </div>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ background: "#ffffff10", border: "1px solid #ffffff20", borderRadius: 8, color: "#f5f0e8", padding: "6px 10px", fontSize: 12, fontFamily: "inherit", cursor: "pointer" }} />
            </div>

            {/* Period indicator */}
            {onPeriodDay && (
              <div style={{ background: "#e6394610", border: "1px solid #e6394940", borderRadius: 10, padding: "10px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20, color: "#e63946" }}>🩸</span>
                <span style={{ fontSize: 13, color: "#e63946" }}>Period day — be kind to yourself today 💕</span>
              </div>
            )}

            {/* Progress ring summary */}
            <div style={{ background: "linear-gradient(135deg,#1e1e28,#1a1a26)", border: `1px solid ${pctColor}30`, borderTop: `3px solid ${pctColor}`, borderRadius: 16, padding: "20px 24px", marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ position: "relative", width: 70, height: 70, flexShrink: 0 }}>
                <svg width="70" height="70" viewBox="0 0 70 70">
                  <circle cx="35" cy="35" r="28" fill="none" stroke="#ffffff08" strokeWidth="7" />
                  <circle cx="35" cy="35" r="28" fill="none" stroke={pctColor} strokeWidth="7" strokeDasharray={`${2 * Math.PI * 28}`} strokeDashoffset={`${2 * Math.PI * 28 * (1 - pct / 100)}`} strokeLinecap="round" transform="rotate(-90 35 35)" style={{ transition: "stroke-dashoffset 0.6s ease" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: pctColor }}>{pct}%</div>
              </div>
              <div>
                <div style={{ fontSize: 18, color: "#f5f0e8", fontWeight: 400 }}>{checked} / {total} done</div>
                <div style={{ fontSize: 12, color: "#7a756e", marginTop: 3 }}>
                  {pct === 100 ? "🎉 Perfect day!" : pct >= 80 ? "Almost there, keep going!" : pct >= 50 ? "Good progress, stay consistent" : "Let's get started!"}
                </div>
                {/* Progress bar */}
                <div style={{ marginTop: 8, height: 5, background: "#ffffff08", borderRadius: 3, width: 200, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pctColor, borderRadius: 3, transition: "width 0.5s ease" }} />
                </div>
              </div>
            </div>

            {/* Periods tracker card */}
            <div style={{ background: "#17171d", border: "1px solid #e6394930", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showPeriodForm ? 14 : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20, color: "#e63946" }}>🩸</span>
                  <div>
                    <div style={{ fontSize: 13, color: "#f5f0e8", fontWeight: 600 }}>Period Tracker</div>
                    <div style={{ fontSize: 11, color: "#7a756e" }}>{periods.length === 0 ? "No cycles logged yet" : `${periods.length} cycle${periods.length > 1 ? "s" : ""} logged`}</div>
                  </div>
                </div>
                <button onClick={() => setShowPeriodForm(v => !v)} style={{ background: "#e6394920", border: "1px solid #e6394940", borderRadius: 8, color: "#e63946", padding: "6px 14px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                  {showPeriodForm ? "Cancel" : "+ Log Cycle"}
                </button>
              </div>

              {showPeriodForm && (
                <div style={{ background: "#e6394608", borderRadius: 10, padding: "14px", border: "1px solid #e6394920" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#7a756e", letterSpacing: 1, marginBottom: 5 }}>START DATE</div>
                      <input type="date" value={periodStart} onChange={e => setPeriodStart(e.target.value)} style={{ width: "100%", background: "#ffffff10", border: "1px solid #e6394940", borderRadius: 7, color: "#f5f0e8", padding: "7px 10px", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#7a756e", letterSpacing: 1, marginBottom: 5 }}>END DATE</div>
                      <input type="date" value={periodEnd} onChange={e => setPeriodEnd(e.target.value)} style={{ width: "100%", background: "#ffffff10", border: "1px solid #e6394940", borderRadius: 7, color: "#f5f0e8", padding: "7px 10px", fontSize: 12, fontFamily: "inherit", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <button onClick={savePeriod} disabled={!periodStart} style={{ width: "100%", background: periodStart ? "#e63946" : "#e6394940", border: "none", borderRadius: 8, color: "#fff", padding: "9px", fontSize: 13, cursor: periodStart ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                    Save Cycle
                  </button>
                </div>
              )}

              {periods.length > 0 && !showPeriodForm && (
                <div style={{ marginTop: 12 }}>
                  {periods.slice().reverse().map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #ffffff06", fontSize: 12, color: "#c8c0b4" }}>
                      <span style={{ color: "#e63946", fontSize: 14 }}>🩸</span>
                      <span>{formatDate(p.start)}</span>
                      <span style={{ color: "#6b6660" }}>→</span>
                      <span>{p.end && p.end !== p.start ? formatDate(p.end) : "Ongoing"}</span>
                      <button onClick={() => setPeriods(prev => prev.filter((_, j) => j !== periods.length - 1 - i))} style={{ marginLeft: "auto", background: "none", border: "none", color: "#6b6660", cursor: "pointer", fontSize: 14 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checklist items */}
            <p style={{ fontSize: 11, color: "#7a756e", letterSpacing: 1, marginBottom: 12 }}>DAILY ACTIVITIES</p>
            {checklistItems.map((item) => {
              const done = !!dateChecks[item.id];
              return (
                <div key={item.id} onClick={() => toggleCheck(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", marginBottom: 6, background: done ? `${catDot[item.category]}10` : "#17171d", border: `1px solid ${done ? catDot[item.category] + "40" : "#ffffff08"}`, borderLeft: `3px solid ${catDot[item.category]}`, borderRadius: "0 10px 10px 0", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? catDot[item.category] : "#ffffff20"}`, background: done ? catDot[item.category] : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {done && <span style={{ fontSize: 12, color: "#fff" }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: done ? "#f5f0e8" : "#a09880", fontWeight: done ? 600 : 400, textDecoration: done ? "none" : "none" }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#6b6660" }}>{item.sub}</div>
                  </div>
                  {done && <span style={{ fontSize: 11, color: catDot[item.category] }}>✔</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* ── SCHEDULE TAB ── */}
        {tab === "schedule" && (
          <div>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              {Object.entries(catDot).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#a09880" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: v }} />
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </div>
              ))}
            </div>
            {schedule.map((item, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <button onClick={() => setExpanded(expanded === i ? null : i)} style={{ width: "100%", background: expanded === i ? "#1e1e28" : "#17171d", border: `1px solid ${expanded === i ? "#ffffff20" : "#ffffff0a"}`, borderLeft: `3px solid ${catDot[item.category]}`, borderRadius: expanded === i ? "10px 10px 0 0" : 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left", color: "#f5f0e8", fontFamily: "inherit" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#6b6660", marginTop: 2 }}>{item.time}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "#6b6660", transform: expanded === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
                </button>
                {expanded === i && (
                  <div style={{ background: "#1e1e28", border: "1px solid #ffffff20", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "14px 16px 16px 52px" }}>
                    {item.gym && (<div><p style={{ margin: "0 0 10px", fontSize: 12, color: "#a09880" }}>TODAY'S WORKOUT</p><div style={{ background: "#e6394615", border: "1px solid #e6394630", borderRadius: 8, padding: "12px 16px", fontSize: 15, color: "#f5f0e8" }}>{gymDays[activeDay]?.icon} {gymDays[activeDay]?.label}</div><p style={{ margin: "10px 0 0", fontSize: 11, color: "#6b6660" }}>Switch day in the Gym Plan tab</p></div>)}
                    {item.details && item.details.map((d, j) => (<div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#c8c0b4" }}><span style={{ color: catDot[item.category], marginTop: 3, flexShrink: 0 }}>•</span>{d}</div>))}
                    {item.options && (<div><p style={{ margin: "0 0 8px", fontSize: 11, color: "#a09880", letterSpacing: 1 }}>CHOOSE ONE</p>{item.options.map((o, j) => (<div key={j} style={{ background: "#ffffff06", borderRadius: 6, padding: "8px 12px", marginBottom: 6, fontSize: 13, color: "#c8c0b4", border: "1px solid #ffffff08" }}><span style={{ color: catDot[item.category], marginRight: 8, fontSize: 10 }}>●</span>{o}</div>))}</div>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── GYM TAB ── */}
        {tab === "gym" && (
          <div>
            <p style={{ fontSize: 12, color: "#7a756e", letterSpacing: 1, marginBottom: 16 }}>SELECT DAY</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 24 }}>
              {days.map(d => (<button key={d} onClick={() => setActiveDay(d)} style={{ background: activeDay === d ? "#e63946" : "#17171d", border: `1px solid ${activeDay === d ? "#e63946" : "#ffffff10"}`, borderRadius: 8, padding: "10px 4px", color: activeDay === d ? "#fff" : "#7a756e", cursor: "pointer", fontSize: 10, fontFamily: "inherit", letterSpacing: 0.5, transition: "all 0.2s" }}>{d.slice(0, 3).toUpperCase()}</button>))}
            </div>
            <div style={{ background: "linear-gradient(135deg,#1e1e28,#1a1a26)", border: `1px solid ${gymDays[activeDay]?.color}40`, borderTop: `3px solid ${gymDays[activeDay]?.color}`, borderRadius: 16, padding: "24px 24px 20px", textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{gymDays[activeDay]?.icon}</div>
              <div style={{ fontSize: 20, color: "#f5f0e8", marginBottom: 4 }}>{gymDays[activeDay]?.label}</div>
              <div style={{ fontSize: 11, color: "#7a756e", letterSpacing: 2 }}>{activeDay.toUpperCase()}</div>
              <div style={{ display: "inline-block", marginTop: 10, background: gymDays[activeDay]?.rest ? "#6b728020" : `${gymDays[activeDay]?.color}20`, border: `1px solid ${gymDays[activeDay]?.rest ? "#6b728040" : gymDays[activeDay]?.color + "40"}`, borderRadius: 20, padding: "4px 14px", fontSize: 11, color: gymDays[activeDay]?.rest ? "#6b7280" : gymDays[activeDay]?.color }}>
                {gymDays[activeDay]?.rest ? "RECOVERY DAY" : `${gymDays[activeDay]?.exercises?.length} EXERCISES`}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, color: "#7a756e", letterSpacing: 1, marginBottom: 12 }}>{gymDays[activeDay]?.rest ? "RECOVERY ACTIVITIES" : "WORKOUT EXERCISES"}</p>
              {gymDays[activeDay]?.exercises?.map((ex, i) => (
                <div key={i} style={{ background: "#17171d", border: "1px solid #ffffff08", borderLeft: `3px solid ${gymDays[activeDay]?.color}`, borderRadius: "0 10px 10px 0", padding: "12px 16px", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: `${gymDays[activeDay]?.color}20`, border: `1px solid ${gymDays[activeDay]?.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: gymDays[activeDay]?.color, fontWeight: 700 }}>{gymDays[activeDay]?.rest ? "•" : i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#f5f0e8", fontWeight: 600, marginBottom: 3 }}>{ex.name}</div>
                    {!gymDays[activeDay]?.rest && (<div style={{ display: "flex", gap: 12, marginBottom: 4 }}><span style={{ fontSize: 11, color: gymDays[activeDay]?.color, background: `${gymDays[activeDay]?.color}15`, borderRadius: 4, padding: "2px 8px" }}>{ex.sets} sets</span><span style={{ fontSize: 11, color: "#a09880", background: "#ffffff08", borderRadius: 4, padding: "2px 8px" }}>{ex.reps} reps</span></div>)}
                    {ex.reps !== "—" && gymDays[activeDay]?.rest && (<div style={{ fontSize: 11, color: "#a09880", background: "#ffffff08", borderRadius: 4, padding: "2px 8px", display: "inline-block", marginBottom: 4 }}>{ex.reps}</div>)}
                    <div style={{ fontSize: 11, color: "#6b6660", fontStyle: "italic" }}>{ex.note}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#17171d", border: "1px solid #ffffff0a", borderRadius: 12, padding: "16px 20px" }}>
              <p style={{ margin: "0 0 12px", fontSize: 11, color: "#7a756e", letterSpacing: 1 }}>FULL WEEK OVERVIEW</p>
              {days.map(d => (<div key={d} onClick={() => setActiveDay(d)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #ffffff06", cursor: "pointer" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: d === activeDay ? gymDays[d]?.color : gymDays[d]?.rest ? "#333" : gymDays[d]?.color + "60" }} />
                <span style={{ width: 90, fontSize: 12, color: d === activeDay ? "#f5f0e8" : "#7a756e" }}>{d}</span>
                <span style={{ fontSize: 13, color: d === activeDay ? gymDays[d]?.color : "#a09880", flex: 1 }}>{gymDays[d]?.icon} {gymDays[d]?.label}</span>
                {!gymDays[d]?.rest && <span style={{ fontSize: 10, color: "#6b6660" }}>{gymDays[d]?.exercises?.length} ex</span>}
              </div>))}
            </div>
          </div>
        )}

        {/* ── NUTRITION TAB ── */}
        {tab === "nutrition" && (
          <div>
            <p style={{ fontSize: 12, color: "#7a756e", letterSpacing: 1, marginBottom: 16 }}>DAILY MACRO TARGETS</p>
            {macros.map((m, i) => (<div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, color: "#c8c0b4" }}>{m.label}</span><span style={{ fontSize: 13, color: "#f5f0e8" }}><strong>{m.value}</strong><span style={{ color: "#7a756e", marginLeft: 4 }}>{m.unit}</span></span></div>
              <div style={{ height: 6, background: "#ffffff08", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${m.pct}%`, background: m.color, borderRadius: 3 }} /></div>
            </div>))}
            <div style={{ background: "#17171d", border: "1px solid #ffffff0a", borderRadius: 12, padding: "18px 20px", marginTop: 24 }}>
              <p style={{ margin: "0 0 14px", fontSize: 11, color: "#7a756e", letterSpacing: 1 }}>SUPPLEMENTS <span style={{ color: "#e63946" }}>(Doctor Guidance Recommended)</span></p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{supplements.map((s, i) => (<div key={i} style={{ background: "#ffffff06", border: "1px solid #ffffff10", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#c8c0b4" }}>{s}</div>))}</div>
            </div>
            <div style={{ background: "linear-gradient(135deg,#0f3460,#16213e)", border: "1px solid #ffffff15", borderRadius: 12, padding: "18px 20px", marginTop: 16 }}>
              <p style={{ margin: "0 0 14px", fontSize: 11, color: "#a09880", letterSpacing: 1 }}>WEEKLY CHECK-IN (EVERY SUNDAY MORNING)</p>
              {["Weight", "Waist Measurement", "Hip Measurement", "Progress Photos"].map((item, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><div style={{ width: 20, height: 20, borderRadius: 4, border: "1px solid #ffffff30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#e6394640" }} /></div><span style={{ fontSize: 13, color: "#c8c0b4" }}>{item}</span></div>))}
            </div>
          </div>
        )}

        {/* ── HYDRATION TAB ── */}
        {tab === "hydration" && (
          <div>
            <div style={{ background: "linear-gradient(135deg,#023e8a15,#0096c715)", border: "1px solid #0096c730", borderRadius: 16, padding: "24px", textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 42, marginBottom: 8 }}>💧</div>
              <div style={{ fontSize: 28, color: "#90e0ef" }}>3–3.5 Liters</div>
              <div style={{ fontSize: 12, color: "#7a756e", letterSpacing: 2, marginTop: 4 }}>DAILY TARGET</div>
            </div>
            {hydration.map((h, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", marginBottom: 8, background: "#17171d", border: "1px solid #ffffff08", borderLeft: "3px solid #0096c7", borderRadius: "0 10px 10px 0" }}>
              <div style={{ fontSize: 13, color: "#c8c0b4" }}>{h.time}</div>
              <div style={{ fontSize: 15, color: "#90e0ef", fontWeight: 600 }}>{h.amount}</div>
            </div>))}
            <div style={{ marginTop: 20, padding: "14px 16px", background: "#0096c710", border: "1px solid #0096c720", borderRadius: 10, fontSize: 12, color: "#7a756e", lineHeight: 1.6 }}>
              💡 Sip consistently throughout the day rather than drinking large amounts at once. Reduce intake 1–2 hours before sleep.
            </div>
          </div>
        )}

        {/* ── PROGRESS TAB ── */}
        {tab === "progress" && (
          <div>
            {/* Streak + overall stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[
                { label: "Streak", value: `${getStreak()}d`, icon: "🔥", color: "#f59e0b" },
                { label: "Today", value: `${pct}%`, icon: "📅", color: pctColor },
                { label: "Cycles", value: periods.length, icon: "🩸", color: "#e63946" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#17171d", border: `1px solid ${s.color}30`, borderTop: `3px solid ${s.color}`, borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, color: s.color, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#7a756e", letterSpacing: 1, marginTop: 2 }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* Last 7 days bar chart */}
            <div style={{ background: "#17171d", border: "1px solid #ffffff0a", borderRadius: 14, padding: "18px 16px", marginBottom: 20 }}>
              <p style={{ margin: "0 0 16px", fontSize: 11, color: "#7a756e", letterSpacing: 1 }}>LAST 7 DAYS COMPLETION</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
                {last7.map((d, i) => {
                  const barColor = d.pct >= 80 ? "#10b981" : d.pct >= 50 ? "#f59e0b" : d.pct > 0 ? "#e63946" : "#ffffff10";
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 9, color: barColor }}>{d.pct > 0 ? `${d.pct}%` : ""}</div>
                      <div style={{ width: "100%", background: "#ffffff08", borderRadius: "4px 4px 0 0", height: 70, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
                        <div style={{ width: "100%", height: `${d.pct}%`, background: barColor, borderRadius: "3px 3px 0 0", transition: "height 0.5s ease", minHeight: d.pct > 0 ? 3 : 0 }} />
                      </div>
                      <div style={{ fontSize: 9, color: d.key === today ? "#f5f0e8" : "#6b6660", fontWeight: d.key === today ? 700 : 400 }}>{d.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Per-item breakdown for selected date */}
            <div style={{ background: "#17171d", border: "1px solid #ffffff0a", borderRadius: 14, padding: "16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{ margin: 0, fontSize: 11, color: "#7a756e", letterSpacing: 1 }}>ACTIVITY BREAKDOWN</p>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ background: "#ffffff08", border: "1px solid #ffffff15", borderRadius: 7, color: "#a09880", padding: "4px 8px", fontSize: 11, fontFamily: "inherit" }} />
              </div>
              <div style={{ fontSize: 12, color: "#7a756e", marginBottom: 12 }}>{formatDate(selectedDate)}</div>
              {/* Category breakdown bars */}
              {Object.entries(catDot).map(([cat, color]) => {
                const catItems = checklistItems.filter(i => i.category === cat);
                const catDone = catItems.filter(i => dateChecks[i.id]).length;
                const catPct = Math.round((catDone / catItems.length) * 100);
                return (
                  <div key={cat} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "#c8c0b4", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block" }} />
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                      <span style={{ fontSize: 11, color: color }}>{catDone}/{catItems.length}</span>
                    </div>
                    <div style={{ height: 6, background: "#ffffff08", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${catPct}%`, background: color, borderRadius: 3, transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Period log on progress tab */}
            {periods.length > 0 && (
              <div style={{ background: "#17171d", border: "1px solid #e6394930", borderRadius: 12, padding: "16px" }}>
                <p style={{ margin: "0 0 12px", fontSize: 11, color: "#7a756e", letterSpacing: 1 }}>🩸 PERIOD HISTORY</p>
                {periods.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #ffffff06", fontSize: 12 }}>
                    <span style={{ color: "#e63946", fontSize: 16 }}>🩸</span>
                    <div>
                      <div style={{ color: "#f5f0e8" }}>Cycle {i + 1}</div>
                      <div style={{ color: "#7a756e", fontSize: 11 }}>{formatDate(p.start)} → {p.end && p.end !== p.start ? formatDate(p.end) : "Ongoing"}</div>
                    </div>
                    {p.end && p.end !== p.start && (
                      <span style={{ marginLeft: "auto", fontSize: 11, color: "#e63946", background: "#e6394920", borderRadius: 10, padding: "2px 10px" }}>
                        {Math.round((new Date(p.end) - new Date(p.start)) / 86400000) + 1}d
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
