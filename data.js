/* ============================================================
 * data.js — 浸染試染工具：查表資料 / 範本庫 / 雙語字典
 * 這個檔案只放「資料」，不放邏輯。修改鹽鹼用量表、機台速度範圍、
 * 內建染色/水洗範本、雙語字串時改這裡；改計算邏輯或畫面互動去改 app.js。
 * 載入順序要排在 app.js 之前（app.js 會直接使用這裡定義的常數）。
 * ============================================================ */

/* ============ 資料表 ============ */

// 鹽種比重對照表：SG_TABLE[鹽種][溫度] = [[比重, 濃度g/L], ...]
// 每種鹽種各自可用的量測溫度不同，見下面 SALT_TYPE_TEMPS。
//
// ── 芒硝 (Glauber's Salt, Na2SO4) ──
// 40°C：10~100 g/L直接取自現場實測紙本紀錄「40°C 的芒硝比重表」（每5 g/L一筆，95 g/L為90/100兩點內插）。
//   表列到100 g/L為止，不外插——工具實際會用到的目標芒硝濃度上限只到80 g/L
//   (EVERZOL_TABLE最高6.0%以上那一列)，100以上沒有實測依據，超出範圍就不猜了。
// 60°C／80°C：後來比對到公司內部的「浸染試染配方浴比計算表」Excel，裡面在20 g/L與90 g/L
//   兩點有永光自己認定的標準校正值（40/60/80°C都有），且這兩點在40°C跟現場實測紙本完全吻合，
//   代表這份Excel跟紙本是同一套官方標準值——所以60°C/80°C直接採用這份Excel反推出來的固定
//   校正量（比純水熱膨脹理論推算更準確）：
//   60°C = 40°C比重 − 0.008；80°C = 40°C比重 − 0.018。
//
// ── 粗鹽／鹽巴 (Common Salt, NaCl) ──
// 尚未取得現場實測比重表，也沒有像芒硝那份Excel一樣可信的公司內部標準值可用（原始Excel裡雖然
// 也有「粗鹽 40/50/60°C」欄位，但公式寫錯，直接複製貼上參照到芒硝80°C那欄的錨點，數字不可信，
// 不能拿來用）。這裡先用食鹽水的公開文獻密度數據（20°C）搭配純水熱膨脹校正量抓出40/50/60°C
// 的粗略估計值，讓鹽種切換功能可以先跑起來，但這組數字沒有像芒硝表那樣被驗證過，
// 準確度未知，之後有機會請務必用比重計實測、或找一份跟芒硝那張一樣的紙本對照表來取代。
const SALT_TYPE_TEMPS = { glauber:[40,60,80], commonSalt:[40,50,60] };
const SG_TABLE = {
  glauber: {
    40: [[1.0035,10],[1.0075,15],[1.012,20],[1.016,25],[1.02,30],[1.024,35],[1.0285,40],[1.0325,45],[1.0365,50],[1.0405,55],[1.045,60],[1.049,65],[1.053,70],[1.0575,75],[1.0615,80],[1.0655,85],[1.07,90],[1.074,95],[1.078,100]],
    60: [[0.9955,10],[0.9995,15],[1.004,20],[1.008,25],[1.012,30],[1.016,35],[1.0205,40],[1.0245,45],[1.0285,50],[1.0325,55],[1.037,60],[1.041,65],[1.045,70],[1.0495,75],[1.0535,80],[1.0575,85],[1.062,90],[1.066,95],[1.07,100]],
    80: [[0.9855,10],[0.9895,15],[0.994,20],[0.998,25],[1.002,30],[1.006,35],[1.0105,40],[1.0145,45],[1.0185,50],[1.0225,55],[1.027,60],[1.031,65],[1.035,70],[1.0395,75],[1.0435,80],[1.0475,85],[1.052,90],[1.056,95],[1.06,100]]
  },
  commonSalt: {
    40: [[0.9993,10],[1.0027,15],[1.0061,20],[1.0094,25],[1.0128,30],[1.0162,35],[1.0196,40],[1.023,45],[1.0263,50],[1.0297,55],[1.0331,60],[1.0365,65],[1.0398,70],[1.0432,75],[1.0466,80],[1.05,85],[1.0534,90],[1.0567,95],[1.0601,100]],
    50: [[0.9951,10],[0.9985,15],[1.0019,20],[1.0052,25],[1.0086,30],[1.012,35],[1.0154,40],[1.0188,45],[1.0221,50],[1.0255,55],[1.0289,60],[1.0323,65],[1.0356,70],[1.039,75],[1.0424,80],[1.0458,85],[1.0492,90],[1.0525,95],[1.0559,100]],
    60: [[0.9903,10],[0.9937,15],[0.9971,20],[1.0004,25],[1.0038,30],[1.0072,35],[1.0106,40],[1.014,45],[1.0173,50],[1.0207,55],[1.0241,60],[1.0275,65],[1.0308,70],[1.0342,75],[1.0376,80],[1.041,85],[1.0444,90],[1.0477,95],[1.0511,100]]
  }
};

