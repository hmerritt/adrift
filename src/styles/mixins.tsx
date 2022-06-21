//
// Try to sort alphabetically
const mixins = `
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
