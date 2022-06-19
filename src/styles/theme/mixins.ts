//
// Try to sort alphabetically
const mixins = `
    $text-color: yellow;

    @mixin container($size: 192rem) {
        max-width: $size;
        margin-left: auto;
        margin-right: auto;
        transition: all, 80ms, ease;
    }
    
    @mixin flex-center() {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Grid: RAM (Repeat, Auto, Minmax) */
    @mixin gridColumnsRAM($minMax: 150px) {
        grid-template-columns: repeat(auto-fit, minmax($minMax, 1fr));
    }

    /* Grid: repeat(7, minmax(0, 1fr)) */
    @mixin gridColumns($fitCount: 2, $minMax: 0) {
        grid-template-columns: repeat($fitCount, minmax($minMax, 1fr));
    }

    @mixin text-overflow-ellipsis() {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /* Removes the blue highlight from touch events in Chrome */
    @mixin touch-highlight-disable() {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
    }
`;

export default mixins;

// Mixins

// Shadows mixin
//
// const shadows = {
// 	xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
// 	sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
// 	md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
// 	lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
// 	xl: "0px 20px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)",
// 	"2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.25)",
// 	"3xl": "0px 32px 64px -12px rgba(16, 24, 40, 0.2)",

// 	// Focus
// 	"focused-button-shadow": "0 0 0 4px rgba(0, 0, 0, 0.12)"
// };