// Everzol 染料染色濃度及鹽鹼用量表 (A-5頁)
const EVERZOL_TABLE = [
  {label:"0.5%以下",   labelEn:"≤0.5%",     max:0.5,      unmerc:20, merc:10, sodaAlone:10, combinedSoda:5, combinedLiquid:0.5, tsp:6,  fixTime:30},
  {label:"0.5%~1.0%",  labelEn:"0.5–1.0%",  max:1.0,      unmerc:30, merc:20, sodaAlone:15, combinedSoda:5, combinedLiquid:0.5, tsp:6,  fixTime:45},
  {label:"1.0%~2.0%",  labelEn:"1.0–2.0%",  max:2.0,      unmerc:40, merc:30, sodaAlone:20, combinedSoda:5, combinedLiquid:1.0, tsp:8,  fixTime:60},
  {label:"2.0%~3.0%",  labelEn:"2.0–3.0%",  max:3.0,      unmerc:50, merc:40, sodaAlone:20, combinedSoda:5, combinedLiquid:1.0, tsp:8,  fixTime:60},
  {label:"3.0%~4.0%",  labelEn:"3.0–4.0%",  max:4.0,      unmerc:60, merc:50, sodaAlone:20, combinedSoda:5, combinedLiquid:1.0, tsp:8,  fixTime:60},
  {label:"4.0%~5.0%",  labelEn:"4.0–5.0%",  max:5.0,      unmerc:70, merc:60, sodaAlone:20, combinedSoda:5, combinedLiquid:1.0, tsp:10, fixTime:60},
  {label:"5.0%~6.0%",  labelEn:"5.0–6.0%",  max:6.0,      unmerc:80, merc:70, sodaAlone:20, combinedSoda:5, combinedLiquid:2.0, tsp:10, fixTime:60},
  {label:"6.0%以上",   labelEn:"≥6.0%",     max:Infinity, unmerc:80, merc:70, sodaAlone:20, combinedSoda:5, combinedLiquid:2.0, tsp:10, fixTime:90}
];

// 布速參考區間 (m/min) — 依機型基礎範圍（來自公開機台規格），再依布重/浴比等級調整
// 基礎範圍參考：繩染/絞盤（舊式無噴嘴，靠絞盤拉動，約30-80）、溢流機（噴嘴+絞盤，約60-300）、
// 軟流機（低壓大流量噴嘴，低張力，約100-300，高階機種可達更高）、噴射機（中高壓噴嘴，約200-500）、
// 氣流機（氣流+絞盤，浴比最低、可達最高速，約250-600）
const MACHINE_TABLE = {
  winch:    { base:[15,40],
    info:{ zh:"無噴嘴輔助，單純靠絞盤（reel）轉動拉動布圈，速度較慢（實務上限約40 m/min）、張力較大，速度只受絞盤轉速控制。",
           en:"No nozzle assist — driven purely by reel rotation. Slower (practical ceiling ~40 m/min), higher tension, speed controlled only by reel RPM." } },
  overflow: { base:[60,300],
    info:{ zh:"噴嘴＋絞盤共同驅動。噴嘴壓力需與絞盤轉速同步，否則布圈會鬆脫堆積在缸底，是常見摺痕成因。",
           en:"Driven jointly by nozzle and reel. Nozzle pressure must stay synced with reel speed, or the rope goes slack and piles up — a common cause of creasing." } },
  softflow: { base:[100,300],
    info:{ zh:"低壓大流量噴嘴，張力最小，適合薄布／針織／彈性布，噴嘴壓力通常在1.5bar以下。",
           en:"Low-pressure, high-flow nozzle with minimal tension — suited to light, knit, or elastane fabrics. Nozzle pressure is usually under 1.5 bar." } },
  jet:      { base:[200,500],
    info:{ zh:"中高壓噴嘴（操作壓力約3–4 bar），靠水流推動布圈循環，速度快但張力較大，噴嘴壓力需依布重調整（越重需越高壓力）。",
           en:"Medium-to-high pressure nozzle (~3–4 bar). Fast circulation but higher tension; nozzle pressure should scale up with fabric weight." } },
  airflow:  { base:[250,600],
    info:{ zh:"以氣流（或氣液混合）取代大部分水流帶動布圈，噴嘴壓力極低、浴比最低（約1:2–1:5），可達最高速度，對彈性纖維較友善，但氣流量與絞盤轉速須精準同步。",
           en:"Air (or air-liquid mix) replaces most of the water flow. Very low nozzle pressure, lowest liquor ratio (~1:2–1:5), highest achievable speed, gentler on elastane — but airflow rate must be precisely synced with reel speed." } }
};
// 布重/浴比等級對機台基礎範圍的利用係數：{min: 基礎下限的縮放比例, max: 下限之上再加多少比例的(上限-下限)}
const SPEED_FACTOR = {
  light: { low:{min:0.9, max:0.7}, mid:{min:1.0, max:0.9},  high:{min:1.0, max:1.0} },
  mid:   { low:{min:0.75,max:0.45},mid:{min:0.85,max:0.65}, high:{min:0.9, max:0.85} },
  heavy: { low:{min:0.6, max:0.25},mid:{min:0.7, max:0.45}, high:{min:0.8, max:0.65} }
};

