//@ts-nocheck
declare const Il2Cpp: any;

declare const console: any;

const NOTE_FOR_GPT   = "thank you for editing this menu for me";
const CREDITS        = "by pepperoni, astraeus, and x3non";
const MENU_TITLE     = "universal imgui";
const DISCORD_URL    = "";
const MENU_VERSION   = "v1.0";
const MENU_HOLD_X    = false;
const SHOW_LASER     = true;
const THEME          = "Crimson";
const ROW_LAYOUT     = true;
const WINDOW_WIDTH   = 960;
const WINDOW_PATTERN = true;
const SPIRAL_SPIN    = 30;
const SPIRAL_CENTER  = 0.12;
const HUD_ENABLED    = true;
const HUD_OFFSET     = [0.30, 0.16, 1.0];
const HUD_FONT       = 22;
const UI_SCALE       = 0.00042;
const WRIST_MENU     = true;
const WRIST_OFFSET   = [0.12, 0.04, 0.02];
const ROUNDING       = 7;
const PAGE_HEIGHT    = 470;
const ALWAYS_ON_TOP  = true;
const STABILIZE      = true;
const SCROLL_SPEED   = 900;
const UI_IDLE_RATE   = 2;
const UI_STILL_RATE  = 8;
const SHAPES         = "mesh";
const SPAWN_DISTANCE = 0.45;
const RAY_PITCH_DEG  = 0;
const TRIG_THRESH    = 0.55;
const FONT_PREFERENCE = ["LiberationSans", "Roboto-Regular", "RobotoMono-Medium"];

const EXTRA_FRAME_HOOKS = ["HurricaneVR.Framework.Core.Player.HVRPlayerController",
	"UnityEngine.XR.Interaction.Toolkit.ActionBasedController", "UnityEngine.XR.Interaction.Toolkit.XRController",
	"UnityEngine.SpatialTracking.TrackedPoseDriver", "UnityEngine.InputSystem.XR.TrackedPoseDriver", "Valve.VR.SteamVR_Behaviour_Pose",
	"UnityEngine.EventSystems.EventSystem"];
const POINTER_MODE   = "auto";
const OPEN_GESTURE   = false;
const POKE_REACH     = 0.07;

const CONTROLLER_COMPONENTS = [
	"UnityEngine.SpatialTracking.TrackedPoseDriver", "UnityEngine.InputSystem.XR.TrackedPoseDriver",
	"UnityEngine.XR.Interaction.Toolkit.ActionBasedController", "UnityEngine.XR.Interaction.Toolkit.XRController",
	"HurricaneVR.Framework.Core.Grabbers.HVRHandGrabber", "Valve.VR.SteamVR_Behaviour_Pose", "Autohand.Hand", "OVRGrabber",
];

const PLAYER_CLASS_CANDIDATES = ["Player", "GorillaLocomotion.Player"];
const PLAYER_HOOK_METHODS     = ["LateUpdate", "Update"];
const HAND_MEMBERS: [string, string][] = [
	["get_leftHandAnchor", "get_rightHandAnchor"],
	["leftHandTransform", "rightHandTransform"],
	["get_LeftHand", "get_RightHand"],
	["leftControllerTransform", "rightControllerTransform"],
];

function ref<T>(v: T): { v: T } { return { v }; }

const S = {
	exampleToggle: ref(false),
	speed:         ref(1.0),
	count:         ref(3),
	mode:          ref(0),
};
const MODES = ["Normal", "Fast", "Chaos"];

function onUpdate(): void {
	if (S.exampleToggle.v) {
	}
}

function drawMenu(ui: any): void {
	if (ui.begin(MENU_TITLE)) {
		ui.beginTabBar("tabs");
		if (ui.tabItem("Main")) {
			if (ui.checkbox("Example Toggle", S.exampleToggle, "Description shows next to the tick"))
				ui.notify("Example Toggle " + (S.exampleToggle.v ? "on" : "off"));
			ui.sliderFloat("Speed", S.speed, 0, 10);
			ui.sliderInt("Count", S.count, 1, 10);
			ui.combo("Mode", S.mode, MODES);
			if (ui.button("Example Action")) ui.notify("Example Action ran");
			ui.sameLine();
			if (ui.button("Another")) console.log("[menu] another");
		}
		if (ui.tabItem("Extras")) {
			if (ui.collapsingHeader("More", true)) {
				ui.textColored([1, 0.8, 0.3, 1], "Collapsing headers nest content");
				ui.progressBar(S.speed.v / 10, "speed " + S.speed.v.toFixed(1));
			}
			ui.text("Add as many tabs as you like - the strip splits the width evenly.");
		}
		if (ui.tabItem("Fun")) ui.fun();
		if (ui.tabItem("Plugins")) ui.pluginsTab();
		if (ui.tabItem("Info")) ui.info();
		if (ui.tabItem("Debug")) ui.debug();
		if (ui.tabItem("Settings")) ui.settings();
		ui.endTabBar();
	}
	ui.end();
}

function drawHud(hud: any): void {
	hud.line(hud.app);
	hud.line("FPS: " + hud.col(hud.fps.toFixed(0), hud.fps >= 65 ? hud.GOOD : hud.fps >= 45 ? hud.WARN : hud.BAD));
	if (hud.battery >= 0) {
		const pct = Math.round(hud.battery * 100);
		hud.line("BAT: " + hud.col(pct + "%", pct > 40 ? hud.GOOD : pct > 15 ? hud.WARN : hud.BAD));
	}
	hud.line(hud.session());
}

console.log("[imgui] loading");

