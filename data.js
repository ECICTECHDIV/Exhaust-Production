/* ============================================================
 * data.js — 浸染試染工具：查表資料 / 範本庫 / 雙語字典
 * 這個檔案只放「資料」，不放邏輯。修改鹽鹼用量表、機台速度範圍、
 * 內建染色/水洗範本、雙語字串時改這裡；改計算邏輯或畫面互動去改 app.js。
 * 載入順序要排在 app.js 之前（app.js 會直接使用這裡定義的常數）。
 * ============================================================ */

/* ============ 資料表 ============ */

const SG_TABLE = {
  40: [[1.006,10],[1.0068,11],[1.0076,12],[1.0084,13],[1.0092,14],[1.01,15],[1.0108,16],[1.0116,17],[1.0124,18],[1.0132,19],[1.014,20],[1.0148,21],[1.0156,22],[1.0164,23],[1.0172,24],[1.018,25],[1.0188,26],[1.0196,27],[1.0204,28],[1.0212,29],[1.022,30],[1.0228,31],[1.0236,32],[1.0244,33],[1.0252,34],[1.026,35],[1.0268,36],[1.0276,37],[1.0284,38],[1.0292,39],[1.03,40],[1.0308,41],[1.0316,42],[1.0324,43],[1.0332,44],[1.034,45],[1.0348,46],[1.0356,47],[1.0364,48],[1.0372,49],[1.038,50],[1.0388,51],[1.0396,52],[1.0404,53],[1.0412,54],[1.042,55],[1.0428,56],[1.0436,57],[1.0444,58],[1.0452,59],[1.046,60],[1.0468,61],[1.0476,62],[1.0484,63],[1.0492,64],[1.05,65],[1.0508,66],[1.0516,67],[1.0524,68],[1.0532,69],[1.054,70],[1.0548,71],[1.0556,72],[1.0564,73],[1.0572,74],[1.058,75],[1.0588,76],[1.0596,77],[1.0604,78],[1.0612,79],[1.062,80],[1.0628,81],[1.0636,82],[1.0644,83],[1.0652,84],[1.066,85],[1.0668,86],[1.0676,87],[1.0684,88],[1.0692,89],[1.07,90],[1.0708,91],[1.0716,92],[1.0724,93],[1.0732,94],[1.074,95],[1.0748,96],[1.0756,97],[1.0764,98],[1.0772,99],[1.078,100],[1.0788,101],[1.0796,102],[1.0804,103],[1.0812,104],[1.082,105],[1.0828,106],[1.0836,107],[1.0844,108],[1.0852,109],[1.086,110],[1.0868,111],[1.0876,112],[1.0884,113],[1.0892,114],[1.09,115],[1.0908,116],[1.0916,117],[1.0924,118],[1.0932,119],[1.094,120],[1.0948,121],[1.0956,122],[1.0964,123],[1.0972,124],[1.098,125],[1.0988,126],[1.0996,127],[1.1004,128],[1.1012,129],[1.102,130],[1.1028,131],[1.1036,132],[1.1044,133],[1.1052,134]],
  60: [[0.99,4.5],[0.991,5.7],[0.992,6.9],[0.993,8],[0.994,9.2],[0.995,10.4],[0.996,11.6],[0.997,12.7],[0.998,13.9],[0.999,15.1],[1,16.3],[1.001,17.5],[1.002,18.6],[1.003,19.8],[1.004,21],[1.005,22.2],[1.006,23.3],[1.007,24.5],[1.008,25.7],[1.009,26.9],[1.01,28.1],[1.011,29.2],[1.012,30.4],[1.013,31.6],[1.014,32.8],[1.015,33.9],[1.016,35.1],[1.017,36.3],[1.018,37.5],[1.019,38.7],[1.02,39.8],[1.021,41],[1.022,42.2],[1.023,43.4],[1.024,44.5],[1.025,45.7],[1.026,46.9],[1.027,48.1],[1.028,49.3],[1.029,50.4],[1.03,51.6],[1.031,52.8],[1.032,54],[1.033,55.1],[1.034,56.3],[1.035,57.5],[1.036,58.7],[1.037,59.9],[1.038,61],[1.039,62.2],[1.04,63.4],[1.041,64.6],[1.042,65.7],[1.043,66.9],[1.044,68.1],[1.045,69.3],[1.046,70.5],[1.047,71.6],[1.048,72.8],[1.049,74.0],[1.05,75.2],[1.051,76.3],[1.052,77.5],[1.053,78.7],[1.054,79.9],[1.055,81.1],[1.056,82.2],[1.057,83.3],[1.058,84.5],[1.059,85.7],[1.06,86.9],[1.061,88.0],[1.062,89.2],[1.063,90.4],[1.064,91.6],[1.065,92.8],[1.066,93.9],[1.067,95.1],[1.068,96.3],[1.069,97.5],[1.07,98.6],[1.071,99.8],[1.072,101],[1.073,102.2],[1.074,103.4],[1.075,104.5],[1.076,105.7],[1.077,106.9],[1.078,108.1],[1.079,109.3],[1.08,110.5],[1.081,111.7],[1.082,112.9],[1.083,114],[1.084,115.2],[1.085,116.4],[1.086,117.6],[1.087,118.8],[1.088,119.9],[1.089,121.1],[1.09,122.3],[1.091,123.5],[1.092,124.6],[1.093,125.8],[1.094,127],[1.095,128.2],[1.096,129.4],[1.097,130.5],[1.098,131.7],[1.099,132.9],[1.1,134.1],[1.101,135.2],[1.102,136.4],[1.103,137.6],[1.104,138.8],[1.105,140],[1.106,141.1],[1.107,142.3],[1.108,143.5],[1.109,144.7],[1.11,145.8],[1.111,147],[1.112,148.2],[1.113,149.4],[1.114,150.6]],
  80: [[0.99,14],[0.991,15.2],[0.992,16.4],[0.993,17.6],[0.994,18.7],[0.995,19.9],[0.996,21.1],[0.997,22.3],[0.998,23.5],[0.999,24.7],[1,25.8],[1.001,27],[1.002,28.2],[1.003,29.4],[1.004,30.6],[1.005,31.8],[1.006,32.9],[1.007,34.1],[1.008,35.3],[1.009,36.5],[1.01,37.7],[1.011,38.9],[1.012,40],[1.013,41.2],[1.014,42.4],[1.015,43.6],[1.016,44.8],[1.017,46],[1.018,47.1],[1.019,48.3],[1.02,49.5],[1.021,50.7],[1.022,51.9],[1.023,53.1],[1.024,54.2],[1.025,55.4],[1.026,56.6],[1.027,57.8],[1.028,59],[1.029,60.2],[1.03,61.3],[1.031,62.5],[1.032,63.7],[1.033,64.9],[1.034,66.1],[1.035,67.3],[1.036,68.4],[1.037,69.6],[1.038,70.8],[1.039,72.0],[1.04,73.2],[1.041,74.4],[1.042,75.5],[1.043,76.7],[1.044,77.9],[1.045,79.1],[1.046,80.3],[1.047,81.5],[1.048,82.6],[1.049,83.8],[1.05,85.0],[1.051,86.2],[1.052,87.4],[1.053,88.6],[1.054,89.7],[1.055,90.9],[1.056,92.1],[1.057,93.3],[1.058,94.5],[1.059,95.7],[1.06,96.8],[1.061,98.0],[1.062,99.2],[1.063,100.4],[1.064,101.6],[1.065,102.8],[1.066,103.9],[1.067,105.1],[1.068,106.3],[1.069,107.5],[1.07,108.7],[1.071,109.9],[1.072,111],[1.073,112.2],[1.074,113.4],[1.075,114.6],[1.076,115.8],[1.077,117],[1.078,118.1],[1.079,119.3],[1.08,120.5],[1.081,121.7],[1.082,122.9],[1.083,124.1],[1.084,125.2],[1.085,126.4],[1.086,127.6],[1.087,128.8],[1.088,130],[1.089,131.2],[1.09,132.3],[1.091,133.5],[1.092,134.7],[1.093,135.9],[1.094,137.1],[1.095,138.3],[1.096,139.4],[1.097,140.6],[1.098,141.8],[1.099,143],[1.1,144.2],[1.101,145.4],[1.102,146.5],[1.103,147.7],[1.104,148.9],[1.105,150.1],[1.106,151.3],[1.107,152.5],[1.108,153.6],[1.109,154.8],[1.11,156],[1.111,157.2],[1.112,158.4],[1.113,159.6],[1.114,160.7]]
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
    targetSaltDoseLabel:"目標芒硝濃度", targetSaltTotalLabel:"目標芒硝重量", targetWaterLabel:"目標總浴量", targetSGLabel:"目標理論比重",
    tempLabel:"比重量測溫度",
    measuredSGLabel:"量測比重(手動輸入)", measuredSGPlaceholder:"請輸入實測比重",
    sgConcLabel:"缸內芒硝濃度", actualWaterLabel:"缸內實際水量", calibSpaceLabel:"剩餘補水空間", calibSaltLabel:"校正芒硝濃度", startLevelLabel:"目前液位比例", calibTag:"校正：",
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
    targetSaltDoseLabel:"Target Glauber's salt conc.", targetSaltTotalLabel:"Target Glauber's salt weight", targetWaterLabel:"Target total liquor", targetSGLabel:"Target theoretical SG",
    tempLabel:"SG reading temperature",
    measuredSGLabel:"Measured SG (manual entry)", measuredSGPlaceholder:"Enter measured SG",
    sgConcLabel:"Concentration in tank", actualWaterLabel:"Actual tank water", calibSpaceLabel:"Remaining fill space", calibSaltLabel:"Correct salt conc.", startLevelLabel:"Current fill level", calibTag:"Calibration: ",
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