// 噴嘴壓力參考 (bar) — 依布重分級為主要依據（來源：業者操作建議，輕布0.3-0.5 bar／重布1.2-1.5 bar，中厚為內插值），
// 再依機型套用等級係數（軟流機屬低壓設計、噴射機屬中高壓設計、溢流機為基準）。
// 絞盤機無噴嘴、氣流機為氣壓驅動，兩者皆不適用此 bar 值，改顯示文字說明。
const PRESSURE_BY_WEIGHT = {
  light: [0.3, 0.5],
  mid:   [0.6, 1.0],
  heavy: [1.2, 1.5]
};
const PRESSURE_MACHINE_FACTOR = { overflow: 1.0, softflow: 0.5, jet: 2.5 };
const NO_NOZZLE_INFO = {
  winch:   { zh:"無噴嘴，純靠絞盤機械拉動，沒有壓力可設定。", en:"No nozzle — driven purely by mechanical reel traction. No pressure to set." },
  airflow: { zh:"以氣流（氣泵）驅動，壓力單位與液流噴嘴不同，通常由設備自動控制，不需人工設定 bar 值。", en:"Air-pump driven; pressure isn't measured in the same bar unit as liquid nozzles and is usually auto-controlled by the machine — no manual bar setting needed." }
};
const MACHINE_LABEL = {
  winch:   { zh:"繩染／絞盤（舊式）", en:"Rope/Winch (conventional)" },
  overflow:{ zh:"溢流機", en:"Overflow machine" },
  softflow:{ zh:"軟流機", en:"Soft-flow machine" },
  jet:     { zh:"噴射機（Jet）", en:"Jet machine" },
  airflow: { zh:"氣流機（Airflow）", en:"Airflow machine" }
};
const WEIGHT_GRADE_LABEL = {
  light:{ zh:"輕薄 (<150 g/m²)", en:"Light (<150 g/m²)" },
  mid:  { zh:"中厚 (150–300 g/m²)", en:"Medium (150–300 g/m²)" },
  heavy:{ zh:"厚重 (>300 g/m²)", en:"Heavy (>300 g/m²)" }
};
const RATIO_GRADE_LABEL = {
  low: { zh:"低浴比 (<1:6)", en:"Low ratio (<1:6)" },
  mid: { zh:"標準浴比 (1:6–1:10)", en:"Standard ratio (1:6–1:10)" },
  high:{ zh:"高浴比 (>1:10)", en:"High ratio (>1:10)" }
};


