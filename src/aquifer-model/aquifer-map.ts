import { YMap, IAquiferMap } from "../well-and-aquifer/aquifer-map";

// rock_bed_confined: YMap;       // Bottom - Solid - lowest Y values
// water_table_confined: YMap;    // 2ⁿᵈ Layer
// rock_ceiling_confined: YMap;   // 3ʳᵈ Layer
// rock_bed_unconfined: YMap;     // 4ᵗʰ Layer
// water_table_unconfined: YMap;  // Top.

// 03-09-2018: This activity tends to invite students to put wells right at
// the boundary of water and rock red or even slightly into the rock bed (and
// well still able to pump).  So, in this revised map, "rock_bed_unconfined"
// and "rock_bed_unconfined" are both shifted in y by -2 (halft the minimum
// thickness of the rock layer just below the unconfined aquifer).
export const AquiferMap:IAquiferMap = {
   "rock_bed_confined": {
      "-205": -28.37,
      "-204": -28.37,
      "-203": -28.37,
      "-202": -28.37,
      "-201": -28.37,
      "-200": -28.64,
      "-199": -28.98,
      "-198": -29.32,
      "-197": -29.67,
      "-196": -30.01,
      "-195": -30.35,
      "-194": -30.69,
      "-193": -31.03,
      "-192": -31.37,
      "-191": -31.71,
      "-190": -32.05,
      "-189": -32.39,
      "-188": -32.72,
      "-187": -32.93,
      "-186": -33.13,
      "-185": -33.33,
      "-184": -33.54,
      "-183": -33.74,
      "-182": -33.94,
      "-181": -34.15,
      "-180": -34.35,
      "-179": -34.56,
      "-178": -34.76,
      "-177": -34.88,
      "-176": -34.78,
      "-175": -34.68,
      "-174": -34.58,
      "-173": -34.48,
      "-172": -34.37,
      "-171": -34.27,
      "-170": -34.17,
      "-169": -34.0,
      "-168": -33.45,
      "-167": -32.9,
      "-166": -32.34,
      "-165": -31.79,
      "-164": -31.24,
      "-163": -30.69,
      "-162": -30.13,
      "-161": -29.58,
      "-160": -29.03,
      "-159": -28.5,
      "-158": -28.07,
      "-157": -27.65,
      "-156": -27.22,
      "-155": -26.8,
      "-154": -26.37,
      "-153": -26.07,
      "-152": -26.01,
      "-151": -25.96,
      "-150": -25.9,
      "-149": -25.84,
      "-148": -25.41,
      "-147": -24.7,
      "-146": -23.99,
      "-145": -23.87,
      "-144": -23.86,
      "-143": -23.84,
      "-142": -23.82,
      "-141": -23.81,
      "-140": -23.79,
      "-139": -23.78,
      "-138": -23.76,
      "-137": -23.74,
      "-136": -23.73,
      "-135": -23.71,
      "-134": -23.7,
      "-133": -23.68,
      "-132": -23.66,
      "-131": -23.65,
      "-130": -23.63,
      "-129": -23.62,
      "-128": -23.6,
      "-127": -23.58,
      "-126": -23.57,
      "-125": -23.55,
      "-124": -24.03,
      "-123": -24.52,
      "-122": -25.01,
      "-121": -25.5,
      "-120": -25.99,
      "-119": -26.49,
      "-118": -26.98,
      "-117": -27.47,
      "-116": -27.96,
      "-115": -28.28,
      "-114": -28.59,
      "-113": -28.91,
      "-112": -29.22,
      "-111": -29.53,
      "-110": -29.84,
      "-109": -30.15,
      "-108": -30.46,
      "-107": -30.77,
      "-106": -30.83,
      "-105": -30.88,
      "-104": -30.93,
      "-103": -30.98,
      "-102": -31.03,
      "-101": -31.09,
      "-100": -31.14,
      "-99": -31.19,
      "-98": -31.24,
      "-97": -31.29,
      "-96": -31.4,
      "-95": -31.6,
      "-94": -31.8,
      "-93": -32.0,
      "-92": -32.19,
      "-91": -32.39,
      "-90": -32.59,
      "-89": -32.79,
      "-88": -32.99,
      "-87": -33.17,
      "-86": -32.98,
      "-85": -32.79,
      "-84": -32.6,
      "-83": -32.41,
      "-82": -32.22,
      "-81": -32.02,
      "-80": -31.83,
      "-79": -31.64,
      "-78": -31.45,
      "-77": -31.26,
      "-76": -31.07,
      "-75": -30.88,
      "-74": -30.68,
      "-73": -30.45,
      "-72": -30.17,
      "-71": -29.89,
      "-70": -29.61,
      "-69": -29.34,
      "-68": -29.06,
      "-67": -28.74,
      "-66": -28.31,
      "-65": -27.88,
      "-64": -27.45,
      "-63": -27.02,
      "-62": -26.59,
      "-61": -26.15,
      "-60": -25.72,
      "-59": -25.29,
      "-58": -24.8,
      "-57": -24.18,
      "-56": -23.56,
      "-55": -22.93,
      "-54": -23.15,
      "-53": -23.63,
      "-52": -23.94,
      "-51": -24.06,
      "-50": -24.19,
      "-49": -24.31,
      "-48": -24.43,
      "-47": -24.55,
      "-46": -24.67,
      "-45": -24.71,
      "-44": -24.71,
      "-43": -24.71,
      "-42": -24.71,
      "-41": -24.7,
      "-40": -24.42,
      "-39": -24.14,
      "-38": -23.89,
      "-37": -23.89,
      "-36": -23.89,
      "-35": -23.89,
      "-34": -23.89,
      "-33": -23.89,
      "-32": -23.89,
      "-31": -23.89,
      "-30": -24.52,
      "-29": -25.51,
      "-28": -26.35,
      "-27": -26.26,
      "-26": -26.16,
      "-25": -26.06,
      "-24": -25.96,
      "-23": -25.86,
      "-22": -26.05,
      "-21": -26.49,
      "-20": -26.93,
      "-19": -27.37,
      "-18": -27.38,
      "-17": -27.27,
      "-16": -27.16,
      "-15": -27.04,
      "-14": -26.93,
      "-13": -26.82,
      "-12": -26.71,
      "-11": -26.59,
      "-10": -25.9,
      "-9": -23.73,
      "-8": -21.57,
      "-7": -19.4,
      "-6": -17.24,
      "-5": -16.04,
      "-4": -14.96,
      "-3": -13.89,
      "-2": -10.52,
      "-1": -5.35,
      "0": -0.95,
      "1": 0.43,
      "2": 0.43,
      "3": 0.43,
      "4": 0.43,
      "5": 0.43,
      "6": 0.43,
      "7": 0.43,
      "8": 0.43,
      "9": 0.43,
      "10": 0.43,
      "11": 0.43,
      "12": 0.43,
      "13": 0.43,
      "14": 0.43,
      "15": 0.43,
      "16": 0.43,
      "17": 0.43,
      "18": 0.43,
      "19": 0.43,
      "20": 0.43,
      "21": 0.43,
      "22": 0.43,
      "23": 0.43,
      "24": 0.43,
      "25": 0.43,
      "26": 0.43,
      "27": 0.43,
      "28": 0.43,
      "29": 0.43,
      "30": 0.43,
      "31": 0.43,
      "32": 0.43,
      "33": 0.43,
      "34": 0.43,
      "35": 0.43,
      "36": 0.43,
      "37": 0.43,
      "38": 0.43,
      "39": 0.43,
      "40": 0.43,
      "41": 0.43,
      "42": 0.43,
      "43": 0.43,
      "44": 0.43,
      "45": 0.43
   },
   "water_table_confined": {
      "-205": -16.2,
      "-204": -16.2,
      "-203": -16.2,
      "-202": -16.2,
      "-201": -16.2,
      "-200": -16.2,
      "-199": -16.19,
      "-198": -16.19,
      "-197": -16.19,
      "-196": -16.19,
      "-195": -16.19,
      "-194": -16.19,
      "-193": -16.19,
      "-192": -16.18,
      "-191": -16.18,
      "-190": -16.18,
      "-189": -16.18,
      "-188": -16.18,
      "-187": -16.18,
      "-186": -16.18,
      "-185": -16.17,
      "-184": -16.17,
      "-183": -16.17,
      "-182": -16.17,
      "-181": -16.17,
      "-180": -16.17,
      "-179": -16.17,
      "-178": -16.17,
      "-177": -16.16,
      "-176": -16.16,
      "-175": -16.16,
      "-174": -16.16,
      "-173": -16.16,
      "-172": -16.16,
      "-171": -16.16,
      "-170": -16.15,
      "-169": -16.15,
      "-168": -16.15,
      "-167": -16.15,
      "-166": -16.15,
      "-165": -16.15,
      "-164": -16.15,
      "-163": -16.14,
      "-162": -16.14,
      "-161": -16.14,
      "-160": -16.14,
      "-159": -16.14,
      "-158": -16.14,
      "-157": -16.14,
      "-156": -16.13,
      "-155": -16.13,
      "-154": -16.13,
      "-153": -16.13,
      "-152": -16.13,
      "-151": -16.13,
      "-150": -16.13,
      "-149": -16.12,
      "-148": -16.12,
      "-147": -16.12,
      "-146": -16.12,
      "-145": -16.12,
      "-144": -16.12,
      "-143": -16.12,
      "-142": -16.11,
      "-141": -16.11,
      "-140": -16.11,
      "-139": -16.11,
      "-138": -16.11,
      "-137": -16.11,
      "-136": -16.11,
      "-135": -16.1,
      "-134": -16.1,
      "-133": -16.1,
      "-132": -16.1,
      "-131": -16.1,
      "-130": -16.1,
      "-129": -16.1,
      "-128": -16.09,
      "-127": -16.09,
      "-126": -16.09,
      "-125": -16.09,
      "-124": -16.09,
      "-123": -16.09,
      "-122": -16.09,
      "-121": -16.08,
      "-120": -16.08,
      "-119": -16.08,
      "-118": -16.08,
      "-117": -16.08,
      "-116": -16.08,
      "-115": -16.08,
      "-114": -16.08,
      "-113": -16.07,
      "-112": -16.07,
      "-111": -16.07,
      "-110": -16.07,
      "-109": -16.07,
      "-108": -16.07,
      "-107": -16.07,
      "-106": -16.06,
      "-105": -16.06,
      "-104": -16.06,
      "-103": -16.06,
      "-102": -16.06,
      "-101": -16.06,
      "-100": -16.06,
      "-99": -16.05,
      "-98": -16.05,
      "-97": -16.05,
      "-96": -16.05,
      "-95": -16.05,
      "-94": -16.05,
      "-93": -16.05,
      "-92": -16.04,
      "-91": -16.04,
      "-90": -16.04,
      "-89": -16.04,
      "-88": -16.04,
      "-87": -16.04,
      "-86": -16.04,
      "-85": -16.03,
      "-84": -16.03,
      "-83": -16.03,
      "-82": -16.03,
      "-81": -16.03,
      "-80": -16.03,
      "-79": -16.03,
      "-78": -16.02,
      "-77": -16.02,
      "-76": -16.02,
      "-75": -16.02,
      "-74": -16.02,
      "-73": -16.02,
      "-72": -16.02,
      "-71": -16.01,
      "-70": -16.01,
      "-69": -16.01,
      "-68": -16.01,
      "-67": -16.01,
      "-66": -16.01,
      "-65": -16.01,
      "-64": -16.0,
      "-63": -16.0,
      "-62": -16.0,
      "-61": -16.0,
      "-60": -16.0,
      "-59": -16.0,
      "-58": -16.0,
      "-57": -15.99,
      "-56": -15.99,
      "-55": -15.99,
      "-54": -15.99,
      "-53": -15.99,
      "-52": -15.99,
      "-51": -15.99,
      "-50": -15.98,
      "-49": -15.98,
      "-48": -15.98,
      "-47": -15.98,
      "-46": -15.98,
      "-45": -15.98,
      "-44": -15.98,
      "-43": -15.98,
      "-42": -15.97,
      "-41": -15.97,
      "-40": -15.97,
      "-39": -15.97,
      "-38": -15.97,
      "-37": -15.97,
      "-36": -15.97,
      "-35": -15.96,
      "-34": -15.96,
      "-33": -15.96,
      "-32": -15.96,
      "-31": -15.96,
      "-30": -15.96,
      "-29": -15.96,
      "-28": -15.95,
      "-27": -15.95,
      "-26": -15.95,
      "-25": -15.95,
      "-24": -15.95,
      "-23": -15.95,
      "-22": -15.95,
      "-21": -15.94,
      "-20": -15.94,
      "-19": -15.94,
      "-18": -15.94,
      "-17": -15.94,
      "-16": -15.94,
      "-15": -15.94,
      "-14": -15.93,
      "-13": -15.93,
      "-12": -15.93,
      "-11": -15.93,
      "-10": -15.93,
      "-9": -15.93,
      "-8": -15.93,
      "-7": -15.92,
      "-6": -15.92,
      "-5": -15.92,
      "-4": -15.92,
      "-3": -15.92,
      "-2": -15.92,
      "-1": -15.92,
      "0": -15.92,
      "1": -15.92,
      "2": -15.92,
      "3": -15.92,
      "4": -15.92,
      "5": -15.92,
      "6": -15.92,
      "7": -15.92,
      "8": -15.92,
      "9": -15.92,
      "10": -15.92,
      "11": -15.92,
      "12": -15.92,
      "13": -15.92,
      "14": -15.92,
      "15": -15.92,
      "16": -15.92,
      "17": -15.92,
      "18": -15.92,
      "19": -15.92,
      "20": -15.92,
      "21": -15.92,
      "22": -15.92,
      "23": -15.92,
      "24": -15.92,
      "25": -15.92,
      "26": -15.92,
      "27": -15.92,
      "28": -15.92,
      "29": -15.92,
      "30": -15.92,
      "31": -15.92,
      "32": -15.92,
      "33": -15.92,
      "34": -15.92,
      "35": -15.92,
      "36": -15.92,
      "37": -15.92,
      "38": -15.92,
      "39": -15.92,
      "40": -15.92,
      "41": -15.92,
      "42": -15.92,
      "43": -15.92,
      "44": -15.92,
      "45": -15.92
   },
   "rock_ceiling_confined": {
      "-205": -4.07,
      "-204": -4.07,
      "-203": -4.07,
      "-202": -4.07,
      "-201": -4.07,
      "-200": -4.22,
      "-199": -4.39,
      "-198": -4.55,
      "-197": -4.72,
      "-196": -4.88,
      "-195": -5.46,
      "-194": -6.09,
      "-193": -6.72,
      "-192": -7.34,
      "-191": -7.36,
      "-190": -7.34,
      "-189": -7.32,
      "-188": -7.3,
      "-187": -7.28,
      "-186": -7.27,
      "-185": -7.25,
      "-184": -7.23,
      "-183": -7.21,
      "-182": -7.19,
      "-181": -7.17,
      "-180": -7.15,
      "-179": -7.13,
      "-178": -7.11,
      "-177": -6.98,
      "-176": -6.75,
      "-175": -6.52,
      "-174": -6.3,
      "-173": -6.07,
      "-172": -5.84,
      "-171": -5.48,
      "-170": -4.98,
      "-169": -4.47,
      "-168": -3.97,
      "-167": -3.46,
      "-166": -2.95,
      "-165": -2.44,
      "-164": -1.92,
      "-163": -1.34,
      "-162": -0.63,
      "-161": 0.08,
      "-160": 0.36,
      "-159": 0.4,
      "-158": 0.44,
      "-157": 0.48,
      "-156": 0.52,
      "-155": 0.56,
      "-154": 0.6,
      "-153": 0.64,
      "-152": 0.68,
      "-151": 0.72,
      "-150": 0.76,
      "-149": 0.8,
      "-148": 0.84,
      "-147": 0.87,
      "-146": -0.11,
      "-145": -1.31,
      "-144": -1.3,
      "-143": -1.28,
      "-142": -1.26,
      "-141": -1.24,
      "-140": -1.23,
      "-139": -1.21,
      "-138": -1.19,
      "-137": -1.17,
      "-136": -1.16,
      "-135": -1.14,
      "-134": -1.12,
      "-133": -1.1,
      "-132": -1.09,
      "-131": -1.07,
      "-130": -1.05,
      "-129": -1.26,
      "-128": -1.88,
      "-127": -2.51,
      "-126": -3.13,
      "-125": -3.58,
      "-124": -3.72,
      "-123": -3.86,
      "-122": -4.01,
      "-121": -4.15,
      "-120": -4.29,
      "-119": -4.44,
      "-118": -4.58,
      "-117": -4.72,
      "-116": -4.87,
      "-115": -5.15,
      "-114": -5.47,
      "-113": -5.79,
      "-112": -6.11,
      "-111": -6.42,
      "-110": -6.74,
      "-109": -6.83,
      "-108": -6.83,
      "-107": -6.83,
      "-106": -6.83,
      "-105": -6.83,
      "-104": -6.83,
      "-103": -6.83,
      "-102": -6.83,
      "-101": -6.83,
      "-100": -6.83,
      "-99": -7.62,
      "-98": -9.06,
      "-97": -9.1,
      "-96": -9.15,
      "-95": -9.2,
      "-94": -9.25,
      "-93": -9.3,
      "-92": -9.31,
      "-91": -9.31,
      "-90": -9.31,
      "-89": -9.31,
      "-88": -8.45,
      "-87": -7.66,
      "-86": -7.66,
      "-85": -7.66,
      "-84": -7.66,
      "-83": -7.66,
      "-82": -7.66,
      "-81": -7.66,
      "-80": -7.66,
      "-79": -7.66,
      "-78": -7.66,
      "-77": -7.66,
      "-76": -7.66,
      "-75": -7.66,
      "-74": -7.66,
      "-73": -7.66,
      "-72": -7.66,
      "-71": -7.66,
      "-70": -7.66,
      "-69": -7.66,
      "-68": -7.66,
      "-67": -7.21,
      "-66": -6.03,
      "-65": -6.08,
      "-64": -6.13,
      "-63": -6.17,
      "-62": -6.22,
      "-61": -6.27,
      "-60": -4.93,
      "-59": -3.79,
      "-58": -3.76,
      "-57": -3.73,
      "-56": -3.71,
      "-55": -3.68,
      "-54": -3.65,
      "-53": -3.62,
      "-52": -3.59,
      "-51": -3.57,
      "-50": -3.54,
      "-49": -3.49,
      "-48": -3.42,
      "-47": -3.35,
      "-46": -3.28,
      "-45": -3.21,
      "-44": -3.14,
      "-43": -3.07,
      "-42": -3.0,
      "-41": -2.97,
      "-40": -2.97,
      "-39": -2.97,
      "-38": -2.97,
      "-37": -2.97,
      "-36": -2.97,
      "-35": -2.97,
      "-34": -3.47,
      "-33": -4.07,
      "-32": -4.35,
      "-31": -4.35,
      "-30": -4.35,
      "-29": -4.35,
      "-28": -4.35,
      "-27": -4.35,
      "-26": -4.35,
      "-25": -4.3,
      "-24": -4.18,
      "-23": -4.06,
      "-22": -3.95,
      "-21": -3.83,
      "-20": -3.71,
      "-19": -3.6,
      "-18": -3.47,
      "-17": -3.32,
      "-16": -3.18,
      "-15": -3.03,
      "-14": -2.78,
      "-13": -2.44,
      "-12": -2.11,
      "-11": -1.78,
      "-10": -1.45,
      "-9": -1.25,
      "-8": -1.14,
      "-7": -1.03,
      "-6": -0.92,
      "-5": -0.81,
      "-4": -0.7,
      "-3": -0.59,
      "-2": -0.48,
      "-1": -0.37,
      "0": -0.26,
      "1": -0.21,
      "2": -0.21,
      "3": -0.21,
      "4": -0.21,
      "5": -0.21,
      "6": -0.21,
      "7": -0.21,
      "8": -0.21,
      "9": -0.21,
      "10": -0.21,
      "11": -0.21,
      "12": -0.21,
      "13": -0.21,
      "14": -0.21,
      "15": -0.21,
      "16": -0.21,
      "17": -0.21,
      "18": -0.21,
      "19": -0.21,
      "20": -0.21,
      "21": -0.21,
      "22": -0.21,
      "23": -0.21,
      "24": -0.21,
      "25": -0.21,
      "26": -0.21,
      "27": -0.21,
      "28": -0.21,
      "29": -0.21,
      "30": -0.21,
      "31": -0.21,
      "32": -0.21,
      "33": -0.21,
      "34": -0.21,
      "35": -0.21,
      "36": -0.21,
      "37": -0.21,
      "38": -0.21,
      "39": -0.21,
      "40": -0.21,
      "41": -0.21,
      "42": -0.21,
      "43": -0.21,
      "44": -0.21,
      "45": -0.21
   },
   "rock_bed_unconfined": {
      "-205": 4.38,
      "-204": 4.38,
      "-203": 4.38,
      "-202": 4.38,
      "-201": 4.37,
      "-200": 4.34,
      "-199": 4.3,
      "-198": 3.0,
      "-197": 2.98,
      "-196": 2.98,
      "-195": 2.98,
      "-194": 2.24,
      "-193": 2.22,
      "-192": 2.21,
      "-191": 2.2,
      "-190": 2.19,
      "-189": 1.16,
      "-188": 1.16,
      "-187": 1.16,
      "-186": 1.16,
      "-185": 1.16,
      "-184": 1.16,
      "-183": 1.16,
      "-182": 1.16,
      "-181": 1.16,
      "-180": 1.16,
      "-179": 1.16,
      "-178": 1.16,
      "-177": 1.16,
      "-176": 1.16,
      "-175": 1.16,
      "-174": 1.16,
      "-173": 2.33,
      "-172": 2.33,
      "-171": 2.33,
      "-170": 2.33,
      "-169": 2.33,
      "-168": 2.33,
      "-167": 2.33,
      "-166": 2.34,
      "-165": 2.35,
      "-164": 2.36,
      "-163": 2.36,
      "-162": 2.37,
      "-161": 2.38,
      "-160": 2.39,
      "-159": 2.4,
      "-158": 2.41,
      "-157": 2.42,
      "-156": 2.69,
      "-155": 3.17,
      "-154": 3.19,
      "-153": 3.2,
      "-152": 3.22,
      "-151": 3.24,
      "-150": 3.25,
      "-149": 3.27,
      "-148": 3.29,
      "-147": 3.3,
      "-146": 3.32,
      "-145": 3.34,
      "-144": 3.35,
      "-143": 3.37,
      "-142": 3.39,
      "-141": 3.57,
      "-140": 4.15,
      "-139": 4.26,
      "-138": 4.55,
      "-137": 5.27,
      "-136": 5.26,
      "-135": 5.25,
      "-134": 5.24,
      "-133": 5.23,
      "-132": 5.22,
      "-131": 4.41,
      "-130": 4.06,
      "-129": 4.07,
      "-128": 4.07,
      "-127": 4.08,
      "-126": 4.09,
      "-125": 4.1,
      "-124": 3.45,
      "-123": 3.16,
      "-122": 3.14,
      "-121": 3.12,
      "-120": 3.11,
      "-119": 3.09,
      "-118": 2.75,
      "-117": 2.33,
      "-116": 2.32,
      "-115": 2.32,
      "-114": 2.32,
      "-113": 2.32,
      "-112": 2.31,
      "-111": 2.31,
      "-110": 2.31,
      "-109": 2.31,
      "-108": 2.3,
      "-107": 2.3,
      "-106": 2.3,
      "-105": 2.3,
      "-104": 2.11,
      "-103": 1.25,
      "-102": 1.25,
      "-101": 1.24,
      "-100": 1.24,
      "-99": 1.23,
      "-98": 1.23,
      "-97": 1.22,
      "-96": 1.22,
      "-95": 1.21,
      "-94": 0.19,
      "-93": 0.21,
      "-92": 0.23,
      "-91": 0.25,
      "-90": 0.27,
      "-89": 0.29,
      "-88": 0.32,
      "-87": -0.26,
      "-86": -0.56,
      "-85": -0.56,
      "-84": -0.57,
      "-83": -0.57,
      "-82": -0.57,
      "-81": -0.57,
      "-80": -0.58,
      "-79": -0.58,
      "-78": -0.58,
      "-77": -0.58,
      "-76": -0.59,
      "-75": -0.59,
      "-74": -0.59,
      "-73": -0.59,
      "-72": -0.59,
      "-71": -0.6,
      "-70": -0.6,
      "-69": -0.6,
      "-68": -0.6,
      "-67": -0.61,
      "-66": -0.26,
      "-65": 0.19,
      "-64": 0.21,
      "-63": 0.22,
      "-62": 0.56,
      "-61": 1.21,
      "-60": 1.22,
      "-59": 1.23,
      "-58": 1.25,
      "-57": 1.27,
      "-56": 1.98,
      "-55": 2.16,
      "-54": 2.17,
      "-53": 2.19,
      "-52": 2.2,
      "-51": 2.22,
      "-50": 2.24,
      "-49": 2.25,
      "-48": 2.27,
      "-47": 2.28,
      "-46": 2.3,
      "-45": 2.32,
      "-44": 2.45,
      "-43": 2.9,
      "-42": 3.26,
      "-41": 2.77,
      "-40": 2.49,
      "-39": 2.44,
      "-38": 2.39,
      "-37": 2.82,
      "-36": 3.39,
      "-35": 2.95,
      "-34": 2.5,
      "-33": 2.43,
      "-32": 2.43,
      "-31": 2.43,
      "-30": 2.44,
      "-29": 2.44,
      "-28": 2.45,
      "-27": 2.45,
      "-26": 2.46,
      "-25": 2.46,
      "-24": 2.46,
      "-23": 2.47,
      "-22": 3.35,
      "-21": 3.39,
      "-20": 3.39,
      "-19": 3.38,
      "-18": 3.38,
      "-17": 3.37,
      "-16": 3.36,
      "-15": 3.36,
      "-14": 3.91,
      "-13": 4.5,
      "-12": 5.04,
      "-11": 5.44,
      "-10": 5.85,
      "-9": 6.25,
      "-8": 6.65,
      "-7": 7.06,
      "-6": 7.46,
      "-5": 7.86,
      "-4": 8.27,
      "-3": 8.73,
      "-2": 9.18,
      "-1": 9.64,
      "0": 10.09,
      "1": 10.94,
      "2": 12.08,
      "3": 13.22,
      "4": 14.36,
      "5": 15.5,
      "6": 18.77,
      "7": 22.07,
      "8": 26.14,
      "9": 30.11,
      "10": 33.87,
      "11": 37.62,
      "12": 41.38,
      "13": 42.98,
      "14": 42.98,
      "15": 42.98,
      "16": 42.98,
      "17": 42.98,
      "18": 42.98,
      "19": 42.98,
      "20": 42.98,
      "21": 42.98,
      "22": 42.98,
      "23": 42.98,
      "24": 42.98,
      "25": 42.98,
      "26": 42.98,
      "27": 42.98,
      "28": 42.98,
      "29": 42.98,
      "30": 42.98,
      "31": 42.98,
      "32": 42.98,
      "33": 42.98,
      "34": 42.98,
      "35": 42.98,
      "36": 42.98,
      "37": 42.98,
      "38": 42.98,
      "39": 42.98,
      "40": 42.98,
      "41": 42.98,
      "42": 42.98,
      "43": 42.98,
      "44": 42.98,
      "45": 42.98
   },
   "water_table_unconfined": {
      "-205": 12.52,
      "-204": 12.52,
      "-203": 12.52,
      "-202": 12.52,
      "-201": 12.53,
      "-200": 12.53,
      "-199": 12.54,
      "-198": 12.54,
      "-197": 12.55,
      "-196": 12.55,
      "-195": 12.56,
      "-194": 12.56,
      "-193": 12.57,
      "-192": 12.58,
      "-191": 12.58,
      "-190": 12.59,
      "-189": 12.59,
      "-188": 12.6,
      "-187": 12.6,
      "-186": 12.61,
      "-185": 12.61,
      "-184": 12.62,
      "-183": 12.62,
      "-182": 12.63,
      "-181": 12.63,
      "-180": 12.64,
      "-179": 12.65,
      "-178": 12.65,
      "-177": 12.66,
      "-176": 12.66,
      "-175": 12.67,
      "-174": 12.67,
      "-173": 12.68,
      "-172": 12.68,
      "-171": 12.69,
      "-170": 12.69,
      "-169": 12.7,
      "-168": 12.7,
      "-167": 12.71,
      "-166": 12.71,
      "-165": 12.72,
      "-164": 12.73,
      "-163": 12.73,
      "-162": 12.74,
      "-161": 12.74,
      "-160": 12.75,
      "-159": 12.75,
      "-158": 12.76,
      "-157": 12.76,
      "-156": 12.77,
      "-155": 12.77,
      "-154": 12.78,
      "-153": 12.78,
      "-152": 12.79,
      "-151": 12.8,
      "-150": 12.8,
      "-149": 12.81,
      "-148": 12.81,
      "-147": 12.82,
      "-146": 12.82,
      "-145": 12.83,
      "-144": 12.83,
      "-143": 12.84,
      "-142": 12.84,
      "-141": 12.85,
      "-140": 12.85,
      "-139": 12.86,
      "-138": 12.87,
      "-137": 12.87,
      "-136": 12.88,
      "-135": 12.88,
      "-134": 12.89,
      "-133": 12.89,
      "-132": 12.9,
      "-131": 12.9,
      "-130": 12.91,
      "-129": 12.91,
      "-128": 12.92,
      "-127": 12.92,
      "-126": 12.93,
      "-125": 12.93,
      "-124": 12.94,
      "-123": 12.95,
      "-122": 12.95,
      "-121": 12.96,
      "-120": 12.96,
      "-119": 12.97,
      "-118": 12.97,
      "-117": 12.98,
      "-116": 12.98,
      "-115": 12.99,
      "-114": 12.99,
      "-113": 13.0,
      "-112": 13.0,
      "-111": 13.01,
      "-110": 13.02,
      "-109": 13.02,
      "-108": 13.03,
      "-107": 13.03,
      "-106": 13.04,
      "-105": 13.04,
      "-104": 13.05,
      "-103": 13.05,
      "-102": 13.06,
      "-101": 13.06,
      "-100": 13.07,
      "-99": 13.07,
      "-98": 13.08,
      "-97": 13.09,
      "-96": 13.09,
      "-95": 13.1,
      "-94": 13.1,
      "-93": 13.11,
      "-92": 13.11,
      "-91": 13.12,
      "-90": 13.12,
      "-89": 13.13,
      "-88": 13.13,
      "-87": 13.14,
      "-86": 13.14,
      "-85": 13.15,
      "-84": 13.15,
      "-83": 13.16,
      "-82": 13.17,
      "-81": 13.17,
      "-80": 13.18,
      "-79": 13.18,
      "-78": 13.19,
      "-77": 13.19,
      "-76": 13.2,
      "-75": 13.2,
      "-74": 13.21,
      "-73": 13.21,
      "-72": 13.22,
      "-71": 13.22,
      "-70": 13.23,
      "-69": 13.24,
      "-68": 13.24,
      "-67": 13.25,
      "-66": 13.25,
      "-65": 13.26,
      "-64": 13.26,
      "-63": 13.27,
      "-62": 13.27,
      "-61": 13.28,
      "-60": 13.28,
      "-59": 13.29,
      "-58": 13.29,
      "-57": 13.3,
      "-56": 13.3,
      "-55": 13.31,
      "-54": 13.32,
      "-53": 13.32,
      "-52": 13.33,
      "-51": 13.33,
      "-50": 13.34,
      "-49": 13.34,
      "-48": 13.35,
      "-47": 13.35,
      "-46": 13.36,
      "-45": 13.36,
      "-44": 13.37,
      "-43": 13.37,
      "-42": 13.38,
      "-41": 13.39,
      "-40": 13.39,
      "-39": 13.4,
      "-38": 13.4,
      "-37": 13.41,
      "-36": 13.41,
      "-35": 13.42,
      "-34": 13.42,
      "-33": 13.43,
      "-32": 13.43,
      "-31": 13.44,
      "-30": 13.44,
      "-29": 13.45,
      "-28": 13.46,
      "-27": 13.46,
      "-26": 13.47,
      "-25": 13.47,
      "-24": 13.48,
      "-23": 13.48,
      "-22": 13.49,
      "-21": 13.49,
      "-20": 13.5,
      "-19": 13.5,
      "-18": 13.51,
      "-17": 13.51,
      "-16": 13.52,
      "-15": 13.52,
      "-14": 13.53,
      "-13": 13.54,
      "-12": 13.54,
      "-11": 13.55,
      "-10": 13.55,
      "-9": 13.56,
      "-8": 13.56,
      "-7": 13.57,
      "-6": 13.57,
      "-5": 13.58,
      "-4": 13.58,
      "-3": 13.59,
      "-2": 13.59,
      "-1": 13.6,
      "0": 13.61,
      "1": 13.61,
      "2": 13.62,
      "3": 13.62,
      "4": 13.63,
      "5": 13.63,
      "6": 13.63,
      "7": 13.63,
      "8": 13.63,
      "9": 13.63,
      "10": 13.63,
      "11": 13.63,
      "12": 13.63,
      "13": 13.63,
      "14": 13.63,
      "15": 13.63,
      "16": 13.63,
      "17": 13.63,
      "18": 13.63,
      "19": 13.63,
      "20": 13.63,
      "21": 13.63,
      "22": 13.63,
      "23": 13.63,
      "24": 13.63,
      "25": 13.63,
      "26": 13.63,
      "27": 13.63,
      "28": 13.63,
      "29": 13.63,
      "30": 13.63,
      "31": 13.63,
      "32": 13.63,
      "33": 13.63,
      "34": 13.63,
      "35": 13.63,
      "36": 13.63,
      "37": 13.63,
      "38": 13.63,
      "39": 13.63,
      "40": 13.63,
      "41": 13.63,
      "42": 13.63,
      "43": 13.63,
      "44": 13.63,
      "45": 13.63
   }
};
