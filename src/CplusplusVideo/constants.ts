
export const SCENE_TIMING = {
    INTRO_DURATION: 30 * 16, // 16s
    HISTORY_DURATION: 30 * 16, // 16s (total ~32s)
    USES_DURATION: 30 * 14, // 14s (total ~46s)
    FEATURES_DURATION: 30 * 12, // 12s (total ~58s)
    CODE_DURATION: 30 * 17, // 17s (total ~75s)
    POINTERS_DURATION: 30 * 13, // 13s (total ~88s)
    OUTRO_DURATION: 30 * 12, // 12s (total ~100s)
};

export const TOTAL_DURATION = Object.values(SCENE_TIMING).reduce((a, b) => a + b, 0);