/* ============ 中英文對照 ============ */
const TRANSLATIONS = {
  zh: {
    appTitle:"浸染試染工具", appSubtitle:"配方鹽鹼建議 · 浴量比重校正 · 布速參考",
    shareBtn:"分享",
    loadRecipeTitle:"載入已儲存配方", loadRecipeLabel:"載入配方", saveRecipeLabel:"儲存配方", selectRecipeOpt:"-- 選擇已儲存的配方 --", deleteBtn:"刪除", clearBtn:"清除",
    jumpOrder:"訂單/布料", jumpDye:"染料配方", jumpSalt:"鹽鹼配方",
    orderInfoTitle:"訂單資訊", customerPh:"客戶", colorOrderPh:"顏色/訂單號", fabricDescPh:"布料類型（例：100%純棉）",
    saveRecipeTitle:"儲存目前配方", recipeNamePh:"輸入配方名稱", saveBtn:"儲存",
    tabRecipe:"配方", tabPrint:"工卡", tabBath:"浴量", tabSpeed:"布速", tabProcess:"染程", tabReference:"結果",
    dyeResultSection:"染色結果記錄", takePhoto:"拍照", uploadPhoto:"上傳照片",
    dyeResultLabel:"染色結果總結", dyeResultPlaceholder:"記錄染色結果、色差、備註...",
    photoCaptionPlaceholder:"照片說明", closeButton:"關閉",
    pretreatTitle:"前處理", dyeStageTitle:"染色", washStageTitle:"水洗",
    stageSub:"每段填「爬升時間」＋「保溫時間」，起始溫度預設接續上一段結束溫度",
    stageStartTempLabel:"起始溫度", addStageBtn:"＋ 新增階段", templateSelectLabel:"選擇範本", saveTemplateBtn:"另存為範本",
    stageNotePh:"備註（例如：加芒硝、加純鹼、皂洗）",
    targetTempLabel:"目標溫度(°C)", rampMinLabel:"爬升(分)", holdMinLabel:"保溫(分)",
    curveTitle:"染程曲線", fillStageMsg:"至少填一段製程才會顯示曲線。", drainLabel:"排液", drainHint:"（自動空白3分鐘）",
    basicInfoTitle:"基本資料", basicInfoSub:"布重與浴比會套用到後面所有校正",
    fabricWeightLabel:"布重", liquorRatioLabel:"浴比 (1 : X)", fabricTreatmentLabel:"布種",
    unmercBtn:"未絲光棉", mercBtn:"絲光棉／嫘縈",
    dyeRecipeTitle:"染料配方", dyeRecipeSub:"染色濃度（OWF%）由下方染料明細自動加總，不需另外輸入",
    addDyeBtn:"＋ 新增染料", owfTotalLabel:"染色濃度合計", dyeTotalLabel:"染料總重",
    alkaliRecTitle:"建議鹽鹼用量", saltDoseLabel:"芒硝", fixTimeLabel:"建議固著時間",
    alkaliModeLabel:"鹼劑方式", alkaliAloneBtn:"純鹼", alkaliCombinedBtn:"純鹼＋液鹼", alkaliTspBtn:"磷酸三鈉",
    sodaAloneLabel:"純鹼", sodaCombinedLabel:"純鹼", liquidAlkaliLabel:"液鹼(38°Bé)", tspLabel:"磷酸三鈉",
    totalLiquorLabel:"總浴液量（布重 × 浴比）", saltTotalLabel:"芒硝總需求量",
    showRefTable:"顯示 Everzol 鹽鹼用量對照表", hideRefTable:"隱藏 Everzol 鹽鹼用量對照表",
    refUnmerc:"未絲光棉", refMerc:"絲光棉／嫘縈", refSodaAlone:"純鹼(單獨)", refCombined:"純鹼+液鹼", refTsp:"磷酸三鈉", refFixTime:"固著(分)",
    dyeWarnNote:"染 Turquoise Blue G、Brilliant Blue R s/p、B-BRF 150%、Blue LX 系列僅建議使用芒硝；Brilliant Blue R s/p 芒硝用量請勿超過 50 g/L。",
    auxTitle:"助劑秤量表", auxSub:"每項可選「%OWF（依布重）」或「g/L・ml/L（依浴液量）」，自動換算實際用量", addAuxBtn:"＋ 新增助劑",
    bathTitle:"浴量／浴比校正", bathSub:"依現場實測比重回推缸內實際水量，計算還需補水量",
    bathRefTitle:"配方參考值",
    saltTypeLabel:"校正用鹽種", saltTypeGlauberBtn:"芒硝", saltTypeCommonBtn:"粗鹽／鹽巴",
    commonSaltWarnNote:"目前粗鹽比重表是用公開文獻密度數據推算的估計值，還沒有現場實測或公司內部標準值驗證過，準確度未知，僅供參考，請盡量以芒硝或現場實測數據為準。",
    targetSaltDoseLabel:"目標鹽劑濃度", targetSaltTotalLabel:"目標鹽劑重量", targetWaterLabel:"目標總浴量", targetSGLabel:"目標理論比重",
    tempLabel:"比重量測溫度",
    measuredSGLabel:"量測比重(手動輸入)", measuredSGPlaceholder:"請輸入實測比重",
    sgConcLabel:"缸內鹽劑濃度", actualWaterLabel:"缸內實際水量", calibSpaceLabel:"剩餘補水空間", calibSaltLabel:"校正鹽劑濃度", startLevelLabel:"目前液位比例", calibTag:"校正：",
    optionDrainLabel:"方案①排水＋補鹽", optionAddOnlyLabel:"方案②只補鹽",
    showSgTable:"顯示比重對照表", hideSgTable:"隱藏比重對照表", sgCol:"比重", concCol:"濃度g/l",
    speedTitle:"布速參考區間", speedSub:"參考值，依現場實際機台校正後可自行調整", speedWipNote:"此頁功能尚未定案、建構中，數字僅供參考，請勿直接用於現場設定。",
    machineTypeLabel:"染色機類型", machineWinch:"繩染／絞盤（舊式，無噴嘴）", machineOverflow:"溢流機",
    machineSoftflow:"軟流機（低張力）", machineJet:"噴射機（Jet）", machineAirflow:"氣流機（Airflow）",
    weightGradeLabel:"布重分級", lightBtn:"輕薄", midBtn:"中厚", heavyBtn:"厚重",
    ratioGradeLabel:"浴比等級（依配方卡浴比自動判定，可覆寫）", ratioLowBtn:"低浴比 <1:6", ratioMidBtn:"標準 1:6–1:10", ratioHighBtn:"高浴比 >1:10",
    speedRangeLabel:"建議布速區間", pressureRangeLabel:"建議噴嘴壓力", pressureNoValueLabel:"噴嘴壓力",
    reelDiameterLabel:"絞盤／主滾筒直徑（選填，用於換算實際轉速）", rpmRangeLabel:"對應絞盤轉速區間",
    measureModeLabel:"量測方式", directModeBtn:"直接輸入布速", calcModeBtn:"布圈長度＋碼表計時",
    actualSpeedLabel:"實測布速", loopLengthLabel:"布圈總長度", loopSecondsLabel:"跑一圈所需時間",
    printBtnLabel:"列印 / 儲存工卡 PDF", recipeGrpTitle:"配方",
    downloadImgBtnLabel:"下載工卡圖片", downloadHint:"iPhone／iPad：產生圖片後長按圖片即可存到相簿",
    downloadBtnLabel:"下載", downloadPdfBtnLabel:"另存為 PDF",
    generatingImg:"圖片產生中…", imgReady:"圖片已產生，可以長按或點下方按鈕下載",
    totalLiquorColLabel:"總浴液量", saltDoseColLabel:"芒硝用量", saltTotalColLabel:"芒硝總量",
    dyeWeighGrpTitle:"染料秤量", auxWeighGrpTitle:"助劑秤量", itemNameCol:"品名", doseCol:"用量", weighResultCol:"秤重",
    ratioColLabel:"浴比", itemNamePh:"品名", deleteTitle:"刪除", unnamedItem:"（未命名）"
  },
  en: {
    appTitle:"Exhaust Trial Tool", appSubtitle:"Recipe dosing · bath ratio correction · fabric speed reference",
    shareBtn:"Share",
    loadRecipeTitle:"Load Saved Recipe", loadRecipeLabel:"Load Recipe", saveRecipeLabel:"Save Recipe", selectRecipeOpt:"-- Select a saved recipe --", deleteBtn:"Delete", clearBtn:"Clear",
    jumpOrder:"Order/Fabric", jumpDye:"Dye Recipe", jumpSalt:"Salt/Alkali",
    orderInfoTitle:"Order Info", customerPh:"Customer", colorOrderPh:"Color / Order No.", fabricDescPh:"Fabric type (e.g. 100% Cotton)",
    saveRecipeTitle:"Save Current Recipe", recipeNamePh:"Enter recipe name", saveBtn:"Save",
    tabRecipe:"Recipe", tabPrint:"Card", tabBath:"Bath", tabSpeed:"Speed", tabProcess:"Process", tabReference:"Result",
    dyeResultSection:"Dyeing Result Record", takePhoto:"Take Photo", uploadPhoto:"Upload Photo",
    dyeResultLabel:"Dyeing Result Summary", dyeResultPlaceholder:"Notes on dyeing result, shade variance, etc...",
    photoCaptionPlaceholder:"Photo caption", closeButton:"Close",
    pretreatTitle:"Pretreatment", dyeStageTitle:"Dyeing", washStageTitle:"Washing",
    stageSub:"Enter ramp time + hold time for each stage; starting temp defaults per stage (fresh bath)",
    stageStartTempLabel:"Starting temp", addStageBtn:"+ Add stage", templateSelectLabel:"Choose template", saveTemplateBtn:"Save as template",
    stageNotePh:"Note (e.g. add salt, add soda, soaping)",
    targetTempLabel:"Target temp (°C)", rampMinLabel:"Ramp (min)", holdMinLabel:"Hold (min)",
    curveTitle:"Process Curve", fillStageMsg:"Fill in at least one stage to see the curve.", drainLabel:"Drain", drainHint:"(auto 3-min gap)",
    basicInfoTitle:"Basic Info", basicInfoSub:"Fabric weight and liquor ratio apply to all corrections below",
    fabricWeightLabel:"Fabric weight", liquorRatioLabel:"Liquor ratio (1 : X)", fabricTreatmentLabel:"Fabric treatment",
    unmercBtn:"Unmercerized cotton", mercBtn:"Mercerized / rayon",
    dyeRecipeTitle:"Dye Recipe", dyeRecipeSub:"Dye concentration (OWF%) is totaled automatically from the dye list below",
    addDyeBtn:"+ Add dye", owfTotalLabel:"Total dye conc.", dyeTotalLabel:"Total dye weight",
    alkaliRecTitle:"Suggested Salt/Alkali Dosing", saltDoseLabel:"Glauber's salt", fixTimeLabel:"Suggested fixation time",
    alkaliModeLabel:"Alkali method", alkaliAloneBtn:"Soda ash", alkaliCombinedBtn:"Soda ash + Caustic Soda", alkaliTspBtn:"Trisodium phosphate",
    sodaAloneLabel:"Soda ash", sodaCombinedLabel:"Soda ash", liquidAlkaliLabel:"Caustic Soda (38°Bé)", tspLabel:"Trisodium phosphate",
    totalLiquorLabel:"Total liquor (weight × ratio)", saltTotalLabel:"Total Glauber's salt needed",
    showRefTable:"Show Everzol dosing reference table", hideRefTable:"Hide Everzol dosing reference table",
    refUnmerc:"Unmercerized", refMerc:"Mercerized/rayon", refSodaAlone:"Soda ash (alone)", refCombined:"Soda ash + Caustic Soda", refTsp:"TSP", refFixTime:"Fix time (min)",
    dyeWarnNote:"For Turquoise Blue G, Brilliant Blue R s/p, B-BRF 150%, and the Blue LX series, use Glauber's salt only; keep Brilliant Blue R s/p salt dose under 50 g/L.",
    auxTitle:"Auxiliary Dosing Table", auxSub:"Each row can use %OWF (of fabric weight) or g/L · ml/L (of liquor) — actual dose is converted automatically", addAuxBtn:"+ Add auxiliary",
    bathTitle:"Bath Volume / Liquor Ratio Correction", bathSub:"Back-calculate the actual tank water volume from a measured specific gravity, and the make-up water needed",
    bathRefTitle:"Recipe reference values",
    saltTypeLabel:"Salt type for calibration", saltTypeGlauberBtn:"Glauber's Salt", saltTypeCommonBtn:"Common Salt",
    commonSaltWarnNote:"The Common Salt SG table is currently an estimate derived from published density data, not yet verified against field measurements or an internal company standard — accuracy unknown. Prefer Glauber's Salt or field-measured data where possible.",
    targetSaltDoseLabel:"Target salt conc.", targetSaltTotalLabel:"Target salt weight", targetWaterLabel:"Target total liquor", targetSGLabel:"Target theoretical SG",
    tempLabel:"SG reading temperature",
    measuredSGLabel:"Measured SG (manual entry)", measuredSGPlaceholder:"Enter measured SG",
    sgConcLabel:"Concentration in tank", actualWaterLabel:"Actual tank water", calibSpaceLabel:"Remaining fill space", calibSaltLabel:"Correct salt conc.", startLevelLabel:"Current fill level", calibTag:"Calibration: ",
    optionDrainLabel:"Option ① Drain + add salt", optionAddOnlyLabel:"Option ② Add salt only",
    showSgTable:"Show specific-gravity table", hideSgTable:"Hide specific-gravity table", sgCol:"SG", concCol:"Conc. g/l",
    speedTitle:"Fabric Speed Reference", speedSub:"Reference values — calibrate to your actual machine on-site", speedWipNote:"This page is still under construction — numbers are for reference only, do not use directly for machine settings.",
    machineTypeLabel:"Machine type", machineWinch:"Rope/Winch (conventional, no nozzle)", machineOverflow:"Overflow machine",
    machineSoftflow:"Soft-flow machine (low tension)", machineJet:"Jet machine", machineAirflow:"Airflow machine",
    weightGradeLabel:"Fabric weight class", lightBtn:"Light", midBtn:"Medium", heavyBtn:"Heavy",
    ratioGradeLabel:"Liquor ratio class (auto from recipe, editable)", ratioLowBtn:"Low <1:6", ratioMidBtn:"Standard 1:6–1:10", ratioHighBtn:"High >1:10",
    speedRangeLabel:"Suggested speed range", pressureRangeLabel:"Suggested nozzle pressure", pressureNoValueLabel:"Nozzle pressure",
    reelDiameterLabel:"Reel/roller diameter (optional, for RPM conversion)", rpmRangeLabel:"Corresponding reel RPM range",
    measureModeLabel:"Measurement method", directModeBtn:"Enter speed directly", calcModeBtn:"Loop length + stopwatch",
    actualSpeedLabel:"Measured speed", loopLengthLabel:"Total loop length", loopSecondsLabel:"Time for one loop",
    printBtnLabel:"Print / Save as PDF", recipeGrpTitle:"Recipe",
    downloadImgBtnLabel:"Download Image", downloadHint:"iPhone/iPad: after generating, long-press the image to save to Photos",
    downloadBtnLabel:"Download", downloadPdfBtnLabel:"Save as PDF",
    generatingImg:"Generating image…", imgReady:"Image ready — long-press it or use the download button below",
    totalLiquorColLabel:"Total liquor", saltDoseColLabel:"Glauber's salt dose", saltTotalColLabel:"Glauber's salt total",
    dyeWeighGrpTitle:"Dye Weighing", auxWeighGrpTitle:"Auxiliary Weighing", itemNameCol:"Item", doseCol:"Dose", weighResultCol:"Weight",
    ratioColLabel:"Liquor ratio", itemNamePh:"Item name", deleteTitle:"Delete", unnamedItem:"(unnamed)"
  }
};