Il2Cpp.perform(() => {
	const log = (m: string) => console.log("[imgui] " + m);
	const _errs = new Set<string>();
	function errOnce(tag: string, e: any) {
		const k = tag + ": " + e;
		if (!_errs.has(k)) { _errs.add(k); log(k); }
	}

	try {

	let _excHook: any = null;
	(globalThis as any).rrexc = (on: boolean = true) => {
		if (!on) { if (_excHook) { _excHook.detach(); _excHook = null; } return false; }
		if (_excHook) return true;
		try {
			const cxa = Il2Cpp.module.findExportByName("__cxa_throw") ?? Module.findGlobalExportByName("__cxa_throw");
			if (cxa) _excHook = Interceptor.attach(cxa, function (args: any) {
				try {
					const ex = new Il2Cpp.Object(args[0].readPointer());
					let msg = "";
					try { const f = ex.tryField("_message"); msg = f?.value?.content ?? ""; } catch {}
					log("C# exception: " + ex.class.name + (msg ? ": " + msg : ""));
				} catch {}
			});
		} catch (e) { log("rrexc: " + e); }
		return !!_excHook;
	};

	function needAsm(name: string): any {
		const a = Il2Cpp.domain.tryAssembly(name);
		if (!a) throw new Error("[imgui] LOAD FAILED: assembly " + name + " not in this game");
		return a.image;
	}
	function need(img: any, name: string): any {
		const k = img.tryClass(name);
		if (!k) throw new Error("[imgui] LOAD FAILED: class " + name + " not in " + img.name + " (stripped?)");
		return k;
	}
	const asmCS   = Il2Cpp.domain.tryAssembly("Assembly-CSharp")?.image ?? null;
	const asmCore = needAsm("UnityEngine.CoreModule");
	const asmPhys = Il2Cpp.domain.tryAssembly("UnityEngine.PhysicsModule")?.image ?? null;
	const asmUIM  = needAsm("UnityEngine.UIModule");
	const asmUI   = needAsm("UnityEngine.UI");
	const asmText = needAsm("UnityEngine.TextRenderingModule");
	const asmNet  = Il2Cpp.domain.tryAssembly("UnityEngine.UnityWebRequestModule")?.image ?? null;

	const GameObject   = need(asmCore, "UnityEngine.GameObject");
	const UEObject     = need(asmCore, "UnityEngine.Object");
	const Vector3      = need(asmCore, "UnityEngine.Vector3");
	const Vector2      = need(asmCore, "UnityEngine.Vector2");
	const Quaternion   = need(asmCore, "UnityEngine.Quaternion");
	const ColorCls     = need(asmCore, "UnityEngine.Color");
	const Renderer     = need(asmCore, "UnityEngine.Renderer");
	const Shader       = need(asmCore, "UnityEngine.Shader");
	const Resources    = need(asmCore, "UnityEngine.Resources");
	const Collider     = asmPhys ? asmPhys.tryClass("UnityEngine.Collider") : null;
	const TransformCls = need(asmCore, "UnityEngine.Transform");
	const Canvas       = need(asmUIM,  "UnityEngine.Canvas");
	const CanvasScaler = need(asmUI,   "UnityEngine.UI.CanvasScaler");
	const UIText       = need(asmUI,   "UnityEngine.UI.Text");
	const Font         = need(asmText, "UnityEngine.Font");
	const Camera       = asmCore.tryClass("UnityEngine.Camera");
	const TimeCls      = asmCore.tryClass("UnityEngine.Time");
	const PhysicsCls   = asmPhys ? asmPhys.tryClass("UnityEngine.Physics") : null;
	const RigidbodyCls = asmPhys ? asmPhys.tryClass("UnityEngine.Rigidbody") : null;
	const TouchKeyboard = asmCore.tryClass("UnityEngine.TouchScreenKeyboard");
	const UnityWebRequest = asmNet ? asmNet.tryClass("UnityEngine.Networking.UnityWebRequest") : null;

	function hookMethodOf(k: any): any {
		for (const n of PLAYER_HOOK_METHODS) { const m = k.tryMethod(n, 0); if (m) return m; }
		return null;
	}
	function findClassAnywhere(name: string): any {
		const k = asmCS ? asmCS.tryClass(name) : null;
		if (k) return k;
		for (const a of Il2Cpp.domain.assemblies) {
			try { const c = a.image.tryClass(name); if (c) return c; } catch {}
		}
		return null;
	}
	const _SKIP_ASM = /^(mscorlib|netstandard|System|Mono\.|UnityEngine|Unity\.|Newtonsoft)/;
	(globalThis as any).rrfind = (pattern: string = "player|rig|locomotion|avatar|character", max: number = 40) => {
		const re = new RegExp(pattern, "i");
		let n = 0;
		for (const a of Il2Cpp.domain.assemblies) {
			if (_SKIP_ASM.test(a.name)) continue;
			let classes: any[] = [];
			try { classes = a.image.classes; } catch { continue; }
			for (const k of classes) {
				try {
					if (k.name.includes("<") || !re.test(k.name)) continue;
					const upd = PLAYER_HOOK_METHODS.filter(m => { try { return !!k.tryMethod(m, 0); } catch { return false; } });
					const hands: string[] = [];
					try { for (const f of k.fields) if (!f.isStatic && /hand|controller|anchor|eye|head/i.test(f.name)) hands.push(f.name); } catch {}
					try { for (const m of k.methods) if (/^get_.*(hand|controller|anchor|eye|head)/i.test(m.name)) hands.push(m.name); } catch {}
					console.log("  " + a.name + " :: " + k.type.name + "  [" + upd.join("/") + "]" + (hands.length ? "  " + hands.slice(0, 6).join(", ") : ""));
					if (++n >= max) return n + " shown";
				} catch {}
			}
		}
		return n + " found";
	};

	let PlayerCls: any = null;
	for (const n of PLAYER_CLASS_CANDIDATES) {
		const k = findClassAnywhere(n);
		if (k && hookMethodOf(k)) { PlayerCls = k; break; }
	}

	function M(o: any, name: string, argc: number): any {
		const cache = o.__m ?? (o.__m = Object.create(null));
		const key = name + "#" + argc;
		let m = cache[key];
		if (m === undefined) {
			try { m = o.method(name, argc); m.__fails = 0; } catch (e) { errOnce(name, e); m = null; }
			cache[key] = m;
		}
		return m;
	}
	const paused = (m: any) => !!m.__until && Date.now() < m.__until;
	function call(obj: any, name: string, ...args: any[]): any {
		const m = obj ? M(obj, name, args.length) : null;
		if (!m || paused(m)) return null;
		try { const r = m.invoke(...args); m.__fails = 0; return r; }
		catch (e) {
			errOnce(name, e);
			if (++m.__fails >= 3) {
				m.__fails = 0; m.__until = Date.now() + 3000;
				if (!m.__warned) { m.__warned = true; log(name + " keeps failing (scene change?) - pausing it 3s at a time"); }
			}
			return null;
		}
	}
	function get3(t: any, name: string): number[] | null {
		const m = t ? M(t, name, 0) : null;
		if (!m || paused(m)) return null;
		try { return xyz(m.invoke()); } catch { return null; }
	}
	function keep<T>(o: T): T { try { (o as any).ref(false); } catch {} return o; }
	function protectAsset<T>(o: T): T {
		try { (o as any).method("set_hideFlags", 1).invoke(61); } catch {}
		try { persist(o); } catch {}
		return keep(o);
	}
	let cachedPtrOff = -2;
	function alive(o: any): boolean {
		if (!o) return false;
		try { if (o.isNull()) return false; } catch { return false; }
		if (cachedPtrOff === -2) { try { cachedPtrOff = UEObject.field("m_CachedPtr").offset; } catch { cachedPtrOff = -1; } }
		if (cachedPtrOff < 0) return true;
		try { return !o.handle.add(cachedPtrOff).readPointer().isNull(); } catch { return false; }
	}
	const ddolM = UEObject.tryMethod("DontDestroyOnLoad", 1);
	function persist(go: any) { if (ddolM && go) { try { ddolM.invoke(go); } catch (e) { errOnce("DontDestroyOnLoad", e); } } }
	function destroy(o: any) { try { if (o && !o.isNull()) UEObject.method("Destroy", 1).invoke(o); } catch {} }

	function vt(klass: any, floats: number[]): any {
		const p = Memory.alloc(floats.length * 4);
		for (let i = 0; i < floats.length; i++) p.add(i * 4).writeFloat(floats[i]);
		return new Il2Cpp.ValueType(p, klass.type);
	}
	let structArrays = false, structProbed = false;
	const v3  = (x: number, y: number, z: number): any => structArrays ? [x, y, z] : vt(Vector3, [x, y, z]);
	const v2  = (x: number, y: number): any => structArrays ? [x, y] : vt(Vector2, [x, y]);
	const qt  = (q: number[]): any => structArrays ? q : vt(Quaternion, q);
	const col = (c: number[]): any => structArrays ? c : vt(ColorCls, c);
	function probeStructArrays(t: any) {
		if (structProbed) return;
		structProbed = true;
		try {
			const set = M(t, "set_localPosition", 1), get = M(t, "get_localPosition", 0);
			if (set && get) {
				set.invoke([1.25, -2.5, 3.75]);
				const r = xyz(get.invoke());
				structArrays = Math.abs(r[0] - 1.25) < 1e-4 && Math.abs(r[1] + 2.5) < 1e-4 && Math.abs(r[2] - 3.75) < 1e-4;
			}
		} catch { structArrays = false; }
		try { M(t, "set_localPosition", 1).invoke(v3(0, 0, 0)); } catch {}
		log("struct arguments: " + (structArrays ? "plain arrays (fast path)" : "ValueType"));
	}
	function xyz(v: any): number[] {
		return [v.handle.readFloat(), v.handle.add(4).readFloat(), v.handle.add(8).readFloat()];
	}

	function bindTo(m: any, obj: any): any {
		if (typeof m.bind === "function") return m.bind(obj);
		if (typeof m.withHolder === "function") return m.withHolder(obj);
		return null;
	}
	function typedOverload(klass: any, name: string): any {
		for (const m of klass.methods)
			if (m.name === name && m.parameterCount === 1 && m.parameters[0].type.name === "System.Type") return m;
		return null;
	}
	const _compStrategy: { [k: string]: number } = {};
	function componentCall(name: string, go: any, klass: any): any {
		const strategies: (() => any)[] = [
			() => { const m = go.method(name, 1); if (m.parameters[0].type.name !== "System.Type") throw 0; return m.invoke(klass.type.object); },
			() => { const b = bindTo(typedOverload(GameObject, name), go); if (!b) throw 0; return b.invoke(klass.type.object); },
			() => go.method(name, 0).inflate(klass).invoke(),
		];
		const known = _compStrategy[name];
		if (known !== undefined) {
			try { return strategies[known](); } catch (e) { errOnce(name + "(" + klass.name + ")", e); return null; }
		}
		for (let i = 0; i < strategies.length; i++) {
			try { const r = strategies[i](); if (r && !r.isNull()) { _compStrategy[name] = i; return r; } } catch {}
		}
		errOnce(name, "no calling style worked for " + klass.name);
		return null;
	}
	const getComp = (go: any, k: any) => componentCall("GetComponent", go, k);
	const addComp = (go: any, k: any) => componentCall("AddComponent", go, k);

	function newGO(name: string): any {
		try {
			const go = GameObject.new();
			try { go.method("set_name", 1).invoke(Il2Cpp.string(name)); } catch {}
			return keep(go);
		} catch (e) { errOnce("GameObject.new", e); }
		const go = GameObject.method("CreatePrimitive", 1).invoke(3);
		const r = getComp(go, Renderer); if (r) call(r, "set_enabled", false);
		if (Collider) destroy(getComp(go, Collider));
		return keep(go);
	}

	let menuShader: any = null, menuShaderName = "";
	let font: any = null;
	let fontVer = 0;
	let loadedFonts: { name: string; font: any }[] = [];
	let resReady = false;
	function initResources() {
		if (resReady) return;
		resReady = true;
		for (const sn of ["UI/Default", "Sprites/Default", "Hidden/Internal-Colored", "Unlit/Transparent", "Unlit/Color", "UI/Default Font", "GUI/Text Shader"]) {
			try { const s = Shader.method("Find").invoke(Il2Cpp.string(sn)); if (s && !s.isNull()) { menuShader = keep(s); menuShaderName = sn; log("shader: " + sn); break; } } catch {}
		}
		if (!menuShader) log("no unlit shader found - panels may render pink");
		try {
			const findAll = Resources.tryMethod ? Resources.tryMethod("FindObjectsOfTypeAll", 1) : null;
			if (findAll) {
				const arr = findAll.inflate ? findAll.inflate(Font).invoke() : findAll.invoke(Font.type.object);
				const n2 = arr ? arr.length : 0;
				for (let i = 0; i < n2; i++) {
					try {
						const f = arr.get(i);
						if (!f || f.isNull()) continue;
						const nm = String(f.method("get_name").invoke().content);
						if (!loadedFonts.some(x => x.name === nm)) loadedFonts.push({ name: nm, font: keep(f) });
					} catch {}
				}
			}
		} catch (e) { errOnce("font scan", e); }
		for (const pref of FONT_PREFERENCE) {
			const f = loadedFonts.find(x => x.name.toLowerCase() === pref.toLowerCase());
			if (f) { font = f.font; log("font: " + f.name); break; }
		}
		if (!font) for (const b of ["LegacyRuntime.ttf", "Arial.ttf"]) {
			try {
				const f = Resources.method("GetBuiltinResource", 1).inflate(Font).invoke(Il2Cpp.string(b));
				if (f && !f.isNull()) { font = keep(f); log("font: builtin " + b); break; }
			} catch {}
		}
		if (!font && loadedFonts.length) { font = loadedFonts[0].font; log("font: " + loadedFonts[0].name); }
		if (!font) log("no font found - text won't render");
		fontVer++;
		try { appId = String(need(asmCore, "UnityEngine.Application").method("get_identifier").invoke().content); } catch { appId = "unknown app"; }
	}
	let appId = "";
	const SystemInfo = asmCore.tryClass("UnityEngine.SystemInfo");
	const batteryM = SystemInfo ? SystemInfo.tryMethod("get_batteryLevel", 0) : null;
	const OutlineCls = asmUI.tryClass("UnityEngine.UI.Outline");

	const ovr = { btn: null as any, one: 1, axis: null as any, index: 1, L: 1, R: 2, stick: null as any, thumb: 1 };
	function enumVal(cls: any, name: string, fb: number): number {
		try { const n = Number(cls.field(name).value); if (!isNaN(n)) return n; } catch {}
		return fb;
	}
	try {
		const OVRIn = findClassAnywhere("OVRInput");
		if (OVRIn) for (const m of OVRIn.methods) {
			if (m.name !== "Get" || m.parameterCount !== 2) continue;
			const t0: string = m.parameters[0].type.name;
			if (/(^|[.+\/])Button$/.test(t0) && !ovr.btn) {
				ovr.btn = m;
				ovr.one = enumVal(m.parameters[0].type.class, "One", 1);
				ovr.L   = enumVal(m.parameters[1].type.class, "LTouch", 1);
				ovr.R   = enumVal(m.parameters[1].type.class, "RTouch", 2);
			} else if (/(^|[.+\/])Axis2D$/.test(t0) && !ovr.stick) {
				ovr.stick = m;
				ovr.thumb = enumVal(m.parameters[0].type.class, "PrimaryThumbstick", 1);
			} else if (/(^|[.+\/])Axis1D$/.test(t0) && !ovr.axis) {
				ovr.axis  = m;
				ovr.index = enumVal(m.parameters[0].type.class, "PrimaryIndexTrigger", 1);
			}
		}
	} catch (e) { log("OVRInput setup err: " + e); }
	const ovrFails: { [k: string]: number } = { btn: 0, stick: 0, axis: 0 };
	function ovrFailed(k: "btn" | "stick" | "axis", e: any) {
		errOnce("OVRInput " + k, e);
		if (++ovrFails[k] >= 3) { (ovr as any)[k] = null; log("OVRInput " + k + " stopped answering - using the other inputs"); }
	}
	function ovrX(): boolean {
		if (!ovr.btn) return false;
		try { const v = !!ovr.btn.invoke(ovr.one, ovr.L); ovrFails.btn = 0; return v; } catch (e) { ovrFailed("btn", e); return false; }
	}
	function ovrRightStickY(): number {
		if (!ovr.stick) return 0;
		try { const v = ovr.stick.invoke(ovr.thumb, ovr.R); ovrFails.stick = 0; return v.handle.add(4).readFloat(); } catch (e) { ovrFailed("stick", e); return 0; }
	}
	function ovrRightTrigger(): number {
		if (!ovr.axis) return 0;
		try { const v = ovr.axis.invoke(ovr.index, ovr.R) as number; ovrFails.axis = 0; return v; } catch (e) { ovrFailed("axis", e); return 0; }
	}

	function asTransform(o: any): any {
		if (!o || o.isNull()) return null;
		return o.class.name === "Transform" ? o : o.method("get_transform", 0).invoke();
	}
	function readMember(obj: any, n: string): any {
		return n.startsWith("get_") ? obj.method(n, 0).invoke() : obj.field(n).value;
	}
	function staticTypeOverload(klass: any, name: string): any {
		for (const m of klass.methods)
			if (m.name === name && m.parameterCount === 1 && m.parameters[0].type.name === "System.Type") return m;
		return null;
	}
	const findOneM = staticTypeOverload(UEObject, "FindObjectOfType");
	const findAllM = staticTypeOverload(UEObject, "FindObjectsOfType");
	function objectsOf(klass: any): any[] {
		if (!findAllM || !klass) return [];
		try {
			const arr = findAllM.invoke(klass.type.object), out: any[] = [];
			for (let i = 0; i < arr.length; i++) { const o = arr.get(i); if (o && !o.isNull()) out.push(o); }
			return out;
		} catch (e) { errOnce("FindObjectsOfType", e); return []; }
	}
	function objectOf(klass: any): any {
		if (!klass) return null;
		if (findOneM) { try { const o = findOneM.invoke(klass.type.object); if (o && !o.isNull()) return o; } catch {} }
		return objectsOf(klass)[0] ?? null;
	}
	const nameOf = (o: any): string => { try { return String(o.method("get_name", 0).invoke().content); } catch { return ""; } };
	const posOf = (t: any): number[] | null => get3(t, "get_position");

	const OVRRigCls = findClassAnywhere("OVRCameraRig");
	const controllerClasses = CONTROLLER_COMPONENTS.map(findClassAnywhere).filter(k => !!k);
	const rig = { head: null as any, left: null as any, right: null as any, headSrc: "", handSrc: "", nextScan: 0 };
	let leftT: any = null, rightT: any = null;

	function sideOf(name: string): number {
		const n = name.toLowerCase();
		if (/left/.test(n) || /(^|[^a-z])l([^a-z]|$)/.test(n)) return -1;
		if (/right/.test(n) || /(^|[^a-z])r([^a-z]|$)/.test(n)) return 1;
		return 0;
	}
	function pairFrom(cands: { t: any; name: string; score: number }[], head: number[] | null, headRight: number[] | null): any[] | null {
		let best: any[] = [null, null], bestScore = [-1e9, -1e9];
		for (const c of cands) {
			const p = posOf(c.t);
			if (!p) continue;
			let side = sideOf(c.name), score = c.score;
			if (head) {
				const d = Math.hypot(p[0] - head[0], p[1] - head[1], p[2] - head[2]);
				if (d < 0.05 || d > 1.6) continue;
				score -= d;
				if (!side && headRight) side = ((p[0] - head[0]) * headRight[0] + (p[2] - head[2]) * headRight[2]) > 0 ? 1 : -1;
			}
			if (!side) continue;
			const i = side < 0 ? 0 : 1;
			if (score > bestScore[i]) { bestScore[i] = score; best[i] = c.t; }
		}
		return best[0] && best[1] && !best[0].handle.equals(best[1].handle) ? best : null;
	}
	function findHead(): any {
		if (OVRRigCls) {
			const inst = objectOf(OVRRigCls);
			if (inst) for (const n of ["get_centerEyeAnchor", "centerEyeAnchor"]) {
				try { const t = asTransform(readMember(inst, n)); if (t) { rig.headSrc = "OVRCameraRig"; return t; } } catch {}
			}
		}
		if (Camera) {
			try { const c = Camera.method("get_main", 0).invoke(); if (c && !c.isNull()) { rig.headSrc = "Camera.main"; return c.method("get_transform", 0).invoke(); } } catch {}
			const cams = objectsOf(Camera);
			const named = cams.find(c => /eye|head|center|main|player/i.test(nameOf(c))) ?? cams[0];
			if (named) { rig.headSrc = "camera '" + nameOf(named) + "'"; return named.method("get_transform", 0).invoke(); }
		}
		return null;
	}
	function findHands(head: any): any[] | null {
		const hp = head ? posOf(head) : null;
		let hr: number[] | null = null;
		try { if (head) hr = xyz(head.method("get_right", 0).invoke()); } catch {}
		if (OVRRigCls) {
			const inst = objectOf(OVRRigCls);
			if (inst) for (const [l, r] of [["get_leftHandAnchor", "get_rightHandAnchor"], ["leftHandAnchor", "rightHandAnchor"]]) {
				try {
					const lt = asTransform(readMember(inst, l)), rt = asTransform(readMember(inst, r));
					if (lt && rt) { rig.handSrc = "OVRCameraRig anchors"; return [lt, rt]; }
				} catch {}
			}
		}
		for (const k of controllerClasses) {
			const cands = objectsOf(k).filter(o => !isRemote(o)).map(o => { try { const t = asTransform(o); return { t, name: nameOf(t), score: 5 }; } catch { return null; } })
				.filter(c => !!c) as { t: any; name: string; score: number }[];
			const pair = pairFrom(cands, hp, hr);
			if (pair) { rig.handSrc = k.name + " components"; return pair; }
		}
		if (PlayerCls) {
			const inst = objectOf(PlayerCls);
			if (inst) for (const [l, r] of HAND_MEMBERS) {
				try {
					const lt = asTransform(readMember(inst, l)), rt = asTransform(readMember(inst, r));
					if (lt && rt) { rig.handSrc = PlayerCls.name + "." + l.replace(/^get_/, ""); return [lt, rt]; }
				} catch {}
			}
		}
		const want = /(hand|controller|anchor|palm|wrist)/i, skip = /(bone|finger|thumb|index|middle|ring|pinky|mesh|model|visual|render|collider|ik|target|ui|canvas|grab|offset|attach|hint|pole|joint|tip|ray|line|pointer)/i;
		const cands: { t: any; name: string; score: number }[] = [];
		let pool: any[] = [];
		const rigRoot = head ? call(head, "get_root") : null;
		if (rigRoot && !rigRoot.isNull()) pool = childTransforms(rigRoot);
		if (!pool.length) pool = objectsOf(TransformCls).slice(0, 4000);
		for (const t of pool) {
			const name = nameOf(t);
			if (!name || !want.test(name) || skip.test(name)) continue;
			const score = (/controller/i.test(name) ? 5 : 0) + (/\b(left|right|l_|r_)/i.test(name) ? 3 : 0)
				+ (/hand/i.test(name) ? 2 : 0) + (/palm|wrist/i.test(name) ? 2 : 0) + (/anchor/i.test(name) ? 1 : 0);
			cands.push({ t, name, score });
		}
		const pair = pairFrom(cands, hp, hr);
		if (pair) { rig.handSrc = "name scan (" + nameOf(pair[0]) + " / " + nameOf(pair[1]) + ")"; return pair; }
		return null;
	}
	function isRemote(o: any): boolean {
		try { if (o.method("get_IsMine", 0).invoke() === false) return true; } catch {}
		try { if (o.field("IsMine").value === false) return true; } catch {}
		return false;
	}
	function childTransforms(root: any): any[] {
		const collect = (arr: any): any[] => {
			const out: any[] = [];
			try { const n = arr ? arr.length : 0; for (let i = 0; i < n && i < 3000; i++) { const t = arr.get(i); if (t && !t.isNull()) out.push(t); } } catch {}
			return out;
		};
		try { const m = TransformCls.method("GetComponentsInChildren", 2); const b = bindTo(m, root); if (b) { const r = collect(b.invoke(TransformCls.type.object, true)); if (r.length) return r; } } catch {}
		try { const g = TransformCls.method("GetComponentsInChildren", 1); if (g && g.inflate) { const b = bindTo(g.inflate(TransformCls), root); if (b) { const r = collect(b.invoke(true)); if (r.length) return r; } } } catch {}
		try { const g = TransformCls.method("GetComponentsInChildren", 0); if (g && g.inflate) { const b = bindTo(g.inflate(TransformCls), root); if (b) { const r = collect(b.invoke()); if (r.length) return r; } } } catch {}
		try { const m = TransformCls.method("GetComponentsInChildren", 1); const b = bindTo(m, root); if (b) { const r = collect(b.invoke(TransformCls.type.object)); if (r.length) return r; } } catch {}
		return [];
	}

	const HVRInputsCls = findClassAnywhere("HurricaneVR.Framework.ControllerInput.HVRPlayerInputs");
	const hvr = { inputs: null as any, left: null as any, right: null as any, next: 0, off: {} as { [k: string]: number } };
	function hvrReady(): boolean {
		if (!HVRInputsCls) return false;
		if (hvr.inputs && alive(hvr.inputs) && alive(hvr.left) && alive(hvr.right)) return true;
		hvr.inputs = hvr.left = hvr.right = null;
		const now = Date.now();
		if (now < hvr.next) return false;
		hvr.next = now + 2000;
		for (const o of objectsOf(HVRInputsCls)) {
			if (isRemote(o)) continue;
			const l = call(o, "get_LeftController"), r = call(o, "get_RightController");
			if (l && !l.isNull() && r && !r.isNull()) {
				hvr.inputs = keep(o); hvr.left = keep(l); hvr.right = keep(r);
				log("HurricaneVR input found");
				return true;
			}
		}
		return false;
	}
	function hvrRead(c: any, name: string, kind: "bool" | "float" | "y"): number | null {
		let off = hvr.off[name];
		if (off === undefined) {
			off = -1;
			for (const fn of [name, "<" + name + ">k__BackingField"]) {
				try { const f = c.class.field(fn); if (!f.isStatic) { off = f.offset; break; } } catch {}
			}
			hvr.off[name] = off;
		}
		try {
			if (off > 0) { const p = c.handle.add(off); return kind === "bool" ? p.readU8() : kind === "float" ? p.readFloat() : p.add(4).readFloat(); }
			let v: any;
			try { v = c.field(name).value; } catch { v = call(c, "get_" + name); }
			if (v === null || v === undefined) return null;
			return kind === "y" ? v.handle.add(4).readFloat() : Number(v);
		} catch { return null; }
	}
	const hvrX = (): boolean => hvrReady() && !!hvrRead(hvr.left, "PrimaryButton", "bool");
	const hvrTrigger = (): number => (hvrReady() && hvrRead(hvr.right, "Trigger", "float")) || 0;
	const hvrStickY = (): number => (hvrReady() && hvrRead(hvr.right, "JoystickAxis", "y")) || 0;

	function updateRig() {
		if (rig.head && !alive(rig.head)) rig.head = null;
		if (rig.left && (!alive(rig.left) || !alive(rig.right))) rig.left = rig.right = null;
		const now = Date.now();
		if ((!rig.head || !rig.left) && now >= rig.nextScan) {
			rig.nextScan = now + 3000;
			const hadHands = !!rig.left;
			if (!rig.head) { const h = findHead(); if (h) { rig.head = keep(h); log("head: " + rig.headSrc); } }
			if (!rig.left) {
				const hands = findHands(rig.head);
				if (hands) { rig.left = keep(hands[0]); rig.right = keep(hands[1]); log("hands: " + rig.handSrc); }
				else if (!hadHands && !rig.handSrc) { rig.handSrc = "none"; log("no hands found yet (retrying every 3s) - pointer falls back to gaze"); }
			}
		}
		leftT = rig.left; rightT = rig.right;
	}
	function headT(): any { return rig.head ?? leftT; }
	function headPose(withUp: boolean = false): { p: number[]; f: number[]; u: number[] } | null {
		const t = headT();
		if (!t) return null;
		const p = get3(t, "get_position"), f = get3(t, "get_forward");
		if (!p || !f) return null;
		return { p, f, u: withUp ? (get3(t, "get_up") ?? [0, 1, 0]) : [0, 1, 0] };
	}

	const LegacyInput = Il2Cpp.domain.tryAssembly("UnityEngine.InputLegacyModule")?.image?.tryClass("UnityEngine.Input") ?? null;
	const legacyGetKey = LegacyInput ? LegacyInput.methods.find((m: any) => m.name === "GetKey" && m.parameterCount === 1 && /KeyCode$/.test(m.parameters[0].type.name)) ?? null : null;
	let legacyOK: boolean | null = legacyGetKey ? null : false;
	const KEY_A = 330, KEY_X = 332;

	const asmXR = Il2Cpp.domain.tryAssembly("UnityEngine.XRModule")?.image ?? Il2Cpp.domain.tryAssembly("UnityEngine.VRModule")?.image ?? null;
	const InputDevicesCls = asmXR ? asmXR.tryClass("UnityEngine.XR.InputDevices") : null;
	const CommonUsagesCls = asmXR ? asmXR.tryClass("UnityEngine.XR.CommonUsages") : null;
	let xrReady = false, xrGetDevice: any = null, xrTryBool: any = null, xrTryFloat: any = null;
	let usageTrigBtn: any = null, usagePrimBtn: any = null, usageSecBtn: any = null, usageTrig: any = null;
	try {
		if (InputDevicesCls && CommonUsagesCls) {
			xrGetDevice = InputDevicesCls.method("GetDeviceAtXRNode", 1);
			for (const m of InputDevicesCls.methods) {
				if (m.name !== "GetDeviceAtXRNode") continue;
			}
			const getUsage = (n: string) => { try { return CommonUsagesCls.method("get_" + n, 0).invoke(); } catch { return null; } };
			usageTrigBtn = getUsage("triggerButton"); usagePrimBtn = getUsage("primaryButton");
			usageSecBtn = getUsage("secondaryButton"); usageTrig = getUsage("trigger");
			xrReady = !!(xrGetDevice && (usageTrigBtn || usagePrimBtn));
			if (xrReady) log("XR input: InputDevices ready (new Input System)");
		}
	} catch (e) { xrReady = false; }
	function xrDevice(node: number): any {
		if (!xrReady) return null;
		try { const d = xrGetDevice.invoke(node); return d; } catch { return null; }
	}
	function xrButton(node: number, usage: any): boolean {
		if (!xrReady || !usage) return false;
		try {
			const dev = xrDevice(node);
			if (!dev) return false;
			const m = dev.method ? dev.method("TryGetFeatureValue", 2) : null;
			if (!m) return false;
			const out = Memory.alloc(4);
			const ok = m.invoke(usage, out);
			return !!ok && out.readU8() !== 0;
		} catch { return false; }
	}
	function xrFloat(node: number, usage: any): number | null {
		if (!xrReady || !usage) return null;
		try {
			const dev = xrDevice(node);
			if (!dev) return null;
			const m = dev.method ? dev.method("TryGetFeatureValue", 2) : null;
			if (!m) return null;
			const out = Memory.alloc(4);
			if (!m.invoke(usage, out)) return null;
			return out.readFloat();
		} catch { return null; }
	}
	function legacyKey(code: number): boolean {
		if (!legacyGetKey || legacyOK === false) return false;
		try { const v = !!legacyGetKey.invoke(code); legacyOK = true; return v; }
		catch (e) { legacyOK = false; log("legacy input unavailable (game uses the new Input System): " + e); return false; }
	}
	const legacyGetAxis = LegacyInput ? LegacyInput.methods.find((m: any) => m.name === "GetAxis" && m.parameterCount === 1) ?? null : null;
	let legacyAxisOK: boolean | null = legacyGetAxis ? null : false;
	function legacyStickY(): number {
		if (!legacyGetAxis || legacyAxisOK === false) return 0;
		for (const name of ["Vertical", "RVerticalAxis", "Oculus_CrossPlatform_SecondaryThumbstickVertical"]) {
			try { const v = legacyGetAxis.invoke(Il2Cpp.string(name)) as number; legacyAxisOK = true; if (Math.abs(v) > 0.2) return v; }
			catch { legacyAxisOK = false; return 0; }
		}
		return 0;
	}
	function legacyTrigger(): number {
		if (!legacyGetAxis || legacyAxisOK === false) return 0;
		for (const name of ["Oculus_CrossPlatform_SecondaryIndexTrigger", "Oculus_CrossPlatform_PrimaryIndexTrigger", "RIndexTrigger", "Fire1", "Submit"]) {
			try { const v = legacyGetAxis.invoke(Il2Cpp.string(name)) as number; if (Math.abs(v) > 0.01) return v; } catch { return 0; }
		}
		return 0;
	}

	const add = (a: number[], b: number[]) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
	const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
	const mul = (a: number[], s: number) => [a[0] * s, a[1] * s, a[2] * s];
	const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
	const len = (a: number[]) => Math.sqrt(dot(a, a));
	const norm = (a: number[]) => { const l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
	const clamp01 = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x;
	function quatFromBasis(r: number[], u: number[], f: number[]): number[] {
		const m00 = r[0], m10 = r[1], m20 = r[2], m01 = u[0], m11 = u[1], m21 = u[2], m02 = f[0], m12 = f[1], m22 = f[2];
		const tr = m00 + m11 + m22;
		if (tr > 0) { const s = 0.5 / Math.sqrt(tr + 1); return [(m21 - m12) * s, (m02 - m20) * s, (m10 - m01) * s, 0.25 / s]; }
		if (m00 > m11 && m00 > m22) { const s = 2 * Math.sqrt(1 + m00 - m11 - m22); return [0.25 * s, (m01 + m10) / s, (m02 + m20) / s, (m21 - m12) / s]; }
		if (m11 > m22) { const s = 2 * Math.sqrt(1 + m11 - m00 - m22); return [(m01 + m10) / s, 0.25 * s, (m12 + m21) / s, (m02 - m20) / s]; }
		const s = 2 * Math.sqrt(1 + m22 - m00 - m11); return [(m02 + m20) / s, (m12 + m21) / s, 0.25 * s, (m10 - m01) / s];
	}
	function basisFacing(f: number[]): { r: number[]; u: number[]; f: number[] } {
		f = norm(f);
		let r = cross([0, 1, 0], f);
		if (len(r) < 1e-3) r = [1, 0, 0];
		r = norm(r);
		return { r, u: cross(f, r), f };
	}

	const THEMES: { [name: string]: { [k: string]: number[] } } = {
		Crimson: {
			Text: [1, 0.95, 0.96, 1], TextDisabled: [0.95, 0.7, 0.75, 0.85], TextOnActive: [0.22, 0.02, 0.06, 1],
			WindowBg: [0.065, 0.008, 0.018, 0.94], Pattern: [1, 0.34, 0.46, 0.16], PopupBg: [0.055, 0.006, 0.014, 0.985], Border: [1, 0.25, 0.38, 0.48],
			TitleBg: [0.095, 0.008, 0.022, 0.98], TitleBgActive: [0.18, 0.012, 0.042, 1],
			RowBg: [0.16, 0.012, 0.035, 0.48], RowHover: [0.42, 0.025, 0.085, 0.72],
			FrameBg: [0.11, 0.008, 0.025, 0.82], FrameBgHovered: [0.30, 0.018, 0.065, 0.9], FrameBgActive: [0.48, 0.025, 0.10, 0.96],
			Check: [0.42, 0.98, 0.48, 1], CheckMark: [0.42, 0.98, 0.48, 1],
			SliderFill: [0.93, 0.32, 0.44, 0.75], SliderFillActive: [1, 0.45, 0.56, 0.95], SliderGrab: [1, 0.6, 0.68, 1], SliderGrabActive: [1, 0.75, 0.8, 1],
			Button: [0.6, 0.1, 0.2, 0.8], ButtonHovered: [0.85, 0.2, 0.32, 0.95], ButtonActive: [1, 0.32, 0.44, 1],
			Header: [0.55, 0.09, 0.18, 0.7], HeaderHovered: [0.78, 0.17, 0.29, 0.9], HeaderActive: [0.95, 0.27, 0.4, 1],
			Separator: [1, 0.6, 0.68, 0.25], Tab: [0.16, 0.02, 0.05, 0.82], TabHovered: [0.55, 0.1, 0.2, 0.9], TabActive: [0.96, 0.7, 0.75, 0.97],
			PlotHistogram: [0.42, 0.98, 0.48, 0.9], Cursor: [1, 1, 1, 1], Laser: [1, 0.4, 0.5, 0.7], Accent: [1, 0.6, 0.7, 1],
			Grip: [1, 0.62, 0.7, 0.4], GripHovered: [1, 0.62, 0.7, 0.8], GripActive: [1, 0.8, 0.85, 1],
			ModalDim: [0.05, 0, 0.02, 0.6], Discord: [0.35, 0.4, 0.95, 0.9], DiscordHovered: [0.45, 0.5, 1, 1],
		},
		Dark: {
			Text: [1, 1, 1, 1], TextDisabled: [0.5, 0.5, 0.5, 1], TextOnActive: [1, 1, 1, 1],
			WindowBg: [0.06, 0.06, 0.06, 0.94], Pattern: [0.26, 0.59, 0.98, 0.12], PopupBg: [0.08, 0.08, 0.08, 0.96], Border: [0.43, 0.43, 0.5, 0.5],
			TitleBg: [0.04, 0.04, 0.04, 1], TitleBgActive: [0.16, 0.29, 0.48, 1],
			RowBg: [1, 1, 1, 0.03], RowHover: [0.26, 0.59, 0.98, 0.2],
			FrameBg: [0.16, 0.29, 0.48, 0.54], FrameBgHovered: [0.26, 0.59, 0.98, 0.4], FrameBgActive: [0.26, 0.59, 0.98, 0.67],
			Check: [0.26, 0.59, 0.98, 1], CheckMark: [0.26, 0.59, 0.98, 1],
			SliderFill: [0.26, 0.59, 0.98, 0.45], SliderFillActive: [0.26, 0.59, 0.98, 0.7], SliderGrab: [0.24, 0.52, 0.88, 1], SliderGrabActive: [0.26, 0.59, 0.98, 1],
			Button: [0.26, 0.59, 0.98, 0.4], ButtonHovered: [0.26, 0.59, 0.98, 1], ButtonActive: [0.06, 0.53, 0.98, 1],
			Header: [0.26, 0.59, 0.98, 0.31], HeaderHovered: [0.26, 0.59, 0.98, 0.8], HeaderActive: [0.26, 0.59, 0.98, 1],
			Separator: [0.43, 0.43, 0.5, 0.5], Tab: [0.18, 0.35, 0.58, 0.86], TabHovered: [0.26, 0.59, 0.98, 0.8], TabActive: [0.2, 0.41, 0.68, 1],
			PlotHistogram: [0.9, 0.7, 0, 1], Cursor: [1, 1, 1, 1], Laser: [0.26, 0.59, 0.98, 0.7], Accent: [0.26, 0.59, 0.98, 1],
			Grip: [0.26, 0.59, 0.98, 0.2], GripHovered: [0.26, 0.59, 0.98, 0.67], GripActive: [0.26, 0.59, 0.98, 0.95],
			ModalDim: [0, 0, 0, 0.6], Discord: [0.35, 0.4, 0.95, 0.9], DiscordHovered: [0.45, 0.5, 1, 1],
		},
	};
	const THEME_NAMES = Object.keys(THEMES);
	const style = {
		scale: UI_SCALE, width: WINDOW_WIDTH, titleH: 34, pad: 12, spacingX: 9, spacingY: 7,
		frameH: 30, framePadX: 14, fontSize: 15, grabW: 14,
		rows: ROW_LAYOUT, rowH: 36, rowGap: 3, labelFrac: 0.44, tabsFill: true, opacity: 1, rounding: ROUNDING,
		wrist: WRIST_MENU, onTop: ALWAYS_ON_TOP, stabilize: STABILIZE,
		spin: SPIRAL_SPIN,
		pageMode: PAGE_HEIGHT > 0 ? 0 : 1, pageH: PAGE_HEIGHT > 0 ? PAGE_HEIGHT : 470,
		colors: {} as { [k: string]: number[] },
	};
	const C = style.colors;
	function applyTheme(name: string) { const t = THEMES[name] ?? THEMES.Crimson; for (const k in t) C[k] = t[k]; }
	applyTheme(THEME);
	const fade = (c: number[], m: number) => [c[0], c[1], c[2], c[3] * m];

	const CREATE_BUDGET = 16;
	const ALIGN_LEFT = 3, ALIGN_CENTER = 4, ALIGN_RIGHT = 5;
	const L_BG = 0, L_ROW = 1, L_FRAME = 2, L_FILL = 3, L_POPUP = 4, L_POPUPROW = 5, L_MODAL = 6, L_CURSOR = 7;
	const Q_PATTERN = 2981, Q_LASER = 2997;
	const TEX_FILL = 0, TEX_RING = 1;
	const ALL_CORNERS = 15, TOP_CORNERS = 3, BOTTOM_CORNERS = 12;
	const winRadius = () => style.rounding * 2;

	const PAT_N = 384, PAT_RINGS = 40;
	const patternBytes = new Uint8Array(PAT_N * PAT_N * 4);
	if (WINDOW_PATTERN) {
		const TAU = Math.PI * 2;
		for (let j = 0; j < PAT_N; j++) for (let i = 0; i < PAT_N; i++) {
			const dx = i / (PAT_N - 1) - 0.5, dy = j / (PAT_N - 1) - 0.5;
			const r = Math.sqrt(dx * dx + dy * dy);
			const line = Math.pow(0.5 + 0.5 * Math.cos((r * PAT_RINGS + Math.atan2(dy, dx) / TAU) * TAU), 8);
			const a = (0.06 + 0.94 * line) * (0.3 + 0.7 * Math.max(0, 1 - r * 1.6));
			const o = (j * PAT_N + i) * 4;
			patternBytes[o] = patternBytes[o + 1] = patternBytes[o + 2] = 255;
			patternBytes[o + 3] = Math.min(255, Math.round(a * 255));
		}
	}

	const CIRC_N = 64;
	const circleBytes = new Uint8Array(CIRC_N * CIRC_N * 4);
	{
		const c = (CIRC_N - 1) / 2, R0 = CIRC_N / 2 - 1;
		for (let j = 0; j < CIRC_N; j++) for (let i = 0; i < CIRC_N; i++) {
			const d = Math.hypot(i - c, j - c), o = (j * CIRC_N + i) * 4;
			circleBytes[o] = circleBytes[o + 1] = circleBytes[o + 2] = 255;
			circleBytes[o + 3] = Math.round(255 * Math.min(1, Math.max(0, R0 - d + 0.5)));
		}
	}

	const ringBytes = new Uint8Array(CIRC_N * CIRC_N * 4);
	{
		const c = (CIRC_N - 1) / 2, R0 = CIRC_N / 2 - 1, Rin = R0 - 4;
		for (let j = 0; j < CIRC_N; j++) for (let i = 0; i < CIRC_N; i++) {
			const d = Math.hypot(i - c, j - c), o = (j * CIRC_N + i) * 4;
			const a = Math.min(1, Math.max(0, R0 - d + 0.5)) * Math.min(1, Math.max(0, d - Rin + 0.5));
			ringBytes[o] = ringBytes[o + 1] = ringBytes[o + 2] = 255;
			ringBytes[o + 3] = Math.round(255 * a);
		}
	}

	interface RCmd { x: number; y: number; w: number; h: number; c: number[]; l: number; rot?: number; rad?: number; corners?: number; tex?: number; }
	interface TCmd { x: number; y: number; w: number; h: number; s: string; c: number[]; a: number; l: number; fs?: number; }
	interface Rect { x: number; y: number; w: number; h: number; }
	interface Win {
		title: string; order: number; hud: boolean; shown?: boolean; lastP?: number[]; lastQ?: number[];
		root: any; rootT: any; canvas: any; canvasT: any; rootOn: boolean; pattern: any;
		buckets: any[]; rpool: any[][]; tpool: any[][];
		clipOn: boolean; clipTop: number; clipBot: number; scroll: number; scrollTarget: number; sbVisible: boolean;
		P: number[]; r: number[]; u: number[]; f: number[]; q: number[]; poseDirty: boolean; appliedScale: number;
		W: number; H: number; hitH: number; collapsed: boolean; placed: boolean;
		visible: boolean; wasVisible: boolean;
		rc: RCmd[]; tc: TCmd[]; rb?: RCmd[][]; tb?: TCmd[][]; cursorEl?: any;
		cy: number; rowY: number; rowH: number; lastX: number; lastW: number; sameLine: boolean; indent: number;
		popup: Rect | null; popupNext: Rect | null;
		grip: { hov: boolean; held: boolean };
	}

	const wins = new Map<string, Win>();
	let cur: Win | null = null;
	let budget = CREATE_BUDGET;

	const io = { rayO: [0, 0, 0], rayD: [0, 0, 1], hasRay: false, down: false, pressed: false, released: false, open: false, justOpened: false, scroll: 0 };
	let mouseWin: Win | null = null, mouseX = -1, mouseY = -1, mouseT = 0;
	let activeId = "", activeWin: Win | null = null;
	let dragWin: Win | null = null, dragT = 0, dragLX = 0, dragLY = 0;
	let openPopup: string | null = null;
	const openHeaders = new Map<string, boolean>();
	const tabSel = new Map<string, string>();
	const tabCount = new Map<string, number>();
	const tabNext = new Map<string, string>();
	let bar: { id: string; y: number; nx: number; h: number; n: number; contentY: number; pageH: number } | null = null;
	const sliderIds = new Set<string>();
	let scrollDrag: { win: Win; y: number; start: number; on: boolean } | null = null;
	let sbGrab = 0;
	const isDragWidget = (id: string) => sliderIds.has(id) || /##(resize|title|sb|collapse|close|discord)$/.test(id) || id.startsWith("##modal");
	let resizeStart: { scale: number; mx: number; my: number } | null = null;
	let modal: { id: string; win: string; title: string; body: string[]; yes: string; no: string; onYes: () => void } | null = null;
	function confirm(title: string, body: string[], yes: string, onYes: () => void, no: string = "Cancel") {
		const win = cur ? cur.title : MENU_TITLE;
		modal = { id: "##modal:" + title, win, title, body, yes, no, onYes };
		openPopup = modal.id;
	}
	function openUrl(url: string): boolean {
		try { need(asmCore, "UnityEngine.Application").method("OpenURL", 1).invoke(Il2Cpp.string(url)); log("opened " + url); return true; }
		catch (e) { errOnce("OpenURL", e); return false; }
	}
	let measuring = false;
	let fps = 0, lastMs = Date.now();

	function newWin(title: string): Win {
		return {
			title, order: wins.size, hud: false, root: null, rootT: null, canvas: null, canvasT: null, rootOn: false, pattern: null,
			buckets: [], rpool: [], tpool: [], clipOn: false, clipTop: 0, clipBot: 0, scroll: 0, scrollTarget: 0, sbVisible: false,
			P: [0, 0, 0], r: [1, 0, 0], u: [0, 1, 0], f: [0, 0, 1], q: [0, 0, 0, 1], poseDirty: true, appliedScale: 0,
			W: style.width, H: 200, hitH: 200, collapsed: false, placed: false, visible: false, wasVisible: false,
			rc: [], tc: [], cy: 0, rowY: 0, rowH: 0, lastX: 0, lastW: 0, sameLine: false, indent: 0,
			popup: null, popupNext: null, grip: { hov: false, held: false },
		};
	}

	function faceAt(w: Win, at: number[], viewer: number[]) {
		const b = basisFacing(sub(at, viewer));
		w.r = b.r; w.u = b.u; w.f = b.f; w.q = quatFromBasis(b.r, b.u, b.f);
	}
	function winCenter(w: Win): number[] {
		return add(add(w.P, mul(w.r, w.W * style.scale / 2)), mul(w.u, -w.H * style.scale / 2));
	}
	class OneEuro {
		private x: number[] | null = null;
		private dx = [0, 0, 0];
		private t = 0;
		constructor(private minCutoff: number, private beta: number, private dCutoff: number = 1) {}
		reset() { this.x = null; this.dx = [0, 0, 0]; this.t = 0; }
		filter(v: number[], nowMs: number): number[] {
			const x = this.x;
			if (!x) { this.x = [v[0], v[1], v[2]]; this.t = nowMs; return [v[0], v[1], v[2]]; }
			const dt = (nowMs - this.t) / 1000;
			if (dt <= 0) return [x[0], x[1], x[2]];
			this.t = nowMs;
			const ad = 1 / (1 + 1 / (2 * Math.PI * this.dCutoff * dt)), dx = this.dx;
			for (let i = 0; i < 3; i++) dx[i] += ad * ((v[i] - x[i]) / dt - dx[i]);
			const fc = this.minCutoff + this.beta * Math.sqrt(dx[0] * dx[0] + dx[1] * dx[1] + dx[2] * dx[2]);
			const ax = 1 / (1 + 1 / (2 * Math.PI * fc * dt));
			for (let i = 0; i < 3; i++) x[i] += ax * (v[i] - x[i]);
			return [x[0], x[1], x[2]];
		}
	}
	const wristPosF = new OneEuro(1.0, 8), wristDirF = new OneEuro(0.5, 3);
	const rayPosF = new OneEuro(2.5, 12), rayDirF = new OneEuro(2.5, 12);
	let lateAt = 0;
	const lateActive = () => Date.now() - lateAt < 250;

	const isWrist = (w: Win) => style.wrist && w.order === 0 && !w.hud;
	function anchorWrist(w: Win): boolean {
		if (!leftT) return false;
		const hand = get3(leftT, "get_position");
		const hp = hand ? headPose() : null;
		if (!hand || !hp) return false;
		const head = hp.p;
		const toFace = [head[0] - hand[0], 0, head[2] - hand[2]];
		const away = len(toFace) < 1e-3 ? [0, 0, 1] : mul(norm(toFace), -1);
		const right = norm(cross([0, 1, 0], away));
		const Wm = w.W * style.scale, Hm = w.H * style.scale;
		let center = add(add(hand, mul(right, WRIST_OFFSET[0])), add([0, WRIST_OFFSET[1] + Hm / 2, 0], mul(away, WRIST_OFFSET[2])));
		let facing = norm(sub(center, head));
		if (style.stabilize) {
			const now = Date.now();
			center = wristPosF.filter(center, now);
			facing = norm(wristDirF.filter(facing, now));
		}
		const b = basisFacing(facing);
		w.r = b.r; w.u = b.u; w.f = b.f; w.q = quatFromBasis(b.r, b.u, b.f);
		w.P = add(sub(center, mul(w.r, Wm / 2)), mul(w.u, Hm / 2));
		w.placed = true; w.poseDirty = true;
		return true;
	}
	function place(w: Win): boolean {
		if (isWrist(w)) return anchorWrist(w);
		const hp = headPose();
		if (!hp) return false;
		let fwd = [hp.f[0], 0, hp.f[2]];
		fwd = len(fwd) < 0.2 ? norm(hp.f) : norm(fwd);
		const right = norm(cross([0, 1, 0], fwd));
		const Wm = w.W * style.scale, Hm = w.H * style.scale;
		const center = add(add(hp.p, mul(fwd, SPAWN_DISTANCE + Wm * 0.35)), add(mul(right, w.order * (Wm + 0.05)), [0, -0.08, 0]));
		faceAt(w, center, hp.p);
		w.P = add(sub(center, mul(w.r, Wm / 2)), mul(w.u, Hm / 2));
		w.placed = true; w.poseDirty = true;
		return true;
	}
	function outOfView(w: Win): boolean {
		const hp = headPose();
		if (!hp) return false;
		const d = sub(winCenter(w), hp.p);
		return len(d) > 1.8 || dot(norm(d), norm(hp.f)) < 0.35;
	}

	function project(w: Win, bounded: boolean): { t: number; x: number; y: number } | null {
		const denom = dot(io.rayD, w.f);
		if (denom < 1e-4) return null;
		const t = dot(sub(w.P, io.rayO), w.f) / denom;
		if (t <= 0) return null;
		const rel = sub(add(io.rayO, mul(io.rayD, t)), w.P);
		const x = dot(rel, w.r) / style.scale, y = -dot(rel, w.u) / style.scale;
		if (bounded && (x < 0 || y < 0 || x > w.W || y > w.hitH)) return null;
		return { t, x, y };
	}

	function newFrame(inp: { rayO: number[] | null; rayD: number[] | null; down: boolean; open: boolean; scroll: number }) {
		io.scroll = inp.open ? inp.scroll : 0;
		const now = Date.now();
		const dt = Math.max(1, now - lastMs); lastMs = now;
		fps = fps * 0.9 + (1000 / dt) * 0.1;

		io.justOpened = inp.open && !io.open;
		io.open = inp.open;
		io.hasRay = !!(inp.rayO && inp.rayD);
		if (inp.rayO && inp.rayD) { io.rayO = inp.rayO; io.rayD = norm(inp.rayD); }
		const physicalDown = inp.down && io.open;
		const down = physicalDown;
		io.pressed = down && !io.down;
		io.released = !down && io.down;
		io.down = down;

		if (!io.open) { activeId = ""; activeWin = null; dragWin = null; openPopup = null; }
		if (io.justOpened) for (const w of wins.values()) if (w.placed && !isWrist(w) && outOfView(w)) place(w);

		if (dragWin && io.down && io.hasRay) {
			const hit = add(io.rayO, mul(io.rayD, dragT));
			const hp = headPose();
			if (hp) faceAt(dragWin, hit, hp.p);
			dragWin.P = add(sub(hit, mul(dragWin.r, dragLX * style.scale)), mul(dragWin.u, dragLY * style.scale));
			dragWin.poseDirty = true;
		}

		mouseWin = null; mouseX = mouseY = -1; mouseT = 0;
		if (!io.hasRay || !io.open) return;
		if (activeWin && activeWin.wasVisible) {
			const p = project(activeWin, false);
			if (p) { mouseWin = activeWin; mouseX = p.x; mouseY = p.y; mouseT = p.t; }
			return;
		}
		let best: { t: number; x: number; y: number } | null = null;
		for (const w of wins.values()) {
			if (!w.wasVisible || !w.placed) continue;
			const p = project(w, true);
			if (p && (!best || p.t < best.t)) { best = p; mouseWin = w; }
		}
		if (best) { mouseX = best.x; mouseY = best.y; mouseT = best.t; }
	}

	function R(x: number, y: number, w: number, h: number, c: number[], l: number, rot: number = 0, rad: number = 0,
	           corners: number = ALL_CORNERS, tex: number = TEX_FILL) {
		if (!cur || measuring || w <= 0 || h <= 0) return;
		const win = cur;
		if (win.clipOn && l < L_POPUP) {
			if (rot) { const cy = y + h / 2; if (cy < win.clipTop || cy > win.clipBot) return; }
			else {
				let y0 = y, y1 = y + h;
				if (y1 <= win.clipTop || y0 >= win.clipBot) return;
				if (y0 < win.clipTop) { y0 = win.clipTop; corners &= ~TOP_CORNERS; }
				if (y1 > win.clipBot) { y1 = win.clipBot; corners &= ~BOTTOM_CORNERS; }
				y = y0; h = y1 - y0;
				if (h < 0.5) return;
			}
		}
		win.rc.push({ x, y, w, h, c, l, rot, rad, corners, tex });
	}
	function RR(x: number, y: number, w: number, h: number, c: number[], l: number, k: number = 1, corners: number = ALL_CORNERS) {
		R(x, y, w, h, c, l, 0, style.rounding * k, corners);
	}
	function T(x: number, y: number, w: number, h: number, s: string, c: number[], a: number, l: number, fs?: number) {
		if (!cur || measuring || !s) return;
		const win = cur;
		if (win.clipOn && l < L_POPUP) {
			const vis = (Math.min(y + h, win.clipBot) - Math.max(y, win.clipTop)) / h;
			if (vis <= 0.45) return;
			if (vis < 1) c = fade(c, (vis - 0.45) / 0.55);
		}
		win.tc.push({ x, y, w, h, s, c, a, l, fs });
	}
	function textW(s: string, fs: number = style.fontSize): number {
		let w = 0;
		for (const ch of s) {
			w += " il.,:;'|!".includes(ch) ? 0.3 : "mwMW@".includes(ch) ? 0.85
			   : ch >= "A" && ch <= "Z" ? 0.66 : ch >= "0" && ch <= "9" ? 0.56 : 0.52;
		}
		return Math.ceil(w * fs);
	}
	function labelId(label: string): [string, string] {
		const k = label.indexOf("###");
		if (k >= 0) return [label.slice(0, k), (cur ? cur.title : "") + "/" + label.slice(k + 3)];
		const i = label.indexOf("##");
		return [i >= 0 ? label.slice(0, i) : label, (cur ? cur.title : "") + "/" + label];
	}
	function fullW(): number { return cur ? cur.W - style.pad * 2 - cur.indent - (cur.clipOn && cur.sbVisible ? 14 : 0) : 0; }
	function item(w: number, h: number, gap: number = style.spacingY): [number, number] {
		const win = cur!;
		let x: number, y: number;
		if (win.sameLine) {
			x = win.lastX + win.lastW + style.spacingX; y = win.rowY;
			win.rowH = Math.max(win.rowH, h); win.sameLine = false;
		} else {
			x = style.pad + win.indent; y = win.cy;
			win.rowY = y; win.rowH = h;
		}
		win.cy = win.rowY + win.rowH + gap;
		win.lastX = x; win.lastW = w;
		return [x, win.clipOn ? y - Math.round(win.scroll) : y];
	}
	function inRect(px: number, py: number, r: Rect | null): boolean {
		return !!r && px >= r.x && px < r.x + r.w && py >= r.y && py < r.y + r.h;
	}
	function underPopup(id: string): boolean {
		const win = cur!;
		return !!(win.popup && openPopup && !id.startsWith(openPopup) && inRect(mouseX, mouseY, win.popup));
	}
	function behavior(id: string, x: number, y: number, w: number, h: number) {
		if (measuring) return { hov: false, held: false, clicked: false };
		const win = cur!;
		const clipped = win.clipOn && !(openPopup && id.startsWith(openPopup)) && (mouseY < win.clipTop || mouseY >= win.clipBot);
		const hov = mouseWin === win && !clipped && !underPopup(id) && (activeId === "" || activeId === id) && inRect(mouseX, mouseY, { x, y, w, h });
		if (hov && io.pressed && activeId === "") { activeId = id; activeWin = win; }
		const held = activeId === id && io.down;
		const clicked = activeId === id && io.released && hov;
		return { hov, held, clicked };
	}

	function row(id: string, label: string, hitWholeRow: boolean) {
		const fw = fullW(), h = style.rowH;
		const [x, y] = item(fw, h, style.rowGap);
		const b = hitWholeRow ? behavior(id, x, y, fw, h) : { hov: false, held: false, clicked: false };
		const lit = b.hov || (mouseWin === cur && !underPopup(id) && activeId === "" && inRect(mouseX, mouseY, { x, y, w: fw, h }));
		RR(x, y, fw, h, lit ? C.RowHover : C.RowBg, L_ROW);
		const lw = Math.floor(fw * style.labelFrac);
		T(x + 12, y, lw - 12, h, label, C.Text, ALIGN_LEFT, L_FRAME);
		return { x, y, w: fw, h, cx: x + lw, cw: fw - lw - 10, b };
	}
	function line(ax: number, ay: number, bx: number, by: number, t: number, c: number[], l: number) {
		const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy);
		R((ax + bx) / 2 - (L + t) / 2, (ay + by) / 2 - t / 2, L + t, t, c, l, Math.atan2(dy, dx) * 180 / Math.PI, t / 2);
	}
	function tickMark(x: number, y: number, s: number, c: number[]) {
		const t = Math.max(2.5, s * 0.14);
		line(x + s * 0.2, y + s * 0.52, x + s * 0.42, y + s * 0.74, t, c, L_FILL);
		line(x + s * 0.42, y + s * 0.74, x + s * 0.82, y + s * 0.26, t, c, L_FILL);
	}
	function measure(fn: () => void): number {
		const savedCur = cur, savedBar = bar;
		const m = newWin("__measure");
		m.W = savedCur ? savedCur.W : style.width; m.indent = savedCur ? savedCur.indent : 0;
		cur = m; bar = null; measuring = true;
		try { fn(); } catch {}
		measuring = false; cur = savedCur; bar = savedBar;
		return m.cy;
	}
	function setMenuScale(sc: number) {
		style.scale = Math.min(UI_SCALE * 3, Math.max(UI_SCALE * 0.4, sc));
		setSize.v = Math.round(style.scale / UI_SCALE * 100);
	}

	function begin(title: string, open?: { v: boolean }): boolean {
		if (open && !open.v) return false;
		let w = wins.get(title);
		if (!w) { w = newWin(title); wins.set(title, w); }
		cur = w;
		w.visible = true; w.W = style.width;
		w.rc.length = 0; w.tc.length = 0;
		if (!w.placed) place(w);

		const th = style.titleH;
		const arrow = behavior(title + "/##collapse", 0, 0, th, th);
		if (arrow.clicked) w.collapsed = !w.collapsed;
		let closeW = 0;
		if (open) {
			closeW = th;
			const cb = behavior(title + "/##close", w.W - th, 0, th, th);
			if (cb.hov) RR(w.W - th + 4, 4, th - 8, th - 8, cb.held ? C.ButtonActive : C.ButtonHovered, L_FILL);
			T(w.W - th, 0, th, th, "X", C.Text, ALIGN_CENTER, L_FRAME);
			if (cb.clicked) open.v = false;
		}
		const titleW = textW(title);
		let discordW = 0;
		if (w.order === 0 && DISCORD_URL) {
			discordW = textW("Discord") + 22;
			const dx = th + titleW + 12, dh = th - 8;
			const db = behavior(title + "/##discord", dx, 4, discordW, dh);
			RR(dx, 4, discordW, dh, db.hov || db.held ? C.DiscordHovered : C.Discord, L_FILL);
			T(dx, 4, discordW, dh, "Discord", C.Text, ALIGN_CENTER, L_FRAME);
			if (db.clicked) {
				confirm("Open Discord?", ["This opens " + DISCORD_URL.replace("https://", ""), "in your browser. The game will go to the background."],
					"Open", () => {
						if (openUrl(DISCORD_URL)) notify("Opening Discord in your browser");
						else notify("Couldn't open a browser here - " + DISCORD_URL.replace("https://", ""), 10);
					});
			}
			discordW += 12;
		}
		const tbx = th + titleW + 12 + discordW;
		const tb = behavior(title + "/##title", tbx, 0, w.W - tbx - closeW, th);
		if (tb.hov && io.pressed && activeId === title + "/##title" && !isWrist(w)) {
			dragWin = w; dragT = mouseT; dragLX = mouseX; dragLY = mouseY;
		}
		const focused = mouseWin === w || dragWin === w;
		RR(0, 0, w.W, th, focused ? C.TitleBgActive : C.TitleBg, L_FRAME, 2, w.collapsed ? ALL_CORNERS : TOP_CORNERS);
		R(0, th - 2, w.W, 2, focused ? C.Accent : C.TabActive, L_FILL);
		if (arrow.hov) RR(4, 4, th - 8, th - 8, C.ButtonHovered, L_FILL);
		T(0, 0, th, th, w.collapsed ? "\u25BA" : "\u25BC", C.Text, ALIGN_CENTER, L_FRAME);
		T(th + 3, 0, titleW + 8, th, title, C.Text, ALIGN_LEFT, L_FRAME);
		if (MENU_VERSION) T(w.W - closeW - 90, 0, 80, th, MENU_VERSION, C.TextDisabled, ALIGN_RIGHT, L_FRAME);

		w.grip = { hov: false, held: false };
		if (!w.collapsed) {
			const gs = 22, gid = title + "/##resize";
			const gb = behavior(gid, w.W - gs, w.H - gs, gs, gs);
			if (gb.hov && io.pressed && activeId === gid) resizeStart = { scale: style.scale, mx: mouseX * style.scale, my: mouseY * style.scale };
			if (gb.held && resizeStart && mouseWin === w) {
				const mx = mouseX * style.scale, my = mouseY * style.scale;
				const d0 = resizeStart.mx * resizeStart.mx + resizeStart.my * resizeStart.my;
				if (d0 > 1e-6) setMenuScale(resizeStart.scale * (mx * resizeStart.mx + my * resizeStart.my) / d0);
			}
			w.grip = { hov: gb.hov, held: gb.held };
		}

		w.cy = th + style.pad; w.rowY = w.cy; w.rowH = 0; w.sameLine = false; w.indent = 0; w.lastX = 0; w.lastW = 0;
		return !w.collapsed;
	}

	function end() {
		const w = cur;
		if (!w) return;
		w.H = w.collapsed ? style.titleH : Math.max(style.titleH + style.pad * 2, w.cy - style.spacingY + style.pad);
		if (modal && openPopup !== modal.id) modal = null;
		if (modal && modal.win === w.title) drawModal(w);
		w.popup = w.popupNext; w.popupNext = null;
		w.hitH = w.popup ? Math.max(w.H, w.popup.y + w.popup.h) : w.H;
		const wr = winRadius();
		R(0, 0, w.W, w.H, fade(C.WindowBg, style.opacity), L_BG, 0, wr);
		R(0, 0, w.W, w.H, C.Border, L_FILL, 0, wr, ALL_CORNERS, TEX_RING);
		if (w.H > th) R(2, 2, w.W - 4, w.H - 4, fade(C.Border, 0.28), L_FILL, 0, Math.max(2, wr - 2), ALL_CORNERS, TEX_RING);
		if (!w.collapsed) {
			const gc = w.grip.held ? C.GripActive : w.grip.hov ? C.GripHovered : C.Grip;
			for (let k = 1; k <= 3; k++) line(w.W - 4 - k * 6, w.H - 4, w.W - 4, w.H - 4 - k * 6, 2.5, gc, L_FILL);
		}
		cur = null;
	}

	function drawModal(w: Win) {
		const m = modal!;
		w.popupNext = { x: 0, y: 0, w: w.W, h: w.H };
		R(0, 0, w.W, w.H, C.ModalDim, L_POPUP, 0, winRadius());
		const lh = style.fontSize + 8, bw = Math.min(520, w.W - 80);
		const bh = 16 + lh + 8 + m.body.length * lh + 14 + style.frameH + 16;
		const bx = (w.W - bw) / 2, by = Math.max(style.titleH + 8, (w.H - bh) / 2);
		RR(bx, by, bw, bh, C.PopupBg, L_POPUPROW, 1.6);
		R(bx, by, bw, bh, C.Border, L_MODAL, 0, style.rounding * 1.6, ALL_CORNERS, TEX_RING);
		let y = by + 16;
		T(bx + 18, y, bw - 36, lh, m.title, C.Accent, ALIGN_LEFT, L_MODAL, style.fontSize + 2); y += lh + 8;
		for (const line of m.body) { T(bx + 18, y, bw - 36, lh, line, C.Text, ALIGN_LEFT, L_MODAL); y += lh; }
		y += 14;
		const btnW = 120, gap = 10;
		const yesX = bx + bw - 18 - btnW, noX = yesX - gap - btnW;
		const nb = behavior(m.id + "/no", noX, y, btnW, style.frameH), yb = behavior(m.id + "/yes", yesX, y, btnW, style.frameH);
		RR(noX, y, btnW, style.frameH, nb.held ? C.FrameBgActive : nb.hov ? C.FrameBgHovered : C.FrameBg, L_MODAL);
		RR(yesX, y, btnW, style.frameH, yb.held ? C.ButtonActive : yb.hov ? C.ButtonHovered : C.Button, L_MODAL);
		T(noX, y, btnW, style.frameH, m.no, C.Text, ALIGN_CENTER, L_MODAL);
		T(yesX, y, btnW, style.frameH, m.yes, C.Text, ALIGN_CENTER, L_MODAL);
		if (nb.clicked) { modal = null; openPopup = null; }
		if (yb.clicked) { const f = m.onYes; modal = null; openPopup = null; try { f(); } catch (e) { errOnce("confirm", e); } }
	}

	function text(s: string, c: number[] = C.Text) {
		const h = style.fontSize + 8;
		const [x, y] = item(textW(s), h);
		T(x + (style.rows ? 12 : 0), y, Math.max(textW(s), fullW()), h, s, c, ALIGN_LEFT, L_FRAME);
	}

	function button(label: string, width?: number): boolean {
		const [disp, id] = labelId(label);
		const bw = Math.min(fullW(), width ?? textW(disp) + style.framePadX * 2);
		let x: number, y: number, bh: number;
		if (style.rows) {
			const joined = cur!.sameLine;
			[x, y] = item(bw, style.rowH, style.rowGap);
			if (!joined) RR(x, y, fullW(), style.rowH, C.RowBg, L_ROW);
			bh = style.frameH;
			y += (style.rowH - bh) / 2;
			if (!joined) x += 6;
		} else {
			bh = style.frameH;
			[x, y] = item(bw, bh);
		}
		const b = behavior(id, x, y, bw, bh);
		RR(x, y, bw, bh, b.held ? C.ButtonActive : b.hov ? C.ButtonHovered : C.Button, L_FRAME);
		if (b.hov || b.held) R(x + 2, y + 2, Math.min(3, bw - 4), bh - 4, b.held ? C.Accent : C.ButtonHovered, L_FILL, 0, 1.5);
		T(x, y, bw, bh, disp, C.Text, ALIGN_CENTER, L_FRAME);
		return b.clicked;
	}

	function checkbox(label: string, r: { v: boolean }, desc?: string): boolean {
		const [disp, id] = labelId(label);
		if (style.rows) {
			const rw = row(id, disp, true);
			if (rw.b.clicked) r.v = !r.v;
			const bs = style.frameH - 4, bx = rw.cx, by = rw.y + (rw.h - bs) / 2;
			RR(bx, by, bs, bs, r.v ? (rw.b.held ? C.SliderFillActive : C.SliderFill) : (rw.b.held ? C.FrameBgActive : rw.b.hov ? C.FrameBgHovered : C.FrameBg), L_FRAME, 0.7);
			if (r.v) tickMark(bx, by, bs, C.Check);
			if (desc) T(bx + bs + 10, rw.y, rw.cw - bs - 10, rw.h, desc, C.TextDisabled, ALIGN_LEFT, L_FRAME);
			return rw.b.clicked;
		}
		const sz = style.frameH, lw = textW(disp), gap = style.spacingX;
		const [x, y] = item(sz + gap + lw, sz);
		const b = behavior(id, x, y, sz + gap + lw, sz);
		if (b.clicked) r.v = !r.v;
		RR(x, y, sz, sz, b.held ? C.FrameBgActive : b.hov ? C.FrameBgHovered : C.FrameBg, L_FRAME, 0.7);
		if (r.v) tickMark(x, y, sz, C.Check);
		T(x + sz + gap, y, lw, sz, disp, C.Text, ALIGN_LEFT, L_FRAME);
		return b.clicked;
	}

	function slider(label: string, r: { v: number }, min: number, max: number, isInt: boolean, decimals: number): boolean {
		const [disp, id] = labelId(label);
		const fmt = (v: number) => isInt ? String(Math.round(v)) : v.toFixed(decimals);
		let fx: number, fy: number, fw: number, fh: number, hy: number, hh: number;
		if (style.rows) {
			const rw = row(id, disp, false);
			fx = rw.cx; fw = rw.cw; fh = style.frameH - 4; fy = rw.y + (rw.h - fh) / 2;
			hy = rw.y; hh = rw.h;
		} else {
			fw = Math.max(80, Math.floor(fullW() * 0.62)); fh = style.frameH;
			[fx, fy] = item(fw + style.spacingX + textW(disp), fh);
			hy = fy; hh = fh;
			T(fx + fw + style.spacingX, fy, textW(disp), fh, disp, C.Text, ALIGN_LEFT, L_FRAME);
		}
		sliderIds.add(id);
		const b = behavior(id, fx, hy, fw, hh);
		let changed = false;
		if (b.held && mouseWin === cur) {
			let v = min + clamp01((mouseX - fx) / fw) * (max - min);
			if (isInt) v = Math.round(v);
			if (v !== r.v) { r.v = v; changed = true; }
		}
		const f = clamp01((r.v - min) / (max - min || 1));
		RR(fx, fy, fw, fh, b.held ? C.FrameBgActive : b.hov ? C.FrameBgHovered : C.FrameBg, L_FRAME);
		RR(fx, fy, Math.max(fh * 0.45, fw * f), fh, b.held ? C.SliderFillActive : C.SliderFill, L_FILL);
		const thumbX = fx + clamp01(f) * fw;
		if (roundOK) {
			const ts = Math.max(9, fh * 0.78);
			R(thumbX - ts / 2, fy + (fh - ts) / 2, ts, ts, b.held ? C.SliderGrabActive : C.SliderGrab, L_FILL, 0, ts / 2);
		} else {
			R(thumbX - 2, fy + 2, 4, Math.max(1, fh - 4), b.held ? C.SliderGrabActive : C.SliderGrab, L_FILL, 0, 2);
		}
		T(fx, fy, fw, fh, fmt(r.v) + (style.rows ? " / " + fmt(max) : ""), C.Text, ALIGN_CENTER, L_FRAME);
		return changed;
	}
	const sliderFloat = (label: string, r: { v: number }, min: number, max: number, decimals: number = 2) => slider(label, r, min, max, false, decimals);
	const sliderInt = (label: string, r: { v: number }, min: number, max: number) => slider(label, r, min, max, true, 0);

	function combo(label: string, r: { v: number }, items: string[]): boolean {
		const [disp, id] = labelId(label);
		const win = cur!;
		let fx: number, fy: number, fw: number, fh: number, b: { hov: boolean; held: boolean; clicked: boolean }, popY: number;
		if (style.rows) {
			const rw = row(id, disp, true);
			fx = rw.cx; fw = rw.cw; fh = style.frameH - 4; fy = rw.y + (rw.h - fh) / 2; b = rw.b; popY = rw.y + rw.h;
		} else {
			fw = Math.max(80, Math.floor(fullW() * 0.62)); fh = style.frameH;
			[fx, fy] = item(fw + style.spacingX + textW(disp), fh);
			b = behavior(id, fx, fy, fw, fh); popY = fy + fh + 2;
			T(fx + fw + style.spacingX, fy, textW(disp), fh, disp, C.Text, ALIGN_LEFT, L_FRAME);
		}
		if (b.clicked) openPopup = openPopup === id ? null : id;
		const isOpen = openPopup === id;
		RR(fx, fy, fw, fh, isOpen || b.held ? C.FrameBgActive : b.hov ? C.FrameBgHovered : C.FrameBg, L_FRAME);
		RR(fx + fw - fh, fy, fh, fh, b.hov || isOpen ? C.ButtonHovered : C.Button, L_FILL);
		T(fx + 8, fy, fw - fh - 8, fh, items[r.v] ?? "", C.Text, ALIGN_LEFT, L_FRAME);
		T(fx + fw - fh, fy, fh, fh, "\u25BC", C.Text, ALIGN_CENTER, L_FRAME);

		let changed = false;
		if (isOpen) {
			const rowH = style.frameH;
			const SEARCH_MIN = 8, MAX_ROWS = 8;
			const cs = comboState(id);
			const showSearch = items.length > SEARCH_MIN;
			const q = cs.filter.trim().toLowerCase();
			const filtered: number[] = [];
			for (let i = 0; i < items.length; i++) if (!q || items[i].toLowerCase().indexOf(q) >= 0) filtered.push(i);

			const searchH = showSearch ? rowH + 4 : 0;
			const visRows = Math.min(MAX_ROWS, Math.max(1, filtered.length));
			const listH = visRows * rowH;
			const pr: Rect = { x: fx, y: popY + 2, w: fw, h: searchH + listH + 8 };
			if (io.pressed && !b.hov && (mouseWin !== win || !inRect(mouseX, mouseY, win.popup))) { openPopup = null; }
			if (openPopup === id) {
				win.popupNext = pr;
				RR(pr.x, pr.y, pr.w, pr.h, C.PopupBg, L_POPUP);

				let listY = pr.y + 4;
				if (showSearch) {
					RR(pr.x + 4, listY, pr.w - 8, rowH, C.FrameBg, L_POPUPROW);
					const shown = cs.filter.length ? cs.filter : "type to search... (thumbstick scrolls)";
					T(pr.x + 12, listY, pr.w - 16, rowH, shown, cs.filter.length ? C.Text : C.TextDisabled, ALIGN_LEFT, L_POPUPROW);
					const sb = behavior(id + "/search", pr.x + 4, listY, pr.w - 8, rowH);
					if (sb.clicked && cs.filter.length) { cs.filter = ""; cs.scroll = 0; }
					listY += searchH;
				}

				const maxScroll = Math.max(0, filtered.length - visRows);
				if (Math.abs(io.scroll) > 0.01) { cs.scroll += io.scroll > 0 ? 1 : -1; io.scroll = 0; }
				cs.scroll = Math.max(0, Math.min(maxScroll, cs.scroll));

				for (let vr = 0; vr < visRows; vr++) {
					const fi = vr + cs.scroll;
					if (fi >= filtered.length) break;
					const i = filtered[fi];
					const iy = listY + vr * rowH;
					const ib = behavior(id + "/" + i, pr.x + 4, iy, pr.w - 8, rowH);
					if (ib.hov || i === r.v) RR(pr.x + 4, iy, pr.w - 8, rowH, ib.hov ? C.HeaderHovered : C.Header, L_POPUPROW);
					T(pr.x + 12, iy, pr.w - 16, rowH, items[i], C.Text, ALIGN_LEFT, L_POPUPROW);
					if (ib.clicked) { r.v = i; changed = true; openPopup = null; cs.filter = ""; cs.scroll = 0; }
				}
				if (maxScroll > 0) {
					const trackH = listH, thumbH = Math.max(12, trackH * visRows / filtered.length);
					const ty = listY + (trackH - thumbH) * (cs.scroll / maxScroll);
					RR(pr.x + pr.w - 6, listY, 3, trackH, C.FrameBg, L_POPUPROW);
					RR(pr.x + pr.w - 6, ty, 3, thumbH, C.TextDisabled, L_POPUPROW);
				}
			}
		}
		return changed;
	}
	const comboStates: { [id: string]: { filter: string; scroll: number } } = {};
	function comboState(id: string): { filter: string; scroll: number } {
		return comboStates[id] ?? (comboStates[id] = { filter: "", scroll: 0 });
	}
	(globalThis as any).comboSearch = (labelPart: string, text: string) => {
		let hit = 0;
		for (const k of Object.keys(comboStates)) if (k.toLowerCase().indexOf(labelPart.toLowerCase()) >= 0) { comboStates[k].filter = text; comboStates[k].scroll = 0; hit++; }
		return hit ? "filtered " + hit + " combo(s) to \"" + text + "\"" : "no open combo matching \"" + labelPart + "\" (open the dropdown first)";
	};

	function collapsingHeader(label: string, defaultOpen: boolean = false): boolean {
		const [disp, id] = labelId(label);
		if (!openHeaders.has(id)) openHeaders.set(id, defaultOpen);
		const fw = fullW(), fh = style.rows ? style.rowH : style.frameH;
		const [x, y] = item(fw, fh, style.rows ? style.rowGap : style.spacingY);
		const b = behavior(id, x, y, fw, fh);
		if (b.clicked) openHeaders.set(id, !openHeaders.get(id));
		const isOpen = !!openHeaders.get(id);
		RR(x, y, fw, fh, b.held ? C.HeaderActive : b.hov ? C.HeaderHovered : C.Header, L_FRAME);
		if (isOpen || b.hov) R(x, y + 4, 3, fh - 8, b.held ? C.Accent : C.TabActive, L_FILL, 0, 1.5);
		T(x, y, fh, fh, isOpen ? "\u25BC" : "\u25BA", C.Text, ALIGN_CENTER, L_FRAME);
		T(x + fh, y, fw - fh, fh, disp, C.Text, ALIGN_LEFT, L_FRAME);
		return isOpen;
	}
	function separator() { const [x, y] = item(fullW(), 2); R(x, y, fullW(), 2, C.Separator, L_FRAME, 0, 1); }
	function spacing() { item(0, style.spacingY); }
	function sameLine() { if (cur) cur.sameLine = true; }
	function indent(px: number = 16) { if (cur) cur.indent += px; }
	function unindent(px: number = 16) { if (cur) cur.indent = Math.max(0, cur.indent - px); }
	function progressBar(frac: number, overlay?: string) {
		const fw = fullW(), fh = style.frameH;
		const [x, y] = item(fw, fh);
		RR(x, y, fw, fh, C.FrameBg, L_FRAME);
		const pw = fw * clamp01(frac);
		if (pw > 0) RR(x, y, pw, fh, C.PlotHistogram, L_FILL);
		R(x, y, fw, 2, fade(C.Border, 0.35), L_FILL, 0, 1);
		T(x, y, fw, fh, overlay ?? Math.round(clamp01(frac) * 100) + "%", C.Text, ALIGN_CENTER, L_FRAME);
	}

	function beginTabBar(id: string): boolean {
		const h = style.rows ? style.frameH + 4 : style.frameH;
		const [, y] = item(fullW(), h, style.spacingY + 2);
		const win = cur!;
		bar = { id: win.title + "/" + id, y, nx: style.pad + win.indent, h, n: 0, contentY: win.cy, pageH: Infinity };
		const next = tabNext.get(bar.id);
		if (next !== undefined) { tabSel.set(bar.id, next); tabNext.delete(bar.id); win.scroll = win.scrollTarget = 0; }
		if (!measuring && style.pageMode !== 2) {
			bar.pageH = style.pageMode === 0 ? style.pageH : measure(settings);
			win.clipOn = true; win.clipTop = bar.contentY; win.clipBot = bar.contentY + bar.pageH;
			win.scroll += (win.scrollTarget - win.scroll) * 0.35;
			if (Math.abs(win.scrollTarget - win.scroll) < 0.5) win.scroll = win.scrollTarget;
		}
		return true;
	}
	function tabItem(label: string): boolean {
		if (!bar) return false;
		const [disp] = labelId(label);
		const tid = bar.id + "/" + label;
		if (!tabSel.has(bar.id)) tabSel.set(bar.id, tid);
		const n = tabCount.get(bar.id) ?? 0, gap = 3;
		const knownCount = tabCount.has(bar.id);
		const tw = style.tabsFill && knownCount && n > 0 ? (fullW() - gap * (n - 1)) / n : textW(disp) + style.framePadX * 2;
		const x = bar.nx;
		bar.nx += tw + gap; bar.n++;
		const win = cur!, clip = win.clipOn;
		win.clipOn = false;
		const b = behavior(tid, x, bar.y, tw, bar.h);
		if (b.clicked) tabNext.set(bar.id, tid);
		const sel = tabSel.get(bar.id) === tid;
		RR(x, bar.y, tw, bar.h, sel ? C.TabActive : b.hov ? C.TabHovered : C.Tab, L_FRAME, 0.85);
		if (sel) R(x + 4, bar.y + bar.h - 3, Math.max(1, tw - 8), 3, C.Accent, L_FILL, 0, 1.5);
		T(x, bar.y, tw, bar.h, disp, sel ? C.TextOnActive : C.Text, ALIGN_CENTER, L_FRAME);
		win.clipOn = clip;
		return sel;
	}
	function endTabBar() {
		const win = cur;
		if (bar && win && !measuring) {
			tabCount.set(bar.id, bar.n);
			if (win.clipOn) {
				const used = win.cy - bar.contentY, pageH = bar.pageH, maxScroll = Math.max(0, used - pageH);
				if (io.scroll && (mouseWin === win || (!mouseWin && win.order === 0))) win.scrollTarget += io.scroll;
				if (io.pressed && mouseWin === win && mouseY >= win.clipTop && mouseY < win.clipBot)
					scrollDrag = { win, y: mouseY, start: win.scrollTarget, on: false };
				if (scrollDrag && scrollDrag.win === win) {
					if (!io.down) scrollDrag = null;
					else if (mouseWin === win) {
						const dy = mouseY - scrollDrag.y;
						if (!scrollDrag.on && maxScroll > 0 && Math.abs(dy) > 14 && !isDragWidget(activeId)) {
							scrollDrag.on = true; activeId = "##scrolldrag"; activeWin = win;
						}
						if (scrollDrag.on) win.scrollTarget = win.scroll = scrollDrag.start - dy;
					}
				}
				win.clipOn = false;
				if (maxScroll > 0) {
					const trackH = pageH - 14, tx = win.W - style.pad - 8, thumbH = Math.max(28, trackH * pageH / used);
					const sid = win.title + "/##sb";
					let ty = win.clipTop + (trackH - thumbH) * (win.scroll / maxScroll);
					const sb = behavior(sid, tx - 6, ty, 20, thumbH);
					if (sb.hov && io.pressed && activeId === sid) sbGrab = mouseY - ty;
					if (sb.held && mouseWin === win) {
						win.scrollTarget = win.scroll = (mouseY - sbGrab - win.clipTop) / (trackH - thumbH) * maxScroll;
					}
					win.scrollTarget = Math.max(0, Math.min(maxScroll, win.scrollTarget));
					win.scroll = Math.max(0, Math.min(maxScroll, win.scroll));
					ty = win.clipTop + (trackH - thumbH) * (win.scroll / maxScroll);
					R(tx, win.clipTop, 6, trackH, C.FrameBg, L_FRAME, 0, 3);
					R(tx, ty, 6, thumbH, sb.held ? C.SliderFillActive : sb.hov ? C.SliderGrab : C.SliderFill, L_FILL, 0, 3);
				} else { win.scrollTarget = win.scroll = 0; }
				win.sbVisible = maxScroll > 0;
				win.cy = bar.contentY + pageH; win.rowY = win.cy; win.rowH = 0; win.sameLine = false;
			}
			R(style.pad, bar.y + bar.h + 1, fullW(), 3, C.TabActive, L_FRAME, 0, 1.5);
		}
		bar = null;
	}

	const hudWin = newWin("__hud");
	hudWin.hud = true; hudWin.W = 700;
	let hudP: number[] | null = null, hudF = [0, 0, 1], hudY = 0;
	const notes: { s: string; until: number }[] = [];
	const t0 = Date.now();
	const two = (n: number) => (n < 10 ? "0" : "") + n;
	const hms = (sec: number) => two(Math.floor(sec / 3600)) + ":" + two(Math.floor(sec / 60) % 60) + ":" + two(Math.floor(sec) % 60);
	let fpsShown = 0, fpsAt = 0, batAt = 0, hudContentAt = 0;
	const hud = {
		app: "", fps: 0, battery: -1,
		GOOD: "#55ff66", WARN: "#ffd84a", BAD: "#ff5566",
		col: (s: string, hex: string) => "<color=" + hex + ">" + s + "</color>",
		session: () => hms((Date.now() - t0) / 1000),
		clock: () => { const d = new Date(); return two(d.getHours()) + ":" + two(d.getMinutes()) + ":" + two(d.getSeconds()); },
		line: (s: string, c: number[] = [1, 1, 1, 1], size: number = HUD_FONT) => { T(0, hudY, hudWin.W, size + 8, s, c, ALIGN_LEFT, L_FRAME, size); hudY += size + 8; },
		gap: (px: number = 8) => { hudY += px; },
	};
	function notify(s: string, secs: number = 4) {
		s = String(s).replace(/\s+/g, " ").slice(0, 180);
		notes.push({ s, until: Date.now() + secs * 1000 });
		while (notes.length > 5) notes.shift();
		hudContentAt = 0;
	}

	function updateHud(): boolean {
		const now = Date.now();
		while (notes.length && notes[0].until < now) notes.shift();
		const show = setHud.v || notes.length > 0;
		const content = now - hudContentAt >= 100 || (show !== !!hudWin.shown);
		if (!show) return content;
		const t = headT();
		if (!t) return content;
		const p = get3(t, "get_position"), f = get3(t, "get_forward"), u = get3(t, "get_up");
		if (!p || !f || !u) return content;
		const right = norm(cross(u, f));
		const target = add(add(p, mul(f, HUD_OFFSET[2])), add(mul(right, HUD_OFFSET[0]), mul(u, HUD_OFFSET[1])));
		hudP = hudP ? add(hudP, mul(sub(target, hudP), 0.25)) : target;
		hudF = norm(add(hudF, mul(sub(f, hudF), 0.25)));
		faceAt(hudWin, hudP, sub(hudP, hudF));
		hudWin.P = hudP; hudWin.poseDirty = true; hudWin.placed = true; hudWin.visible = true;
		if (!content) return false;
		hudContentAt = now;

		if (now - fpsAt > 500) { fpsAt = now; fpsShown = fps; }
		if (batteryM && now - batAt > 10000) { batAt = now; try { hud.battery = batteryM.invoke() as number; } catch { hud.battery = -1; } }
		hud.app = appId; hud.fps = fpsShown;

		cur = hudWin; hudWin.rc.length = 0; hudWin.tc.length = 0; hudY = 0;
		if (setHud.v) { try { drawHud(hud); } catch (e) { errOnce("drawHud", e); } }
		if (notes.length) {
			hud.gap(10);
			for (const n of notes) hud.line("\u25B8 " + n.s, C.Accent, HUD_FONT - 2);
		}
		cur = null;
		return true;
	}

	interface Plugin {
		name: string; file: string; builtin: boolean; status: string; logs: string[];
		draw: ((ui: any) => void) | null; frame: (() => void) | null; fails: number;
		enabled?: boolean; code?: string; toggle?: { v: boolean };
		props?: PropDef[]; propRefs?: { [key: string]: any }; propBag?: any;
		attaches?: any[];
		replaced?: any[];
		impls?: { method: any; addr: any }[];
		timers?: { kind: "t" | "i"; id: any }[];
		cleanup?: (() => void)[];
	}

	let hookOwner: Plugin | null = null;
	function withOwner<T>(pl: Plugin | null, fn: () => T): T {
		const prev = hookOwner; hookOwner = pl;
		try { return fn(); } finally { hookOwner = prev; }
	}
	let attachOK = false, replaceOK = false;
	try {
		const realAttach = Interceptor.attach.bind(Interceptor);
		const w = function (target: any, cb: any, data?: any) {
			const l = realAttach(target, cb, data);
			if (hookOwner && hookOwner.attaches) hookOwner.attaches.push(l);
			return l;
		};
		(Interceptor as any).attach = w;
		attachOK = (Interceptor as any).attach === w;
	} catch (e) {  }
	try {
		const realReplace = Interceptor.replace.bind(Interceptor);
		const w = function (target: any, rep: any, data?: any) {
			const r = (realReplace as any)(target, rep, data);
			if (hookOwner && hookOwner.replaced) hookOwner.replaced.push(target);
			return r;
		};
		(Interceptor as any).replace = w;
		replaceOK = (Interceptor as any).replace === w;
	} catch (e) {  }
	let implHookOK = false;
	try {
		let proto = (Il2Cpp as any).Method && (Il2Cpp as any).Method.prototype, desc: any = null;
		while (proto && !(desc = Object.getOwnPropertyDescriptor(proto, "implementation"))) proto = Object.getPrototypeOf(proto);
		if (desc && desc.set && desc.configurable !== false) {
			const origSet = desc.set;
			Object.defineProperty(proto, "implementation", {
				configurable: true, enumerable: desc.enumerable, get: desc.get,
				set(this: any, fn: any) {
					if (hookOwner && hookOwner.impls) {
						let addr: any = null;
						try { addr = this.virtualAddress; } catch {}
						hookOwner.impls.push({ method: this, addr });
					}
					origSet.call(this, fn);
				},
			});
			implHookOK = true;
		}
	} catch (e) { log("plugins: can't wrap method.implementation (" + e + ")"); }
	if (!attachOK || !replaceOK) log("plugins: this Frida won't let me track Interceptor hooks - a plugin that uses Interceptor.attach/replace directly will keep those hooks after you switch it off (restart frida to clear them). method.implementation hooks still untrack fine.");
	log("plugins: hook tracking - Interceptor.attach " + (attachOK ? "yes" : "NO") + ", Interceptor.replace " + (replaceOK ? "yes" : "NO") +
		", method.implementation " + (implHookOK ? "yes" : "NO"));
	const pluginList: Plugin[] = [];
	let pluginDir = "", pluginsScanned = false, pluginScanPending = false;

	function libc(name: string, ret: string, args: string[]): any {
		const p = Module.findGlobalExportByName(name);
		return p ? new NativeFunction(p, ret as any, args as any) : null;
	}
	const c_opendir = libc("opendir", "pointer", ["pointer"]), c_readdir = libc("readdir", "pointer", ["pointer"]);
	const c_closedir = libc("closedir", "int", ["pointer"]), c_mkdir = libc("mkdir", "int", ["pointer", "int"]);
	function listJs(dir: string): string[] | null {
		if (!c_opendir || !c_readdir) return null;
		const d = c_opendir(Memory.allocUtf8String(dir));
		if (d.isNull()) return null;
		const out: string[] = [];
		try {
			for (let i = 0; i < 500; i++) {
				const ent = c_readdir(d);
				if (ent.isNull()) break;
				const type = ent.add(18).readU8(), name = ent.add(19).readUtf8String() ?? "";
				if ((type === 8 || type === 0) && /\.js$/i.test(name)) out.push(name);
			}
		} finally { if (c_closedir) c_closedir(d); }
		return out.sort();
	}
	const EXAMPLE_PLUGIN = [
		"// example_plugin.js - every .js file in this folder becomes a plugin in the Plugins tab.",
		"//",
		"// EASIEST WAY - declare your settings with props() and the menu draws the controls for you:",
		"//   type \"bool\"   -> checkbox      type \"float\" -> slider     type \"int\"    -> int slider",
		"//   type \"select\" -> dropdown      type \"text\"  -> text field  type \"button\" -> button",
		"//   type \"label\"  -> a line of text",
		"var p = props([",
		"    { type: \"bool\",   key: \"enabled\", label: \"Enabled\", default: false, desc: \"master switch\" },",
		"    { type: \"float\",  key: \"speed\",   label: \"Speed\",   min: 1, max: 20, default: 5, decimals: 1 },",
		"    { type: \"int\",    key: \"count\",   label: \"Count\",   min: 1, max: 30, default: 10 },",
		"    { type: \"select\", key: \"mode\",    label: \"Mode\",    options: [\"Normal\", \"Fast\", \"Insane\"], default: \"Normal\" },",
		"    { type: \"text\",   key: \"itemId\",  label: \"Item id\", default: \"Weapon_0100\" },",
		"    { type: \"button\", label: \"Do The Thing\", onClick: function () {",
		"        // read any setting as p.<key>:",
		"        notify(\"speed=\" + p.speed + \" mode=\" + p.mode + \" enabled=\" + p.enabled);",
		"    } },",
		"]);",
		"",
		"// read your settings anywhere with p.speed, p.mode, p.enabled, p.count, p.itemId ...",
		"onFrame(function () {",
		"    if (!p.enabled) return;",
		"    // runs every frame on Unity's main thread - keep it light",
		"});",
		"",
		"// You can STILL add your own custom widgets below the auto ones if you want:",
		"// tab(function (ui) { ui.text(\"custom row\"); });",
		"",
		"// undo work when the user switches this plugin off:",
		"onDisable(function () { /* put game values back here */ });",
		"",
		"log(\"example plugin loaded - open its section in the Plugins tab\");",
		"",
	].join("\\n");

	function runPlugin(pl: Plugin, code: string) {
		const push = (m: any) => {
			const line = String(m);
			pl.logs.push(line.length > 90 ? line.slice(0, 90) + "..." : line);
			if (pl.logs.length > 6) pl.logs.shift();
			console.log("[" + pl.name + "] " + line);
		};
		const pconsole = { log: push, warn: push, error: push, info: push };
		pl.code = code; pl.attaches = []; pl.replaced = []; pl.impls = []; pl.timers = []; pl.cleanup = []; pl.fails = 0; pl.props = undefined;
		if (pl.enabled === undefined) pl.enabled = true;
		const api = {
			file: pl.file, name: pl.name,
			tab: (fn: any) => { pl.draw = typeof fn === "function" ? fn : null; },
			onFrame: (fn: any) => { pl.frame = typeof fn === "function" ? fn : null; },
			onDisable: (fn: any) => { if (typeof fn === "function") pl.cleanup!.push(fn); },
			props: (defs: any[]) => makeProps(pl, Array.isArray(defs) ? defs : []),
		};
		const pIl2Cpp = new Proxy(Il2Cpp, { get(t: any, k: any) {
			if (k === "perform") return (block: any, flag?: any) => t.perform(() => withOwner(pl, block), flag);
			return Reflect.get(t, k, t);
		} });
		const pSetTimeout = (fn: any, ms?: number, ...a: any[]) => { const id = setTimeout(() => { if (pl.enabled) withOwner(pl, () => fn(...a)); }, ms); pl.timers!.push({ kind: "t", id }); return id; };
		const pSetInterval = (fn: any, ms?: number, ...a: any[]) => { const id = setInterval(() => { if (pl.enabled) withOwner(pl, () => fn(...a)); }, ms); pl.timers!.push({ kind: "i", id }); return id; };
		const pMain = (fn: any, ms?: number) => (globalThis as any).__imguiMain(() => { if (pl.enabled) withOwner(pl, fn); }, ms);
		try {
			const fn = new Function("tab", "onFrame", "onDisable", "props", "log", "notify", "ref", "ui", "plugin", "console", "mainThread",
				"Il2Cpp", "setTimeout", "setInterval", "clearTimeout", "clearInterval", code);
			withOwner(pl, () => fn(api.tab, api.onFrame, api.onDisable, api.props, push, notify, ref, ui, api, pconsole, pMain,
				pIl2Cpp, pSetTimeout, pSetInterval, clearTimeout, clearInterval));
			pl.status = "loaded";
		} catch (e) {
			pl.status = "error: " + e;
			push("load failed: " + e);
		}
	}

	function disablePlugin(pl: Plugin) {
		if (pl.enabled === false) return;
		pl.enabled = false;
		for (const fn of pl.cleanup ?? []) { try { withOwner(pl, fn); } catch (e) { errOnce(pl.name + " onDisable", e); } }
		for (const t of pl.timers ?? []) { try { t.kind === "t" ? clearTimeout(t.id) : clearInterval(t.id); } catch {} }
		let n = 0;
		for (const l of (pl.attaches ?? []).slice().reverse()) { try { l.detach(); n++; } catch (e) { errOnce(pl.name + " detach", e); } }
		const done = new Set<string>();
		const targets = [...(pl.impls ?? []).map(r => r.addr), ...(pl.replaced ?? [])].reverse();
		for (const tgt of targets) {
			if (!tgt) continue;
			const key = String(tgt);
			if (done.has(key)) continue;
			done.add(key);
			try { Interceptor.revert(tgt); n++; } catch (e) { errOnce(pl.name + " revert", e); }
		}
		try { Interceptor.flush(); } catch {}
		pl.attaches = []; pl.replaced = []; pl.impls = []; pl.timers = []; pl.cleanup = []; pl.draw = null; pl.frame = null;
		pl.status = "off" + (n ? " (" + n + " hooks removed)" : "");
		log("plugin off: " + pl.file + (n ? " - " + n + " hooks removed" : ""));
	}
	function enablePlugin(pl: Plugin) {
		if (pl.enabled) return;
		pl.enabled = true;
		if (pl.code !== undefined) { runPlugin(pl, pl.code); log("plugin on: " + pl.file + " - " + pl.status); }
	}
	function setPlugin(pl: Plugin, on: boolean) {
		(globalThis as any).__imguiMain(() => { on ? enablePlugin(pl) : disablePlugin(pl); if (pl.toggle) pl.toggle.v = !!pl.enabled; });
	}
	function scanPlugins(): number {
		if (!pluginDir) return 0;
		if (c_mkdir) try { c_mkdir(Memory.allocUtf8String(pluginDir), 0o771); } catch {}
		let files = listJs(pluginDir);
		if (files === null) { log("plugins: can't read " + pluginDir); return 0; }
		if (files.length === 0 && !pluginsScanned) {
			try { (File as any).writeAllText(pluginDir + "/example_plugin.js", EXAMPLE_PLUGIN); files = ["example_plugin.js"]; }
			catch (e) { log("plugins: couldn't write the example: " + e); }
		}
		pluginsScanned = true;
		let added = 0;
		// Unload plugins whose files were removed. Never do this when the directory
		// scan itself failed, because listJs() already returned above in that case.
		for (let i = pluginList.length - 1; i >= 0; i--) {
			const pl = pluginList[i];
			if (!pl.builtin && !files.includes(pl.file)) {
				if (pl.enabled) disablePlugin(pl);
				pluginList.splice(i, 1);
				log("plugin removed: " + pl.file);
			}
		}
		for (const f of files) {
			let code = "";
			try { code = (File as any).readAllText(pluginDir + "/" + f); }
			catch (e) {
				if (!pluginList.some(p => p.file === f))
					pluginList.push({ name: f, file: f, builtin: false, status: "can't read: " + e, logs: [], draw: null, frame: null, fails: 0 });
				continue;
			}
			const existing = pluginList.find(p => p.file === f);
			if (existing) {
				if (existing.code !== code) {
					const wasOn = existing.enabled !== false;
					if (wasOn) disablePlugin(existing);
					globalThis.__imguiMain(() => {
						runPlugin(existing, code);
						if (!wasOn) existing.enabled = false;
					});
					added++;
				}
				continue;
			}
			const pl: Plugin = { name: f.replace(/\.js$/i, "").replace(/^\d+_/, ""), file: f, builtin: false, status: "loading", logs: [], draw: null, frame: null, fails: 0 };
			pluginList.push(pl);
			(globalThis as any).__imguiMain(() => runPlugin(pl, code));
			added++;
		}
		log("plugins: " + added + " loaded from " + pluginDir);
		return added;
	}
	function requestScan() {
		if (pluginScanPending || !pluginDir) return;
		pluginScanPending = true;
		setTimeout(() => Il2Cpp.perform(() => { try { scanPlugins(); } finally { pluginScanPending = false; } }), 0);
	}
	function pluginsFrame() {
		if (!pluginDir) {
			let base = "";
			try { base = String(need(asmCore, "UnityEngine.Application").method("get_persistentDataPath", 0).invoke().content); } catch {}
			if (!base && appId) base = "/sdcard/Android/data/" + appId + "/files";
			if (base) { pluginDir = base + "/imgui_plugins"; requestScan(); }
		}
		for (const pl of pluginList) {
			if (!pl.frame || pl.enabled === false) continue;
			try { withOwner(pl, () => pl.frame!()); pl.fails = 0; }
			catch (e) { errOnce(pl.name + " onFrame", e); if (++pl.fails >= 3) { pl.frame = null; pl.status = "onFrame switched off: " + e; } }
		}
	}
	interface PropDef {
		type: "bool" | "float" | "int" | "select" | "text" | "button" | "label";
		key?: string; label?: string; desc?: string;
		min?: number; max?: number; decimals?: number;
		default?: any; options?: string[]; values?: string[];
		onClick?: () => void;
	}
	function makeProps(pl: Plugin, defs: PropDef[]): any {
		pl.props = defs.filter(d => d && d.type);
		pl.propRefs = pl.propRefs ?? {};
		const bag: any = {};
		for (const d of pl.props) {
			if (!d.key || d.type === "button" || d.type === "label") continue;
			let def = d.default !== undefined ? d.default
				: d.type === "bool" ? false
				: d.type === "select" ? (d.options?.[0] ?? "")
				: d.type === "text" ? (d.values?.[0] ?? "")
				: (d.min ?? 0);
			if (d.type === "float" || d.type === "int") {
				const lo = d.min ?? 0, hi = d.max ?? (d.type === "int" ? 10 : 1);
				def = Number.isFinite(Number(def)) ? Math.max(lo, Math.min(hi, Number(def))) : lo;
				if (d.type === "int") def = Math.round(def);
			}
			const r = pl.propRefs[d.key] ?? (pl.propRefs[d.key] = ref(
				d.type === "select" ? Math.max(0, (d.options ?? []).indexOf(def))
				: d.type === "text" ? Math.max(0, (d.values ?? [def]).indexOf(def))
				: def));
			Object.defineProperty(bag, d.key, {
				enumerable: true,
				get: () => d.type === "select" ? (d.options ?? [])[r.v] ?? ""
					: d.type === "text" ? ((d.values && d.values.length) ? d.values[r.v] ?? "" : (r.strv ?? def))
					: r.v,
				set: (v: any) => {
					if (d.type === "select") { const i = (d.options ?? []).indexOf(v); if (i >= 0) r.v = i; }
					else if (d.type === "text") { if (d.values && d.values.length) { const i = d.values.indexOf(v); if (i >= 0) r.v = i; } else r.strv = v; }
					else {
						if (d.type === "float" || d.type === "int") {
							const lo = d.min ?? 0, hi = d.max ?? (d.type === "int" ? 10 : 1);
							const n = Number(v);
							if (Number.isFinite(n)) r.v = d.type === "int" ? Math.round(Math.max(lo, Math.min(hi, n))) : Math.max(lo, Math.min(hi, n));
						} else r.v = v;
					}
				},
			});
		}
		pl.propBag = bag;
		return bag;
	}
	function drawProps(pl: Plugin) {
		if (!pl.props) return;
		for (const d of pl.props) {
			const r = d.key ? pl.propRefs![d.key] : null;
			try {
				switch (d.type) {
					case "bool":   if (r) checkbox(d.label ?? d.key!, r, d.desc); break;
					case "float":  if (r) sliderFloat(d.label ?? d.key!, r, d.min ?? 0, d.max ?? 1, d.decimals ?? 2); break;
					case "int":    if (r) sliderInt(d.label ?? d.key!, r, d.min ?? 0, d.max ?? 10); break;
					case "select": if (r) combo(d.label ?? d.key!, r, d.options ?? []); break;
					case "text":   drawTextProp(pl, d, r); break;
					case "button": if (button(d.label ?? d.key ?? "Button") && d.onClick) { try { withOwner(pl, d.onClick); } catch (e) { errOnce(pl.name + " " + (d.key ?? "button"), e); } } break;
					case "label":  text(d.label ?? "", C.TextDisabled); break;
				}
			} catch (e) { errOnce(pl.name + " prop " + (d.key ?? d.type), e); }
		}
	}
	function drawTextProp(pl: Plugin, d: PropDef, r: any) {
		const hasList = !!(d.values && d.values.length);
		const shown = hasList ? (d.values![r.v] ?? "") : (r.strv ?? d.default ?? "");
		if (button((d.label ?? d.key!) + ": " + (shown || "(unset)"))) {
			if (hasList) { r.v = (r.v + 1) % d.values!.length; }
			else notify((d.label ?? d.key!) + " is set from the REPL: plugins.set(\"" + pl.name + "\", \"" + d.key + "\", value)");
		}
		if (d.desc) { sameLine(); text(d.desc, C.TextDisabled); }
	}

	function pluginPage(pl: Plugin) {
		if (pl.props && pl.props.length) drawProps(pl);
		if (pl.draw) {
			try { withOwner(pl, () => pl.draw!(ui)); }
			catch (e) { pl.draw = null; pl.status = "tab switched off: " + e; notify(pl.name + ": tab error"); }
		} else if (!(pl.props && pl.props.length)) text(pl.status === "loaded" ? "(this plugin has no tab UI - it just runs)" : pl.status, C.TextDisabled);
		separator();
		text(pl.file + " - " + pl.status, C.TextDisabled);
		for (const l of pl.logs) text(l, C.TextDisabled);
	}
	function pluginsTab() {
		const list = filePlugins();
		text("Folder: " + (pluginDir || "resolving..."), C.TextDisabled);
		if (button("Load New Plugins")) { requestScan(); notify("Scanning plugins folder"); }
		sameLine(); if (button("All On")) for (const pl of list) setPlugin(pl, true);
		sameLine(); if (button("All Off")) for (const pl of list) setPlugin(pl, false);
		if (!list.length) text("No plugins yet - put .js files in the folder above, then Load New Plugins.", C.TextDisabled);
		for (const pl of list) {
			const on = !!pl.enabled;
			const tag = pl.status.startsWith("error") ? "   [ERROR]" : on ? "   [ON]" : "   [OFF]";
			if (!collapsingHeader(pl.name + tag + "###plugin:" + pl.file, false)) continue;
			indent(12);
			const t = pl.toggle ?? (pl.toggle = ref(on));
			if (checkbox("Enabled", t, pl.file + " - " + pl.status)) setPlugin(pl, t.v);
			if (on) {
				const nh = hookCount(pl);
				text("hooks recorded: " + nh + " (Off removes these)", C.TextDisabled);
				if (nh === 0 && /\.implementation\s*=|Interceptor\.(attach|replace)/.test(pl.code ?? ""))
					text("this plugin hooks but none were recorded - Off can't undo them; restart frida instead", [1, 0.6, 0.4, 1]);
			}
			if (on) {
				if (pl.props && pl.props.length) drawProps(pl);
				if (pl.draw) {
					try { withOwner(pl, () => pl.draw!(ui)); }
					catch (e) { pl.draw = null; pl.status = "settings switched off: " + e; notify(pl.name + ": settings error"); }
				} else if (!(pl.props && pl.props.length) && pl.status.startsWith("loaded")) text("(no settings - it just runs)", C.TextDisabled);
			}
			for (const l of pl.logs) text(l, C.TextDisabled);
			unindent(12);
		}
	}
	function hookCount(pl: Plugin): number {
		const addrs = new Set([...(pl.impls ?? []).map(r => String(r.addr)), ...(pl.replaced ?? []).map(String)]);
		return (pl.attaches?.length ?? 0) + addrs.size;
	}
	function findPlugin(name: string): Plugin | undefined {
		const n = name.toLowerCase().replace(/\.js$/, "");
		return filePlugins().find(p => p.name.toLowerCase() === n || p.file.toLowerCase().replace(/\.js$/, "") === n);
	}
	(globalThis as any).plugins = {
		list: () => filePlugins().map(p => p.file + " - " + (p.enabled ? "on, " + hookCount(p) + " hooks" : "off") + " - " + p.status),
		props: (name: string) => { const p = findPlugin(name); if (!p || !p.props) return "no props"; return p.props.filter(d => d.key).map(d => d.key + " = " + JSON.stringify(p.propBag ? p.propBag[d.key!] : undefined)); },
		set: (name: string, key: string, value: any) => { const p = findPlugin(name); if (!p || !p.propBag) return "no plugin/props"; try { p.propBag[key] = value; return key + " = " + JSON.stringify(p.propBag[key]); } catch (e) { return "" + e; } },
		get: (name: string, key: string) => { const p = findPlugin(name); return p && p.propBag ? p.propBag[key] : undefined; },
		on: (name: string) => { const p = findPlugin(name); if (p) setPlugin(p, true); return p ? "switching on " + p.file : "no plugin " + name; },
		off: (name: string) => { const p = findPlugin(name); if (p) setPlugin(p, false); return p ? "switching off " + p.file : "no plugin " + name; },
	};
	const filePlugins = () => pluginList.filter(p => !p.builtin && !p.status.startsWith("skipped"));

	const setSize = ref(100), setWidth = ref(style.width), setLaser = ref(SHOW_LASER), setHold = ref(MENU_HOLD_X ? 0 : 1);
	const setRounding = ref(style.rounding), setTabH = ref(style.pageMode), setWrist = ref(WRIST_MENU ? 0 : 1);
	const setPageH = ref(style.pageH), setOnTop = ref(ALWAYS_ON_TOP), setStab = ref(STABILIZE), setSpin = ref(SPIRAL_SPIN);
	const setFont = ref(0), setOpacity = ref(1), setTheme = ref(Math.max(0, THEME_NAMES.indexOf(THEME)));
	const setLayout = ref(ROW_LAYOUT ? 0 : 1), setPattern = ref(WINDOW_PATTERN), setHud = ref(HUD_ENABLED);
	function settings() {
		if (sliderInt("Menu Size %", setSize, 40, 300)) setMenuScale(UI_SCALE * setSize.v / 100);
		if (sliderInt("Menu Width", setWidth, 600, 1400)) style.width = setWidth.v;
		if (combo("Menu Position", setWrist, ["Wrist", "Floating"])) { style.wrist = setWrist.v === 0; for (const w of wins.values()) place(w); }
		if (combo("Tab Height", setTabH, ["Fixed (scrolls)", "Match Settings", "Fit Content"])) style.pageMode = setTabH.v;
		if (style.pageMode === 0 && sliderInt("Page Height", setPageH, 120, 900)) style.pageH = setPageH.v;
		if (checkbox("Always On Top", setOnTop, "hands never hide the menu")) style.onTop = setOnTop.v;
		if (checkbox("Stabilize", setStab, "no wrist / pointer shake")) {
			style.stabilize = setStab.v;
			wristPosF.reset(); wristDirF.reset(); rayPosF.reset(); rayDirF.reset();
		}
		if (sliderFloat("Menu Opacity", setOpacity, 0.2, 1)) style.opacity = setOpacity.v;
		if (sliderInt("Rounding", setRounding, 0, 14)) style.rounding = setRounding.v;
		if (combo("Theme", setTheme, THEME_NAMES)) applyTheme(THEME_NAMES[setTheme.v]);
		if (combo("Layout", setLayout, ["Rows", "Compact"])) style.rows = setLayout.v === 0;
		checkbox("Background Pattern", setPattern, "spiral rings behind the menu");
		if (setPattern.v && sliderInt("Spiral Spin", setSpin, -120, 120)) style.spin = setSpin.v;
		checkbox("HUD", setHud, "app, FPS, battery, timer");
		checkbox("Laser", setLaser, "pointer beam from your right hand");
		combo("Open With", setHold, ["Hold X", "Toggle X"]);
		const names = loadedFonts.map(f => f.name);
		if (names.length && combo("Font", setFont, names)) { font = loadedFonts[setFont.v].font; fontVer++; }
		if (button("Send Test Notification")) notify("Test notification");
		sameLine();
		if (button("Recenter")) for (const w of wins.values()) place(w);
		if (DISCORD_URL) {
			sameLine();
			if (button("Join Discord")) confirm("Open Discord?", ["This opens " + DISCORD_URL.replace("https://", "") + " in your browser.", "The game will go to the background."],
				"Open", () => { if (!openUrl(DISCORD_URL)) notify("Couldn't open a browser here - " + DISCORD_URL.replace("https://", ""), 10); });
		}
	}
	function debugGameObjects(includeInactive: boolean = true): number {
		let arr: any = null;
		try {
			const findAll = Resources.tryMethod ? Resources.tryMethod("FindObjectsOfTypeAll", 1) : null;
			if (findAll) arr = findAll.inflate ? findAll.inflate(GameObject).invoke() : findAll.invoke(GameObject.type.object);
		} catch (e) { errOnce("debug GameObject scan", e); }
		if (!arr) { notify("GameObject scan unavailable"); return 0; }
		let printed = 0;
		try { console.log("[imgui][debug] === GameObjects (" + arr.length + ") ==="); } catch {}
		for (let i = 0; i < arr.length; i++) {
			try {
				const go = arr.get(i);
				if (!go || go.isNull()) continue;
				const active = !!M(go, "get_activeInHierarchy", 0)?.invoke();
				if (!includeInactive && !active) continue;
				let name = "<unnamed>";
				try { name = String(M(go, "get_name", 0).invoke().content); } catch {}
				let path = name;
				try {
					let t = M(go, "get_transform", 0).invoke();
					const parts: string[] = [];
					for (let depth = 0; t && !t.isNull() && depth < 64; depth++) {
						let tn = "?"; try { tn = String(M(t, "get_name", 0).invoke().content); } catch {}
						parts.unshift(tn);
						const p = M(t, "get_parent", 0); t = p ? p.invoke() : null;
					}
					if (parts.length) path = parts.join("/");
				} catch {}
				let id = "?"; try { id = String(M(go, "GetInstanceID", 0).invoke()); } catch {}
				console.log("[imgui][debug] " + (active ? "[ACTIVE] " : "[INACTIVE] ") + path + "  (ID " + id + ")");
				printed++;
			} catch {}
		}
		notify("Printed " + printed + " GameObjects to console");
		return printed;
	}
	function debugCountObjects(): number {
		let arr: any = null;
		try {
			const findAll = Resources.tryMethod ? Resources.tryMethod("FindObjectsOfTypeAll", 1) : null;
			if (findAll) arr = findAll.inflate ? findAll.inflate(GameObject).invoke() : findAll.invoke(GameObject.type.object);
		} catch (e) { errOnce("debug GameObject count", e); }
		const n = arr ? arr.length : 0;
		console.log("[imgui][debug] GameObject count: " + n);
		notify("GameObjects: " + n);
		return n;
	}
	function debugAssemblies(): number {
		let n = 0;
		console.log("[imgui][debug] === Assemblies ===");
		for (const a of Il2Cpp.domain.assemblies) { try { console.log("[imgui][debug] " + a.name); n++; } catch {} }
		notify("Printed " + n + " assemblies to console");
		return n;
	}
	function debugRunDiag(): string {
		const r = compatReport();
		console.log("[imgui][debug]\\n" + r);
		notify("Diagnostics printed to console");
		return r;
	}

	let funInput = "";
	let funReply = "";
	let funStatus = "Ready";
	let funKeyboard: any = null;
	let funRequest: any = null;
	let funRequestOp: any = null;
	let funApiKey = "";
	let funModel = "llama-3.3-70b-versatile";


	function funOpenKeyboard() {
		if (!TouchKeyboard) { notify("TouchScreenKeyboard is unavailable"); return; }
		try {
			const m = TouchKeyboard.method("Open", 1);
			funKeyboard = m.invoke(Il2Cpp.string(funInput));
			if (funKeyboard) {
				try { funKeyboard.method("set_characterLimit", 1).invoke(500); } catch {}
				funStatus = "Typing...";
			}
		} catch (e) {
			funKeyboard = null;
			funStatus = "Keyboard error";
			errOnce("fun keyboard", e);
		}
	}

	function funCloseKeyboard() {
		if (!funKeyboard) return;
		try { funKeyboard.method("set_active", 1).invoke(false); } catch {}
		funKeyboard = null;
	}

	function funUpdateKeyboard() {
		if (!funKeyboard) return;
		try {
			const t = funKeyboard.method("get_text", 0).invoke();
			if (t !== null && t !== undefined) funInput = String(t);
		} catch {}
		try {
			const done = !!funKeyboard.method("get_done", 0).invoke();
			const canceled = !!funKeyboard.method("get_wasCanceled", 0).invoke();
			if (canceled) { funStatus = "Canceled"; funCloseKeyboard(); }
			else if (done) { funStatus = funInput.length ? "Ready to send" : "Ready"; funCloseKeyboard(); }
		} catch {}
	}

	function funSend() {
		if (funRequest) { notify("Groq request already running"); return; }
		if (!funApiKey) { notify("Set key first: groq.setKey(\"...\")"); funStatus = "No API key"; return; }
		const prompt = funInput.trim();
		if (!prompt) { notify("Type something first"); return; }
		if (!UnityWebRequest) { notify("UnityWebRequest unavailable"); funStatus = "HTTP unavailable"; return; }

		const body = JSON.stringify({
			model: funModel,
			messages: [
				{ role: "system", content: "You are a fun, concise assistant inside a VR mod menu. Keep replies under 700 characters unless the user asks for more." },
				{ role: "user", content: prompt }
			],
			temperature: 0.8,
			max_completion_tokens: 300
		});

		try {
			const post = UnityWebRequest.method("Post", 3);
			funRequest = post.invoke(Il2Cpp.string("https://api.groq.com/openai/v1/chat/completions"), Il2Cpp.string(body), Il2Cpp.string("application/json"));
			if (!funRequest) throw new Error("Post returned null");
			funRequest.method("SetRequestHeader", 2).invoke(Il2Cpp.string("Authorization"), Il2Cpp.string("Bearer " + funApiKey));
			funRequest.method("SetRequestHeader", 2).invoke(Il2Cpp.string("Accept"), Il2Cpp.string("application/json"));
			try { funRequest.method("set_timeout", 1).invoke(30); } catch {}
			funRequestOp = funRequest.method("SendWebRequest", 0).invoke();
			funStatus = "Thinking...";
			funReply = "";
			console.log("[groq] user: " + prompt);
		} catch (e) {
			funRequest = null; funRequestOp = null;
			funStatus = "Request error";
			errOnce("groq send", e);
			notify("Groq request failed");
		}
	}

	function funPollRequest() {
		if (!funRequest) return;
		try {
			if (funRequestOp && !funRequestOp.method("get_isDone", 0).invoke()) return;
			const err = funRequest.method("get_error", 0).invoke();
			const code = funRequest.method("get_responseCode", 0).invoke();
			const dh = funRequest.method("get_downloadHandler", 0).invoke();
			const raw = dh ? String(dh.method("get_text", 0).invoke() ?? "") : "";
			if (err || code < 200 || code >= 300) {
				funStatus = "HTTP " + code;
				funReply = String(err || raw || "Unknown HTTP error").slice(0, 900);
				console.log("[groq] error " + code + ": " + funReply);
				notify("Groq HTTP " + code);
			} else {
				const data = JSON.parse(raw);
				const reply = data?.choices?.[0]?.message?.content;
				if (!reply) throw new Error("No choices[0].message.content in response");
				funReply = String(reply).trim();
				funStatus = "Done";
				console.log("[groq] assistant: " + funReply);
				notify("Groq replied");
			}
		} catch (e) {
			funStatus = "Parse/error";
			funReply = String(e).slice(0, 900);
			console.log("[groq] " + funReply);
			notify("Groq response error");
		}
		try { funRequest.method("Dispose", 0).invoke(); } catch {}
		funRequest = null; funRequestOp = null;
	}

	(globalThis as any).groq = {
		setKey: (key: string) => { funApiKey = String(key || ""); return !!funApiKey; },
		clearKey: () => { funApiKey = ""; return true; },
		setModel: (model: string) => { funModel = String(model || "llama-3.3-70b-versatile"); return funModel; },
		ask: (prompt: string) => { funInput = String(prompt || ""); funSend(); return true; },
		status: () => ({ status: funStatus, reply: funReply, model: funModel, keySet: !!funApiKey }),
	};

	let toyTimeScale = ref(1.0);
	let toyGravity = ref(9.81);
	let toyRigScale = ref(1.0);
	let toyRainbow = ref(false);
	let toyRainbowAt = 0;
	let toyRainbowMats: { mat: any; color: number[] }[] = [];
	let toySpawned: any[] = [];
	let toyFpsHistory: number[] = [];
	let toyLastFixedDelta = 0.02;

	function toyStaticFloat(cls: any, getter: string, value: number | null = null): number | null {
		if (!cls) return null;
		try {
			const m = cls.method(value === null ? getter : ("set_" + getter.replace(/^get_/, "")), value === null ? 0 : 1);
			if (value === null) return Number(m.invoke());
			m.invoke(value);
			return value;
		} catch { return null; }
	}

	function toyApplyTimeScale(v: number) {
		v = Math.max(0.05, Math.min(4, +v || 1));
		toyTimeScale.v = v;
		if (!TimeCls) return false;
		try {
			TimeCls.method("set_timeScale", 1).invoke(v);
			const fixed = TimeCls.method("get_fixedDeltaTime", 0).invoke();
			if (!toyLastFixedDelta || toyLastFixedDelta <= 0) toyLastFixedDelta = Number(fixed) / Math.max(0.05, v);
			TimeCls.method("set_fixedDeltaTime", 1).invoke(toyLastFixedDelta * v);
			return true;
		} catch (e) { errOnce("game toy timeScale", e); return false; }
	}

	function toyReadGravity(): number {
		if (!PhysicsCls) return toyGravity.v;
		try {
			const g = PhysicsCls.method("get_gravity", 0).invoke();
			return xyz(g)[1];
		} catch { return toyGravity.v; }
	}

	function toyApplyGravity(y: number) {
		y = Math.max(-30, Math.min(30, +y || 0));
		toyGravity.v = y;
		if (!PhysicsCls) return false;
		try {
			PhysicsCls.method("set_gravity", 1).invoke(v3(0, y, 0));
			return true;
		} catch (e) { errOnce("game toy gravity", e); return false; }
	}

	function toyRestore() {
		toyApplyTimeScale(1);
		toyApplyGravity(-9.81);
		toyRigScale.v = 1;
		if (rig.head) call(rig.head, "set_localScale", v3(1, 1, 1));
		if (leftT) call(leftT, "set_localScale", v3(1, 1, 1));
		if (rightT) call(rightT, "set_localScale", v3(1, 1, 1));
		toyRainbow.v = false;
		for (const x of toyRainbowMats) {
			try { call(x.mat, "set_color", col(x.color)); } catch {}
		}
		toyRainbowMats.length = 0;
		for (const go of toySpawned) destroy(go);
		toySpawned.length = 0;
		notify("Game toys reset");
	}

	function toySetRigScale(v: number) {
		v = Math.max(0.5, Math.min(2.5, +v || 1));
		toyRigScale.v = v;
		for (const t of [rig.head, leftT, rightT]) if (t) call(t, "set_localScale", v3(v, v, v));
	}

	function toySpawnCube(launch: boolean = false) {
		const originT = rightT || headT();
		if (!originT) { notify("No hand/head found"); return; }
		const p = get3(originT, "get_position"), f = get3(originT, "get_forward");
		if (!p || !f) { notify("Couldn't read spawn pose"); return; }
		try {
			const go = keep(GameObject.method("CreatePrimitive", 3).invoke(3));
			const t = keep(go.method("get_transform", 0).invoke());
			call(t, "set_position", v3(p[0] + f[0] * 0.25, p[1] + f[1] * 0.25, p[2] + f[2] * 0.25));
			call(t, "set_localScale", v3(0.12, 0.12, 0.12));
			if (RigidbodyCls) {
				const rb = addComp(go, RigidbodyCls);
				if (rb) {
					try { call(rb, "set_mass", 1); } catch {}
					if (launch) call(rb, "set_velocity", v3(f[0] * 8, f[1] * 8, f[2] * 8));
				}
			}
			toySpawned.push(go);
			while (toySpawned.length > 32) destroy(toySpawned.shift());
			notify(launch ? "Launched cube" : "Spawned cube");
		} catch (e) { errOnce("game toy spawn cube", e); notify("Couldn't spawn cube"); }
	}

	function toyExplode() {
		if (!RigidbodyCls || !PhysicsCls) { notify("Physics API unavailable"); return; }
		const t = headT(), p = t ? get3(t, "get_position") : null;
		if (!p) { notify("No head pose"); return; }
		let n = 0;
		try {
			for (const rb of objectsOf(RigidbodyCls)) {
				try {
					const m = rb.method("AddExplosionForce", 4);
					m.invoke(650, v3(p[0], p[1], p[2]), 6, 1.5);
					n++;
				} catch {}
			}
		} catch (e) { errOnce("game toy explosion", e); }
		notify("Physics blast: " + n + " rigidbodies");
	}

	function toyScanRainbow() {
		if (!Renderer || toyRainbowMats.length) return;
		let n = 0;
		try {
			for (const ren of objectsOf(Renderer)) {
				if (n >= 160) break;
				try {
					const mat = call(ren, "get_material");
					if (!mat || mat.isNull()) continue;
					const c = call(mat, "get_color");
					const original = [c.handle.readFloat(), c.handle.add(4).readFloat(), c.handle.add(8).readFloat(), c.handle.add(12).readFloat()];
					toyRainbowMats.push({ mat: keep(mat), color: original });
					n++;
				} catch {}
			}
		} catch (e) { errOnce("game toy rainbow scan", e); }
	}

	function toyUpdateRainbow() {
		if (!toyRainbow.v) return;
		const now = Date.now();
		if (now - toyRainbowAt < 90) return;
		toyRainbowAt = now;
		if (!toyRainbowMats.length) toyScanRainbow();
		const phase = now * 0.002;
		for (let i = 0; i < toyRainbowMats.length; i++) {
			const h = (phase + i * 0.17) % (Math.PI * 2);
			const r = 0.5 + 0.5 * Math.sin(h);
			const g = 0.5 + 0.5 * Math.sin(h + 2.094);
			const b = 0.5 + 0.5 * Math.sin(h + 4.188);
			try { call(toyRainbowMats[i].mat, "set_color", col([r, g, b, toyRainbowMats[i].color[3]])); } catch {}
		}
	}

	function toyRandomEvent() {
		const pick = Math.floor(Math.random() * 6);
		if (pick === 0) { toyApplyTimeScale([0.25, 0.5, 1.5, 2.5][Math.floor(Math.random() * 4)]); notify("Random event: time warp"); }
		else if (pick === 1) { toyApplyGravity([0, -2, -30, 3, 9.81][Math.floor(Math.random() * 5)]); notify("Random event: gravity roulette"); }
		else if (pick === 2) { toySpawnCube(true); }
		else if (pick === 3) { toyRainbow.v = !toyRainbow.v; if (toyRainbow.v) toyScanRainbow(); notify("Random event: rainbow world"); }
		else if (pick === 4) { toyExplode(); }
		else { toySetRigScale([0.65, 1.5, 2.0][Math.floor(Math.random() * 3)]); notify("Random event: rig size"); }
	}

	function toyUpdate() {
		toyUpdateRainbow();
		const f = Math.max(0, Math.min(240, fps));
		toyFpsHistory.push(f);
		while (toyFpsHistory.length > 24) toyFpsHistory.shift();
	}


	let visualRainbow = false, visualInvert = false, visualCRT = false, visualMatrix = false;
	let visualError = false, visualDoom = false, visualWin95 = false;
	let visualBaseColors: { [k: string]: number[] } | null = null;

	function visualSetup() {
		if (visualBaseColors) return;
		visualBaseColors = {};
		for (const k in C) visualBaseColors[k] = C[k].slice();
	}
	function visualRgb(t: number): number[] {
		return [0.5 + 0.5 * Math.sin(t), 0.5 + 0.5 * Math.sin(t + 2.094), 0.5 + 0.5 * Math.sin(t + 4.188), 1];
	}
	function visualApply() {
		visualSetup();
		const base = visualBaseColors!;
		for (const k in base) C[k] = base[k].slice();
		const t = Date.now() * 0.003;
		if (visualRainbow) {
			const rgb = visualRgb(t);
			for (const k of ["Accent","Button","ButtonHovered","ButtonActive","Header","HeaderHovered","HeaderActive","TabHovered","TabActive","SliderFill","SliderFillActive","SliderGrab","SliderGrabActive","Laser"])
				if (C[k]) C[k] = [rgb[0], rgb[1], rgb[2], C[k][3]];
			C.Border = [rgb[0], rgb[1], rgb[2], base.Border[3]];
		}
		if (visualInvert) for (const k in C) {
			const b = C[k]; C[k] = [1 - b[0], 1 - b[1], 1 - b[2], b[3]];
		}
		if (visualDoom) {
			C.WindowBg=[0.035,0,0,0.97]; C.TitleBg=[0.08,0,0,1]; C.TitleBgActive=[0.22,0,0,1];
			C.Accent=[1,0.12,0.02,1]; C.Button=[0.42,0.015,0.005,0.9]; C.ButtonHovered=[0.9,0.04,0.01,1]; C.ButtonActive=[1,0.16,0.02,1];
			C.Text=[1,0.72,0.58,1]; C.TextDisabled=[0.7,0.35,0.2,0.85];
		}
		if (visualWin95) {
			C.WindowBg=[0.72,0.72,0.72,1]; C.TitleBg=[0.02,0.18,0.55,1]; C.TitleBgActive=[0.05,0.28,0.75,1];
			C.RowBg=[0.82,0.82,0.82,1]; C.FrameBg=[0.9,0.9,0.9,1]; C.FrameBgHovered=[1,1,1,1]; C.FrameBgActive=[0.7,0.8,0.95,1];
			C.Button=[0.78,0.78,0.78,1]; C.ButtonHovered=[0.92,0.92,0.92,1]; C.ButtonActive=[0.65,0.75,0.9,1];
			C.Text=[0,0,0,1]; C.TextDisabled=[0.25,0.25,0.25,1]; C.Accent=[0.02,0.18,0.55,1]; C.Border=[0.1,0.1,0.1,1];
		}
		style.opacity = visualCRT ? 0.86 : 1;
		style.spin = visualCRT ? 75 : SPIRAL_SPIN;
	}
	function visualMatrixLines(): string[] {
		const chars="01アイウエオカキクケコｱｲｳｴｵ";
		const out:string[]=[]; const seed=Math.floor(Date.now()/140);
		for(let row=0;row<5;row++){let line="";for(let col=0;col<24;col++)line+=chars[(seed+row*17+col*31)%chars.length];out.push(line);}
		return out;
	}

	function funTab() {
		text("Groq AI", C.Accent);
		text("Type a prompt with the Quest keyboard, then send it.", C.TextDisabled);
		if (button("Prompt: " + (funInput ? funInput.slice(0, 72) : "(tap to type)"))) funOpenKeyboard();
		if (button("Send to Groq")) funSend();
		if (funRequest) progressBar(0.5, "Groq is thinking...");
		text("Status: " + funStatus, C.TextDisabled);
		if (funReply) {
			separator();
			text("Response:", C.Accent);
			for (const line of funReply.split(/\\n/)) text(line.slice(0, 180), C.Text);
		}
		separator();
		text("Visual Toys", C.Accent);
		text("Purely visual effects for the menu and HUD.", C.TextDisabled);
		if (button("Rainbow UI")) {
			visualRainbow=!visualRainbow; notify("Rainbow UI "+(visualRainbow?"on":"off"));
		}
		if (button("Invert UI")) {
			visualInvert=!visualInvert; notify("UI invert "+(visualInvert?"on":"off"));
		}
		if (button("CRT Mode")) {
			visualCRT=!visualCRT; notify("CRT mode "+(visualCRT?"on":"off"));
		}
		if (button("Matrix Rain")) {
			visualMatrix=!visualMatrix; notify("Matrix rain "+(visualMatrix?"on":"off"));
		}
		if (button("Fake Error Screen")) { visualError=!visualError; notify("Fake error screen "+(visualError?"on":"off")); }
		if (button("Doom Mode")) { visualDoom=!visualDoom; notify("Doom mode "+(visualDoom?"on":"off")); }
		if (button("Windows 95 Mode")) { visualWin95=!visualWin95; notify("Windows 95 mode "+(visualWin95?"on":"off")); }
		if (button("Reset Visual Toys")) {
			visualRainbow=false; visualInvert=false; visualCRT=false; visualMatrix=false; visualError=false; visualDoom=false; visualWin95=false; visualApply();
			notify("Visual toys reset");
		}

		if (visualMatrix) {
			text("MATRIX RAIN", C.Accent);
			for (const line of visualMatrixLines()) text(line, C.Text);
		}
		if (visualError) {
			separator();
			text("████ SYSTEM FAILURE ████", C.Accent);
			text("KERNEL PANIC: UI.EXE", C.Text);
			text("ERROR 0xC0FFEE", C.Text);
			text("Reality.dll has stopped responding.", C.TextDisabled);
			text("Press RESET to continue.", C.TextDisabled);
		}
		if (visualCRT) {
			text("────────────────────────", C.TextDisabled);
			text("CRT SIGNAL // 60Hz // SCANLINES", C.TextDisabled);
		}

		separator();
		text("API key: " + (funApiKey ? "set (runtime only)" : "not set"), C.TextDisabled);
		text("Frida console: groq.setKey(\"...\")", C.TextDisabled);
		text("Key is not stored in the repo.", C.TextDisabled);
		separator();
		toysTabBody();
	}


	function info() {
		const bad = [1, 0.45, 0.5, 1];
		text("FPS: " + fps.toFixed(0) + "   |   script cost: " + (perfStats.tickMs + perfStats.lateMs).toFixed(1) + " ms/frame, UI passes " + perfStats.fullPerSec.toFixed(0) + "/s");
		text("App: " + appId);
		text("Frame hook: " + driverSrc + " | head: " + (rig.headSrc || "not found"), rig.head ? C.Text : bad);
		text("Hands: " + (rig.left ? rig.handSrc : "not found (retrying)"), rig.left ? C.Text : bad);
		text("Open: " + openSrc + " | pointer: " + pointerMode, C.Text);
		text("Trigger: " + triggerSource + (triggerInputAvailable ? " | ready" : " | fallback"), C.TextDisabled);
		text("Background: " + (patternTex ? "pattern ok" : patternTried ? "pattern unavailable" : "-"), C.TextDisabled);
		text("Renderer: canvas " + rectMode + (roundOK ? ", rounded (" + meshCache.size + " meshes, " + meshMode + ")" : "") + (topMat ? ", on-top ok" : ""), C.TextDisabled);
		text("Stabilizer: " + (lateActive() ? "render-time anchoring" : "update-time anchoring") + (style.stabilize ? " + jitter filter" : ""), C.TextDisabled);
	}

	let patternTex: any = null, patternTried = false;
	function pickOverload(obj: any, klass: any, name: string, count: number, ok: (ps: any[]) => boolean): any {
		try { const m = obj.method(name, count); if (ok(m.parameters)) return m; } catch {}
		for (const m of klass.methods) {
			if (m.name !== name || m.parameterCount !== count || !ok(m.parameters)) continue;
			const b = bindTo(m, obj);
			if (b) return b;
		}
		throw new Error(name + "/" + count + " overload not found");
	}
	function pickOverloadOrNull(obj: any, klass: any, name: string, count: number, ok: (ps: any[]) => boolean): any {
		try { return pickOverload(obj, klass, name, count, ok); } catch { return null; }
	}
	function uploadTexture(bytes: Uint8Array, n: number): any {
		const Tex2D = asmCore.tryClass("UnityEngine.Texture2D");
		if (!Tex2D) throw new Error("Texture2D stripped");
		const tex = Tex2D.alloc();
		pickOverload(tex, Tex2D, ".ctor", 4, ps => ps[2].type.name.endsWith("TextureFormat") && ps[3].type.name === "System.Boolean")
			.invoke(n, n, 4 , false);
		let uploaded = false;
		try {
			const buf = Memory.alloc(bytes.length);
			buf.writeByteArray(bytes.buffer as ArrayBuffer);
			const m = pickOverloadOrNull(tex, Tex2D, "LoadRawTextureData", 2, ps => ps[0].type.name === "System.IntPtr");
			if (m) { m.invoke(buf, bytes.length); uploaded = true; }
		} catch {}
		if (!uploaded) try {
			const ByteCls = asmCore.tryClass("System.Byte") ?? Il2Cpp.corlib.class("System.Byte");
			const m = pickOverloadOrNull(tex, Tex2D, "LoadRawTextureData", 1, ps => /Byte\[\]$/.test(ps[0].type.name));
			if (m && ByteCls) { m.invoke(rawArray(ByteCls, bytes.length, bytes.buffer as ArrayBuffer)); uploaded = true; }
		} catch {}
		if (!uploaded) try {
			const C32 = asmCore.tryClass("UnityEngine.Color32");
			const m = pickOverloadOrNull(tex, Tex2D, "SetPixels32", 1, ps => /Color32\[\]$/.test(ps[0].type.name));
			if (m && C32) { m.invoke(rawArray(C32, bytes.length / 4, bytes.buffer as ArrayBuffer)); uploaded = true; }
		} catch {}
		if (!uploaded) throw new Error("no usable texture-upload method (LoadRawTextureData / SetPixels32)");
		let applied = false;
		for (const k of [2, 1, 0]) {
			try { const m = tex.method("Apply", k); k === 2 ? m.invoke(false, true) : k === 1 ? m.invoke(false) : m.invoke(); applied = true; break; } catch {}
		}
		if (!applied) throw new Error("Texture2D.Apply stripped");
		try { tex.method("set_wrapMode", 1).invoke(1); } catch {}
		return protectAsset(tex);
	}
	function getPatternTex(): any {
		if (patternTried || !WINDOW_PATTERN) return patternTex;
		patternTried = true;
		try { patternTex = uploadTexture(patternBytes, PAT_N); log("background pattern ready"); }
		catch (e) { log("background pattern off: " + e); }
		return patternTex;
	}

	const MeshCls = asmCore.tryClass("UnityEngine.Mesh");
	const CanvasRendererCls = asmUIM.tryClass("UnityEngine.CanvasRenderer");
	const UIImage = asmUI.tryClass("UnityEngine.UI.Image");
	const VertexHelper = asmUI.tryClass("UnityEngine.UI.VertexHelper");
	const Color32Cls = asmCore.tryClass("UnityEngine.Color32");
	const Vector4Cls = asmCore.tryClass("UnityEngine.Vector4");
	const RectTransformCls = asmCore.tryClass("UnityEngine.RectTransform");

	const B_BG = 0, B_PATTERN = 1, B_ROW = 2, B_FRAME = 3, B_FILL = 4, B_TEXT = 5, B_POPUP = 6, B_POPUPROW = 7,
	      B_POPUPTEXT = 8, B_MODAL = 9, B_MODALTEXT = 10, B_CURSOR = 11, NBUCKETS = 12;
	const RECT_BUCKET = [B_BG, B_ROW, B_FRAME, B_FILL, B_POPUP, B_POPUPROW, B_MODAL, B_CURSOR];
	const textBucket = (l: number) => l >= L_MODAL ? B_MODALTEXT : l >= L_POPUP ? B_POPUPTEXT : B_TEXT;

	let shapesTried = false, rectMode: "mesh" | "image" | "none" = "none", roundOK = false;
	let circleTex: any = null, ringTex: any = null, unitMesh: any = null, uiMat: any = null, topMat: any = null;
	let meshMode: "" | "arrays" | "vh" = "";
	const meshCache = new Map<string, any>();

	function rawArray(klass: any, count: number, data: ArrayBuffer): any {
		const arr = Il2Cpp.array(klass, count);
		let base: any = null;
		try { base = arr.elements.handle; } catch {}
		if (!base) base = arr.handle.add(Process.pointerSize * 4);
		base.writeByteArray(data);
		return arr;
	}
	function buildMeshArrays(verts: number[], uvs: number[], tris: number[]): any {
		const mesh = protectAsset(MeshCls.new());
		const n = verts.length / 3;
		mesh.method("set_vertices", 1).invoke(rawArray(Vector3, n, new Float32Array(verts).buffer as ArrayBuffer));
		mesh.method("set_uv", 1).invoke(rawArray(Vector2, n, new Float32Array(uvs).buffer as ArrayBuffer));
		let coloured = false;
		if (Color32Cls) try { mesh.method("set_colors32", 1).invoke(rawArray(Color32Cls, n, new Uint8Array(n * 4).fill(255).buffer as ArrayBuffer)); coloured = true; } catch {}
		if (!coloured) mesh.method("set_colors", 1).invoke(rawArray(ColorCls, n, new Float32Array(n * 4).fill(1).buffer as ArrayBuffer));
		const ia = rawArray(Il2Cpp.corlib.class("System.Int32"), tris.length, new Int32Array(tris).buffer as ArrayBuffer);
		const attempts: (() => void)[] = [
			() => mesh.method("set_triangles", 1).invoke(ia),
			() => mesh.method("SetTriangles", 2).invoke(ia, 0),
			() => mesh.method("SetIndices", 3).invoke(ia, 0 , 0),
		];
		for (let i = 0; i < attempts.length; i++) {
			try { attempts[i](); return mesh; } catch (e) { if (i === attempts.length - 1) throw e; }
		}
		return mesh;
	}
	let vhAddVert: { v4: boolean } | null = null;
	function buildMeshVH(verts: number[], uvs: number[], tris: number[]): any {
		if (!VertexHelper || !Color32Cls) throw new Error("VertexHelper unavailable");
		const vh = VertexHelper.new();
		const add = pickOverload(vh, VertexHelper, "AddVert", 3, ps => ps[1].type.name.endsWith("Color32") && /Vector[24]$/.test(ps[2].type.name));
		if (!vhAddVert) vhAddVert = { v4: add.parameters ? String(add.parameters[2].type.name).endsWith("Vector4") : false };
		const white = (() => { const p = Memory.alloc(4); p.writeU32(0xffffffff); return new Il2Cpp.ValueType(p, Color32Cls.type); })();
		for (let i = 0; i < verts.length / 3; i++) {
			const uv = vhAddVert.v4 ? vt(Vector4Cls, [uvs[i * 2], uvs[i * 2 + 1], 0, 0]) : v2(uvs[i * 2], uvs[i * 2 + 1]);
			add.invoke(v3(verts[i * 3], verts[i * 3 + 1], verts[i * 3 + 2]), white, uv);
		}
		const tri = vh.method("AddTriangle", 3);
		for (let i = 0; i < tris.length; i += 3) tri.invoke(tris[i], tris[i + 1], tris[i + 2]);
		const mesh = protectAsset(MeshCls.new());
		vh.method("FillMesh", 1).invoke(mesh);
		try { vh.method("Dispose", 0).invoke(); } catch {}
		return mesh;
	}
	function buildMesh(verts: number[], uvs: number[], tris: number[]): any {
		if (meshMode !== "vh") {
			try { const m = buildMeshArrays(verts, uvs, tris); meshMode = "arrays"; return m; }
			catch (e) { if (meshMode === "arrays") throw e; log("mesh arrays unavailable (" + e + ") - using VertexHelper"); meshMode = "vh"; }
		}
		return buildMeshVH(verts, uvs, tris);
	}
	function cached(key: string, make: () => any): { mesh: any; owned: boolean } {
		const hit = meshCache.get(key);
		if (hit) return { mesh: hit, owned: false };
		const mesh = make();
		if (meshCache.size < 800) { meshCache.set(key, mesh); return { mesh, owned: false }; }
		return { mesh, owned: true };
	}

	const meshKey = (w: number, h: number, r: number, corners: number) => w + "x" + h + "r" + r + "c" + corners;
	function roundedMesh(w: number, h: number, r: number, corners: number = ALL_CORNERS) {
		w = Math.max(1, Math.round(w)); h = Math.max(1, Math.round(h)); r = Math.round(r * 2) / 2;
		return cached(meshKey(w, h, r, corners), () => {
			const xs = [-w / 2, -w / 2 + r, w / 2 - r, w / 2], ys = [h / 2, h / 2 - r, -h / 2 + r, -h / 2];
			const us = [0, 0.5, 0.5, 1], vs = [1, 0.5, 0.5, 0];
			const cornerBit: { [k: string]: number } = { "0,0": 1, "2,0": 2, "2,2": 4, "0,2": 8 };
			const verts: number[] = [], uvs: number[] = [], tris: number[] = [];
			for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) {
				const bit = cornerBit[i + "," + j];
				const square = bit !== undefined && !(corners & bit);
				const base = verts.length / 3;
				for (const [di, dj] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
					verts.push(xs[i + di], ys[j + dj], 0);
					uvs.push(square ? 0.5 : us[i + di], square ? 0.5 : vs[j + dj]);
				}
				tris.push(base, base + 1, base + 3, base, base + 3, base + 2);
			}
			return buildMesh(verts, uvs, tris);
		});
	}
	function roundedPolyPoints(w: number, h: number, r: number): number[][] {
		r = Math.max(0, Math.min(r, w / 2, h / 2));
		const seg = 8, pts: number[][] = [[0, 0]];
		const cs = [[-w / 2 + r, h / 2 - r, 180], [w / 2 - r, h / 2 - r, 90], [w / 2 - r, -h / 2 + r, 0], [-w / 2 + r, -h / 2 + r, -90]];
		for (const [cx, cy, a0] of cs) for (let k = 0; k <= seg; k++) {
			const a = (a0 - 90 * k / seg) * Math.PI / 180;
			pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
		}
		return pts;
	}
	function spiralUVs(pts: number[][], w: number, h: number, angleDeg: number): number[] {
		const cx = w * SPIRAL_CENTER;
		const R = Math.max(Math.hypot(w / 2 + Math.abs(cx), h / 2), 1);
		const k = 0.5 / R, a = -angleDeg * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
		const uvs: number[] = [];
		for (const [x, y] of pts) {
			const dx = (x - cx) * k, dy = y * k;
			uvs.push(0.5 + dx * ca - dy * sa, 0.5 + dx * sa + dy * ca);
		}
		return uvs;
	}
	const same4 = (a: number[] | undefined, b: number[]) => !!a && a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
	function setMeshUVs(e: any, uvs: number[]): boolean {
		try {
			const m = M(e.pmesh, "set_uv", 1);
			if (!m || paused(m)) return false;
			const n = uvs.length / 2;
			const arr = Il2Cpp.array(Vector2, n);
			let base: any = null;
			try { base = arr.elements.handle; } catch {}
			(base ?? arr.handle.add(Process.pointerSize * 4)).writeByteArray(new Float32Array(uvs).buffer as ArrayBuffer);
			m.invoke(arr);
			return true;
		} catch (err) { errOnce("spiral uv", err); return false; }
	}

	function assetsAlive(): boolean {
		if (rectMode === "image") return true;
		if (rectMode !== "mesh") return false;
		if (!alive(unitMesh)) return false;
		if (roundOK && (!alive(circleTex) || !alive(ringTex))) return false;
		if (topMat && !alive(topMat)) return false;
		return true;
	}
	let lastAssetCheck = 0;
	function rebuildShapes() {
		log("menu assets were freed (scene load) - rebuilding");
		// Protected meshes/materials/textures do not get reclaimed automatically,
		// so release every generated asset before rebuilding them.
		const doomed = new Set<any>();
		for (const m of meshCache.values()) doomed.add(m);
		if (unitMesh) doomed.add(unitMesh);
		if (circleTex) doomed.add(circleTex);
		if (ringTex) doomed.add(ringTex);
		if (uiMat) doomed.add(uiMat);
		if (topMat) doomed.add(topMat);
		for (const w of wins.values()) {
			if (w.pattern?.pmesh) doomed.add(w.pattern.pmesh);
			for (const pool of w.rpool ?? []) for (const e of pool) if (e?.owned) doomed.add(e.owned);
		}
		for (const o of doomed) { try { destroy(o); } catch {} }
		meshCache.clear();
		activeId = ""; activeWin = null; dragWin = null; resizeStart = null; scrollDrag = null; openPopup = null;
		shapesTried = false; roundOK = false; meshMode = "";
		circleTex = ringTex = unitMesh = uiMat = topMat = null;
		for (const w of wins.values()) {
			if (w.root) { try { destroy(w.root); } catch {} }
			w.root = w.rootT = w.canvas = w.canvasT = w.pattern = null;
			w.buckets = []; w.rpool = []; w.tpool = []; w.rootOn = false; w.poseDirty = true; w.pattern = null;
			w.cursorEl = undefined;
		}
		initShapes();
	}
	function makeShapeMaterial(): any {
		const MatCls = asmCore.tryClass("UnityEngine.Material");
		if (!MatCls || !menuShader) return null;
		const hasShaderCtor = MatCls.methods.some((m: any) => m.name === ".ctor" && m.parameterCount === 1 && m.parameters[0].type.name === "UnityEngine.Shader");
		if (!hasShaderCtor) return null;
		try {
			const m = MatCls.alloc();
			pickOverload(m, MatCls, ".ctor", 1, ps => ps[0].type.name === "UnityEngine.Shader").invoke(menuShader);
			return protectAsset(m);
		} catch (e) { errOnce("make shape material", e); return null; }
	}
	function initShapes() {
		if (shapesTried) return;
		shapesTried = true;
		uiMat = makeShapeMaterial();
		if (uiMat) log("shape material: built on " + menuShaderName);
		if (!uiMat) {
			try { uiMat = keep(Canvas.method("GetDefaultCanvasMaterial", 0).invoke()); if (uiMat) log("shape material: default canvas material"); }
			catch (e) { errOnce("default UI material", e); }
			if (uiMat && menuShader) { try { call(uiMat, "set_shader", menuShader); } catch {} }
		}
		if (uiMat) try {
			const MatCls = need(asmCore, "UnityEngine.Material");
			const m = MatCls.alloc();
			pickOverload(m, MatCls, ".ctor", 1, ps => ps[0].type.name === "UnityEngine.Material").invoke(uiMat);
			if (menuShader) { try { call(m, "set_shader", menuShader); } catch {} }
			let ok = false;
			for (const name of ["SetInt", "SetFloat"]) {
				try {
					pickOverload(m, MatCls, name, 2, ps => ps[0].type.name === "System.String").invoke(Il2Cpp.string("unity_GUIZTestMode"), name === "SetInt" ? 8 : 8.0);
					ok = true; break;
				} catch {}
			}
			if (ok) topMat = protectAsset(m);
		} catch (e) { log("always-on-top unavailable: " + e); }
		try {
			if ((SHAPES as string) === "image") throw new Error("SHAPES = \"image\"");
			if (!MeshCls || !CanvasRendererCls) throw new Error("Mesh/CanvasRenderer stripped");
			unitMesh = buildMesh([-0.5, 0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0], [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], [0, 1, 3, 0, 3, 2]);
			rectMode = "mesh";
			try { circleTex = uploadTexture(circleBytes, CIRC_N); ringTex = uploadTexture(ringBytes, CIRC_N); roundOK = true; }
			catch (e) { log("rounded corners off (square shapes): " + e); }
		} catch (e) {
			rectMode = UIImage ? "image" : "none";
			log("canvas meshes unavailable (" + e + ") - " + (UIImage ? "using square UI.Image shapes" : "no shapes"));
		}
		log("canvas renderer: " + rectMode + (roundOK ? ", rounded corners on" : "") + (meshMode ? " (" + meshMode + ")" : "") +
			(topMat ? ", always-on-top ready" : ""));
	}
	const matFor = () => (style.onTop && topMat) ? topMat : uiMat;

	function ensureWinObjects(w: Win): boolean {
		if (w.root && !alive(w.root)) {
			w.root = w.rootT = w.canvas = w.canvasT = w.pattern = null;
			w.buckets = []; w.rpool = []; w.tpool = []; w.rootOn = false; w.poseDirty = true;
		}
		if (w.root) return true;
		if (budget < 4) return false;
		budget -= 4;
		initShapes();
		try {
			const root = newGO("imgui_" + w.title);
			persist(root);
			const rootT = keep(root.method("get_transform").invoke());
			probeStructArrays(rootT);
			const cgo = newGO("imgui_canvas");
			const canvas = keep(addComp(cgo, Canvas));
			const canvasT = keep(cgo.method("get_transform").invoke());
			call(canvasT, "SetParent", rootT, false);
			call(canvasT, "set_localPosition", v3(0, 0, 0));
			call(canvasT, "set_localRotation", qt([0, 0, 0, 1]));
			call(canvasT, "set_localScale", v3(1, 1, 1));
			if (canvas) call(canvas, "set_renderMode", 2);
			const scaler = addComp(cgo, CanvasScaler);
			if (scaler) call(scaler, "set_dynamicPixelsPerUnit", 3.0);
			const buckets: any[] = [];
			for (let b = 0; b < NBUCKETS; b++) {
				const g = newGO("imgui_layer" + b);
				if (b === B_PATTERN || b === B_CURSOR) addComp(g, Canvas);
				const t = keep(g.method("get_transform").invoke());
				call(t, "SetParent", canvasT, false);
				buckets.push(t);
			}
			w.root = root; w.rootT = rootT; w.canvas = canvas; w.canvasT = canvasT; w.buckets = buckets;
			w.rpool = buckets.map(() => []); w.tpool = buckets.map(() => []);
			w.rootOn = true; w.poseDirty = true;
			return true;
		} catch (e) { errOnce("window objects", e); return false; }
	}

	function makeRect(parentT: any): any {
		const go = newGO("imgui_rect");
		if (RectTransformCls) try { addComp(go, RectTransformCls); } catch {}
		let cr: any = null, img: any = null;
		if (rectMode === "mesh") {
			cr = keep(addComp(go, CanvasRendererCls));
			if (cr) {
				call(cr, "set_materialCount", 1);
				pickOverload(cr, CanvasRendererCls, "SetMaterial", 2, ps => ps[1].type.name === "System.Int32").invoke(matFor(), 0);
				call(cr, "SetMesh", unitMesh);
				if (circleTex) call(cr, "SetTexture", circleTex);
			}
		} else if (rectMode === "image") {
			img = keep(addComp(go, UIImage));
			if (img) { try { img.method("set_raycastTarget", 1).invoke(false); } catch {} if (topMat && style.onTop) call(img, "set_material", topMat); }
		}
		const tr = keep(go.method("get_transform").invoke());
		call(tr, "SetParent", parentT, false);
		call(tr, "set_localRotation", qt([0, 0, 0, 1]));
		call(tr, "set_localScale", v3(1, 1, 1));
		return { go, tr, cr, img, k: { mk: "unit", tex: TEX_FILL, mat: matFor() } as any };
	}
	function makeText(w: Win, parentT: any): any {
		const go = newGO("imgui_text");
		const txt = keep(addComp(go, UIText));
		const tr = keep(go.method("get_transform").invoke());
		call(tr, "SetParent", parentT, false);
		call(tr, "set_localRotation", qt([0, 0, 0, 1]));
		call(tr, "set_localScale", v3(1, 1, 1));
		let cr: any = null;
		if (txt) {
			call(txt, "set_horizontalOverflow", 1);
			call(txt, "set_verticalOverflow", 1);
			try { txt.method("set_raycastTarget", 1).invoke(false); } catch {}
			if (CanvasRendererCls) cr = keep(getComp(go, CanvasRendererCls));
		}
		if (w.hud && OutlineCls) addComp(go, OutlineCls);
		return { go, tr, txt, cr, k: {} as any };
	}
	function setCull(e: any, on: boolean) {
		if (e.k.cull === on) return;
		if (e.cr) call(e.cr, "set_cull", on);
		else call(e.go, "SetActive", !on);
		e.k.cull = on;
	}
	function hideFrom(list: any[], from: number) {
		for (let j = from; j < list.length; j++) if (list[j]) setCull(list[j], true);
	}

	function syncRect(w: Win, b: number, i: number, c: RCmd) {
		const pool = w.rpool[b];
		let e = pool[i];
		if (!e) {
			if (budget <= 0 || rectMode === "none") return;
			budget--;
			try { e = pool[i] = makeRect(w.buckets[b]); } catch (err) { errOnce("rect", err); return; }
		}
		const k = e.k;
		setCull(e, false);
		const px = c.x + c.w / 2, py = -(c.y + c.h / 2);
		if (k.px !== px || k.py !== py) { call(e.tr, "set_localPosition", v3(px, py, 0)); k.px = px; k.py = py; }
		const rot = c.rot ?? 0;
		if (k.rot !== rot) {
			const half = -rot * Math.PI / 360;
			call(e.tr, "set_localRotation", qt([0, 0, Math.sin(half), Math.cos(half)]));
			k.rot = rot;
		}
		if (e.img) {
			if (k.w !== c.w || k.h !== c.h) { call(e.tr, "set_sizeDelta", v2(c.w, c.h)); k.w = c.w; k.h = c.h; }
			if (!same4(k.col, c.c)) { call(e.img, "set_color", col(c.c)); k.col = c.c.slice(); }
			return;
		}
		if (!e.cr) return;
		const m = matFor();
		if (k.mat !== m) { pickOverload(e.cr, CanvasRendererCls, "SetMaterial", 2, ps => ps[1].type.name === "System.Int32").invoke(m, 0); k.mat = m; }
		const tex = c.tex ?? TEX_FILL;
		if (roundOK && k.tex !== tex) { call(e.cr, "SetTexture", tex === TEX_RING ? ringTex : circleTex); k.tex = tex; }
		const rad = roundOK ? Math.min(c.rad ?? 0, c.w / 2, c.h / 2) : 0;
		let sx = c.w, sy = c.h;
		if (rad >= 1) {
			const corners = c.corners ?? ALL_CORNERS;
			const mw = Math.max(1, Math.round(c.w)), mh = Math.max(1, Math.round(c.h)), mr = Math.round(rad * 2) / 2;
			if (k.mw !== mw || k.mh !== mh || k.mr !== mr || k.mc !== corners || k.mk === "unit") {
				try {
					const got = roundedMesh(c.w, c.h, rad, corners);
					call(e.cr, "SetMesh", got.mesh);
					if (e.owned) destroy(e.owned);
					e.owned = got.owned ? got.mesh : null;
					k.mw = mw; k.mh = mh; k.mr = mr; k.mc = corners; k.mk = "round";
				} catch (err) { errOnce("rounded mesh", err); }
			}
			if (k.mk === "round") { sx = 1; sy = 1; }
		} else if (k.mk !== "unit") {
			call(e.cr, "SetMesh", unitMesh);
			if (e.owned) { destroy(e.owned); e.owned = null; }
			k.mk = "unit"; k.mw = -1;
		}
		if (k.w !== sx || k.h !== sy) { call(e.tr, "set_localScale", v3(sx, sy, 1)); k.w = sx; k.h = sy; }
		if (!same4(k.col, c.c)) { call(e.cr, "SetColor", col(c.c)); k.col = c.c.slice(); }
	}
	function syncText(w: Win, b: number, i: number, c: TCmd) {
		const pool = w.tpool[b];
		let e = pool[i];
		if (!e) {
			if (budget <= 0) return;
			budget -= 2;
			try { e = pool[i] = makeText(w, w.buckets[b]); } catch (err) { errOnce("text", err); return; }
		}
		const k = e.k, t = e.txt;
		setCull(e, false);
		const px = c.x + c.w / 2, py = -(c.y + c.h / 2);
		if (k.px !== px || k.py !== py) { call(e.tr, "set_localPosition", v3(px, py, 0)); k.px = px; k.py = py; }
		if (k.w !== c.w || k.h !== c.h) { call(e.tr, "set_sizeDelta", v2(c.w, c.h)); k.w = c.w; k.h = c.h; }
		if (!t) return;
		const m = style.onTop && topMat ? topMat : null;
		if (k.mat !== m && (m || k.mat)) { call(t, "set_material", m ?? uiMat); k.mat = m; }
		const fs = c.fs ?? style.fontSize;
		if (k.fv !== fontVer && font) { call(t, "set_font", font); k.fv = fontVer; }
		if (k.fs !== fs) { call(t, "set_fontSize", fs); k.fs = fs; }
		if (k.a !== c.a) { call(t, "set_alignment", c.a); k.a = c.a; }
		if (k.s !== c.s) { call(t, "set_text", Il2Cpp.string(c.s)); k.s = c.s; }
		if (!same4(k.col, c.c)) { call(t, "set_color", col(c.c)); k.col = c.c.slice(); }
	}
	function syncPattern(w: Win) {
		const want = setPattern.v && !w.hud && rectMode === "mesh" && !!getPatternTex();
		if (!want) { if (w.pattern) setCull(w.pattern, true); return; }
		if (!w.pattern) {
			if (budget <= 0) return;
			budget--;
			try {
				w.pattern = makeRect(w.buckets[B_PATTERN]);
				if (w.pattern.cr) call(w.pattern.cr, "SetTexture", patternTex);
			} catch (e) { errOnce("pattern", e); return; }
		}
		const e = w.pattern, k = e.k;
		if (!e.cr) return;
		setCull(e, false);
		const m = matFor();
		if (k.mat !== m) { pickOverload(e.cr, CanvasRendererCls, "SetMaterial", 2, ps => ps[1].type.name === "System.Int32").invoke(m, 0); k.mat = m; }
		const wr = winRadius(), geo = w.W + "x" + w.H + "r" + wr, now = Date.now();
		const angle = style.spin ? ((now - t0) / 1000 * style.spin) % 360 : 0;
		if (k.geo !== geo || !e.pmesh) {
			const pts = roundedPolyPoints(w.W, w.H, wr), tris: number[] = [];
			for (let i = 1; i < pts.length; i++) tris.push(0, i, i === pts.length - 1 ? 1 : i + 1);
			try {
				const mesh = buildMesh(pts.flatMap(p => [p[0], p[1], 0]), spiralUVs(pts, w.W, w.H, angle), tris);
				if (e.pmesh) destroy(e.pmesh);
				e.pmesh = mesh; e.ppts = pts; e.ptris = tris;
				call(e.cr, "SetMesh", mesh);
				call(e.tr, "set_localPosition", v3(w.W / 2, -w.H / 2, 0));
				call(e.tr, "set_localScale", v3(1, 1, 1));
				k.geo = geo; k.angle = angle; k.at = now;
			} catch (err) { errOnce("pattern mesh", err); }
		} else if (style.spin && k.angle !== angle && (meshMode === "arrays" || now - k.at >= 33)) {
			const uvs = spiralUVs(e.ppts, w.W, w.H, angle);
			let ok = meshMode === "arrays" && setMeshUVs(e, uvs);
			if (!ok) {
				try { const m = buildMesh(e.ppts.flatMap((p: number[]) => [p[0], p[1], 0]), uvs, e.ptris); destroy(e.pmesh); e.pmesh = m; ok = true; }
				catch (err) { errOnce("spiral rebuild", err); }
			}
			if (ok) { call(e.cr, "SetMesh", e.pmesh); k.angle = angle; k.at = now; }
		}
		const c = fade(C.Pattern, style.opacity);
		if (!same4(k.col, c)) { call(e.cr, "SetColor", col(c)); k.col = c; }
	}

	function syncWindow(w: Win) {
		if (rectMode !== "none") {
			const now = Date.now();
			if (now - lastAssetCheck > 1000) { lastAssetCheck = now; if (!assetsAlive()) { rebuildShapes(); return; } }
		}
		const show = w.visible && w.placed;
		if (!show) {
			if (w.canvas && w.rootOn && alive(w.root)) { call(w.canvas, "set_enabled", false); w.rootOn = false; }
			return;
		}
		if (!ensureWinObjects(w)) return;
		if (!w.rootOn) { call(w.canvas, "set_enabled", true); w.rootOn = true; }
		if (w.poseDirty || w.appliedScale !== style.scale) pushPose(w);

		const rb = w.rb ?? (w.rb = Array.from({ length: NBUCKETS }, () => [] as RCmd[]));
		const tb = w.tb ?? (w.tb = Array.from({ length: NBUCKETS }, () => [] as TCmd[]));
		for (let b = 0; b < NBUCKETS; b++) { rb[b].length = 0; tb[b].length = 0; }
		for (const c of w.rc) rb[RECT_BUCKET[c.l] ?? B_FRAME].push(c);
		for (const c of w.tc) tb[textBucket(c.l)].push(c);
		for (let b = 0; b < NBUCKETS; b++) {
			const rl = rb[b], tl = tb[b];
			for (let i = 0; i < rl.length; i++) syncRect(w, b, i, rl[i]);
			hideFrom(w.rpool[b], rl.length);
			for (let i = 0; i < tl.length; i++) syncText(w, b, i, tl[i]);
			hideFrom(w.tpool[b], tl.length);
		}
		syncPattern(w);
		syncCursor(w);
	}
	function syncCursor(w: Win) {
		if (!w.root || !w.rootOn) return;
		const show = mouseWin === w && mouseX >= 0;
		let e = w.cursorEl;
		if (!show) { if (e) setCull(e, true); return; }
		if (!e) {
			try { e = w.cursorEl = makeRect(w.buckets[B_CURSOR]); } catch (err) { errOnce("cursor", err); return; }
			if (e.cr && roundOK) { try { call(e.cr, "SetMesh", roundedMesh(10, 10, 5).mesh); } catch {} }
			else call(e.tr, "set_localScale", v3(10, 10, 1));
		}
		setCull(e, false);
		const k = e.k;
		const m = matFor();
		if (e.cr && k.mat !== m) { pickOverload(e.cr, CanvasRendererCls, "SetMaterial", 2, ps => ps[1].type.name === "System.Int32").invoke(m, 0); k.mat = m; }
		if (!same4(k.col, C.Cursor)) { call(e.cr ?? e.img, e.cr ? "SetColor" : "set_color", col(C.Cursor)); k.col = C.Cursor; }
		const x = Math.round(mouseX * 2) / 2, y = Math.round(mouseY * 2) / 2;
		if (k.px !== x || k.py !== y) { call(e.tr, "set_localPosition", v3(x, -y, 0)); k.px = x; k.py = y; }
	}
	function pushPose(w: Win) {
		if (!w.rootT) return;
		const lp = w.lastP, lq = w.lastQ, P = w.P, q = w.q;
		const moved = !lp || !lq || Math.abs(P[0] - lp[0]) > 1e-4 || Math.abs(P[1] - lp[1]) > 1e-4 || Math.abs(P[2] - lp[2]) > 1e-4 ||
			Math.abs(q[0] - lq[0]) > 5e-5 || Math.abs(q[1] - lq[1]) > 5e-5 || Math.abs(q[2] - lq[2]) > 5e-5 || Math.abs(q[3] - lq[3]) > 5e-5;
		if (moved) {
			call(w.rootT, "set_position", v3(P[0], P[1], P[2]));
			call(w.rootT, "set_rotation", qt(q));
			w.lastP = P.slice(); w.lastQ = q.slice();
		}
		if (w.appliedScale !== style.scale) call(w.rootT, "set_localScale", v3(style.scale, style.scale, style.scale));
		w.poseDirty = false; w.appliedScale = style.scale;
	}

	function makeQuad(name: string, primitive: number): any {
		const go = keep(GameObject.method("CreatePrimitive", 1).invoke(primitive));
		try { go.method("set_name", 1).invoke(Il2Cpp.string(name)); } catch {}
		if (Collider) destroy(getComp(go, Collider));
		const tr = keep(go.method("get_transform").invoke());
		let mat: any = null;
		const ren = getComp(go, Renderer);
		if (ren) {
			mat = keep(call(ren, "get_material"));
			if (mat && menuShader) call(mat, "set_shader", menuShader);
		}
		return { go, tr, mat, k: {} as any };
	}

	let laser: any = null, laserOn = false;
	function syncLaser() {
		const show = setLaser.v && io.open && io.hasRay;
		if (!show) {
			if (laser && laserOn && alive(laser.go)) { call(laser.go, "SetActive", false); laserOn = false; }
			return;
		}
		if (laser && !alive(laser.go)) laser = null;
		if (!laser) {
			if (budget <= 0) return;
			budget--;
			try {
				laser = makeQuad("imgui_laser", 3);
				persist(laser.go);
				if (laser.mat) call(laser.mat, "set_renderQueue", Q_LASER);
			} catch (e) { errOnce("laser", e); return; }
		}
		if (!laserOn) { call(laser.go, "SetActive", true); laserOn = true; laser.k.o = null; }
		if (laser.mat && !same4(laser.k.col, C.Laser)) { call(laser.mat, "set_color", col(C.Laser)); laser.k.col = C.Laser; }
		const L = mouseWin ? mouseT : 1.5;
		const o = io.rayO, d = io.rayD, lk = laser.k;
		if (lk.o && Math.abs(o[0] - lk.o[0]) < 1e-4 && Math.abs(o[1] - lk.o[1]) < 1e-4 && Math.abs(o[2] - lk.o[2]) < 1e-4 &&
		    Math.abs(d[0] - lk.d[0]) < 1e-4 && Math.abs(d[1] - lk.d[1]) < 1e-4 && Math.abs(d[2] - lk.d[2]) < 1e-4 && Math.abs(L - lk.L) < 1e-3) return;
		lk.o = o.slice(); lk.d = d.slice(); lk.L = L;
		const mid = add(o, mul(d, L / 2));
		const b = basisFacing(d);
		call(laser.tr, "set_position", v3(mid[0], mid[1], mid[2]));
		call(laser.tr, "set_rotation", qt(quatFromBasis(b.r, b.u, b.f)));
		call(laser.tr, "set_localScale", v3(0.003, 0.003, L));
	}

	let budgetHit = false;
	function render(hudContent: boolean) {
		budget = CREATE_BUDGET;
		if (io.pressed && activeId === "") activeId = "##void";
		for (const w of wins.values()) {
			syncWindow(w);
			w.wasVisible = w.visible;
			w.visible = false;
		}
		renderHud(hudContent);
		syncLaser();
		budgetHit = budget <= 0;
		if (!io.down) { activeId = ""; activeWin = null; dragWin = null; resizeStart = null; scrollDrag = null; }
	}
	function renderLight(hudContent: boolean) {
		budget = CREATE_BUDGET;
		for (const w of wins.values()) {
			if (!w.wasVisible || !w.root || !w.rootOn) continue;
			if (w.poseDirty || w.appliedScale !== style.scale) pushPose(w);
			syncPattern(w);
			syncCursor(w);
		}
		renderHud(hudContent);
		syncLaser();
	}
	function renderHud(content: boolean) {
		if (content) { syncWindow(hudWin); hudWin.shown = hudWin.visible; hudWin.visible = false; }
		else if (hudWin.shown && hudWin.rootT && hudWin.poseDirty) pushPose(hudWin);
	}

	const ui = {
		begin, end, text, textColored: (c: number[], s: string) => text(s, c), textDisabled: (s: string) => text(s, C.TextDisabled),
		button, checkbox, sliderFloat, sliderInt, combo, collapsingHeader, separator, spacing, sameLine, indent, unindent,
		progressBar, beginTabBar, tabItem, endTabBar, settings, info, notify, confirm, openUrl, style, ref,
		pluginsTab, plugins: () => filePlugins(), pluginPage,
		fun: funTab,
		debug: () => {
			if (button("Print All GameObjects")) debugGameObjects(true);
			if (button("Print Active GameObjects")) debugGameObjects(false);
			if (button("Count GameObjects")) debugCountObjects();
			separator();
			if (button("Print Loaded Assemblies")) debugAssemblies();
			if (button("Print Compatibility Diagnostics")) debugRunDiag();
			separator();
			text("Debug actions print to the Frida console.", C.TextDisabled);
			text("GameObject paths include their Transform hierarchy.", C.TextDisabled);
		},
		theme: (name: string) => applyTheme(name), themes: () => THEME_NAMES.slice(),
		fonts: () => loadedFonts.map(f => f.name),
		recenter: () => { for (const w of wins.values()) place(w); },
		windows: () => [...wins.values()].map(w => ({ title: w.title, visible: w.wasVisible, W: w.W, H: w.H, scroll: w.scroll, collapsed: w.collapsed })),
	};
	(globalThis as any).ui = ui;

	let menuOpen = false, menuForced = false, xPrev = false, greeted = false, wasOpen = false, lastTickMs = Date.now();
	let driverSrc = "none", openSrc = "-", pointerMode = "-", triggerSeen = false;
	(globalThis as any).menu = () => { menuForced = !menuForced; menuOpen = menuForced; return menuForced; };

	let gestureOn = false, gestureT = 0;
	function wristGesture(dt: number): boolean {
		const hp = headPose(), lp = leftT ? posOf(leftT) : null;
		if (!hp || !lp) { gestureOn = false; gestureT = 0; return false; }
		const d = sub(lp, hp.p), dist = len(d), c = dot(norm(d), norm(hp.f));
		if (!gestureOn) { gestureT = c > 0.9 && dist < 0.65 ? gestureT + dt : 0; if (gestureT > 0.35) { gestureOn = true; gestureT = 0; } }
		else { gestureT = c < 0.45 || dist > 0.9 ? gestureT + dt : 0; if (gestureT > 0.5) { gestureOn = false; gestureT = 0; } }
		return gestureOn;
	}
	function readXButton(): { pressed: boolean; srcs: string[] } {
		const srcs: string[] = [];
		let pressed = false;
		if (xrReady) { srcs.push("XR"); if (xrButton(4, usagePrimBtn) || xrButton(4, usageSecBtn)) pressed = true; }
		if (ovr.btn) { srcs.push("OVRInput"); if (ovrX()) pressed = true; }
		if (hvrReady()) { srcs.push("HurricaneVR"); if (hvrX()) pressed = true; }
		if (legacyOK !== false && legacyGetKey) {
			const x = legacyKey(KEY_X);
			if (legacyOK) { srcs.push("Unity X"); if (x) pressed = true; }
		}
		return { pressed, srcs };
	}

	function choosePointer(): string {
		if (POINTER_MODE !== "auto") return POINTER_MODE;
		if (rightT) return "ray";
		return "gaze";
	}
	let triggerLatched = false, triggerInputAvailable = false, triggerSource = "none";
	function anyClick(): boolean {
		let value = 0, available = false, source = "none";
		if (xrReady) {
			if (usageTrigBtn && xrButton(5, usageTrigBtn)) { value = 1; available = true; source = "XR triggerButton"; }
			else {
				const xf = xrFloat(5, usageTrig);
				if (xf !== null) { value = xf; available = true; source = "XR trigger"; }
			}
		}
		if (!available && ovr.axis) {
			try { value = ovrRightTrigger(); available = true; source = "OVRInput"; } catch {}
		}
		if (!available && hvr.inputs) {
			try { value = hvrTrigger(); available = true; source = "HurricaneVR"; } catch {}
		}
		if (!available && legacyGetAxis) {
			try { value = legacyTrigger(); available = legacyAxisOK !== false; source = "Unity axis"; } catch {}
		}
		if (!available && legacyOK !== false && legacyGetKey) {
			try {
				available = true; source = "Unity key fallback";
				value = (legacyKey(KEY_A) || legacyKey(0) || legacyKey(14) || legacyKey(15) || legacyKey(4) || legacyKey(5)) ? 1 : 0;
			} catch {}
		}
		triggerInputAvailable = available;
		triggerSource = source;
		const releaseThreshold = Math.max(0.08, TRIG_THRESH * 0.62);
		if (triggerLatched) triggerLatched = value > releaseThreshold;
		else triggerLatched = value > TRIG_THRESH;
		return triggerLatched;
	}
	let dwell = { x: -1, y: -1, t: 0, fired: false };
	function pokeRay(): { o: number[]; d: number[]; down: boolean } | null {
		let tip = get3(rightT, "get_position");
		const fwd = get3(rightT, "get_forward");
		if (!tip || !fwd) return null;
		tip = add(tip, mul(fwd, POKE_REACH));
		let best: Win | null = null, bestD = 1e9;
		for (const w of wins.values()) {
			if (!w.wasVisible || !w.placed) continue;
			const d = dot(sub(tip, w.P), w.f);
			if (Math.abs(d) < Math.abs(bestD)) { bestD = d; best = w; }
		}
		if (!best) return null;
		return { o: sub(tip, mul(best.f, 0.2)), d: best.f, down: bestD > -0.025 && bestD < 0.05 };
	}

	const mainQueue: { at: number; fn: () => void }[] = [];
	(globalThis as any).__imguiMain = (fn: () => void, ms: number = 0) => {
		if (typeof fn === "function") mainQueue.push({ at: Date.now() + (+ms || 0), fn });
	};
	function runMainQueue() {
		if (!mainQueue.length) return;
		const now = Date.now();
		let ran = 0;
		for (let i = 0; i < mainQueue.length && ran < 32;) {
			if (mainQueue[i].at > now) { i++; continue; }
			const job = mainQueue.splice(i, 1)[0];
			try { job.fn(); } catch (e) { errOnce("main-thread task", e); }
			ran++;
		}
		// A broken plugin should never be able to grow this queue forever.
		if (mainQueue.length > 512) {
			mainQueue.splice(0, mainQueue.length - 512);
			errOnce("main-thread queue", "queue exceeded 512 jobs; dropped oldest pending jobs");
		}
	}

	function tick() {
		visualApply();
		updateRig();
		runMainQueue();
		initResources();
		if (!greeted) { greeted = true; notify(MENU_TITLE + " loaded"); }
		try { onUpdate(); } catch (e) { errOnce("onUpdate", e); }
		try { funUpdateKeyboard(); funPollRequest(); } catch (e) { errOnce("fun", e); }
		try { pluginsFrame(); } catch (e) { errOnce("plugins", e); }

		const now = Date.now(), dt = Math.min(0.1, Math.max(0.001, (now - lastTickMs) / 1000));
		lastTickMs = now;
		const xb = readXButton();
		const haveButton = xb.srcs.length > 0;
		const gestureAvail = OPEN_GESTURE && !!leftT && !haveButton;
		const gestureOpen = gestureAvail ? wristGesture(dt) : false;
		openSrc = haveButton ? xb.srcs.join(" / ") : gestureAvail ? "wrist gesture" : "menu() in the REPL";
		if (haveButton) {
			if (setHold.v === 1) {
				if (xb.pressed && !xPrev) { menuOpen = !menuOpen; menuForced = menuOpen; }
				else menuOpen = menuForced;
			} else {
				menuOpen = xb.pressed;
				menuForced = false;
			}
			xPrev = xb.pressed;
		} else if (gestureAvail) {
			menuOpen = gestureOpen || menuForced;
		}
		if (menuOpen && !wasOpen) {
			triggerSeen = false;
			dwell = { x: -1, y: -1, t: 0, fired: false };
			wristPosF.reset(); wristDirF.reset(); rayPosF.reset(); rayDirF.reset();
		}
		if (!menuOpen && wasOpen) {
			triggerSeen = false;
			dwell = { x: -1, y: -1, t: 0, fired: false };
		}
		wasOpen = menuOpen;

		pointerMode = choosePointer();
		let rayO: number[] | null = null, rayD: number[] | null = null, down = false;
		if (menuOpen) {
			try {
				if (pointerMode === "ray" && rightT) {
					rayO = get3(rightT, "get_position");
					rayD = get3(rightT, "get_forward");
					if (rayD && RAY_PITCH_DEG !== 0) {
						const up = get3(rightT, "get_up") ?? [0, 1, 0], a = RAY_PITCH_DEG * Math.PI / 180;
						rayD = add(mul(rayD, Math.cos(a)), mul(up, -Math.sin(a)));
					}
					down = anyClick();
					if (down) triggerSeen = true;
					if (!triggerInputAvailable && rightT) { const pr = pokeRay(); if (pr && pr.down) io.down = true; }
				} else if (pointerMode === "poke" && rightT) {
					const pr = pokeRay();
					if (pr) { rayO = pr.o; rayD = pr.d; down = pr.down; }
				} else if (pointerMode === "gaze") {
					const hp = headPose();
					if (hp) { rayO = hp.p; rayD = hp.f; }
				}
				if (rayO && rayD && style.stabilize && pointerMode !== "poke") { rayO = rayPosF.filter(rayO, now); rayD = norm(rayDirF.filter(rayD, now)); }
			} catch { rayO = rayD = null; }
		}
		let scroll = 0;
		if (menuOpen) {
			let y = ovr.stick ? ovrRightStickY() : 0;
			if (Math.abs(y) < 0.2 && hvr.inputs) y = hvrStickY();
			if (Math.abs(y) < 0.2) y = legacyStickY();
			if (Math.abs(y) > 0.2) scroll = -y * SCROLL_SPEED * dt;
		}

		if (menuOpen && !lateActive()) for (const w of wins.values()) if (isWrist(w) && !(activeWin === w && activeId.endsWith("##resize"))) anchorWrist(w);
		newFrame({ rayO, rayD, down, open: menuOpen, scroll });
		if (pointerMode === "gaze" && menuOpen && mouseWin) {
			if (Math.hypot(mouseX - dwell.x, mouseY - dwell.y) > 8) dwell = { x: mouseX, y: mouseY, t: 0, fired: false };
			else dwell.t += dt;
			if (!dwell.fired && dwell.t > 0.8) { dwell.fired = true; io.pressed = true; io.down = true; }
			else if (dwell.fired && io.down) { io.down = false; io.released = true; io.pressed = false; }
		}
		let animating = false;
		for (const w of wins.values()) if (Math.abs(w.scroll - w.scrollTarget) > 0.5) animating = true;
		idleFrames++;
		const moved = mouseWin !== lastFull.win || Math.abs(mouseX - lastFull.x) >= 1 || Math.abs(mouseY - lastFull.y) >= 1;
		if (io.pressed || io.released) followUp = 2;
		const full = menuOpen !== lastRenderedOpen || budgetHit || animating || followUp > 0 ||
			(menuOpen && (io.pressed || io.released || io.down || io.scroll !== 0 || idleFrames >= (moved && mouseWin ? UI_IDLE_RATE : UI_STILL_RATE)));
		if (followUp > 0 && !io.pressed && !io.released) followUp--;
		const hudContent = updateHud();
		if (full) {
			idleFrames = 0; fullPasses++;
			lastFull.win = mouseWin; lastFull.x = mouseX; lastFull.y = mouseY;
			lastRenderedOpen = menuOpen;
			if (menuOpen) {
				try { drawMenu(ui); } catch (e) { errOnce("drawMenu", e); }
				if (cur) { log("begin() without end() in drawMenu"); cur = null; }
			}
			render(hudContent);
		} else renderLight(hudContent);
		if (pointerMode !== "ray" && laser && laserOn) { call(laser.go, "SetActive", false); laserOn = false; }
	}
	let idleFrames = 0, fullPasses = 0, lastRenderedOpen = false, followUp = 0;
	const lastFull = { win: null as Win | null, x: -1, y: -1 };

	const perfStats = { tickMs: 0, lateMs: 0, frames: 0, fullPerSec: 0, at: Date.now(), acc: 0, lateAcc: 0, n: 0, fulls: 0 };
	function perfSample() {
		const now = Date.now();
		if (now - perfStats.at >= 1000 && perfStats.n > 0) {
			perfStats.tickMs = perfStats.acc / perfStats.n; perfStats.lateMs = perfStats.lateAcc / perfStats.n;
			perfStats.fullPerSec = (fullPasses - perfStats.fulls) * 1000 / (now - perfStats.at);
			perfStats.fulls = fullPasses; perfStats.acc = perfStats.lateAcc = 0; perfStats.n = 0; perfStats.at = now;
		}
	}
	(globalThis as any).perf = () => {
		const s = "script " + (perfStats.tickMs + perfStats.lateMs).toFixed(2) + " ms/frame (tick " + perfStats.tickMs.toFixed(2) +
			" + render-time " + perfStats.lateMs.toFixed(2) + "), full UI passes " + perfStats.fullPerSec.toFixed(0) + "/s, fps " + fps.toFixed(0);
		log(s); return s;
	};

	const Time = asmCore.tryClass("UnityEngine.Time");
	const frameCountM = Time ? Time.tryMethod("get_frameCount", 0) : null;
	let lastFrame = -1, lastTickAt = 0, ticks = 0;
	let multiDriver = false;
	function tickOnce(src: string) {
		let f = -1;
		if (multiDriver && frameCountM) { try { f = frameCountM.invoke() as number; } catch {} }
		if (f >= 0) { if (f === lastFrame) return; lastFrame = f; }
		else { const n = Date.now(); if (n - lastTickAt < 4) return; }
		lastTickAt = Date.now();
		if (driverSrc !== src) { driverSrc = src; log("frame hook: " + src); }
		ticks++;
		const t0p = Date.now();
		try { tick(); } catch (e) { errOnce("tick", e); }
		perfStats.acc += Date.now() - t0p; perfStats.n++;
		perfSample();
	}
	const origCache = new Map<string, any>();
	function callOriginal(self: any, name: string): any {
		const key = name + "@" + self.handle;
		let m = origCache.get(key);
		if (!m) { m = self.method(name, 0); origCache.set(key, m); }
		return m.invoke();
	}
	function hookStatic(klass: any, name: string, before: boolean, fn: () => void): boolean {
		const m = klass ? klass.tryMethod(name, 0) : null;
		if (!m) return false;
		m.implementation = function (this: any) {
			if (before) fn();
			let r: any;
			try { r = callOriginal(this, name); } catch {}
			if (!before) fn();
			return r;
		};
		return true;
	}

	let canvasHooked = false;
	try {
		const swrc = Canvas.tryMethod ? Canvas.tryMethod("SendWillRenderCanvases", 0) : Canvas.method("SendWillRenderCanvases", 0);
		const va = swrc ? swrc.virtualAddress : null;
		if (va && (typeof va.isNull !== "function" || !va.isNull())) {
			Interceptor.attach(va, { onEnter() { tickOnce("Canvas.SendWillRenderCanvases"); } });
			canvasHooked = true;
		}
	} catch (e) { log("canvas frame hook unavailable: " + e); }
	const ovrUpdate = OVRRigCls ? hookMethodOf(OVRRigCls) : null;
	if (ovrUpdate) {
		const hn: string = ovrUpdate.name;
		ovrUpdate.implementation = function (this: any) {
			let r: any;
			try { r = callOriginal(this, hn); } catch {}
			tickOnce("OVRCameraRig." + hn);
			return r;
		};
	}
	let backupSrc = "";
	for (const name of EXTRA_FRAME_HOOKS) {
		const k = findClassAnywhere(name);
		const m = k ? hookMethodOf(k) : null;
		if (!m) continue;
		try {
			const label = k.name + "." + m.name;
			Interceptor.attach(m.virtualAddress, { onLeave() { tickOnce(label); } });
			backupSrc = label;
			break;
		} catch (e) { log("backup frame hook " + name + " failed: " + e); }
	}
	multiDriver = (canvasHooked ? 1 : 0) + (ovrUpdate ? 1 : 0) + (backupSrc ? 1 : 0) > 1;
	function installFallbackDriver() {
		multiDriver = true;
		if (PlayerCls) {
			const hm = hookMethodOf(PlayerCls);
			if (hm) {
				const hn: string = hm.name;
				hm.implementation = function (this: any) {
					let r: any;
					try { r = callOriginal(this, hn); } catch {}
					tickOnce(PlayerCls.name + "." + hn);
					return r;
				};
				return log("fallback frame hook: " + PlayerCls.name + "." + hn);
			}
		}
		log("no frame hook fired - is this a Unity IL2CPP game with UI?");
	}
	if (!canvasHooked && !ovrUpdate && !backupSrc) installFallbackDriver();
	setTimeout(() => { if (ticks === 0) Il2Cpp.perform(() => installFallbackDriver()); }, 4000);
	let tickWarned = false;
	setInterval(() => {
		const idle = Date.now() - lastTickAt;
		if (ticks > 0 && idle > 5000 && !tickWarned) { tickWarned = true; log("no frame for " + Math.round(idle / 1000) + "s (game paused or loading?) - last hook: " + driverSrc); }
		else if (idle < 1000) tickWarned = false;
	}, 2000);

	function lateAnchor() {
		const t0p = Date.now();
		try {
			if (!menuOpen || !style.wrist) return;
			lateAt = Date.now();
			for (const w of wins.values()) {
				if (!isWrist(w) || !w.rootT || !w.rootOn) continue;
				if (activeWin === w && activeId.endsWith("##resize")) continue;
				if (anchorWrist(w)) pushPose(w);
			}
		} catch (e) { errOnce("late anchor", e); }
		finally { perfStats.lateAcc += Date.now() - t0p; }
	}
	const lateSrc = (OVRRigCls && OVRRigCls.tryMethod("OnBeforeRenderCallback", 0)) ? (() => {
			const m = OVRRigCls.tryMethod("OnBeforeRenderCallback", 0);
			m.implementation = function (this: any) { let r: any; try { r = callOriginal(this, "OnBeforeRenderCallback"); } catch {} lateAnchor(); return r; };
			return "OVRCameraRig.OnBeforeRenderCallback";
		})() : "none (anchored every frame instead)";

	log("frame hooks: " + [ovrUpdate ? "OVRCameraRig." + ovrUpdate.name : "", canvasHooked ? "Canvas.SendWillRenderCanvases" : "", backupSrc ? backupSrc + " (backup)" : ""].filter(s => s).join(" + ") + " | late anchoring: " + lateSrc);
	log("input: " + (ovr.btn ? "OVRInput X" : legacyGetKey ? "Unity input (X = joystick button 2)" : "menu()") +
		(ovr.axis ? " + trigger" : "") + (ovr.stick ? " + stick scroll" : "") + " | pointer: " + POINTER_MODE + " (auto picks ray / poke / gaze)");
	log("ready - rig is detected on the first frames; press X to open");

	function compatReport(): string {
		const has = (asm: string, cls: string) => { try { const a = Il2Cpp.domain.tryAssembly(asm); return !!(a && a.image.tryClass(cls)); } catch { return false; } };
		const anyClass = (n: string) => !!findClassAnywhere(n);
		const lines: string[] = [];
		lines.push("=== imgui compatibility ===");
		lines.push("uGUI (required): Canvas=" + has("UnityEngine.UIModule", "UnityEngine.Canvas") +
			" Text=" + has("UnityEngine.UI", "UnityEngine.UI.Text") + " CanvasScaler=" + has("UnityEngine.UI", "UnityEngine.UI.CanvasScaler"));
		lines.push("render: shader=" + (menuShader ? menuShaderName || "ok" : "MISSING") + " material=" + (uiMat ? "ok" : "MISSING") + " font=" + (font ? "ok" : "MISSING") +
			" mesh=" + (asmCore.tryClass("UnityEngine.Mesh") ? "ok" : "no") + " canvasRenderer=" + (asmUIM.tryClass("UnityEngine.CanvasRenderer") ? "ok" : "no"));
		lines.push("frame hook: " + driverSrc);
		lines.push("head: " + (rig.head ? "ok" : "MISSING") + "  hands: " + (rig.left && rig.right ? "ok (" + (rig.handSrc || "?") + ")" : "MISSING - pointer=" + pointerMode));
		lines.push("input: OVRInput=" + (ovr.btn ? "yes" : "no") + " HVR=" + (hvr.inputs ? "yes" : "no") +
			" legacy=" + (legacyGetKey ? "yes" : "no") + " XR-InputDevices=" + (xrReady ? "yes" : "no") + " XRIT=" + anyClass("UnityEngine.XR.Interaction.Toolkit.ActionBasedController"));
		lines.push("VR stack: OVR=" + !!OVRRigCls + " HVR=" + anyClass("HurricaneVR.Framework.Core.Player.HVRPlayerController") +
			" XRIT=" + anyClass("UnityEngine.XR.Interaction.Toolkit.XRController") + " SteamVR=" + anyClass("Valve.VR.SteamVR_Behaviour_Pose"));
		const verdict = (font && menuShader) ? (rig.left && rig.right ? "SHOULD WORK (ray/poke pointer)" : "loads, but no hands yet - uses gaze until hands appear")
			: "MAY NOT RENDER - missing " + (!font ? "font " : "") + (!menuShader ? "shader" : "");
		lines.push("verdict: " + verdict);
		return lines.join("\n");
	}
	(globalThis as any).diag = () => { const r = compatReport(); console.log("[imgui]\n" + r); return r; };
	setTimeout(() => { try { Il2Cpp.perform(() => log("\n" + compatReport())); } catch {} }, 2500);
	} catch (e) {
		const msg = String((e && (e as any).message) || e).replace("[imgui] ", "");
		if (msg.indexOf("UnityEngine.UI") >= 0 || msg.indexOf("stripped") >= 0 || msg.indexOf("not in this game") >= 0)
			console.log("[imgui] LOAD FAILED - this game doesn't ship Unity's legacy UI (uGUI); the menu is built on it and can't render here. (" + msg + ")");
		else
			console.log("[imgui] LOAD FAILED during init: " + msg);
	}
});