// 內建範本：依 Everzol 技術手冊 A-4（水洗）、A-6/A-7（染法一～五）整理，
// 部分區間手冊寫的是範圍值（例如 20-30'），已取合理數值代表，實際請依現場再核對調整
const BUILTIN_TEMPLATES = {
  pretreat: [
    { id:"bp_ref", name:"參考範例（前處理）", startTemp:40, segs:[
      { targetTemp:60, rampMin:10, holdMin:5,  note:"加燒鹼+雙氧水" },
      { targetTemp:98, rampMin:15, holdMin:60 },
      { targetTemp:80, rampMin:5,  holdMin:5,  note:"OVERFLOW排放", drain:true },
      { targetTemp:60, rampMin:5,  holdMin:20, note:"洗水", drain:true },
      { targetTemp:60, rampMin:5,  holdMin:20, note:"PH調整", drain:true }
    ]}
  ],
  dye: [
    { id:"bd_m1", name:"染法一：一般染法", startTemp:30, segs:[
      { targetTemp:30, rampMin:0,  holdMin:10, note:"加染料" },
      { targetTemp:30, rampMin:0,  holdMin:10, note:"加芒硝1/2" },
      { targetTemp:30, rampMin:0,  holdMin:10, note:"加芒硝2/2" },
      { targetTemp:30, rampMin:0,  holdMin:10 },
      { targetTemp:60, rampMin:25, holdMin:20, note:"加鹼劑" },
      { targetTemp:60, rampMin:0,  holdMin:45, note:"洗淨", drain:true }
    ]},
    { id:"bd_m2", name:"染法二：快速恆溫法（紗線/易染織物）", startTemp:60, segs:[
      { targetTemp:60, rampMin:0, holdMin:10, note:"加染料" },
      { targetTemp:60, rampMin:0, holdMin:10, note:"加芒硝1/2" },
      { targetTemp:60, rampMin:0, holdMin:10, note:"加芒硝2/2" },
      { targetTemp:60, rampMin:0, holdMin:15, note:"加鹼劑" },
      { targetTemp:60, rampMin:0, holdMin:30, note:"固色保溫" },
      { targetTemp:60, rampMin:0, holdMin:45, note:"洗淨", drain:true }
    ]},
    { id:"bd_m3", name:"染法三：高溫移染法（Viscose/Tencel/Modal/厚重織物）", startTemp:50, segs:[
      { targetTemp:50, rampMin:0,  holdMin:10, note:"加染料" },
      { targetTemp:50, rampMin:0,  holdMin:10, note:"加芒硝1/2" },
      { targetTemp:50, rampMin:0,  holdMin:10, note:"加芒硝2/2" },
      { targetTemp:50, rampMin:0,  holdMin:10 },
      { targetTemp:80, rampMin:20, holdMin:20, note:"高溫移染" },
      { targetTemp:60, rampMin:15, holdMin:30, note:"加鹼劑" },
      { targetTemp:60, rampMin:0,  holdMin:45, note:"洗淨", drain:true }
    ]},
    { id:"bd_m4", name:"染法四：預加鹼法", startTemp:30, segs:[
      { targetTemp:30, rampMin:0,  holdMin:10, note:"加染料" },
      { targetTemp:30, rampMin:0,  holdMin:10, note:"加芒硝1/2" },
      { targetTemp:30, rampMin:0,  holdMin:10, note:"加芒硝2/2" },
      { targetTemp:30, rampMin:0,  holdMin:10, note:"加純鹼(0.5-2g/L)" },
      { targetTemp:30, rampMin:0,  holdMin:10 },
      { targetTemp:30, rampMin:0,  holdMin:10 },
      { targetTemp:60, rampMin:15, holdMin:30, note:"加鹼劑" },
      { targetTemp:60, rampMin:0,  holdMin:45, note:"洗淨", drain:true }
    ]},
    { id:"bd_m5", name:"染法五：Turquoise Blue G 專用染法", startTemp:50, segs:[
      { targetTemp:50, rampMin:0,  holdMin:10, note:"加染料" },
      { targetTemp:50, rampMin:0,  holdMin:10, note:"加芒硝1/2" },
      { targetTemp:50, rampMin:0,  holdMin:10, note:"加芒硝2/2" },
      { targetTemp:50, rampMin:0,  holdMin:10 },
      { targetTemp:90, rampMin:25, holdMin:20 },
      { targetTemp:80, rampMin:8,  holdMin:20 },
      { targetTemp:80, rampMin:0,  holdMin:30, note:"加鹼劑" },
      { targetTemp:80, rampMin:0,  holdMin:45, note:"洗淨", drain:true }
    ]},
    { id:"bd_nylon6", name:"尼龍6 繩狀/經軸/筒子紗染色（A-13）", startTemp:40, segs:[
      { targetTemp:40, rampMin:0,  holdMin:10, note:"加均染劑" },
      { targetTemp:40, rampMin:0,  holdMin:10, note:"加酸性染料" },
      { targetTemp:40, rampMin:0,  holdMin:10, note:"加硫酸銨+醋酸" },
      { targetTemp:98, rampMin:58, holdMin:30, note:"保溫染色", drain:true }
    ]},
    { id:"bd_nylon66", name:"尼龍6,6 繩狀/經軸/筒子紗染色（A-13）", startTemp:40, segs:[
      { targetTemp:40, rampMin:0,  holdMin:10, note:"加均染劑" },
      { targetTemp:40, rampMin:0,  holdMin:10, note:"加酸性染料" },
      { targetTemp:40, rampMin:0,  holdMin:10, note:"加硫酸銨+醋酸" },
      { targetTemp:115, rampMin:75, holdMin:30, note:"保溫染色", drain:true }
    ]}
  ],
  // 水洗每一道都是排掉舊水、新水進缸、缸內加溫到這一道要的溫度——新進的水每次都是差不多同一個
  // 起始溫度，不是接著上一道已經加熱過的溫度繼續疊上去。所以這裡的 rampMin 是「這一道目標溫度
  // 跟起始溫度的溫差」，用同一個每分鐘 3°C 的速率換算，同樣的目標溫度會得到同樣的爬升時間，
  // 斜率自然一致（現場實際速率不同的話，調整下面除的那個 3 就好，全部段落一起變）。
  wash: [
    { id:"bw_a4", name:"標準水洗（A-4，7道）", startTemp:40, segs:[
      { targetTemp:40, rampMin:0,  holdMin:10, note:"溢流冷水洗", drain:true },
      { targetTemp:40, rampMin:0,  holdMin:10, note:"酸中和", drain:true },
      { targetTemp:65, rampMin:8,  holdMin:10, note:"溫水洗", drain:true },
      { targetTemp:90, rampMin:17, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:98, rampMin:19, holdMin:10, note:"皂洗", drain:true },
      { targetTemp:65, rampMin:8,  holdMin:10, note:"溫水洗", drain:true },
      { targetTemp:40, rampMin:0,  holdMin:10, note:"冷水洗", drain:true }
    ]},
    { id:"bw_mt", name:"MT 中溫洗淨（5道）", startTemp:50, segs:[
      { targetTemp:50, rampMin:0, holdMin:10, note:"酸中和", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"熱水洗", drain:true }
    ]},
    { id:"bw_mts", name:"MTS 中溫皂洗（5道）", startTemp:50, segs:[
      { targetTemp:50, rampMin:0, holdMin:10, note:"酸中和", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"皂洗", drain:true },
      { targetTemp:70, rampMin:7, holdMin:10, note:"皂洗", drain:true }
    ]},
    { id:"bw_ht", name:"HT 高溫皂洗（6道）", startTemp:50, segs:[
      { targetTemp:50, rampMin:0,  holdMin:10, note:"酸中和", drain:true },
      { targetTemp:60, rampMin:3,  holdMin:10, note:"溫水洗", drain:true },
      { targetTemp:80, rampMin:10, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:98, rampMin:16, holdMin:10, note:"皂洗", drain:true },
      { targetTemp:80, rampMin:10, holdMin:10, note:"熱水洗", drain:true },
      { targetTemp:60, rampMin:3,  holdMin:10, note:"溫水洗", drain:true }
    ]}
  ]
};
